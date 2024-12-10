import { useDatasetContext } from 'src/dataset-context';
import { DataDictionaryApiInput, useTableApiQuery } from '../../api/use-table-api-query.hook';
import { flattenCountryData } from './flatten-country-data';
import { useSelectionFilterContext } from 'src/user-selection-filter';

export type TimelineApiDTO = {
  dataDictionary: Record<number, Record<string, Record<string, string | number>[]>>;
  mostRecentTimestamp: number | null;
  timestamps: number[];
};


export type TimelineData = {
  data: Record<string, string | number>[];
  mostRecentTimestamp: number | null;
  timestamps: number[];
};

const emptyDataset: TimelineData = { data: [], mostRecentTimestamp: null, timestamps: [] };

export function useTimelineData() {
  const datasetContext = useDatasetContext();
  const userSelectionFilter = useSelectionFilterContext();

  const apiInput: DataDictionaryApiInput = {
    tableName: datasetContext.tableName,
    dictionaryColumnNames: [datasetContext.timeColumnName, datasetContext.countryColumnName],
    timeColumnName: datasetContext.timeColumnName,
    selectColumnNames: userSelectionFilter.selectedColumnNames,
  };
  const { data, error, isFetching } = useTableApiQuery<TimelineData>(apiInput, (data) =>
    flattenCountryData(data, userSelectionFilter.selectedColumnNames, datasetContext),
  );

  return { data: data || emptyDataset, error, isFetching };
}


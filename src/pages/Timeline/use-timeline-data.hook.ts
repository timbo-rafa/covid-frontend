import { useDatasetContext } from 'src/dataset-context';
import { DataDictionaryApiInput, DownsamplingMethod, useTableApiQuery } from '../../api/use-table-api-query.hook';
import { flattenCountryData } from './flatten-country-data';
import { useUserFilterContext } from 'src/user-filter';

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
  const userFilter = useUserFilterContext();

  const apiInput: DataDictionaryApiInput = {
    tableName: datasetContext.tableName,
    dictionaryColumnNames: [datasetContext.timeColumnName, datasetContext.keyColumnName],
    timeColumnName: datasetContext.timeColumnName,
    selectColumnNames: userFilter.selectedColumnNames,
    downsamplingMethod: DownsamplingMethod.LatestMonthly,
  };
  const { data, error, isFetching } = useTableApiQuery<Omit<TimelineData, 'timestamps'>>(apiInput, (data) =>
    flattenCountryData(data, userFilter.selectedColumnNames, datasetContext),
  );

  const timelineData = data ? { ...data, timestamps: data.data.map((row) => row[datasetContext.timeColumnName]) } : emptyDataset;
  return { data: timelineData, error, isFetching };
}

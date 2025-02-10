import { useDatasetContext } from 'src/dataset-context';
import { DataDictionaryApiInput, DownsamplingMethod, useTableApiQuery } from '../../api/use-table-api-query.hook';
import { flattenTimelineData } from './flatten-country-data';
import { useUserFilterContext } from 'src/user-filter';

export type TimelineApiDTO = {
  dataDictionary: Record<number, Record<string, Record<string, string | number>[]>>;
  mostRecentTimestamp: number | null;
  timestamps: number[];
};

export type TimelineData = {
  data: Record<string, string | number | null>[];
  mostRecentTimestamp: number | null;
  timestamps: number[];
};

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
  const { data, error, isFetching } = useTableApiQuery<TimelineData>(apiInput, (data) =>
    flattenTimelineData(data, userFilter.selectedColumnNames, userFilter.selectedKeyColumnValues, datasetContext),
  );

  const timelineData = data?.data || [];
  return { data: timelineData, error, isFetching };
}

import { DataDictionaryApiInput, DownsamplingMethod, useTableApiQuery } from 'src/api/use-table-api-query.hook';
import { useDatasetContext } from 'src/dataset-context';
import { useUserFilterContext } from 'src/user-filter';

export type DataApiDTO = {
  data: Record<string, string | number>[];
  mostRecentTimestamp: number | null;
};

export function useDataTableData() {
  const datasetContext = useDatasetContext();
  const userFilter = useUserFilterContext();

  const apiInput: DataDictionaryApiInput = {
    tableName: datasetContext.tableName,
    timeColumnName: datasetContext.timeColumnName,
    selectColumnNames: [
      'id',
      ...userFilter.selectedColumnNames,
      datasetContext.timeColumnName,
      datasetContext.keyColumnName,
    ],
    downsamplingMethod: DownsamplingMethod.LatestMonthly,
  };
  const { data, error, isFetching } = useTableApiQuery<DataApiDTO>(apiInput);
  console.log('🚀 | useDataTableData | data:', data);
  return { rows: data?.data || [], error, isFetching };
}

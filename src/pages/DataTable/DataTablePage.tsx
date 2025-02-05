import { DataTable } from './DataTable';
import { useDataTableData } from './use-data-table-data.hook';
import { useUserFilterContext } from 'src/user-filter';
import { useDatasetContext } from 'src/dataset-context';
import { useColumnMetadataApiQuery } from 'src/api/use-column-metadata.hook';

export function DataTablePage() {
  const datasetContext = useDatasetContext();
  const userFilter = useUserFilterContext();

  const columnMetadataQueryResult = useColumnMetadataApiQuery(datasetContext.tableName, [
    ...userFilter.selectedColumnNames,
    datasetContext.timeColumnName,
    datasetContext.partitionColumnName,
  ]);
  const dataQueryResult = useDataTableData();
  const isFetching = columnMetadataQueryResult.isFetching || dataQueryResult.isFetching;

  console.log('🚀 | DataTablePage | rows:', dataQueryResult.rows);
  return <DataTable data={dataQueryResult.rows} columnMetadata={columnMetadataQueryResult.availableColumns} />;
}

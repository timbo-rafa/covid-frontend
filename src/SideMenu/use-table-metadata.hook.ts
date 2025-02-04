import { useTableMetadataApiQuery } from 'src/api/use-table-metadata.hook';

export function useTableMetadata(tableName: string) {
  const { data, error, isFetching } = useTableMetadataApiQuery(tableName);

  return { availableColumns: data || [], error, isFetching };
}

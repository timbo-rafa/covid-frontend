import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export type TableMetadataApiDTO = {
  id: string;
  tableName: string;
  columnName: string;
  dataType: 'number' | 'string' | 'date' | 'bigint' | string;
};

export function useTableMetadataApiQuery(tableName: string, selectedColumnNames?: string[]) {
  const url = `${process.env.REACT_APP_API_HOST}/tables/${tableName}/columns`;

  const { data, error, isFetching } = useQuery<TableMetadataApiDTO[]>({
    queryKey: ['metadata'],
    queryHash: url,
    queryFn: async () => {
      const apiResponse = await axios.get<TableMetadataApiDTO[]>(url);

      return apiResponse.data;
    },
    select: selectedColumnNames
      ? (data) => data?.filter((columnMetadata) => selectedColumnNames.includes(columnMetadata.columnName))
      : undefined,
  });

  return { availableColumns: data || [], error, isFetching };
}

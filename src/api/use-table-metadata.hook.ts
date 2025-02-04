import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export type TableMetadataApiDTO = {
  tableName: string;
  columnName: string;
  dataType: 'number' | 'string' | 'date' | 'bigint' | string;
};

export function useTableMetadataApiQuery(tableName: string) {
  const url = `${process.env.REACT_APP_API_HOST}/tables/${tableName}/columns`;

  return useQuery<TableMetadataApiDTO[]>({
    queryKey: ['metadata'],
    queryHash: url,
    queryFn: async () => {
      const apiResponse = await axios.get<TableMetadataApiDTO[]>(url);

      return apiResponse.data;
    },
  });
}

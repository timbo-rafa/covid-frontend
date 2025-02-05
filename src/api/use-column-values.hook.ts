import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useColumnValuesApiQuery(tableName: string, columnName: string) {
  const url = `${process.env.REACT_APP_API_HOST}/tables/${tableName}/columns/${columnName}`;

  const { data, error, isFetching } = useQuery<string[]>({
    queryKey: ['column-value'],
    queryHash: url,
    queryFn: async () => {
      const apiResponse = await axios.get<string[]>(url);

      return apiResponse.data;
    },
  });

  return { columnValues: data || [], error, isFetching };
}

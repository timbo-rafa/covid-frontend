import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useTableApiQuery<DataType>(tableName: string) {
  const { error, data, isFetching } = useQuery<DataType[]>({
    queryKey: ['table'],
    queryFn: async () => {
      const tableData = await axios.get(`${process.env.REACT_APP_API_HOST}/table?tableName=${tableName}`);

      return tableData.data;
    },
  });

  return { error, data, isFetching };
}

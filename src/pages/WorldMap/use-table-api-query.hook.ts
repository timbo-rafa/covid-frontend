import { DatasetApiBaseType, DatasetConfig } from 'src/api/api';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useTableApiQuery<DataType extends Partial<DatasetApiBaseType>>(datasetConfig: DatasetConfig) {
  const { error, data, isFetching } = useQuery<DataType[]>({
    queryKey: ['table'],
    queryFn: async () => {
      const tableData = await axios.get<DataType[]>(
        `${process.env.REACT_APP_API_HOST}/table?tableName=${datasetConfig.tableName}`,
      );

      return mapTimeColumnToEpoch(tableData.data, datasetConfig);
    },
  });

  return { error, data: data || [], isFetching };
}

function mapTimeColumnToEpoch<DataType extends Partial<DatasetApiBaseType>>(data: DataType[], datasetConfig: DatasetConfig) {
  return data.map((dataRow) => {
    const time = dataRow[datasetConfig.timeColumn]
    return {
      ...dataRow,
    [datasetConfig.timeColumn]: time ? new Date(time).getTime() : undefined,
    }
  })
}
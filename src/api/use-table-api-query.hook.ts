import { DefaultError, useQuery, UseQueryOptions } from '@tanstack/react-query';
import axios from 'axios';
import qs from 'query-string';

export type DataDictionaryApiDTO = {
  dataDictionary: Record<number, Record<string, Record<string, string | number>[]>>;
  mostRecentTimestamp: number | null;
  timestamps: number[];
};

export enum DownsamplingMethod {
  LatestMonthly = 'LATEST_MONTHLY',
}

export type DataDictionaryApiInput = {
  tableName: string;
  timeColumnName: string;
  dictionaryColumnNames?: string[];
  selectColumnNames: string[];
  downsamplingMethod: DownsamplingMethod | undefined;
};

export function useTableApiQuery<DataType>(
  apiInput: DataDictionaryApiInput,
  select?: UseQueryOptions<DataDictionaryApiDTO, DefaultError, DataType>['select'],
) {
  const queryString = qs.stringify(apiInput, { arrayFormat: 'comma' });

  const url = `${process.env.REACT_APP_API_HOST}/tables/${apiInput.tableName}?${queryString}`;

  return useQuery<DataDictionaryApiDTO, DefaultError, DataType>({
    queryKey: ['table'],
    queryHash: url,
    queryFn: async () => {
      const apiResponse = await axios.get<DataDictionaryApiDTO>(url);

      console.log('🚀 | API :', apiResponse);
      return apiResponse.data;
    },
    select,
  });
}

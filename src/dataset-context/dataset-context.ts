import { createContext, useContext } from 'react';

export type DatasetContext = {
  tableName: string;
  timeColumnName: string;
  countryColumnName: string;
};

export const defaultDatasetContext: DatasetContext = {
  tableName: 'covid',
  timeColumnName: 'date',
  countryColumnName: 'code',
};

const datasetContext = createContext(defaultDatasetContext);

export function useDatasetContext() {
  return useContext(datasetContext);
}

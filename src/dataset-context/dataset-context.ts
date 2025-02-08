import { createContext, useContext } from 'react';

export type DatasetContext = {
  tableName: string;
  timeColumnName: string;
  keyColumnName: string;
};

export const defaultDatasetContext: DatasetContext = {
  tableName: 'covid',
  timeColumnName: 'date',
  keyColumnName: 'code',
};

const datasetContext = createContext(defaultDatasetContext);

export function useDatasetContext() {
  return useContext(datasetContext);
}

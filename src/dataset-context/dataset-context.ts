import { createContext, useContext } from 'react';

export type DatasetContext = {
  tableName: string;
  timeColumnName: string;
  partitionColumnName: string;
};

export const defaultDatasetContext: DatasetContext = {
  tableName: 'covid',
  timeColumnName: 'date',
  partitionColumnName: 'code',
};

const datasetContext = createContext(defaultDatasetContext);

export function useDatasetContext() {
  return useContext(datasetContext);
}

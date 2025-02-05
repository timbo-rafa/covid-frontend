import React from 'react';
import { useLocalStorage } from 'react-use';
import { userFilterDefaults } from './user-filter.context';
import { useDatasetContext } from 'src/dataset-context';

export function useUserFilterContextValue() {
  const datasetContext = useDatasetContext();
  const [selectedColumnNames = [], setSelectedColumnNames] = useLocalStorage(
    `${datasetContext.tableName}.selectedColumnNames`,
    userFilterDefaults.selectedColumnNames,
  );
  const [selectedKeyColumnValues = [], setSelectedKeyColumnValues] = useLocalStorage(
    `${datasetContext.tableName}.selectedKeyColumnValues`,
    userFilterDefaults.selectedKeyColumnValues,
  );

  const userFilterContextValue = React.useMemo(
    () => ({ selectedColumnNames, setSelectedColumnNames, selectedKeyColumnValues, setSelectedKeyColumnValues }),
    [selectedColumnNames, setSelectedColumnNames, selectedKeyColumnValues, setSelectedKeyColumnValues],
  );

  return userFilterContextValue;
}

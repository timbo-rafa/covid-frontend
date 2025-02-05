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
  const [selectedCountryIsoCodes = [], setSelectedCountryIsoCodes] = useLocalStorage(
    `${datasetContext.tableName}.selectedCountryIsoCodes`,
    userFilterDefaults.selectedCountryIsoCodes,
  );

  const userFilterContextValue = React.useMemo(
    () => ({ selectedColumnNames, setSelectedColumnNames, selectedCountryIsoCodes, setSelectedCountryIsoCodes }),
    [selectedColumnNames, setSelectedColumnNames, selectedCountryIsoCodes, setSelectedCountryIsoCodes],
  );

  return userFilterContextValue;
}

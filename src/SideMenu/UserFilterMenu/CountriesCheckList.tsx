import { Typography } from '@mui/material';
import { LoadingSpinner } from 'src/molecules/LoadingSpinner';
import { CheckList } from './CheckList';
import { useColumnValuesApiQuery } from 'src/api/use-column-values.hook';
import { useUserFilterContext } from 'src/user-filter';
import { useDatasetContext } from 'src/dataset-context';

export function CountriesCheckList() {
  const datasetContext = useDatasetContext();
  const { selectedKeyColumnValues, setSelectedKeyColumnValues } = useUserFilterContext();

  const keyColumnValuesQueryResult = useColumnValuesApiQuery(datasetContext.tableName, datasetContext.keyColumnName);
  const handleKeyColumnValuesToggle = (keyColumnValue: string, isNowSelected: boolean) => {
    if (isNowSelected) {
      selectedKeyColumnValues.push(keyColumnValue);
      setSelectedKeyColumnValues([...selectedKeyColumnValues]);
    } else {
      setSelectedKeyColumnValues(selectedKeyColumnValues.filter((value) => value !== keyColumnValue));
    }
  };
  
  return (
    <>
      <Typography variant="h5" color="inherit" noWrap sx={{ flexGrow: 1 }}>
        Countries
      </Typography>
      <LoadingSpinner isLoading={keyColumnValuesQueryResult.isFetching}>
        <CheckList
          items={keyColumnValuesQueryResult.columnValues}
          selectedItems={selectedKeyColumnValues}
          onCheckboxChange={handleKeyColumnValuesToggle}
        />
      </LoadingSpinner>
    </>
  );
}

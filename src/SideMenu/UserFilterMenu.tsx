import { Box, Divider, LinearProgress, Paper, Skeleton, Typography, useTheme } from '@mui/material';
import { useDatasetContext } from 'src/dataset-context';
import { useUserFilterContext } from 'src/user-filter';
import { useColumnMetadataApiQuery } from 'src/api/use-column-metadata.hook';
import { CheckList } from './CheckList';
import { useColumnValuesApiQuery } from 'src/api/use-column-values.hook';
import { LoadingBar } from 'src/molecules/LoadingBar';
import { LoadingSpinner } from 'src/molecules/LoadingSpinner';
import { Suspense } from 'react';

export function UserFilterMenu() {
  const datasetContext = useDatasetContext();
  const { selectedColumnNames, selectedKeyColumnValues, setSelectedColumnNames, setSelectedKeyColumnValues } =
    useUserFilterContext();
  const theme = useTheme();

  const columnMetadataQueryResult = useColumnMetadataApiQuery(datasetContext.tableName);
  const handleColumnNameToggle = (columnName: string, isNowSelected: boolean) => {
    console.log('🚀 | handleColumnNameToggle | columnName: string, selected:', columnName, isNowSelected);

    if (isNowSelected) {
      selectedColumnNames.push(columnName);
      setSelectedColumnNames([...selectedColumnNames]);
    } else {
      setSelectedColumnNames(selectedColumnNames.filter((name) => name !== columnName));
    }
  };

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
    <Paper>
      <Box display={'flex'} flexDirection={'column'} sx={{ margin: theme.spacing(3) }}>
        <Typography variant="h5" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          Columns
        </Typography>
        <LoadingSpinner isLoading={columnMetadataQueryResult.isFetching} >
          <CheckList
            items={columnMetadataQueryResult.availableColumns.map((column) => column.columnName)}
            requiredItems={[
              { name: datasetContext.timeColumnName, appendToLabel: ' (time column)' },
              { name: datasetContext.keyColumnName, appendToLabel: ' (key column)' },
            ]}
            onCheckboxChange={handleColumnNameToggle}
            selectedItems={selectedColumnNames}
          />
        </LoadingSpinner>
        <Divider sx={{my: theme.spacing(1)}}/>
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
      </Box>
    </Paper>
  );
}

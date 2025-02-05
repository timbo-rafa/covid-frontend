import { Box, Divider, Paper, useTheme } from '@mui/material';
import { useDatasetContext } from 'src/dataset-context';
import { useUserFilterContext } from 'src/user-filter';
import { useColumnMetadataApiQuery } from 'src/api/use-column-metadata.hook';
import { CheckList } from './CheckList';
import { useColumnValuesApiQuery } from 'src/api/use-column-values.hook';

export function UserFilterMenu() {
  const datasetContext = useDatasetContext();
  const { selectedColumnNames, selectedKeyColumnValues, setSelectedColumnNames, setSelectedKeyColumnValues } =
    useUserFilterContext();
  const theme = useTheme();

  const { availableColumns, error, isFetching } = useColumnMetadataApiQuery(datasetContext.tableName);
  const handleColumnNameToggle = (columnName: string, isNowSelected: boolean) => {
    console.log('🚀 | handleColumnNameToggle | columnName: string, selected:', columnName, isNowSelected);

    if (isNowSelected) {
      selectedColumnNames.push(columnName);
      setSelectedColumnNames([...selectedColumnNames]);
    } else {
      setSelectedColumnNames(selectedColumnNames.filter((name) => name !== columnName));
    }
  };

  const keyColumnValuesQueryResult = useColumnValuesApiQuery(datasetContext.tableName, datasetContext.partitionColumnName);
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
        <CheckList
          items={availableColumns.map((column) => column.columnName)}
          requiredItems={[
            { name: datasetContext.timeColumnName, appendToLabel: ' (time column)' },
            { name: datasetContext.partitionColumnName, appendToLabel: ' (key column)' },
          ]}
          onCheckboxChange={handleColumnNameToggle}
          selectedItems={selectedColumnNames}
        />
      </Box>
      <Divider />
      <CheckList
        items={keyColumnValuesQueryResult.columnValues}
        selectedItems={selectedKeyColumnValues}
        onCheckboxChange={handleKeyColumnValuesToggle}
      />
    </Paper>
  );
}

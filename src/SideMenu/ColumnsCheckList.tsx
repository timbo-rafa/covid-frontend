import { Typography } from '@mui/material';
import { LoadingSpinner } from 'src/molecules/LoadingSpinner';
import { CheckList } from './CheckList';
import { useUserFilterContext } from 'src/user-filter';
import { useDatasetContext } from 'src/dataset-context';
import { useColumnMetadataApiQuery } from 'src/api/use-column-metadata.hook';

export function ColumnsCheckList() {
  const datasetContext = useDatasetContext();
  const { selectedColumnNames, setSelectedColumnNames } = useUserFilterContext();

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

  return (
    <>
      <Typography variant="h5" color="inherit" noWrap sx={{ flexGrow: 1 }}>
        Columns
      </Typography>
      <LoadingSpinner isLoading={columnMetadataQueryResult.isFetching}>
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
    </>
  );
}

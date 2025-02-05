import { Box, FormControlLabel, Paper, Typography, useTheme } from '@mui/material';
import { useDatasetContext } from 'src/dataset-context';
import Checkbox from '@mui/material/Checkbox';
import { useUserFilterContext } from 'src/user-filter';
import { useTableMetadataApiQuery } from 'src/api/use-table-metadata.hook';

export type ColumnNameCheckboxProps = {
  columnName: string;
  selectedColumnNames: string[];
  onChange: (selected: boolean) => void;
};

export function ColumnNameCheckbox({ columnName, selectedColumnNames, onChange }: ColumnNameCheckboxProps) {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={selectedColumnNames.includes(columnName)}
          onChange={(e) => onChange(Boolean(e.target.checked))}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      }
      label={columnName}
    />
  );
}

export function UserFilterMenu() {
  const datasetContext = useDatasetContext();
  const { selectedColumnNames, selectedCountryIsoCodes, setSelectedColumnNames, setSelectedCountryIsoCodes } =
    useUserFilterContext();
  const theme = useTheme();

  const { availableColumns, error, isFetching } = useTableMetadataApiQuery(datasetContext.tableName);

  const handleColumnNameToggle = (columnName: string, newSelected: boolean) => {
    console.log('🚀 | handleColumnNameToggle | columnName: string, selected:', columnName, newSelected);

    if (newSelected) {
      selectedColumnNames.push(columnName);
      setSelectedColumnNames([...selectedColumnNames]);
    } else {
      setSelectedColumnNames(selectedColumnNames.filter((name) => name !== columnName));
    }
  };

  return (
    <Paper>
      <Box display={'flex'} flexDirection={'column'} sx={{ margin: theme.spacing(3) }}>
        <Typography variant="h5" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          Columns
        </Typography>
        {availableColumns.map((column) => (
          <ColumnNameCheckbox
            key={`${column.tableName}_${column.columnName}`}
            columnName={column.columnName}
            selectedColumnNames={selectedColumnNames}
            onChange={(selected) => handleColumnNameToggle(column.columnName, selected)}
          />
        ))}
      </Box>
    </Paper>
  );
}

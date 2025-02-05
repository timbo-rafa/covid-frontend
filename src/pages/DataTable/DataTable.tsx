import { Paper, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { TableMetadataApiDTO } from 'src/api/use-column-metadata.hook';

type DataTableProps = {
  data: Record<string | number, string | number>[];
  columnMetadata: TableMetadataApiDTO[];
};

const paginationModel = { page: 0, pageSize: 20 };

export function DataTable({ data, columnMetadata }: DataTableProps) {
  const theme = useTheme();

  console.log('🚀 | DataTable | data:', data);
  return (
    <Paper sx={{ width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columnMetadata.map((column) => ({ id: column.id, field: column.columnName }))}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[20, 100]}
        sx={{ border: theme.spacing(3) }}
      />
    </Paper>
  );
}

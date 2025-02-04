import { Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

type DataTableProps = {
  data: Record<string | number, string | number>[];
};


const paginationModel = { page: 0, pageSize: 5 };

export function DataTable({data} : DataTableProps) {
  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={Object.keys(data).map((field, id) => ({field, id}))}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
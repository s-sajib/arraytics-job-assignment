/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import COLUMNS from "./itemsTableColDef";
import NoRowsOverlay from "../ui/NoRowsOverlay";
import CustomTableToolbar from "../ui/CustomTableToolbar";

function ItemsTable({ data, loading }) {
  //   const [confirmationOpen, setConfirmationOpen] = useState(false);
  // const [deleteRowId, setDeleteRowId] = useState(null);

  return (
    <Box style={{ height: "70vh", width: "100%" }}>
      <DataGrid
        rows={data}
        getRowId={(row) => row._id}
        columns={COLUMNS}
        rowsPerPageOptions={[5, 10, 15, 20, 100]}
        stickyHeader={true}
        disableSelectionOnClick={true}
        editMode={"cell"}
        filterMode={"client"}
        loading={loading}
        initialState={{
          ...data.initialState,
          pagination: { paginationModel: { pageSize: 15 } },
        }}
        pageSizeOptions={[5, 10, 25, 50, 100]}
        slots={{
          noRowsOverlay: NoRowsOverlay,
          toolbar: CustomTableToolbar,
        }}
        slotProps={{
          toolbar: {
            headerName: "Item",
            route: "/items/add",
          },
        }}
        sx={{
          boxShadow: "0px 1px 15px 1px rgba(0,0,0,0.29)",
          border: "none",
        }}
      />
    </Box>
  );
}

export default ItemsTable;

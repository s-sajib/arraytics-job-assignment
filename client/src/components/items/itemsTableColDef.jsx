import { IconButton, Stack } from "@mui/material";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import dayjs from "dayjs";
import IconButtonNavigator from "../ui/IconButtonNavigator";

const COLUMNS = [
  {
    field: "name",
    headerName: "Name",
    headerAlign: "center",
    minWidth: 100,
    flex: 3,
    type: "text",
    align: "left",
  },
  {
    field: "created_by",
    headerName: "Created By",
    headerAlign: "center",
    minWidth: 100,
    flex: 2,
    type: "text",
    align: "left",
    valueGetter: (column) => column?.value?.name,
  },
  {
    field: "created_at",
    headerName: "Created At",
    headerAlign: "center",
    minWidth: 100,
    flex: 2,
    type: "string",
    align: "center",
    valueGetter: (column) =>
      column?.value
        ? dayjs(column?.value)?.format("DD-MMM-YYYY hh:mm:ss A")
        : null,
  },

  {
    headerClassName: "themed--header",
    field: "actions",
    headerName: "Actions",
    minWidth: 120,
    type: "actions",
    align: "center",
    headerAlign: "center",

    renderCell: (params) => {
      return (
        <Stack direction="row" spacing={1}>
          <IconButtonNavigator link={`edit/${params.row._id}`} />
          <IconButton onClick={() => console.log("Delete Mode")}>
            <DeleteOutlineIcon />
          </IconButton>
        </Stack>
      );
    },
  },
];

export default COLUMNS;

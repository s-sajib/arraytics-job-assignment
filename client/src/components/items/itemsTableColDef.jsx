/* eslint-disable react-refresh/only-export-components */
import { Stack } from "@mui/material";

import dayjs from "dayjs";
import IconButtonNavigator from "../ui/IconButtonNavigator";
import DeleteItemButton from "./DeleteItemButton";

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
          <DeleteItemButton id={params.row._id} />
        </Stack>
      );
    },
  },
];

export default COLUMNS;

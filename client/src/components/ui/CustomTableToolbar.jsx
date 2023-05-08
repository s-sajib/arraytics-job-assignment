/* eslint-disable react/prop-types */
import AddIcon from "@mui/icons-material/Add";
import { Button, Grid } from "@mui/material";
import { Stack } from "@mui/system";
import {
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { useNavigate } from "react-router";

export default function CustomTableToolbar({ headerName, route }) {
  const navigate = useNavigate();
  return (
    <GridToolbarContainer sx={{ p: 1 }}>
      <Stack
        direction={"row"}
        spacing={2}
        sx={{ display: "flex", marginRight: "auto" }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <GridToolbarQuickFilter
              quickFilterParser={(searchInput) =>
                searchInput.split(",").map((value) => value.trim())
              }
              quickFilterFormatter={(quickFilterValues) =>
                quickFilterValues.join(", ")
              }
              debounceMs={500}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <GridToolbarFilterButton />
          </Grid>
          {/* <Grid item xs={12} md={3}>
            <GridToolbarExport />
          </Grid> */}
        </Grid>
      </Stack>
      <Button
        variant="outlined"
        color="info"
        onClick={() => {
          navigate(route);
        }}
        startIcon={<AddIcon />}
      >
        {headerName}
      </Button>
    </GridToolbarContainer>
  );
}

import { Alert, Grid, Typography } from "@mui/material";
import ItemsTable from "../../components/items/ItemsTable";
import { useGetItemsQuery } from "../../features/items/itemsAPI";

function Items() {
  const { data, isLoading, isError, error } = useGetItemsQuery();

  return (
    <Grid container px={2}>
      <Grid item xs={12}>
        <Typography variant="h5" align="center" my={5}>
          Items
        </Typography>
        {isError && (
          <Alert severity="error" sx={{ my: 2 }}>
            {error?.message || "Something Went Wrong!"}
          </Alert>
        )}

        <ItemsTable
          data={Array.isArray(data) ? data : []}
          loading={isLoading}
        />
      </Grid>
    </Grid>
  );
}

export default Items;

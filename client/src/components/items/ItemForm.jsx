/* eslint-disable react/prop-types */
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Skeleton,
  TextField,
} from "@mui/material";

/* eslint-disable no-unused-vars */
function ItemForm({
  values,
  handleChange,
  handleSubmit,
  isLoading,
  method,
  isItemLoading = false,
}) {
  return (
    <Grid
      container
      spacing={2}
      sx={{ height: "100vh" }}
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={12} md={6}>
        <Card sx={{ minWidth: "40vw" }} align="center">
          <CardHeader
            title={method === "create" ? "Add Item" : "Edit Item"}
            align="center"
          />
          <CardContent>
            <form onSubmit={handleSubmit}>
              {isItemLoading ? (
                <Skeleton
                  variant="rounded"
                  width={"100%"}
                  height={50}
                  sx={{ my: 2 }}
                />
              ) : (
                <TextField
                  name="name"
                  value={values?.name}
                  placeholder="Item Name"
                  onChange={handleChange}
                  label="Name"
                  variant="outlined"
                  fullWidth
                  required
                  type="text"
                  sx={{ my: 2 }}
                />
              )}

              <Button variant="contained" type="submit" disabled={isLoading}>
                {method === "create" ? "Create" : "Update"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default ItemForm;

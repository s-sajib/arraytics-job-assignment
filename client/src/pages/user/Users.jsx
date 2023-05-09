import { Alert, Grid, Typography } from "@mui/material";
import UsersTable from "../../components/users/UsersTable";
import { useGetUsersQuery } from "../../features/users/usersAPI";

function Users() {
  const { data, isLoading, isError, error } = useGetUsersQuery();

  return (
    <Grid container px={2}>
      <Grid item xs={12}>
        <Typography variant="h5" align="center" my={5}>
          Users
        </Typography>
        {isError && (
          <Alert severity="error" sx={{ my: 2 }}>
            {error?.message || "Something Went Wrong!"}
          </Alert>
        )}

        <UsersTable
          data={Array.isArray(data) ? [...data].reverse() : []}
          loading={isLoading}
        />
      </Grid>
    </Grid>
  );
}

export default Users;

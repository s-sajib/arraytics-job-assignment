/* eslint-disable react/prop-types */
import {
  Alert,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

/* eslint-disable no-unused-vars */
function UserUpdateForm({
  method,
  values,
  handleChange,
  handleSubmit,
  isLoading,
  isUserLoading,
  isError,
  error,
  validationError,
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
          <CardHeader title="Update User Data" align="center" />
          <CardContent>
            <form onSubmit={handleSubmit}>
              {isError && (
                <Alert severity="error">{JSON.stringify(error)}</Alert>
              )}
              {validationError && (
                <Alert severity="error">{validationError}</Alert>
              )}
              {isUserLoading ? (
                <>
                  <Skeleton
                    variant="rounded"
                    width={"100%"}
                    height={50}
                    sx={{ my: 2 }}
                  />
                  <Skeleton
                    variant="rounded"
                    width={"100%"}
                    height={50}
                    sx={{ my: 2 }}
                  />
                </>
              ) : (
                <>
                  <TextField
                    name="name"
                    value={values?.name || ""}
                    placeholder="Your Full Name"
                    onChange={handleChange}
                    label="Name"
                    variant="outlined"
                    fullWidth
                    required
                    type="text"
                    sx={{ my: 2 }}
                  />
                  <TextField
                    name="email"
                    value={values?.email || ""}
                    placeholder="Your Email Address"
                    onChange={handleChange}
                    label="Email"
                    variant="outlined"
                    fullWidth
                    required
                    type="email"
                    sx={{ my: 2 }}
                  />
                </>
              )}

              <Button variant="contained" type="submit" disabled={isLoading}>
                Update Data
              </Button>
              {method === "self-create" && (
                <Typography variant="body2" sx={{ my: 1 }}>
                  Already have an account? <Link to="/login">Login Here</Link>
                </Typography>
              )}
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default UserUpdateForm;

/* eslint-disable react/prop-types */
import {
  Alert,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

/* eslint-disable no-unused-vars */
function RegistrationForm({
  method,
  values,
  handleChange,
  handleSubmit,
  isLoading,
  isError,
  error,
  validationError,
}) {
  let buttonText = "Register";
  switch (method) {
    case "create":
      buttonText = "Create User";
      break;
    case "update":
      buttonText = "Update Data";
      break;
    default:
      buttonText = "Register";
      break;
  }
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
          <CardHeader title="Let's Sign you Up!" align="center" />
          <CardContent>
            <form onSubmit={handleSubmit}>
              {isError && (
                <Alert severity="error">{JSON.stringify(error)}</Alert>
              )}
              {validationError && (
                <Alert severity="error">{validationError}</Alert>
              )}
              <TextField
                name="name"
                value={values?.name}
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
                value={values?.email}
                placeholder="Your Email Address"
                onChange={handleChange}
                label="Email"
                variant="outlined"
                fullWidth
                required
                type="email"
                sx={{ my: 2 }}
              />
              <TextField
                name="password"
                value={values?.password}
                placeholder="Your Password"
                onChange={handleChange}
                label="Password"
                variant="outlined"
                fullWidth
                required
                type="password"
                sx={{ my: 2 }}
              />
              {values.password === values.confirmPassword ? null : (
                <Alert severity="error">Passwords Do not Match!</Alert>
              )}
              <TextField
                name="confirmPassword"
                value={values?.confirmPassword}
                placeholder="Confirm Password"
                onChange={handleChange}
                label="Confirm Password"
                variant="outlined"
                fullWidth
                required
                type="password"
                sx={{ my: 2 }}
              />
              <Button variant="contained" type="submit" disabled={isLoading}>
                {buttonText}
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

export default RegistrationForm;

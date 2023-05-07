/* eslint-disable react/prop-types */
import {
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
function LoginForm({ values, handleChange, handleSubmit, isLoading }) {
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
          <CardHeader title="Please Login to Continue" align="center" />
          <CardContent>
            <form onSubmit={handleSubmit}>
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
              <Button variant="contained" type="submit" disabled={isLoading}>
                Login
              </Button>
              <Typography variant="body2" sx={{ my: 1 }}>
                Don&apos;t have an account?{" "}
                <Link to="/self-register">Register Here</Link>
              </Typography>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default LoginForm;

/* eslint-disable react/prop-types */

import { AppBar, Button, Grid, Toolbar, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
export default function PrivateRoute({ children }) {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  if (user) {
    return (
      <>
        <AppBar sx={{ background: "black", zIndex: -1 }}>
          <Toolbar>
            <Grid
              container
              justifyContent="space-between"
              alignItems={"center"}
            >
              <Grid item xs={8} md={10}>
                <Typography variant="h6">
                  Hello! {user?.name || "Stranger"}
                </Typography>
              </Grid>
              <Grid item xs={4} md={2} align={"end"}>
                <Button
                  color="error"
                  variant="contained"
                  ml="auto"
                  onClick={() => navigate("/logout")}
                >
                  Logout
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <main style={{ marginTop: "75px" }}>{children}</main>
      </>
    );
  } else {
    return <Navigate to="/login" />;
  }
}

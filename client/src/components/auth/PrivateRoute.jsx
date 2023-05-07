/* eslint-disable react/prop-types */

import { AppBar, Button, Toolbar } from "@mui/material";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
export default function PrivateRoute({ children }) {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  if (user) {
    return (
      <>
        <AppBar sx={{ background: "black", zIndex: -1, height: "70px" }}>
          <Toolbar>
            <Button
              color="info"
              variant="contained"
              ml="auto"
              onClick={() => navigate("/logout")}
            >
              Logout
            </Button>

            <Button
              color="info"
              variant="contained"
              ml="auto"
              onClick={() => navigate("/items")}
            >
              Items
            </Button>
          </Toolbar>
        </AppBar>
        <main style={{ marginTop: "75px" }}>{children}</main>
      </>
    );
  } else {
    return <Navigate to="/login" />;
  }
}

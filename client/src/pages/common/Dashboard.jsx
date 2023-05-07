import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router";

function Dashboard() {
  const navigate = useNavigate();
  return (
    <Grid
      container
      spacing={2}
      alignItems={"center"}
      justifyContent={"center"}
      height={"80vh"}
    >
      <Grid item xs={12} md={6} mx={"auto"}>
        <Card sx={{ py: 5 }}>
          <CardHeader
            title="What will you like to visit today?"
            align="center"
          />
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
              <Button
                color="info"
                variant="contained"
                ml="auto"
                onClick={() => navigate("/items")}
              >
                Items
              </Button>
              <Button
                color="info"
                variant="contained"
                ml="auto"
                onClick={() => navigate("/users")}
              >
                Users
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Dashboard;

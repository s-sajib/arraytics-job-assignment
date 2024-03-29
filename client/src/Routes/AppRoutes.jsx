import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PrivateRoute from "../components/auth/PrivateRoute";
import PublicRoute from "../components/auth/PublicRoute";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import Dashboard from "../pages/common/dashboard";
import CreateItem from "../pages/item/CreateItem";
import EditItem from "../pages/item/EditItem";
import Items from "../pages/item/Items";
import CreateUser from "../pages/user/CreateUser";
import EditUserDetails from "../pages/user/EditUserDetails";
import Users from "../pages/user/Users";
import LogOut from "../pages/auth/LogOut";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          exact
          path="/self-register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route exact path="/logout" element={<LogOut />} />
        <Route
          exact
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        {/* Item  */}
        <Route
          exact
          path="/items"
          element={
            <PrivateRoute>
              <Items />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/items/add"
          element={
            <PrivateRoute>
              <CreateItem />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/items/edit/:id"
          element={
            <PrivateRoute>
              <EditItem />
            </PrivateRoute>
          }
        />

        {/* Users  */}

        <Route
          exact
          path="/users"
          element={
            <PrivateRoute>
              <Users />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/users/create"
          element={
            <PrivateRoute>
              <CreateUser />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/users/edit/:id"
          element={
            <PrivateRoute>
              <EditUserDetails />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default AppRoutes;

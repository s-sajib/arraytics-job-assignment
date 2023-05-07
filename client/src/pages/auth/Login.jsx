import { Alert, Grid } from "@mui/material";
import LoginForm from "../../components/auth/LoginForm";
import useLoginForm from "../../hooks/useLoginForm";

function Login() {
  const {
    values,
    handleChange,
    handleSubmit,
    error,
    isLoading,
    isError,
    validationError,
  } = useLoginForm();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} justifyContent={"center"} alignItems={"center"}>
        {isError && <Alert severity="error">{error}</Alert>}
        {validationError && <Alert severity="error">{validationError}</Alert>}
        <LoginForm
          values={values}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </Grid>
    </Grid>
  );
}

export default Login;

import { Grid } from "@mui/material";
import RegistrationForm from "../../components/auth/RegistrationForm";
import useSelfRegistrationForm from "../../hooks/useSelfRegistrationForm";

function Register() {
  const {
    values,
    handleChange,
    handleSubmit,
    error,
    isLoading,
    isError,
    validationError,
  } = useSelfRegistrationForm();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} justifyContent={"center"} alignItems={"center"}>
        <RegistrationForm
          isError={isError}
          error={error}
          validationError={validationError}
          values={values}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </Grid>
    </Grid>
  );
}

export default Register;

import RegistrationForm from "../../components/auth/RegistrationForm";
import useRegistrationForm from "../../hooks/useRegistrationForm";

function CreateUser() {
  const {
    values,
    handleChange,
    handleSubmit,
    error,
    isLoading,
    isError,
    validationError,
  } = useRegistrationForm();
  return (
    <RegistrationForm
      method="create"
      values={values}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      error={error}
      isLoading={isLoading}
      isError={isError}
      validationError={validationError}
    />
  );
}

export default CreateUser;

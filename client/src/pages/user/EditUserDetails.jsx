import { useParams } from "react-router";
import UserUpdateForm from "../../components/users/UserUpdateForm";
import useUserDataUpdateForm from "../../hooks/useUserDataUpdateForm";

function EditUserDetails() {
  const userID = useParams("id");
  const {
    values,
    handleChange,
    handleSubmit,
    error,
    isLoading,
    isError,
    validationError,
    isUserLoading,
  } = useUserDataUpdateForm(userID);
  return (
    <UserUpdateForm
      method="update"
      values={values}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      error={error}
      isLoading={isLoading}
      isUserLoading={isUserLoading}
      isError={isError}
      validationError={validationError}
    />
  );
}

export default EditUserDetails;

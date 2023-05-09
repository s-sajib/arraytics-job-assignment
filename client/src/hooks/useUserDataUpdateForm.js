import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import userDataUpdateaValidator from "../validators/userDataUpdateValidator";
import {
  useEditUserMutation,
  useGetUserQuery,
} from "../features/users/usersAPI";

const useUserDataUpdateForm = ({ id }) => {
  const [values, setValues] = useState({ name: "" });
  const [validationError, setValidationError] = useState("");

  const [editUser, { isSuccess, isError, isLoading, error }] =
    useEditUserMutation();

  const {
    data: user,
    isLoading: isUserLoading,
    isSuccess: isUserFound,
    isError: isUserSearchError,
    error: userSearchError,
  } = useGetUserQuery(id);

  useEffect(() => {
    if (!isUserLoading && isUserFound) {
      setValues({
        name: user?.name,
        email: user?.email,
      });
    }
  }, [isUserLoading, isUserFound, user]);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      userDataUpdateaValidator(values);
      editUser({ id, data: values });
    } catch (err) {
      setValidationError(err.message);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      return navigate("/users");
    }
  }, [isSuccess, navigate]);

  return {
    values,
    handleChange,
    handleSubmit,
    error,
    isLoading,
    isSuccess,
    isError,
    validationError,
    isUserSearchError,
    userSearchError,
    isUserLoading,
  };
};

export default useUserDataUpdateForm;

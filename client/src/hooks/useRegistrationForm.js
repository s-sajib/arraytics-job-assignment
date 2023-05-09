import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import registrationFormValidator from "../validators/registrationFormValidator";
import { useAddUserMutation } from "../features/users/usersAPI";

const useRegistrationForm = () => {
  const [values, setValues] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [validationError, setValidationError] = useState("");
  const [addUser, { isSuccess, isError, isLoading, error }] =
    useAddUserMutation();

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
      registrationFormValidator(values);
      addUser(values);
    } catch (err) {
      console.log("Error here", err);
      setValidationError(err.message);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate(-1);
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
  };
};

export default useRegistrationForm;

import { useState } from "react";
import { useNavigate } from "react-router";
import { useLoginMutation } from "../features/auth/authAPI";
import loginFormValidator from "../validators/loginFormValidator";

const useLoginForm = () => {
  const [values, setValues] = useState({ email: "", password: "" });
  const [validationError, setValidationError] = useState("");
  const [login, { isSuccess, isError, isLoading, error }] = useLoginMutation();

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
      loginFormValidator(values);
      login(values);
      return navigate("/");
    } catch (err) {
      setValidationError(err.message);
    }
  };

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

export default useLoginForm;

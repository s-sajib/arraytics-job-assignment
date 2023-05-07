import { useEffect, useState } from "react";
import { useLoginMutation } from "../features/auth/authAPI";
import loginFormValidator from "../validators/loginFormValidator";
// import { useNavigate } from "react-router";

const useLoginForm = () => {
  const [values, setValues] = useState({});
  const [validationError, setValidationError] = useState("");
  const [login, { isSuccess, isError, isLoading, error }] = useLoginMutation();

  // const navigate = useNavigate();

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
    } catch (err) {
      setValidationError(err.message);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      const getUser = async () => {
        const response = await fetch("http://localhost:5000/api/auth/user", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        console.log(data); // Log the parsed JSON response
      };
      getUser();
    }
  }, [isSuccess]);

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

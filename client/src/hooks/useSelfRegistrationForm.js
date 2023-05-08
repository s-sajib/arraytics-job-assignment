import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useRegisterMutation } from "../features/auth/authAPI";
import registrationFormValidator from "../validators/registrationFormValidator";

const useSelfRegistrationForm = () => {
  const [values, setValues] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [validationError, setValidationError] = useState("");
  const [register, { isSuccess, isError, isLoading, error }] =
    useRegisterMutation();

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
      register(values);
    } catch (err) {
      setValidationError(err.message);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      return navigate("/");
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

export default useSelfRegistrationForm;

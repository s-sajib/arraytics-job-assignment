import { useState } from "react";
import { useNavigate } from "react-router";
import { useAddItemMutation } from "../features/items/itemsAPI";
import itemFormValidator from "../validators/itemFormValidator";

const useItemCreateForm = () => {
  const [values, setValues] = useState({ name: "" });
  const [validationError, setValidationError] = useState("");

  const [addItem, { isSuccess, isError, isLoading, error }] =
    useAddItemMutation();

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
      itemFormValidator(values);
      addItem(values);
      return navigate("/items");
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

export default useItemCreateForm;

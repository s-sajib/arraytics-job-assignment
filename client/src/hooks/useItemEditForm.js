import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  useAddItemMutation,
  useEditItemMutation,
} from "../features/items/itemsAPI";
import itemFormValidator from "../validators/itemFormValidator";

const useItemForm = (method) => {
  const [values, setValues] = useState({ name: "" });
  const [validationError, setValidationError] = useState("");

  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [
    addItem,
    {
      isSuccess: itemAddSuccess,
      isError: itemAddIsError,
      isLoading: itemAddLoading,
      error: itemAddError,
    },
  ] = useAddItemMutation();
  const [
    editItem,
    {
      isSuccess: itemEditSuccess,
      isError: itemEditIsError,
      isLoading: itemEditLoading,
      error: itemEditError,
    },
  ] = useEditItemMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (method === "edit") {
      setIsError(itemEditIsError);
      setError(itemEditError);
      setIsLoading(itemEditLoading);
      setIsSuccess(itemEditSuccess);
    } else if (method === "create") {
      setIsError(itemAddIsError);
      setError(itemAddError);
      setIsLoading(itemAddLoading);
      setIsSuccess(itemAddSuccess);
    }
  }, [
    itemAddError,
    itemAddIsError,
    itemAddLoading,
    itemAddSuccess,
    itemEditError,
    itemEditIsError,
    itemEditLoading,
    itemEditSuccess,
    method,
  ]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (method === "edit") {
      try {
        itemFormValidator(values);
        editItem(values);
        return navigate("/items");
      } catch (err) {
        setValidationError(err.message);
      }
    } else if (method === "create") {
      try {
        itemFormValidator(values);
        addItem(values);
        return navigate("/items");
      } catch (err) {
        setValidationError(err.message);
      }
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

export default useItemForm;

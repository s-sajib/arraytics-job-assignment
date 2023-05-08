import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  useEditItemMutation,
  useGetItemQuery,
} from "../features/items/itemsAPI";
import itemFormValidator from "../validators/itemFormValidator";

const useItemEditForm = ({ id }) => {
  const [values, setValues] = useState({ name: "" });
  const [validationError, setValidationError] = useState("");

  const [editItem, { isSuccess, isError, isLoading, error }] =
    useEditItemMutation();

  const {
    data: item,
    isLoading: isLoadingItem,
    isSuccess: isItemFound,
    isError: isItemFindingError,
    error: itemFindingError,
  } = useGetItemQuery(id);

  useEffect(() => {
    if (!isLoadingItem && isItemFound) {
      setValues({
        name: item?.name,
      });
    }
  }, [isLoadingItem, isItemFound, item]);

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
      editItem({ id, data: values });
    } catch (err) {
      setValidationError(err.message);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      return navigate("/items");
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
    isItemFindingError,
    itemFindingError,
    isLoadingItem,
  };
};

export default useItemEditForm;

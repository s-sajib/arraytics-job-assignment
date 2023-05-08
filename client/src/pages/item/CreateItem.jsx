import ItemForm from "../../components/items/ItemForm";
import useItemCreateForm from "../../hooks/useItemCreateForm";

function CreateItem() {
  const {
    values,
    handleChange,
    handleSubmit,
    error,
    isLoading,
    isError,
    validationError,
  } = useItemCreateForm();
  return (
    <ItemForm
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

export default CreateItem;

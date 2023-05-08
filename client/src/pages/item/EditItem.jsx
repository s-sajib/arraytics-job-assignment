import { Alert, Grid } from "@mui/material";
import ItemForm from "../../components/items/ItemForm";
import useItemEditForm from "../../hooks/useItemEditForm";
import { useParams } from "react-router";

function EditItem() {
  const itemID = useParams("id");
  const {
    values,
    handleChange,
    handleSubmit,
    error,
    isLoading,
    isError,
    validationError,
    isItemFindingError,
    itemFindingError,
    isLoadingItem,
  } = useItemEditForm(itemID);
  return (
    <Grid container>
      <Grid item xs={12}>
        {isItemFindingError && (
          <Alert severity="error">
            {itemFindingError?.message ||
              "Something Went Wrong while searching for this Item!"}
          </Alert>
        )}
        <ItemForm
          method="edit"
          values={values}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          error={error}
          isLoading={isLoading}
          isItemLoading={isLoadingItem}
          isError={isError}
          validationError={validationError}
        />
      </Grid>
    </Grid>
  );
}

export default EditItem;

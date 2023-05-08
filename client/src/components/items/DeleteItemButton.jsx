/* eslint-disable react/prop-types */
import { IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import useDeleteItem from "../../hooks/useDeleteItem";

function DeleteItemButton({ id }) {
  const { handleDelete, isError, isLoading } = useDeleteItem(id);

  return (
    <IconButton disabled={isLoading} onClick={() => handleDelete()}>
      <DeleteOutlineIcon sx={{ color: isError && "red" }} />
    </IconButton>
  );
}

export default DeleteItemButton;

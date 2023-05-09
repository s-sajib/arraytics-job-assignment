/* eslint-disable react/prop-types */
import { IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import useDeleteUser from "../../hooks/useDeleteUser";

function DeleteUserButton({ id }) {
  const { handleDelete, isError, isLoading } = useDeleteUser(id);

  return (
    <IconButton disabled={isLoading} onClick={() => handleDelete()}>
      <DeleteOutlineIcon sx={{ color: isError && "red" }} />
    </IconButton>
  );
}

export default DeleteUserButton;

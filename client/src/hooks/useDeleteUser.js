import { useDeleteUserMutation } from "../features/users/usersAPI";

export default function useDeleteUser(id) {
  const [deleteUser, { isError, isLoading }] = useDeleteUserMutation();
  const handleDelete = () => deleteUser(id);

  return { handleDelete, isError, isLoading };
}

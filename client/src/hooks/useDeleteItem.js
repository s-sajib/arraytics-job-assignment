import { useDeleteItemMutation } from "../features/items/itemsAPI";

export default function useDeleteItem(id) {
  const [deleteItem, { isError, isLoading }] = useDeleteItemMutation();
  const handleDelete = () => deleteItem(id);

  return { handleDelete, isError, isLoading };
}

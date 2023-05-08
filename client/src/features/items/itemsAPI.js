import { apiSlice } from "../api/apiSlice";

export const itemsAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getItems: builder.query({
      query: () => "/items",
    }),
    getItem: builder.query({
      query: (id) => `/items/${id}`,
    }),

    addItem: builder.mutation({
      query: (data) => ({
        url: "/items",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(data, { queryFulfilled, dispatch }) {
        try {
          const addResult = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getItems", undefined, (draft) => {
              draft.push(addResult.data);
            })
          );
        } catch (error) {
          console.error("Something Went Wrong!");
          console.error(error);
        }
      },
    }),
    editItem: builder.mutation({
      query: ({ id, data }) => ({
        url: `/items/${id}`,
        method: "PATCH",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const editResult = await queryFulfilled;

          //Update item Cache
          await dispatch(
            apiSlice.util.updateQueryData("getItems", undefined, (draft) => {
              let target = draft.findIndex(
                (item) => Number(item.id) === arg.id
              );
              draft[target] = editResult.data;
            })
          );

          //Update item Cache for edit
          const id = String(arg.id);
          await dispatch(
            apiSlice.util.updateQueryData("getItem", id, (draft) => {
              draft.name = editResult.data.name;
            })
          );
        } catch (error) {
          console.error("Something went Wrong!");
        }
      },
    }),
    deleteItem: builder.mutation({
      query: (id) => ({
        url: `items/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const deleteResult = dispatch(
          apiSlice.util.updateQueryData("getItems", undefined, (draft) => {
            const targetIndex = draft.findIndex(
              (item) => Number(item.id) === arg
            );
            draft.splice(targetIndex, 1);
          })
        );

        try {
          const result = await queryFulfilled;
          if (result.meta.response.status === 200) {
            console.log("Successfully Deleted!");
          }
        } catch (error) {
          deleteResult.undo();
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useGetItemsQuery,
  useGetItemQuery,
  useAddItemMutation,
  useEditItemMutation,
  useDeleteItemMutation,
} = itemsAPI;

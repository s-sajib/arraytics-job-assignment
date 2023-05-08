import { apiSlice } from "../api/apiSlice";

export const usersAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/items",
    }),
    getUser: builder.query({
      query: (id) => `/items/${id}`,
    }),

    addUser: builder.mutation({
      query: (data) => ({
        url: "/items",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(data, { queryFulfilled, dispatch }) {
        try {
          const addResult = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getUsers", undefined, (draft) => {
              draft.push(addResult.data);
            })
          );
        } catch (error) {
          console.error("Something Went Wrong!");
          console.error(error);
        }
      },
    }),
    editUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/items/${id}`,
        method: "PATCH",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const editResult = await queryFulfilled;

          //Update items Cache
          await dispatch(
            apiSlice.util.updateQueryData("getUsers", undefined, (draft) => {
              let target = draft.findIndex((item) => item._id == arg.id);
              draft[target] = editResult.data;
            })
          );

          //Update item Cache for edit
          const id = String(arg.id);
          await dispatch(
            apiSlice.util.updateQueryData("getUser", id, (draft) => {
              draft.name = editResult.data.name;
            })
          );
        } catch (error) {
          console.error("Something went Wrong!");
        }
      },
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `items/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getUsers", undefined, (draft) => {
              const targetIndex = draft.findIndex((item) => item._id == arg);
              draft.splice(targetIndex, 1);
            })
          );
          if (result.meta.response.status === 200) {
            console.log("Successfully Deleted!");
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useAddUserMutation,
  useEditUserMutation,
  useDeleteUserMutation,
} = usersAPI;

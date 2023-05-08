import { apiSlice } from "../api/apiSlice";

export const usersAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
    }),
    getUser: builder.query({
      query: (id) => `/users/${id}`,
    }),

    addUser: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
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
        url: `/users/${id}`,
        method: "PATCH",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const editResult = await queryFulfilled;

          //Update items Cache
          await dispatch(
            apiSlice.util.updateQueryData("getUsers", undefined, (draft) => {
              let target = draft.findIndex((user) => user._id == arg.id);
              draft[target] = editResult.data;
            })
          );

          //Update item Cache for edit
          const id = String(arg.id);
          await dispatch(
            apiSlice.util.updateQueryData("getUser", id, (draft) => {
              draft.name = editResult.data.name;
              draft.email = editResult.data.email;
            })
          );
        } catch (error) {
          console.error("Something went Wrong!");
        }
      },
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getUsers", undefined, (draft) => {
              const targetIndex = draft.findIndex((user) => user._id == arg);
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

import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authAPI = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "auth/login",
        method: "POST",
        body: { email, password },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              refreshToken: result?.data?.refreshToken,
              user: result?.data?.user,
            })
          );
        } catch {
          console.error("Something went wrong!");
        }
      },
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "auth/self-register",
        method: "POST",
        body: data,
      }),
    }),
    userInformation: builder.query({
      query: (data) => ({
        url: "auth/user",
        method: "GET",
        body: data,
      }),
      providesTags: ["userInformation"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedIn(result.data));
        } catch {
          console.error("Something went wrong!");
        }
      },
    }),
    logout: builder.query({
      query: (data) => ({
        url: "auth/logout",
        method: "GET",
        body: data,
      }),
      keepUnusedDataFor: 0,
      invalidatesTags: ["userInformation"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            userLoggedIn({
              refreshToken: null,
              user: null,
            })
          );
        } catch {
          console.error("Something went wrong!");
        }
      },
    }),
    refreshAccessToken: builder.mutation({
      query: (data) => ({
        url: "auth/refresh",
        method: "POST",
        body: data,
      }),
      keepUnusedDataFor: 14 * 60, //14 minutes
    }),
  }),
});
export const {
  useLoginMutation,
  useRegisterMutation,
  useUserInformationQuery,
  useLogoutQuery,
  useRefreshAccessTokenMutation,
} = authAPI;

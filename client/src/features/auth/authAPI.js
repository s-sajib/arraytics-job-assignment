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
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              user: result?.data,
            })
          );
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
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(userLoggedIn({}));
        } catch {
          console.error("Something went wrong!");
        }
      },
    }),
  }),
});
export const {
  useLoginMutation,
  useRegisterMutation,
  useUserInformationQuery,
  useLogoutQuery,
} = authAPI;

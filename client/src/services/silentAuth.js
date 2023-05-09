import { store } from "../app/store";
import { apiSlice } from "../features/api/apiSlice";

async function sendRefreshTokenRequest() {
  const refreshToken = store.getState().auth.refreshToken;

  try {
    const { data: responseData } = await apiSlice.util.fetchBaseQuery(
      "/auth/refresh",
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return responseData;
  } catch (error) {
    console.error("Failed to send retry request", error);
    throw error;
  }
}

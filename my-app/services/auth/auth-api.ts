import { baseApi } from "../base-api";
import { USER } from "../tags";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credential: any) => ({
        url: "auth/login",
        method: "POST",
        body: credential,
      }),
      invalidatesTags: [USER],
    }),
    logout: builder.mutation({
      query: (user: { id: string }) => ({
        url: "auth/logout",
        method: "POST",
        body: user,
      }),
      invalidatesTags: [USER],
    }),
    refresh: builder.query({
      query: ({ body }: any) => ({
        url: "auth/refresh-token",
        method: "PUT",
        body,
      }),
      providesTags: [USER],
    }),
    authMe: builder.query({
      query: () => ({
        url: "me",
        method: "GET",
      }),
      providesTags: [USER],
    }),
  }),
});

export const { useLoginMutation, useLazyRefreshQuery, useLazyAuthMeQuery } =
  authApi;

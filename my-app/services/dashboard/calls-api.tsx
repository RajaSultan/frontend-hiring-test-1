import { baseApi } from "../base-api";
import { CALL } from "../tags";

const CallsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCalls: builder.query({
      query: (payload) => ({
        url: "calls",
        method: "GET",
        body: payload.body,
        params: payload.params,
      }),
      providesTags: [CALL],
    }),
    addNote: builder.mutation({
      query: (payload) => ({
        url: `calls/${payload.params.callId}/note`,
        method: "POST",
        body: payload.body,
      }),
      invalidatesTags: [CALL],
    }),
  }),
});
export const { useGetAllCallsQuery, useAddNoteMutation } = CallsApi;

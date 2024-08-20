import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const adminsApi = createApi({
  reducerPath: 'adminsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/v1' }),
  tagTypes: ['Admins'],
  endpoints: (builder) => ({
    fetchAdmins: builder.query({
      query: () => '/admins',
      providesTags: ['Admins'],
    }),
  }),
});

export const { useFetchAdminsQuery } = adminsApi;

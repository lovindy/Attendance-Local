// baseApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/v1' }),
  tagTypes: ['Users', 'Teachers'], // Add all possible tag types here
  endpoints: () => ({}), // We’ll extend this in other API slices
});

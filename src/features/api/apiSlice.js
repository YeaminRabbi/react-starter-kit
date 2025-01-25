import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://admin.blog.techstringit.com/api/v1" }),
  endpoints: (builder) => ({
    
    // Endpoint for fetching homepage
    getHome: builder.query({
      query: () => "/",
      transformResponse: (response) => response.data,
    }),

   
  }),
});

export const { useGetHomeQuery } = apiSlice;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books",
  }),
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/",
    }),
  }),
});

export const { useGetBooksQuery } = booksApi;

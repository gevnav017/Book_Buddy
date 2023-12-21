import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  tagTypes: ["userBooks"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api",
  }),
  endpoints: (builder) => ({
    checkoutBook: builder.mutation({
      invalidatesTags: ["userBooks"],
      query: (book) => ({
        url: `/books/${book.id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    }),
    returnBook: builder.mutation({
      invalidatesTags: ["userBooks"],
      query: (book) => ({
        url: `/books/${book.id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    }),
    getUser: builder.query({
      query: (token) => ({
        url: "/users/me",
        headers: {
          Authorization: `Bearer ${token || localStorage.getItem("token")}`,
        },
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useReturnBookMutation,
  useCheckoutBookMutation,
} = userApi;

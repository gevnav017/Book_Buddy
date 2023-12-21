/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */

import React from "react";
import { useSelector } from "react-redux";

// how to import useGetBooksQuery?
import {
  useGetBooksQuery,
  useGetUserQuery,
  useCheckoutBookMutation,
} from "../store";

export const Books = () => {
  const { data, isLoading } = useGetBooksQuery();

  const [checkoutBook] = useCheckoutBookMutation();

  const { data: user, refetch } = useGetUserQuery(
    localStorage.getItem("token"),
    {
      skip: !localStorage.getItem("token"),
    }
  );

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  const books = data.books;

  const checkout = async (book) => {
    await checkoutBook(book);
    await refetch();
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "6fr 6fr 6fr",
        gridColumnGap: 20,
        gridRowGap: 20,
        justifyItems: "center",
        alignItems: "stretch",
      }}
    >
      {books.map((book) => (
        <div
          key={book.id}
          style={{
            width: 300,
            border: "1px solid black",
            borderRadius: 8,
            marginBottom: 16,
            padding: 8,
            boxShadow: "10px 10px 10px gray"
          }}
        >
          <p style={{ fontSize: 20 }}>{book.title}</p>
          <img
            style={{ width: "100%" }}
            src={book.coverimage}
            alt={`${book.title} image`}
          />
          {user && <button onClick={() => checkout(book)} style={{padding: 8, backgroundColor: "#2B35AF", color: "white", marginTop: 16}}>Checkout</button>}
        </div>
      ))}
    </div>
  );
};

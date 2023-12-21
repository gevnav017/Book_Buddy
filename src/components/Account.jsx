import React from "react";

import { useGetUserQuery, useCheckoutBookMutation } from "../store";

export const Account = () => {
  const { data: user, refetch } = useGetUserQuery(
    localStorage.getItem("token"),
    {
      skip: !localStorage.getItem("token"),
    }
  );

  const [returnBookApi] = useCheckoutBookMutation();

  const returnBook = async (book) => {
    await returnBookApi(book);
    await refetch();
  };

  return (
    <>
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
        {user.books.map((book) => (
          <div
            key={book.id}
            style={{
              width: 300,
              border: "1px solid black",
              borderRadius: 8,
              marginBottom: 16,
              padding: 8,
              boxShadow: "10px 10px 10px gray",
            }}
          >
            <p style={{ fontSize: 20 }}>{book.title}</p>
            <img
              style={{ width: "100%" }}
              src={book.coverimage}
              alt={`${book.title} image`}
            />
            {user && (
              <button
                onClick={() => returnBook(book)}
                style={{
                  padding: 8,
                  backgroundColor: "#2B35AF",
                  color: "white",
                  marginTop: 16,
                }}
              >
                Return
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

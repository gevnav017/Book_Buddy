import { useState, useEffect } from "react";
import axios from "axios";
import bookLogo from "./assets/books.png";
import { useSelector, useDispatch } from "react-redux";

import { Routes, Route, Link, useNavigate } from "react-router-dom";

import { useGetUserQuery } from "./store";
import { Books } from "./components/Books";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Account } from "./components/Account";

const Navbar = () => {
  const { data: user } = useGetUserQuery(localStorage.getItem("token"), {
    skip: !localStorage.getItem("token"),
  });

  const loginNavbar = (
    <ul
      style={{
        display: "flex",
        listStyleType: "none",
      }}
    >
      <li style={{ marginRight: 8 }}>
        <Link style={{ color: "black", textDecoration: "none", marginRight: 10 }} to="/login">
          Login
        </Link>
      </li>
      <li>
        <Link style={{ color: "black", textDecoration: "none", marginRight: 10 }} to="/register">
          Register
        </Link>
      </li>
    </ul>
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");

    navigate("/");
  };

  const authenticatedNavbar = (
    <ul
      style={{
        display: "flex",
        listStyleType: "none",
        alignItems: "center",
      }}
    >
      <li style={{ marginRight: 8 }}>
        <Link style={{ color: "black", textDecoration: "none", marginRight: 10 }} to="/account">
          Account
        </Link>
      </li>
      <li>
        <p style={{ cursor: "pointer", marginRight: 10 }} onClick={logout}>
          Logout
        </p>
      </li>
    </ul>
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
        backgroundColor: "lightgray",
      }}
    >
      <h1>
        <Link to="/" style={{ color: "black", textDecoration: "none" }}>
          <img id="logo-image" src={bookLogo} />
          Library App
        </Link>
      </h1>

      {user ? authenticatedNavbar : loginNavbar}
    </div>
  );
};

const RedirectToHome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, []);

  return null;
};

function App() {
  const dispatch = useDispatch();

  const { data: user } = useGetUserQuery(localStorage.getItem("token"), {
    skip: !localStorage.getItem("token"),
  });

  return (
    <>
      <Navbar />

      <Routes>
        {user ? (
          <>
            <Route path="/account" element={<Account />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />
          </>
        )}

        <Route path="/" element={<Books />} />

        <Route path="/books" element={<Books />} />

        <Route path="/books/:id" element={<h1>book details</h1>} />

        <Route path="*" element={<RedirectToHome />} />
      </Routes>
    </>
  );
}

export default App;

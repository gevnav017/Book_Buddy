import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useGetUserQuery } from "../store";
import { AuthForm } from "./AuthForm";

const loginRoute =
  "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login";

const getUserRoute =
  "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (inputs) => {
    // 1. make the axios call to register user
    const {
      data: { token },
    } = await axios.post(loginRoute, inputs);

    // 2. save token in local storage
    window.localStorage.setItem("token", token);

    // 3. use the token to get the user's info, and dispatch(setUser(the user info))
    const response = await axios.get(getUserRoute, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // dispatch(setUser(response.data));
    navigate("/account");
  };

  return <AuthForm onSubmit={onSubmit} isLoginPage />;
};

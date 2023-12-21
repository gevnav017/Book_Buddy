import React, { useState } from "react";

export const AuthForm = ({ onSubmit, isLoginPage }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const onChange = (event) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    onSubmit(inputs);
  };

  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <form
        onSubmit={onFormSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "50%",
          gap: 16,
        }}
      >
        <h3 style={{ textAlign: "center" }}>Login</h3>
        <input value={inputs.email} onChange={onChange} name="email" type="text" placeholder="email" />
        <input
          value={inputs.password}
          onChange={onChange}
          name="password"
          type="password"
          placeholder="password"
        />

        <button>{isLoginPage ? "Login" : "Register"}</button>
      </form>
    </div>
  );
};

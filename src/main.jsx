import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

// with this import, there are two possible places where it finds the import

// ./store/index.js <-- looks in the folder called store, then looked in the index.js file and grabs the default export

// store.js <- looks in store.js file, grabs default export (in our case, this does not exist, so that means we take the first option)
import store from "./store";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

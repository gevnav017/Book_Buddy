import { configureStore } from "@reduxjs/toolkit";

import { booksApi } from "./books";
import { userApi } from "./user";

const store = configureStore({
  reducer: {
    booksApi: booksApi.reducer,
    userApi: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware, userApi.middleware),
});

export default store;

export * from "./books";
export * from "./user";

window.store = store;

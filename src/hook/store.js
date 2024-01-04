import counterReducer from "./slice";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

export default configureStore({
  reducer: {
    store: counterReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(getDefaultMiddleware()) 
});
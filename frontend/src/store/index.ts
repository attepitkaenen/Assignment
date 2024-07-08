import { configureStore } from "@reduxjs/toolkit";
import { restaurantApi } from "./api/restaurantApi";


export const makeStore = () => {
  return configureStore({
    reducer: {
      // Add the API reducer
      [restaurantApi.reducerPath]: restaurantApi.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling, and other features of RTK Query
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(restaurantApi.middleware),
  });
};

// Infer the return type of `makeStore`
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];
  
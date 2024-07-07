import { configureStore } from "@reduxjs/toolkit";
import restaurantReducer from "./slices/restaurantSlice";

export const makeStore = () => {
    return configureStore({
      reducer: restaurantReducer,
    });
};

// if you add new slices use combineSlices(slice1, slice2) instead of restaurantSlice
const rootReducer = restaurantReducer;
export type RootState = ReturnType<typeof rootReducer>;
// Infer the return type of `makeStore`
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];
  
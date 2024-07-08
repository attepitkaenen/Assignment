import { useDispatch, useSelector, useStore } from "react-redux";
import { AppDispatch, AppStore } from ".";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<AppStore>();

import {
  useDispatch as originalUseDispatch,
  useSelector as originalUseSelector
} from "react-redux";

export const useSelector = (state: any) => originalUseSelector(state);
export const useDispatch = () => originalUseDispatch();

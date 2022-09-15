import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import { authReducer } from "./reducer";

const reducers = combineReducers({
    auth: authReducer,
   
  })

  export type RootState = ReturnType<typeof reducers>
  export type AppDispatch = typeof store.dispatch

  export const useAppDispatch: () => AppDispatch = useDispatch
  export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

  export const store = configureStore({
    reducer: reducers
  })
const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
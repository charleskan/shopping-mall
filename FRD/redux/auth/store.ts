import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { authReducer } from "./reducer";

export const store = configureStore({
    reducer:() =>{
        return{
            auth: authReducer,

        }

    }
})

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
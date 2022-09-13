import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

export const store = configureStore({
    reducer:() =>{
        return{
        

        }

    }
})

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);
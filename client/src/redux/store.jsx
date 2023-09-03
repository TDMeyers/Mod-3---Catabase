import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import breedsReducer from "./breedsSlice"

export const store = configureStore({
    reducer: {
        user: userReducer,
        breeds: breedsReducer,
    },
});
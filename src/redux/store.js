import { configureStore } from "@reduxjs/toolkit";
import slice from "./slice";


const store = configureStore({
    reducer:{
        Product:slice,
        Supplier:slice
    }
});

export default store;
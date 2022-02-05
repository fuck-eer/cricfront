import { configureStore } from "@reduxjs/toolkit";
import playerModalSlice from "./playerModalSlice";
import playerSlice from "./playerSlice";
const store = configureStore({ reducer: { playerModalSlice, playerSlice } });

export default store;

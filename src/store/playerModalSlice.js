import { createSlice } from "@reduxjs/toolkit";
const initialState = {
	isModalOpen: false,
	mode: "add",
};

const playerModalSlice = createSlice({
	name: "playerModalSlice",
	initialState,
	reducers: {
		toggleModal(state) {
			state.isModalOpen = state.isModalOpen ? false : true;
		},
		toggleMode(state, action) {
			state.mode = action.payload;
		},
	},
});

export const playerModalActions = playerModalSlice.actions;
export default playerModalSlice.reducer;

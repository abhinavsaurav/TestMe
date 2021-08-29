import { createSlice } from "@reduxjs/toolkit";

const initialState = { cartIsVisible: false };

const uiSlice = createSlice({
	name: "ui",
	initialState,
	reducers: {
		toggleCartVisibility(state) {
			state.cartIsVisible = !state.cartIsVisible;
		},
	},
});

export const uiAction = uiSlice.actions;

export default uiSlice;

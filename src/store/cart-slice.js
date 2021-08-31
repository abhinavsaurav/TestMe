import { createSlice } from "@reduxjs/toolkit";

import { uiAction } from "./ui-slice";

const initialState = {
	items: [],
	totalQuantity: 0,
	changed: false, // we don't change it when we replace the cart but we do change it when we add or remove item from the cart
	// totalPrice
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		replaceCart(state, action) {
			state.totalQuantity = action.payload.totalQuantity;
			state.items = action.payload.items;
		},
		addItemToCart(state, action) {
			const newItem = action.payload;
			const existingItemCheck = state.items.find(
				(item) => item.id === newItem.id
			);
			state.totalQuantity++;
			state.changed = true;

			if (!existingItemCheck) {
				state.items.push({
					id: newItem.id,
					price: newItem.price,
					quantity: 1,
					totalPrice: newItem.price,
					name: newItem.title,
				});
			} else {
				existingItemCheck.quantity++;
				existingItemCheck.totalPrice += newItem.price;
			}
		},

		removeItemFromCart(state, action) {
			const id = action.payload;
			const existingItem = state.items.find((item) => item.id === id);
			state.totalQuantity--;
			state.changed = true;

			if (existingItem.quantity === 1) {
				state.items = state.items.filter((item) => item.id !== id);
			} else {
				existingItem.quantity--;
				existingItem.totalPrice -= existingItem.price;
			}
		},
	},
});

export const cartActions = cartSlice.actions;

export default cartSlice;

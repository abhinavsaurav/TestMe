// goal of this component of this is to manage the cart context data and provide the data to all the component that wants
// to access it and no other component needs to deal with it
import { useReducer } from "react";
import CartContext from "./cart-context";

/**
 * @description Just to be clear below is being used by the useReducer ( managing state for cart )
 *
 */
const defaultCartState = {
	items: [],
	totalAmount: 0,
};

/**
 * @description This function is basically managing the state its attached to the useReducer( first param)
 * 				and basically we are making use of the default cart state to update things
 * 				using the @function dispatchCartAction which provides us to do stuff based on some action performed
 * 				or the function linked to the Context is executed
 * @extraInfo   we are defining it outside as it won't need anything from the component and any surrounding data  of it and
 *				it shouldn't be recreated all the time
 *
 *
 * @param {*} state last state snapshot given by react
 * @param {*} action should be dispatched by us
 * @returns udpated state or the new state if nothing is there beforehand
 */

const cartReducer = (state, action) => {
	if (action.type === "ADD") {
		// concat returns a new array

		const updatedTotalAmount =
			state.totalAmount + action.item.price * action.item.amount;

		// findIndex is a built in method in JS
		const existingCartItemIndex = state.items.findIndex(
			(item) => item.id === action.item.id
		);
		const existingCartItem = state.items[existingCartItemIndex];
		let updatedItems;

		if (existingCartItem) {
			const updatedItem = {
				...existingCartItem,
				amount: existingCartItem.amount + action.item.amount,
			};
			// console.log(updatedItem);
			updatedItems = [...state.items];
			updatedItems[existingCartItemIndex] = updatedItem;
		} else {
			// console.log(state.items);
			updatedItems = state.items.concat(action.item);
		}

		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		};
	}

	if (action.type === "REMOVE") {
		// taking out index of the item we selected to remove
		const existingCartItemIndex = state.items.findIndex(
			(item) => item.id === action.id
		);

		// getting the items state of the existing Item and then udpating the total amount
		const existingItem = state.items[existingCartItemIndex];
		const updatedTotalAmount = state.totalAmount - existingItem.price;
		let updatedItems;

		if (existingItem.amount === 1) {
			// if the filter condition is false the item doesn't get added to the array
			updatedItems = state.items.filter((item) => item.id !== action.id);
		} else {
			const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
			// console.log(...state.items);
			updatedItems = [...state.items]; // creating a new array from existing items
			updatedItems[existingCartItemIndex] = updatedItem; // udpating the index for that item
		}

		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount,
		};
	}

	return defaultCartState;
};

const CartProvider = (props) => {
	// we point at the cartReducer function and it will be executed by react for us then and give it default value
	const [cartState, dispatchCartAction] = useReducer(
		cartReducer,
		defaultCartState
	);

	const addItemToCartHandler = (item) => {
		dispatchCartAction({ type: "ADD", item: item });
	};

	const removeItemFromCartHandler = (id) => {
		dispatchCartAction({ type: "REMOVE", id: id });
	};

	/**
	 *
	 * // this is the value that will be updated overtime
	 * This is the default linkage to the context part and will be udpated based on the action
	 * state and the different function attached
	 *
	 */

	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCartHandler,
		removeItem: removeItemFromCartHandler,
	};

	return (
		<CartContext.Provider value={cartContext}>
			{props.children}
		</CartContext.Provider>
	);
};

export default CartProvider;

// goal of this component of this is to manage the cart context data and provide the data to all the component that wants
// to access it and no other component needs to deal with it
import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
	items: [],
	totalAmount: 0,
};

// we are defining it outside as it won't need anything from the component and any surrounding data  of it and
// it shouldn't be recreated all the time
// whenever

// state is the last state snapshot given by react
// action should be dispatched by us
const cartReducer = (state, action) => {
	if (action.type === "ADD") {
		// concat returns a new array
		const updatedItems = state.items.concat(action.item);
		const updatedTotalAmount =
			state.totalAmount + action.item.price * action.item.amount;

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

	// this is the value that will be updated overtime
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

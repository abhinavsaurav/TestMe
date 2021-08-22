import { useContext } from "react";
import CartItem from "./CartItem";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";

// model to be used to display that
const Cart = (props) => {
	const cartCtx = useContext(CartContext);

	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
	const hasItems = cartCtx.items.length > 0;

	const cartItemRemoveHandler = (id) => {};

	const cartItemAddHandler = (item) => {};

	const cartItems = (
		<ul className={classes["cart-items"]}>
			{cartCtx.items.map((item) => (
				<CartItem
					key={item.id}
					name={item.name}
					amount={item.price}
					price={item.price}
					onRemove={cartItemRemoveHandler.bind(null, item.id)}
					onAdd={cartItemAddHandler.bind(null, item)} // bind makes sure that the handler do receive the item . Read more in detail below
				/>
				// This ensures that the idea of the to be added
				// or removed item is passed here to remove handler
				// and on end you should also call bind
				// and bind null and pass the overall item.
				// You'll learn that bind pre-configure
				// as a function for future execution
				// and basically allows you to pre-configure the argument
				// that function will receive when it's being executed.
				// And that's something we need here to ensure
				// that both these functions do receive the ID
				// or the item respectively.
			))}
		</ul>
	);

	return (
		<Modal onClose={props.onClose}>
			{cartItems}
			<div className={classes.total}>
				<span>Total item</span>
				<span>{totalAmount}</span>
			</div>
			<div className={classes.actions}>
				<button className={classes["button--alt"]} onClick={props.onClose}>
					close
				</button>
				{hasItems && <button className={classes.button}>Order</button>}
			</div>
		</Modal>
	);
};

export default Cart;

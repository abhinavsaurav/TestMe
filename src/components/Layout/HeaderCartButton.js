import { useContext, useEffect, useState } from "react";
import CardContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderIconButton = (props) => {
	const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
	const cartCtx = useContext(CardContext);

	// we shouldn't use length here because there can be different no of quantities so cartItems can vary
	const noOfCartItems = cartCtx.items.reduce((curNumber, item) => {
		return curNumber + item.amount;
	}, 0);

	const { items } = cartCtx;
	const btnClasses = `${classes.button} ${
		btnIsHighlighted ? classes.bump : ""
	} `;

	useEffect(() => {
		if (items.length === 0) {
			return;
		}
		setBtnIsHighlighted(true);

		// removing the class after 300 ms
		const timer = setTimeout(() => {
			setBtnIsHighlighted(false);
		}, 300);

		return () => {
			clearTimeout(timer);
		};
	}, [items]);

	return (
		<button className={btnClasses} onClick={props.onClick}>
			<span className={classes.icon}>
				<CartIcon />
			</span>
			<span>Your Cart</span>
			<span className={classes.badge}>{noOfCartItems}</span>
		</button>
	);
};

export default HeaderIconButton;

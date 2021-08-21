import { useContext } from "react";
import CardContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderIconButton = (props) => {
	const cartCtx = useContext(CardContext);

	// we shouldn't use length here because there can be different no of quantities so cartItems can vary
	const noOfCartItems = cartCtx.items.reduce((curNumber, item) => {
		return curNumber + item.amount;
	}, 0);

	return (
		<button className={classes.button} onClick={props.onClick}>
			<span className={classes.icon}>
				<CartIcon />
			</span>
			<span>Your Cart</span>
			<span className={classes.badge}>{noOfCartItems}</span>
		</button>
	);
};

export default HeaderIconButton;

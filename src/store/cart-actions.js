import { uiAction } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
	return async (dispatch) => {
		const fetchData = async () => {
			const response = await fetch("http://localhost:8080/mocklink");
			if (!response.ok) {
				throw new Error("Sending cart data failed");
			}

			const data = await response.json();
			// console.log(response.body);
			// console.log(data.data);
			return data;
		};
		try {
			const cartData = await fetchData();
			dispatch(
				cartActions.replaceCart({
					// to avoid .
					items: cartData.items || [],
					totalQuantity: cartData.totalQuantity || 0,
				})
			);
		} catch (err) {
			dispatch(
				uiAction.showNotification({
					status: "error",
					title: "Error",
					message: "Request to receive cart data failed",
				})
			);
		}
	};
};

export const sendCartData = (cart) => {
	// return { tyep: '', payload: ...}
	/**
	 * @IMP only when using reduxjs/toolkit it accepts another function as argument and 
	 		 @auto_supplies @dispatch method as an argument to the function while returning so we can make use of it
	 * 
	 */
	return async (dispatch) => {
		dispatch(
			uiAction.showNotification({
				status: "pending",
				title: "sending",
				message: "Sending cart details",
			})
		);

		const sendRequest = async () => {
			const response = await fetch("http://localhost:8080/mocklink", {
				method: "PUT",
				headers: { "Content-Type": "application/json" }, // this line is imp for making req to mock server
				body: JSON.stringify({
					items: cart.items,
					totalQuantity: cart.totalQuantity,
				}),
			});
			// console.log(cart);

			if (!response.ok) {
				throw new Error("Sending cart data failed");
			}
		};
		try {
			await sendRequest();

			dispatch(
				uiAction.showNotification({
					status: "success",
					title: "Success",
					message: "Sent cart data successfully!",
				})
			);
		} catch (error) {
			dispatch(
				uiAction.showNotification({
					status: "error",
					title: "Error",
					message: "Sending cart data failed",
				})
			);
		}
	};
};

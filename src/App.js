import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { uiAction } from "./store/ui-slice";
import Notification from "./components/UI/Notification";

let isIntial = true;

function App() {
	const cartIsVisible = useSelector((state) => state.ui.cartIsVisible);
	const dispatch = useDispatch();
	// we are declaring below to make the update to our backend whenever the value for it changes
	// also useSelector sets up a subscription to redux so whenever the component function does change
	// we get the latest state
	const cart = useSelector((state) => state.cart);
	const notification = useSelector((state) => state.ui.notification);

	useEffect(() => {
		const sendCartData = async () => {
			dispatch(
				uiAction.showNotification({
					status: "pending",
					title: "sending",
					message: "Sending cart details",
				})
			);
			const response = await fetch("http://localhost:8080/mocklink", {
				method: "PUT",
				headers: { "Content-Type": "application/json" }, // this line is imp for making req to mock server
				body: JSON.stringify(cart),
			});
			// console.log(cart);

			if (!response.ok) {
				dispatch(
					uiAction.showNotification({
						status: "error",
						title: "Error",
						message: "Sending cart data failed",
					})
				);
				throw new Error("Sending cart data failed");
			}

			dispatch(
				uiAction.showNotification({
					status: "success",
					title: "Success",
					message: "Sent cart data successfully!",
				})
			);

			const responseData = await response.json();
		};

		if (isIntial) {
			isIntial = false;
			return;
		}

		sendCartData().catch((error) => {
			dispatch(
				uiAction.showNotification({
					status: "error",
					title: "Error",
					message: "Sending cart data failed",
				})
			);
		});
	}, [cart, dispatch]);

	return (
		<Fragment>
			{notification && (
				<Notification
					status={notification.status}
					title={notification.title}
					message={notification.message}
				/>
			)}
			<Layout>
				{cartIsVisible && <Cart />}
				<Products />
			</Layout>
		</Fragment>
	);
}

export default App;

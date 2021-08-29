import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const Products = (props) => {
	const DUMMY_PRODUCTS = [
		{ id: "p1", price: 6, title: "my first book", description: "crazy" },
		{ id: "p2", price: 15, title: "my 2nd book", description: "crazy2" },
	];

	return (
		<section className={classes.products}>
			<h2>Buy your favorite products</h2>
			<ul>
				{DUMMY_PRODUCTS.map((product) => {
					return (
						<ProductItem
							key={product.id}
							id={product.id}
							title={product.title}
							price={product.price}
							description={product.description}
						/>
					);
				})}
			</ul>
		</section>
	);
};

export default Products;

import Featured from "../components/ecommerce/Featured";
import Header from "../components/ecommerce/Header";
import { Product } from "../models/Product";
import { mongooseConnect } from "../lib/mongoose";
import NewProducts from "../components/ecommerce/NewProducts";

export default async function Home() {
	const { featuredProduct, newProducts } = await getProductsData();

	return (
		<div>
			<Header />
			<Featured product={featuredProduct} />
			<NewProducts products={newProducts} />
		</div>
	);
}

async function getProductsData() {
	const featuredProductId = "64769d72a2aff27a4f807255";
	await mongooseConnect();
	const featuredProduct = await Product.findById(featuredProductId);
	const newProducts = await Product.find({}, null, {
		sort: { _id: -1 },
		limit: 10,
	});

	return {
		featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
		newProducts: JSON.parse(JSON.stringify(newProducts)),
	};
}

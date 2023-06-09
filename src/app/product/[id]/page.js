// "use client";

import Header from "../../../components/ecommerce/Header";
import SingleProduct from "./SingleProduct";
import getProductData from "../../../action/getProductData";

export default async function ProductPage(params) {
	const product = await getProductData(params);
	// console.log(product);

	return (
		<>
			<Header />
			<SingleProduct product={product} />
		</>
	);
}

import { Product } from "../models/Product";
import { mongooseConnect } from "../lib/mongoose";

export default async function getProductData(params) {
	await mongooseConnect();
	const { id } = params.params;
	const product = await Product.findById(id);
	return {
		props: {
			product: JSON.parse(JSON.stringify(product)),
		},
	};
}

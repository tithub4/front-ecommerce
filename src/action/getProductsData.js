import { mongooseConnect } from "../lib/mongoose";
import { Product } from "../models/Product";

export default async function getProductsData() {
	await mongooseConnect();
	const products = await Product.find({}, null, { sort: { _id: -1 } });

	return {
		products: JSON.parse(JSON.stringify(products)),
	};
}

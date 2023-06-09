import getProductsData from "@/action/getProductsData";

const URL = process.env.NEXT_PUBLIC_URL;

export default async function sitemap() {
	const { products } = await getProductsData();
	const temp = products ?? []; // If temp is undefined, use an empty array as the default value

	const mappedProducts = temp.map(({ _id, updatedAt }) => ({
		url: `${URL}product/${_id}`,
		lastModified: updatedAt,
	}));

	const routes = ["", "cart", "products"].map((route) => ({
		url: `${URL}${route}`,
		lastModified: new Date().toISOString(),
	}));
	return [...routes, ...mappedProducts];
}

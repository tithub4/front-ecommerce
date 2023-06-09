import Header from "../../components/ecommerce/Header";
import Center from "../../components/ecommerce/Center";
import ProductsGrid from "../../components/ecommerce/ProductsGrid";
import Title from "../../components/ecommerce/Title";
import getProductsData from "@/action/getProductsData";

export default async function ProductsPage() {
	const { products } = await getProductsData();

	return (
		<>
			<Header />
			<Center>
				<Title>All products</Title>
				<ProductsGrid products={products} />
			</Center>
		</>
	);
}

"use client";

import Center from "../../../components/ecommerce/Center";
import Title from "../../../components/ecommerce/Title";
import styled from "styled-components";
import WhiteBox from "../../../components/ecommerce/WhiteBox";
import ProductImages from "../../../components/ecommerce/ProductImages";
import Button from "../../../components/ecommerce/Button";
import CartIcon from "../../../components/icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "../../../components/ecommerce/CartContext";

const ColWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	@media screen and (min-width: 768px) {
		grid-template-columns: 0.8fr 1.2fr;
	}
	gap: 40px;
	margin: 40px 0;
`;
const PriceRow = styled.div`
	display: flex;
	gap: 20px;
	align-items: center;
`;
const Price = styled.span`
	font-size: 1.4rem;
`;

const SingleProduct = ({ product }) => {
	const { addProduct } = useContext(CartContext);
	const prod = product.props.product;

	return (
		<Center>
			<ColWrapper>
				<WhiteBox>
					<ProductImages images={prod.images} />
				</WhiteBox>
				<div>
					<Title>{prod.title}</Title>
					<p>{prod.description}</p>

					<PriceRow>
						<div>
							<Price>{prod.price}€</Price>
						</div>
						<div>
							<Button primary onClick={() => addProduct(prod._id)}>
								<CartIcon />
								Ajouter au panier
							</Button>
						</div>
					</PriceRow>
				</div>
			</ColWrapper>
		</Center>
	);
};

export default SingleProduct;

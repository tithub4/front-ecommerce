"use client";

import styled from "styled-components";
import Button from "./Button";
import CartIcon from "../icons/CartIcon";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import Image from "next/image";

const ProductWrapper = styled.div``;

const WhiteBox = styled(Link)`
	position: relative;
	background-color: #fff;
	padding: 15px;
	height: 120px;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 10px;
	img {
		max-width: 100%;
		max-height: 110px;
	}
`;

const Title = styled(Link)`
	font-weight: normal;
	font-size: 0.9rem;
	color: inherit;
	text-align: center;
	text-decoration: none;
	margin: 0;
`;

const ProductInfoBox = styled.div`
	margin-top: 5px;
`;

const PriceRow = styled.div`
	display: block;
	@media screen and (min-width: 768px) {
		display: flex;
		gap: 5px;
	}
	align-items: center;
	justify-content: space-between;
	margin-top: 2px;
`;

const Price = styled.div`
	font-size: 1rem;
	font-weight: 400;
	text-align: right;
	color: green;
	@media screen and (min-width: 768px) {
		font-size: 1.2rem;
		font-weight: 600;
		text-align: left;
	}
`;

export default function ProductBox({ _id, title, description, price, images }) {
	const { addProduct } = useContext(CartContext);
	const url = "/product/" + _id;
	return (
		<ProductWrapper>
			<WhiteBox href={url}>
				<div>
					<img src={images?.[0]} alt={title} />
				</div>
			</WhiteBox>
			<ProductInfoBox>
				<Title href={url}>{title}</Title>
				<PriceRow>
					<Price>{price}€</Price>
					<Button block onClick={() => addProduct(_id)} primary outline>
						panier
					</Button>
				</PriceRow>
			</ProductInfoBox>
		</ProductWrapper>
	);
}

"use client";

import Header from "../../components/ecommerce/Header";
import styled from "styled-components";
import Center from "../../components/ecommerce/Center";
import Button from "../../components/ecommerce/Button";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../components/ecommerce/CartContext";
import axios from "axios";
import Table from "../../components/ecommerce/Table";
import Input from "../../components/ecommerce/Input";
import Head from "next/head";
import Image from "next/image";

const ColumnsWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	@media screen and (min-width: 768px) {
		grid-template-columns: 1.2fr 0.8fr;
	}
	gap: 40px;
	margin-top: 40px;
`;

const Box = styled.div`
	background-color: #fff;
	border-radius: 10px;
	padding: 30px;
`;

const ProductInfoCell = styled.td`
	padding: 10px 0;
`;

const ProductImageBox = styled.div`
	width: 70px;
	height: 100px;
	padding: 2px;
	border: 1px solid rgba(0, 0, 0, 0.1);
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 10px;
	img {
		max-width: 60px;
		max-height: 60px;
	}
	@media screen and (min-width: 768px) {
		padding: 10px;
		width: 100px;
		height: 100px;
		img {
			max-width: 80px;
			max-height: 80px;
		}
	}
`;

const QuantityLabel = styled.span`
	padding: 0 15px;
	display: block;
	@media screen and (min-width: 768px) {
		display: inline-block;
		padding: 0 10px;
	}
`;

const CityHolder = styled.div`
	display: flex;
	gap: 5px;
`;
export default function CartPage() {
	const { cartProducts, addProduct, removeProduct, clearCart } =
		useContext(CartContext);
	const [products, setProducts] = useState([]);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [city, setCity] = useState("");
	const [postalCode, setPostalCode] = useState("");
	const [streetAddress, setStreetAddress] = useState("");
	const [country, setCountry] = useState("");
	const [isSuccess, setIsSuccess] = useState(false);
	useEffect(() => {
		if (cartProducts.length > 0) {
			axios.post("/api/cart", { ids: cartProducts }).then((response) => {
				setProducts(response.data.products);
			});
		} else {
			setProducts([]);
		}
	}, [cartProducts]);
	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}
		if (window?.location.href.includes("success")) {
			setIsSuccess(true);
			clearCart();
		}
	}, []);
	function moreOfThisProduct(id) {
		addProduct(id);
	}
	function lessOfThisProduct(id) {
		removeProduct(id);
	}
	async function goToPayment() {
		const response = await axios.post("/api/checkout", {
			name,
			email,
			city,
			postalCode,
			streetAddress,
			country,
			cartProducts,
		});
		console.log("response : ", response);
		if (response.data.url) {
			window.location = response.data.url;
		}
	}
	let total = 0;
	for (const productId of cartProducts) {
		const price = products.find((p) => p._id === productId)?.price || 0;
		total += price;
	}

	if (isSuccess) {
		return (
			<>
				<Head>
					<title>
						Commande finalisé, l&apos;Ecommerce de Titouan | electro-ménager
					</title>
				</Head>
				<Header />
				<Center>
					<ColumnsWrapper>
						<Box>
							<h1>Merci de nous faire confiance !</h1>
							<p>
								Vous serez informé par e-mail lorsque votre commande vous sera
								livrée.
							</p>
						</Box>
					</ColumnsWrapper>
				</Center>
			</>
		);
	}
	return (
		<>
			<Head>
				<title>
					Votre Panier, l&apos;Ecommerce de Titouan | electro-ménager
				</title>
			</Head>
			<Header />
			<Center>
				<ColumnsWrapper>
					<Box>
						<h2>Panier</h2>
						{!cartProducts?.length && <div>Votre panier est vide</div>}
						{products?.length > 0 && (
							<Table>
								<thead>
									<tr>
										<th>Produit</th>
										<th>Quantité</th>
										<th>Prix</th>
									</tr>
								</thead>
								<tbody>
									{products.map((product) => (
										<tr key={product._id}>
											<ProductInfoCell>
												<ProductImageBox>
													<img src={product.images[0]} alt="" />
												</ProductImageBox>
												{product.title}
											</ProductInfoCell>
											<td>
												<Button onClick={() => lessOfThisProduct(product._id)}>
													-
												</Button>
												<QuantityLabel>
													{
														cartProducts.filter((id) => id === product._id)
															.length
													}
												</QuantityLabel>
												<Button onClick={() => moreOfThisProduct(product._id)}>
													+
												</Button>
											</td>
											<td>
												{cartProducts.filter((id) => id === product._id)
													.length * product.price}
												€
											</td>
										</tr>
									))}
									<tr>
										<td></td>
										<td>Total : </td>
										<td>{total}€</td>
									</tr>
								</tbody>
							</Table>
						)}
					</Box>
					{!!cartProducts?.length && (
						<Box>
							<h2>Information sur la commande</h2>
							<Input
								type="text"
								placeholder="Nom"
								value={name}
								name="name"
								onChange={(ev) => setName(ev.target.value)}
							/>
							<Input
								type="text"
								placeholder="Email"
								value={email}
								name="email"
								onChange={(ev) => setEmail(ev.target.value)}
							/>
							<CityHolder>
								<Input
									type="text"
									placeholder="Ville"
									value={city}
									name="city"
									onChange={(ev) => setCity(ev.target.value)}
								/>
								<Input
									type="text"
									placeholder="Code Postale"
									value={postalCode}
									name="postalCode"
									onChange={(ev) => setPostalCode(ev.target.value)}
								/>
							</CityHolder>
							<Input
								type="text"
								placeholder="Adresse"
								value={streetAddress}
								name="streetAddress"
								onChange={(ev) => setStreetAddress(ev.target.value)}
							/>
							<Input
								type="text"
								placeholder="Pays"
								value={country}
								name="country"
								onChange={(ev) => setCountry(ev.target.value)}
							/>
							<input
								type="hidden"
								name="products"
								value={cartProducts.join(",")}
							/>
							<Button black block onClick={goToPayment}>
								Continuer l&apos;achat
							</Button>
						</Box>
					)}
				</ColumnsWrapper>
			</Center>
		</>
	);
}

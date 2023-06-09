"use client";

import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import BarsIcon from "../icons/Bars";

const StyledHeader = styled.header`
	background-color: #222;
`;
const Logo = styled(Link)`
	color: #fff;
	text-decoration: none;
	position: relative;
	z-index: 3;
`;
const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 15px 0 8px;
`;
const StyledNav = styled.nav`
	${(props) =>
		props.mobileNavActive
			? `
    display: block;
  `
			: `
    display: none;
  `}
	gap: 15px;
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	padding: 70px 20px 20px;
	background-color: #222;
	@media screen and (min-width: 768px) {
		display: flex;
		position: static;
		padding: 0;
	}
`;
const NavLink = styled(Link)`
	display: block;
	color: #aaa;
	text-decoration: none;
	padding: 10px 0;
	@media screen and (min-width: 768px) {
		padding: 0;
	}
`;
const NavButton = styled.button`
	background-color: transparent;
	width: 40px;
	height: 40px;
	border: 0;
	color: white;
	cursor: pointer;
	position: relative;
	z-index: 3;
	@media screen and (min-width: 768px) {
		display: none;
	}
`;

export default function Header() {
	const { cartProducts } = useContext(CartContext);
	const [mobileNavActive, setMobileNavActive] = useState(false);
	return (
		<StyledHeader>
			<Center>
				<Wrapper>
					<Logo href={"/"}>Ecommerce</Logo>
					<StyledNav mobileNavActive={mobileNavActive}>
						<NavLink href={"/"}>Accueil</NavLink>
						<NavLink href={"/products"}>Tout les produits</NavLink>
						<NavLink href={"/categories"}>Categories</NavLink>
						<NavLink href={"/account"}>Compte</NavLink>
						<NavLink href={"/cart"}>Panier ({cartProducts?.length})</NavLink>
					</StyledNav>
					<NavButton onClick={() => setMobileNavActive((prev) => !prev)}>
						<BarsIcon />
					</NavButton>
				</Wrapper>
			</Center>
		</StyledHeader>
	);
}

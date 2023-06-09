import Stripe from "stripe";
import { mongooseConnect } from "../../../lib/mongoose";
import { Product } from "../../../models/Product";
import { Order } from "../../../models/Order";
import { NextResponse } from "next/server";

export async function POST(req) {
	const stripe = new Stripe(process.env.STRIPE_SK);
	if (req.method !== "POST") {
		return NextResponse.json("should be a POST request");
	}
	await mongooseConnect();
	const {
		name,
		email,
		city,
		postalCode,
		streetAddress,
		country,
		cartProducts,
	} = await req.json();

	const productsIds = cartProducts;
	const uniqueIds = [...new Set(productsIds)];
	const productsInfos = await Product.find({ _id: uniqueIds });

	let line_items = [];
	for (const productId of uniqueIds) {
		const productInfo = productsInfos.find(
			(p) => p._id.toString() === productId
		);
		const quantity = productsIds.filter((id) => id === productId)?.length || 0;
		if (quantity > 0 && productInfo) {
			line_items.push({
				quantity,
				price_data: {
					currency: "EUR",
					product_data: { name: productInfo.title },
					unit_amount: quantity * productInfo.price * 100,
				},
			});
		}
	}

	const orderDoc = await Order.create({
		line_items,
		name,
		email,
		city,
		postalCode,
		streetAddress,
		country,
		paid: false,
	});

	const session = await stripe.checkout.sessions.create({
		line_items,
		mode: "payment",
		customer_email: email,
		success_url: process.env.NEXT_PUBLIC_URL + "/cart?success=1",
		cancel_url: process.env.NEXT_PUBLIC_URL + "/cart?canceled=1",
		metadata: { orderId: orderDoc._id.toString(), test: "ok" },
	});

	return NextResponse.json({ url: session.url });
}

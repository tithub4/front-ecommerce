import Stripe from "stripe";
import { mongooseConnect } from "../../../lib/mongoose";
import { buffer } from "micro";
import { Order } from "../../../models/Order";
import { NextResponse } from "next/server";

const endpointSecret =
	"whsec_aaadaedeb58fb52965b167cef6645805f67cc657525ce7b51932a74182618120";

export default async function POST(req) {
	req.body = {};

	const stripe = new Stripe(process.env.STRIPE_SK);
	await mongooseConnect();
	const sig = req.headers.get["stripe-signature"];
	console.log(sig);

	let event;

	try {
		event = stripe.webhooks.constructEvent(
			await buffer(req),
			sig,
			endpointSecret
		);
	} catch (err) {
		return NextResponse(
			{ message: `Webhook Error: ${err.message}` },
			{ status: 400 }
		);
	}

	// Handle the event
	switch (event.type) {
		case "checkout.session.completed":
			const data = event.data.object;
			const orderId = data.metadata.orderId;
			const paid = data.payment_status === "paid";
			if (orderId && paid) {
				await Order.findByIdAndUpdate(orderId, {
					paid: true,
				});
			}
			break;
		default:
			console.log(`Unhandled event type ${event.type}`);
	}

	return NextResponse({ message: "ok" }, { status: 200 });
}

// export const config = {
// 	runtime: "nodejs",
// 	api: { bodyParser: false },
// };

// classy-humor-merit-eased
// acct_1NDx0JGRA7uJXMsY

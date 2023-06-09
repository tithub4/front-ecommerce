import { mongooseConnect } from "../../../lib/mongoose";
import { NextResponse } from "next/server";
import { Product } from "../../../models/Product";

export async function POST(req) {
	await mongooseConnect();

	const { ids } = await req.json(); // Access query parameters

	const products = await Product.find({ _id: ids });

	return NextResponse.json({ products });
}

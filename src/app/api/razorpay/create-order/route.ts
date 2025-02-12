import { NextResponse } from 'next/server';
import razorpayInstance from 'src/utils/payments/razorpay';

export async function POST(request: Request) {
	try {
		const options = {
			amount: 100000, // amount in smallest currency unit (paise)
			currency: "INR",
			receipt: `receipt_${Date.now()}`,
		};

		const order = await razorpayInstance.orders.create(options);
		return NextResponse.json({ orderId: order.id });
	} catch (error) {
		console.error('Error creating Razorpay order:', error);
		return NextResponse.json(
			{ error: 'Failed to create order' },
			{ status: 500 }
		);
	}
}

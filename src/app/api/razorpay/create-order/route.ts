import { NextResponse } from 'next/server';
import razorpayInstance from 'src/utils/payments/razorpay';

export async function POST(request: Request) {
	try {
		const requestBody = await request.json();
		const options = {
			amount: 100000, // amount in smallest currency unit (paise)
			currency: "INR",
			receipt: `receipt_${Date.now()}`,
			notes: {
				username: requestBody.username,
				startDate: requestBody.startDate,
				endDate: requestBody.endDate,
				color: requestBody.color.label,
				shippingAddress: JSON.stringify(requestBody.shippingAddress),
			}
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

import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

		const secret = process.env.RAZORPAY_KEY_SECRET || '';
		const generated_signature = crypto
			.createHmac('sha256', secret)
			.update(`${razorpay_order_id}|${razorpay_payment_id}`)
			.digest('hex');

		if (generated_signature === razorpay_signature) {
			return NextResponse.json({ verified: true });
		}

		return NextResponse.json(
			{ verified: false },
			{ status: 400 }
		);
	} catch (error) {
		return NextResponse.json(
			{ error: 'Payment verification failed' },
			{ status: 500 }
		);
	}
}

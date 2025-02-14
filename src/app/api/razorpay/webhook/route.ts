import { NextResponse } from 'next/server';
import crypto from 'crypto';
import axios from 'axios';

export async function POST(request: Request) {
	try {
		const secret = process.env.RAZORPAY_WEBHOOK_SECRET!;
		const signature = request.headers.get('x-razorpay-signature')!;
		const body = await request.text();

		const generated_signature = crypto
			.createHmac('sha256', secret)
			.update(body)
			.digest('hex');

		if (generated_signature !== signature) {
			return NextResponse.json(
				{ error: 'Invalid signature' },
				{ status: 400 }
			);
		}

		const event = JSON.parse(body);

		if (event.event === 'payment.captured') {
			const { razorpay_order_id, razorpay_payment_id } = event.payload.payment.entity;

			const googleAppsScriptUrl = process.env.APPS_SCRIPT_URL;
			if (!googleAppsScriptUrl) {
				return NextResponse.json(
					{ error: 'Google Apps Script URL is not configured' },
					{ status: 500 }
				);
			}

			axios.post(googleAppsScriptUrl, {
				...event.payload.payment.entity
			})
				.then((res) => {
					console.log("Response from Google Apps Script:", res.data);
					console.log("Order details updated in Google Sheet")
				})
				.catch(err => {
					console.error("Error updating google sheet", err);
				})

			return NextResponse.json({ success: true });
		}

		return NextResponse.json({ success: false });
	} catch (error) {
		return NextResponse.json(
			{ error: 'Webhook handling failed' },
			{ status: 500 }
		);
	}
}
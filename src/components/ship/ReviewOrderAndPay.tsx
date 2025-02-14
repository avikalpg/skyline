import { Stack, Typography, Grid, Box, Button, Alert } from "@mui/joy";
import { ShippingAddress, Skyline3DPrintColor } from "src/types/ship";
import { useCallback, useState } from 'react';
import Script from 'next/script';
import PaymentSuccess from './PaymentSuccess';
import axios from "axios";

export default function ReviewOrderAndPay({ username, startDate, endDate, color, shippingAddress, markComplete }: {
	username: string;
	startDate: Date;
	endDate: Date;
	color: Skyline3DPrintColor;
	shippingAddress: ShippingAddress;
	markComplete: () => void;
}) {
	const [paymentError, setPaymentError] = useState<string | null>(null);
	const [paymentSuccess, setPaymentSuccess] = useState<{
		orderId: string;
		paymentId: string;
		amount: number;
	} | null>(null);

	const handlePayment = useCallback(async () => {
		setPaymentError(null);
		try {
			// Create order
			const response = await axios.post('/api/razorpay/create-order', {
				username,
				startDate,
				endDate,
				color,
				shippingAddress,
			});
			const data = await response.data;

			if (!data.orderId) {
				throw new Error('Failed to create order');
			}

			// Initialize Razorpay
			const options = {
				key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
				amount: 100000,
				currency: "INR",
				name: `Skyline 3D for ${username}`,
				description: `3D Printed Skyline for ${username}'s GitHub contributions from ${startDate.toDateString()} to ${endDate.toDateString()}`,
				order_id: data.orderId,
				handler: async function (response: any) {
					try {
						// Verify payment
						const verifyResponse = await axios.post('/api/razorpay/verify-payment', JSON.stringify({
							razorpay_order_id: response.razorpay_order_id,
							razorpay_payment_id: response.razorpay_payment_id,
							razorpay_signature: response.razorpay_signature,
						}));

						const verifyData = await verifyResponse.data;

						if (verifyData.verified) {
							setPaymentSuccess({
								orderId: response.razorpay_order_id,
								paymentId: response.razorpay_payment_id,
								amount: 100000, // Same as in create-order
							});
							markComplete();
						} else {
							setPaymentError(`Payment verification failed. Please contact support with your payment details. Order ID: ${response.razorpay_order_id}`);
						}
					} catch (error) {
						setPaymentError('Payment verification failed. Please contact support with your payment details. Order ID: ' + data.orderId);
					}
				},
				prefill: {
					name: shippingAddress.name,
					contact: shippingAddress.mobile,
				},
			};

			const paymentObject = new (window as any).Razorpay(options);
			paymentObject.open();
		} catch (error) {
			setPaymentError('Failed to initiate payment. Please try again.');
		}
	}, [shippingAddress]);

	if (paymentSuccess) {
		return <PaymentSuccess {...paymentSuccess} />;
	}

	return (
		<>
			<Script
				src="https://checkout.razorpay.com/v1/checkout.js"
				strategy="lazyOnload"
			/>
			<Stack spacing={4} sx={{ flexGrow: 1, mt: 2 }}>
				<Typography variant="h4" component="h1">Review Order & Pay</Typography>

				<Grid container spacing={2}>
					<Grid item xs={12} sm={6} md={4}>
						<Typography variant="subtitle1" fontWeight="bold">Username:</Typography>
						<Typography variant="body1">{username}</Typography>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<Typography variant="subtitle1" fontWeight="bold">Date Range:</Typography>
						<Typography variant="body1">{startDate.toDateString()} - {endDate.toDateString()}</Typography>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<Typography variant="subtitle1" fontWeight="bold">Color:</Typography>
						<Box display="flex" alignItems="center">
							<Typography variant="body1" mr={1}>{color.label}</Typography>
							<Box sx={{ backgroundColor: color.value, width: 20, height: 20, borderRadius: '50%' }}></Box>
						</Box>
					</Grid>
					<Grid item xs={12}>
						<Typography variant="subtitle1" fontWeight="bold">Shipping Address:</Typography>
						<Typography variant="body1">{shippingAddress.name}</Typography>
						<Typography variant="body2">
							{[shippingAddress.building, shippingAddress.street, shippingAddress.city, shippingAddress.state, shippingAddress.country, shippingAddress.zip].join(", ")}
						</Typography>
						<Typography variant="body2">Mob. No.: {shippingAddress.mobile}</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>Price:</Typography>
						<Typography variant="body2">Rs 1000</Typography>
					</Grid>
					<Grid item xs={12}>
						<Button
							variant="solid"
							color="primary"
							fullWidth
							onClick={handlePayment}
							sx={{ mt: 2 }}
						>
							Pay Now
						</Button>
						{paymentError && (
							<Alert
								color="danger"
								variant="soft"
								sx={{ mt: 1, mx: 2, py: 0.5 }}
							>
								{paymentError}
							</Alert>
						)}
					</Grid>
				</Grid>
			</Stack>
		</>
	)
}
import { Stack, Typography, Box, Link } from "@mui/joy";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function PaymentSuccess({
	orderId,
	paymentId,
	amount
}: {
	orderId: string;
	paymentId: string;
	amount: number;
}) {
	return (
		<Stack spacing={4} alignItems="center" sx={{ py: 4 }}>
			<CheckCircleIcon sx={{ fontSize: 64, color: 'success.500' }} />

			<Typography level="h2" textAlign="center">
				Payment Successful!
			</Typography>

			<Box sx={{ textAlign: 'center' }}>
				<Typography level="body-md">Order ID: {orderId}</Typography>
				<Typography level="body-md">Payment ID: {paymentId}</Typography>
				<Typography level="body-md">Amount Paid: ₹{amount / 100}</Typography>
			</Box>

			<Box sx={{ textAlign: 'center', mt: 4 }}>
				<Typography level="body-md">
					You will receive an email confirmation shortly.
				</Typography>
				<Typography level="body-md" sx={{ mt: 2 }}>
					For any queries, please contact us at{' '}
					<Link href="mailto:support@skyline3d.in">
						support@skyline3d.in
					</Link>
				</Typography>
			</Box>
		</Stack>
	);
}

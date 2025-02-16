import { Box, Typography } from '@mui/joy';
import ScrollPageUIWrapper from "src/components/ScrollPageUIWrapper";

export default function ShippingPolicy() {
	return (
		<ScrollPageUIWrapper>
			<Box sx={{ mt: { xs: 2, sm: 4 }, maxWidth: '1200px', mx: 'auto', px: { xs: 2, sm: 4, md: 8 } }}>
				<Box sx={{ maxWidth: '800px' }}>
					<Typography level="h1" sx={{ mb: 4 }}>
						Shipping Policy
					</Typography>
				</Box>

				<Box sx={{ mt: 4 }}>
					<Typography>
						For International buyers, orders are shipped and delivered through registered international courier companies and/or International speed post only. For domestic buyers, orders are shipped through registered domestic courier companies and/or speed post only.
					</Typography>

					<Typography level="h3" sx={{ mt: 4, mb: 2 }}>Order Processing</Typography>
					<Typography>
						Orders are shipped within 6-8 days or as per the delivery date agreed at the time of order confirmation and delivering of the shipment subject to Courier Company / post office norms.
					</Typography>

					<Typography level="h3" sx={{ mt: 4, mb: 2 }}>Liability</Typography>
					<Typography>
						AVIKALPKUMAR ALOK GUPTA is not liable for any delay in delivery by the courier company / postal authorities and only guarantees to hand over the consignment to the courier company or postal authorities within 6-8 days from the date of the order and payment or as per the delivery date agreed at the time of order confirmation.
					</Typography>

					<Typography level="h3" sx={{ mt: 4, mb: 2 }}>Delivery Address</Typography>
					<Typography>
						Delivery of all orders will be to the address provided by the buyer. Delivery of our services will be confirmed on your mail ID as specified during registration.
					</Typography>

					<Typography level="h3" sx={{ mt: 4, mb: 2 }}>Contact Information</Typography>
					<Typography>
						For any issues in utilizing our services you may contact our helpdesk on:
					</Typography>
					<Box component="address" sx={{ mt: 2, fontStyle: 'normal' }}>
						<Typography>Phone: 7021803109</Typography>
						<Typography>Email: support@skyline3d.in</Typography>
					</Box>
				</Box>
			</Box>
		</ScrollPageUIWrapper>
	);
}

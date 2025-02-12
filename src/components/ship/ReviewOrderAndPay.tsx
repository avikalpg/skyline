import { Stack, Typography, Grid, Box } from "@mui/joy";
import { ShippingAddress, Skyline3DPrintColor } from "src/types/ship";

export default function ReviewOrderAndPay({ username, startDate, endDate, color, shippingAddress }: {
	username: string;
	startDate: Date;
	endDate: Date;
	color: Skyline3DPrintColor;
	shippingAddress: ShippingAddress;
}) {
	return (
		<Stack spacing={4} sx={{ flexGrow: 1, mt: 2 }}>
			<Typography variant="h4" component="h1">Review Order & Pay</Typography>

			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<Typography variant="subtitle1" fontWeight="bold">Username:</Typography>
					<Typography variant="body1">{username}</Typography>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Typography variant="subtitle1" fontWeight="bold">Date Range:</Typography>
					<Typography variant="body1">{startDate.toDateString()} - {endDate.toDateString()}</Typography>
				</Grid>
				<Grid item xs={12} sm={6}>
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
			</Grid>
		</Stack>
	)
}
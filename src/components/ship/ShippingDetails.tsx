import { FormControl, FormLabel, Input, Stack, Typography } from "@mui/joy";
import { ShippingAddress } from "src/types/ship";

export default function ShippingDetails({ address, setAddress }: {
	address: ShippingAddress;
	setAddress: (address: ShippingAddress) => void;
}) {
	const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setAddress({ ...address, [name]: value });
	};

	return (
		<Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: 2, flex: 1 }}>
			<Typography variant="h6" sx={{ width: '100%' }}>Shipping Details</Typography>
			<FormControl>
				<FormLabel sx={{ mt: 2 }}>Name</FormLabel>
				<Input name="name" value={address.name} onChange={handleAddressChange} />
			</FormControl>
			<FormControl>
				<FormLabel sx={{ mt: 2 }}>Mobile No.</FormLabel>
				<Input name="mobile" value={address.mobile} onChange={handleAddressChange} />
			</FormControl>
			<FormControl>
				<FormLabel sx={{ mt: 2 }}>Flat, House no., Building, Company, Apartment</FormLabel>
				<Input name="building" value={address.building} onChange={handleAddressChange} />
			</FormControl>
			<FormControl>
				<FormLabel sx={{ mt: 2 }}>Area, Street, Sector, Village & Landmark</FormLabel>
				<Input name="street" value={address.street} onChange={handleAddressChange} />
			</FormControl>
			<FormControl>
				<FormLabel sx={{ mt: 2 }}>City</FormLabel>
				<Input name="city" value={address.city} onChange={handleAddressChange} />
			</FormControl>
			<FormControl>
				<FormLabel sx={{ mt: 2 }}>State</FormLabel>
				<Input name="state" value={address.state} onChange={handleAddressChange} />
			</FormControl>
			<FormControl>
				<FormLabel sx={{ mt: 2 }}>Zip</FormLabel>
				<Input name="zip" value={address.zip} onChange={handleAddressChange} />
			</FormControl>
			<FormControl>
				<FormLabel sx={{ mt: 2 }}>Country</FormLabel>
				<Input name="country" value={address.country} onChange={handleAddressChange} />
			</FormControl>
		</Stack>
	)
}

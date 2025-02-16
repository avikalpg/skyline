
import { List, ListItem, Typography } from '@mui/joy'
import { Metadata } from 'next'
import Link from 'next/link'
import ScrollPageUIWrapper from 'src/components/ScrollPageUIWrapper'

export const metadata: Metadata = {
	title: 'Contact Us | Skyline3d.in',
	description: 'Contact information for Skyline3d.in',
}

export default function ContactUs() {
	return (
		<ScrollPageUIWrapper>
			<Typography level="h1">Contact Us</Typography>

			<Typography>You may contact us using the information below:</Typography>

			<Typography level="h3" sx={{ mt: 4, mb: 2 }}>Merchant Legal entity name:</Typography>
			<Typography>AVIKALPKUMAR ALOK GUPTA</Typography>

			<Typography level="h3" sx={{ mt: 4, mb: 2 }}>Registered Address:</Typography>
			<Typography>
				KB-1502, Oak Block,<br />
				Salarpuria Sattva Greenage,<br />
				Hosur Road, Bommanahalli<br />
				Bengaluru KARNATAKA 560068
			</Typography>

			<Typography level="h3" sx={{ mt: 4, mb: 2 }}>Contact Information:</Typography>
			<List>
				<ListItem><Typography component="strong">WhatsApp:</Typography> <Link href="https://wa.me/917021803109">7021 8031 09</Link></ListItem>
				<ListItem><Typography component="strong">Email:</Typography> <Link href="mailto:support@skyline3d.in">support@skyline3d.in</Link></ListItem>
			</List>
		</ScrollPageUIWrapper>
	)
}

import { Box } from '@mui/joy';
import Typography from '@mui/joy/Typography';
import Link from 'next/link';
import ScrollPageUIWrapper from 'src/components/ScrollPageUIWrapper';

function Policies() {
	return (
		<ScrollPageUIWrapper>
			<Box sx={{ mt: { xs: 2, sm: 4 }, maxWidth: '1200px', width: '100%', mx: 'auto', px: { xs: 2, sm: 4, md: 8 } }}>
				<Box sx={{ maxWidth: '800px' }}>
					<Typography level="h1" sx={{ mb: 4 }}>
						Policies
					</Typography>
				</Box>
				<Box sx={{ mt: 4 }}>
					<ul>
						<li>
							<Link href="/docs/terms-and-conditions">Terms and Conditions</Link>
						</li>
						<li>
							<Link href="/docs/privacy-policy">Privacy Policy</Link>
						</li>
						<li>
							<Link href="/docs/cancellation-and-refunds-policy">Cancellation and Refunds Policy</Link>
						</li>
						<li>
							<Link href="/docs/shipping-policy">Shipping Policy</Link>
						</li>
						<li>
							<Link href="/docs/contact-us">Contact Us</Link>
						</li>
					</ul>
				</Box>
			</Box>
		</ScrollPageUIWrapper>
	);
}

export default Policies;
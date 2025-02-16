import { Link, Stack, Typography } from "@mui/joy";
import GitHubIcon from '@mui/icons-material/GitHub';
import { useMediaQuery } from '@mui/material';

export function Footer() {
	return (
		<footer>
			<Typography level="body-sm" sx={{ textAlign: 'center' }}>
				© 2023-{new Date().getFullYear()} git-skyline by <Link href="https://github.com/avikalpg" target="_blank" rel="noopener noreferrer">avikalpg</Link>
			</Typography>
			<Stack direction="row" justifyContent="space-between" alignItems="center" sx={{
				mt: '5px',
				px: '1em',
			}}>
				<Typography level="body-sm">
					<Link href="https://github.com/avikalpg/skyline" target="_blank" rel="noopener noreferrer">
						<GitHubIcon />&nbsp;source
					</Link>
				</Typography>
				<Stack direction="row" spacing={2} sx={{ flexGrow: 1, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
					<Typography level="body-sm" sx={{ display: { xs: 'block', sm: 'none' } }}>
						<Link href="/docs">Policies</Link>
					</Typography>
					<Typography level="body-sm" sx={{ display: { xs: 'none', sm: 'block' } }}>
						<Link href="/docs/terms-and-conditions">Terms</Link>
					</Typography>
					<Typography level="body-sm" sx={{ display: { xs: 'none', sm: 'block' } }}>
						<Link href="/docs/privacy-policy">Privacy</Link>
					</Typography>
					<Typography level="body-sm" sx={{ display: { xs: 'none', sm: 'block' } }}>
						<Link href="/docs/cancellation-and-refunds-policy">Refunds</Link>
					</Typography>
					<Typography level="body-sm" sx={{ display: { xs: 'none', sm: 'block' } }}>
						<Link href="/docs/shipping-policy">Shipping</Link>
					</Typography>
					<Typography level="body-sm">
						<Link href="/docs/contact-us">Contact</Link>
					</Typography>
				</Stack>
			</Stack>
		</footer>
	)
}
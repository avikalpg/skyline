import { Link, Stack, Typography } from "@mui/joy";
import GitHubIcon from '@mui/icons-material/GitHub';

export function Footer() {
	return (
		<footer>
			<Stack direction="row" justifyContent="space-between" alignItems="center" sx={{
				mt: '5px',
				px: '1em',
			}}>
				<Typography level="body-sm">
					git-skyline by <Link href="https://github.com/avikalpg" target="_blank" rel="noopener noreferrer">avikalpg</Link>
				</Typography>
				<Typography level="body-sm">
					<Link href="https://github.com/avikalpg/skyline" target="_blank" rel="noopener noreferrer">
						<GitHubIcon />&nbsp;source
					</Link>
				</Typography>
			</Stack>
		</footer>
	)
}
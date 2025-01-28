import { Stack, Typography } from "@mui/joy";
import ModeToggle from "./ModeToggle";
import Image from "next/image";
import Link from "next/link";

export function Header() {
	return (
		<Stack direction="row" justifyContent="flex-start" alignItems="center" sx={{
			mb: '5px',
			px: '1em',
		}}>
			<Link href="/">
				<Image src="/skyline-logo-transparent.png" alt="git-skyline logo" width={50} height={50} style={{ objectFit: 'cover' }} />
			</Link>
			<Typography level="h3">Git Skyline</Typography>
			<ModeToggle />
		</Stack>
	)
}
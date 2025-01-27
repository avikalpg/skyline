import type { Metadata, Viewport } from "next";
import "../index.css";
import ThemeRegistry from "./ThemeRegistry";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
	title: "Skyline: Your contributions story in 3D",
	description: "GitHub Skyline - your contributions in 3D",
}

export const viewport: Viewport = {
	themeColor: "#000000",
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body>
				<ThemeRegistry options={{ key: 'joy' }}>{children}</ThemeRegistry>
				<Analytics />
			</body>
		</html>
	)
}
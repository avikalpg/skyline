import type { Metadata, Viewport } from "next";
import "../index.css";

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
				<div id="root">{children}</div>
			</body>
		</html>
	)
}
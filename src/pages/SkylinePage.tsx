import { Box, Typography } from "@mui/joy";
import SingleFoldPageUIWrapper from "../components/SingleFoldPageUIWrapper";

function SkylinePage() {
	const data = localStorage.getItem("data");
	if (!data) {
		window.location.href = "/";
		return (
			<SingleFoldPageUIWrapper>
				<Typography color="danger">No timeline data found!</Typography>
			</SingleFoldPageUIWrapper>
		)
	}
	const { username, timeline } = JSON.parse(data) as { username: string, timeline: Record<string, number> };
	return (
		<SingleFoldPageUIWrapper>
			<Box>
				Hello {username}!
				{Object.entries(timeline).map(([k, v]) => (<Typography key={k}>
					{k} :: {v}
				</Typography>))}
			</Box>
		</SingleFoldPageUIWrapper>
	)
}

export default SkylinePage;
import { Stack, Typography } from "@mui/joy";
import SingleFoldPageUIWrapper from "../components/SingleFoldPageUIWrapper";
import { Canvas } from "@react-three/fiber";
import { Vector3 } from "three";
import Skyline3d from "../components/Skyline3D";
import { structureTimelineByWeek } from "../utils/generateContributionTimeline";

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
	const weekWiseTimeline = structureTimelineByWeek(timeline);
	return (
		<SingleFoldPageUIWrapper>
			<Stack sx={{ width: '100%', height: '100%' }}>
				<Typography>
					Hello {username}!
				</Typography>
				<Canvas>
					{/* <ThreeDObject /> */}
					<pointLight position={new Vector3(10, 10, 10)} intensity={500} />
					<ambientLight intensity={0.5} />
					<Skyline3d data={weekWiseTimeline} position={[0, -2, -5]} />
				</Canvas>
			</Stack>
		</SingleFoldPageUIWrapper >
	)
}

export default SkylinePage;
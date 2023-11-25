import { Skeleton, Stack, Typography } from "@mui/joy";
import SingleFoldPageUIWrapper from "../components/SingleFoldPageUIWrapper";
import { Canvas } from "@react-three/fiber";
import { Vector3 } from "three";
import Skyline3d from "../components/Skyline3D";
import { structureTimelineByWeek } from "../utils/generateContributionTimeline";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getUserContributions } from "../utils/getUserContributions";

function SkylinePage() {
	const { username } = useParams();
	const [timeline, setTimeline] = useState<number[][]>();
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		if (!username || username === "") {
			window.location.href = `#/skyline?err=${encodeURIComponent("Please enter a username")}`
			setErrorMessage(`No username provided!`);
			return;
		}
		getUserContributions(username).then((userContributions) => {
			const weekWiseTimeline = structureTimelineByWeek(userContributions);
			setTimeline(weekWiseTimeline);
		}).catch((err: Error) => {
			console.error('Error in getting data:', err);
			const errorMsg = `Error in getting data: ${err.message}`
			window.location.href = `#/skyline?err=${encodeURIComponent(errorMsg)}`
			setErrorMessage(errorMsg);
		})
	}, [username])

	if (errorMessage && errorMessage !== "") {
		return (
			<SingleFoldPageUIWrapper>
				<Typography color="danger" level="title-lg">{errorMessage}</Typography>
			</SingleFoldPageUIWrapper>
		)
	}
	return (
		<SingleFoldPageUIWrapper>
			<Stack sx={{ width: '100%', height: '100%' }}>
				<Typography>
					Hello {username}!
				</Typography>
				{timeline ? (
					<Canvas>
						{/* <ThreeDObject /> */}
						<pointLight position={new Vector3(10, 10, 10)} intensity={500} />
						<ambientLight intensity={0.5} />
						<Skyline3d data={timeline} position={[0, -2, -5]} />
					</Canvas>
				) : (
					<Skeleton variant="rectangular" animation="wave" sx={{
						width: '100%',
						aspectRatio: 16 / 9,
					}} />
				)}
			</Stack>
		</SingleFoldPageUIWrapper >
	)
}

export default SkylinePage;
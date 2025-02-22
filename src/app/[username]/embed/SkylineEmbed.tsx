'use client';

import { Sheet, Skeleton, Typography } from "@mui/joy";
import { Canvas } from "@react-three/fiber";
import { PCFSoftShadowMap } from "three";
import Skyline3d from "../../../components/3d/Skyline3D";
import { useSearchParams } from 'next/navigation';
import { getFirstDayOfYearFromLastDay, structureTimelineByWeek } from "../../../utils/generateContributionTimeline";
import { useEffect, useState } from "react";
import { GitHubContributionCalendar } from 'src/types/github-types';
import { Lights } from "src/components/3d/Lights";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

interface SkylinePageProps {
	username: string;
	userContributionCalendar?: GitHubContributionCalendar;
	endDate: Date;
	error?: string;
}

export default function SkylineEmbed({ username, userContributionCalendar, endDate, error }: SkylinePageProps) {
	const [timeline, setTimeline] = useState<number[][] | undefined>(undefined);
	const [errorMessage, setErrorMessage] = useState("");
	const searchParams = useSearchParams();

	useEffect(() => {
		if (userContributionCalendar)
			setTimeline(structureTimelineByWeek(userContributionCalendar));
	}, [userContributionCalendar]);

	useEffect(() => {
		if (error) {
			console.error("Server error:", error);
			setErrorMessage(error);
		} else {
			setErrorMessage("");
		}
	}, [error]);

	const startDate = getFirstDayOfYearFromLastDay(endDate);
	const endDateString = endDate;
	const options = { year: 'numeric', month: 'short' } as const;
	const dateRange = `${startDate.toLocaleDateString(undefined, options)} - ${endDateString.toLocaleDateString(undefined, options)}`;

	// 3D Scene Controls
	const skylineColor = searchParams?.get("color") ?? "grey"; // default to grey
	const sunlight = searchParams?.get("sunlight") === "false" ? false : true;
	const indoorLights = searchParams?.get("indoorLights") === "false" ? false : true;
	const enableZoom = searchParams?.get("enableZoom") === "false" ? false : true; // default to true
	const enablePan = searchParams?.get("enablePan") === "false" ? false : true; // default to true
	const enableBase = searchParams?.get("base") === "true" ? true : false;
	const enableDamping = searchParams?.get("enableDamping") === "false" ? false : true; // default to true
	const SCALE = parseFloat(searchParams?.get("scale") || "1"); // default to 1
	const customMessage = searchParams?.get("customMessage") || "";

	return (
		<Sheet variant='soft' sx={{
			width: '100%',
			height: '100vh',
			mx: 'auto', // margin left & right
			display: 'flex',
			flexDirection: 'column',
			gap: '2px',
			boxSizing: 'border-box',
			textAlign: 'center',
			backgroundColor: 'transparent',
		}}>
			{(errorMessage && errorMessage !== "") ? (
				<Typography color="danger" variant="soft" level="body-lg" sx={{
					px: 2,
					textAlign: 'center',
					width: 'auto'
				}}>{errorMessage}</Typography>
			) : null}
			{timeline ? (
				<Canvas shadows={{ type: PCFSoftShadowMap }}>
					<PerspectiveCamera fov={60} makeDefault position={[0, 1 * SCALE, 50 * SCALE]}>
						<OrbitControls
							enableZoom={enableZoom}
							enablePan={enablePan}
							enableDamping={enableDamping}
						/>
					</PerspectiveCamera>
					<Lights sunlight={sunlight} indoorLights={indoorLights} SCALE={SCALE} />
					<ambientLight intensity={0.4 * SCALE} color={errorMessage ? 'red' : 'white'} />
					<Skyline3d data={timeline} username={username} dateRange={dateRange} position={[0, -8 * SCALE, 0]} color={skylineColor} SCALE={SCALE} customMessage={customMessage} />
					{enableBase && (
						<>
							<mesh position={[0, -16 * SCALE, 0]} receiveShadow>
								<boxGeometry args={[200 * SCALE, 1 * SCALE, 200 * SCALE]} />
								<meshStandardMaterial color={skylineColor} opacity={0.8} transparent />
							</mesh>
						</>
					)}
				</Canvas>
			) : (
				<Skeleton variant="rectangular" animation="wave" sx={{
					width: '100%',
					aspectRatio: 16 / 9,
				}} />
			)}
		</Sheet>
	);
}

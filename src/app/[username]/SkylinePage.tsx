'use client';

import { FormControl, FormHelperText, FormLabel, Input, Skeleton, Stack, Switch, Typography } from "@mui/joy";
import SingleFoldPageUIWrapper from "../../components/SingleFoldPageUIWrapper";
import { Canvas } from "@react-three/fiber";
import { PCFSoftShadowMap } from "three";
import Skyline3d from "../../components/Skyline3D";
import { useSearchParams, useRouter } from 'next/navigation';
import { getFirstDayOfYearFromLastDay, structureTimelineByWeek } from "../../utils/generateContributionTimeline";
import { useEffect, useState } from "react";
import { GitHubContributionCalendar } from 'src/github-types';
import { Lights } from "src/components/Lights";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { SCALE } from "src/utils/3dUtils";

interface SkylinePageProps {
	username: string;
	userContributionCalendar?: GitHubContributionCalendar;
	endDate: Date;
	error?: string;
}

export default function SkylinePage({ username, userContributionCalendar, endDate: initialEndDate, error }: SkylinePageProps) {
	const [timeline, setTimeline] = useState<number[][] | undefined>(undefined);
	const [errorMessage, setErrorMessage] = useState("");

	const currentDate = new Date();
	const minDate = '2008-01-01';
	const maxDate = `${currentDate.getFullYear()}-12-31`;
	const [endDate, setEndDate] = useState(initialEndDate);
	const [dateErr, setDateErr] = useState("");

	const [indoorLights, setIndoorLights] = useState(false);
	const [sunlight, setSunlight] = useState(true);

	const searchParams = useSearchParams();
	const router = useRouter();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const enteredDate = new Date(e.target.value);
		const minDateObj = new Date(minDate)
		const maxDateObj = new Date(maxDate)
		setEndDate(enteredDate);
		if (enteredDate < minDateObj || enteredDate > maxDateObj) {
			// Show an error message or handle out-of-range input as needed
			const errMsg = `Valid dates: ${minDateObj.getFullYear()}-${maxDateObj.getFullYear()}`
			console.error(`Invalid date: out of range (${minDateObj.getFullYear()}-${maxDateObj.getFullYear()})`);
			setDateErr(errMsg);
		} else {
			setDateErr("")
			const newSearchParams = new URLSearchParams(searchParams);
			newSearchParams.set('endDate', e.target.value);
			router.push(`/${username}?${newSearchParams.toString()}`);
		}
	};

	useEffect(() => {
		if (userContributionCalendar)
			setTimeline(structureTimelineByWeek(userContributionCalendar));
	}, [userContributionCalendar]);

	useEffect(() => {
		if (error) {
			console.error("Server error:", error);
			setErrorMessage("Error fetching contributions. Please try again later.");
		} else {
			setErrorMessage("");
		}
	}, [error]);

	const startDate = getFirstDayOfYearFromLastDay(endDate);
	const endDateString = endDate;
	const options = { year: 'numeric', month: 'short' } as const;
	const dateRange = `${startDate.toLocaleDateString(undefined, options)} - ${endDateString.toLocaleDateString(undefined, options)}`;

	// 3D Scene Controls
	const enableZoom = searchParams.get("enableZoom") === "false" ? false : true; // default to true
	const enablePan = searchParams.get("enablePan") === "false" ? false : true; // default to true
	const enableBase = searchParams.get("base") === "true" ? true : false;
	const enableDamping =
		searchParams.get("enableDamping") === "false" ? false : true; // default to true

	return (
		<SingleFoldPageUIWrapper>
			<Stack sx={{ width: '100%', height: '100%' }}>
				<Stack sx={{ display: 'flex', flexDirection: 'row', gap: 2, mx: 'auto' }}>
					<FormControl error={dateErr && dateErr !== "" ? true : false}>
						<FormLabel>Username:</FormLabel>
						<Input type="text" disabled value={username} />
					</FormControl>
					<FormControl error={dateErr && dateErr !== "" ? true : false}>
						<FormLabel>Start Date:</FormLabel>
						<Input type="date" disabled value={startDate.toISOString().split('T')[0]} />
					</FormControl>
					<FormControl error={dateErr && dateErr !== "" ? true : false}>
						<FormLabel>End Date:</FormLabel>
						<Input
							type="date"
							slotProps={{
								input: {
									min: minDate,
									max: maxDate,
								}
							}}
							value={endDate.toISOString().split('T')[0]}
							onChange={handleChange}
						/>
						{dateErr && dateErr !== "" && (
							<FormHelperText>{dateErr}</FormHelperText>
						)}
					</FormControl>
					<FormControl>
						<FormLabel>Indoor Lights:</FormLabel>
						<Switch
							checked={indoorLights}
							onChange={() => setIndoorLights(!indoorLights)}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Sunlight:</FormLabel>
						<Switch
							checked={sunlight}
							onChange={() => setSunlight(!sunlight)}
						/>
					</FormControl>
				</Stack>
				{(errorMessage && errorMessage !== "") ? (
					<Typography color="danger" variant="soft" level="body-lg" sx={{
						px: 2,
						my: 2,
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
						<Lights sunlight={sunlight} indoorLights={indoorLights} />
						<ambientLight intensity={0.4 * SCALE} color={errorMessage || dateErr ? 'red' : 'white'} />
						<Skyline3d data={timeline} username={username} dateRange={dateRange} position={[0, -8 * SCALE, 0]} />
						{enableBase && (
							<>
								<mesh position={[0, -16 * SCALE, 0]} receiveShadow>
									<boxGeometry args={[200 * SCALE, 1 * SCALE, 200 * SCALE]} />
									<meshStandardMaterial color="grey" opacity={0.8} transparent />
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
			</Stack>
		</SingleFoldPageUIWrapper>
	);
}
'use client';

import { FormControl, FormHelperText, FormLabel, Input, Skeleton, Stack, Typography } from "@mui/joy";
import SingleFoldPageUIWrapper from "../../components/SingleFoldPageUIWrapper";
import { Canvas } from "@react-three/fiber";
import { PCFSoftShadowMap, Scene } from "three";
import Skyline3d from "../../components/3d/Skyline3D";
import { useSearchParams, useRouter } from 'next/navigation';
import { formatDate, getFirstDayOfYearFromLastDay, structureTimelineByWeek } from "../../utils/generateContributionTimeline";
import { useEffect, useState } from "react";
import { GitHubContributionCalendar } from 'src/types/github-types';
import { Lights } from "src/components/3d/Lights";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Toggle from "src/components/Toggle";
import { CurtainsClosed, Lightbulb, LightbulbOutlined, WbSunny } from "@mui/icons-material";
import { Download3DButton } from "src/components/Download3DButton";
import { EmbedButton } from "src/components/EmbedButton";

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

	const [indoorLights, setIndoorLights] = useState(true);
	const [sunlight, setSunlight] = useState(true);

	const searchParams = useSearchParams();
	const router = useRouter();

	const [scene, setScene] = useState<Scene | undefined>(undefined);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const enteredDate = new Date(e.target.value);
		const minDateObj = new Date(minDate);
		const maxDateObj = new Date(maxDate);

		if (isNaN(enteredDate.getTime()) || enteredDate < minDateObj || enteredDate > maxDateObj) {
			// Show an error message or handle out-of-range input as needed
			const errMsg = `Valid dates: ${minDateObj.getFullYear()}-${maxDateObj.getFullYear()}`;
			console.error(`Invalid date: out of range (${minDateObj.getFullYear()}-${maxDateObj.getFullYear()})`);
			setDateErr(errMsg);
		} else {
			setDateErr("");
			setEndDate(enteredDate);
			const newSearchParams = new URLSearchParams(searchParams || "");
			newSearchParams.set('endDate', formatDate(enteredDate));
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
	const enableZoom = searchParams?.get("enableZoom") === "false" ? false : true; // default to true
	const enablePan = searchParams?.get("enablePan") === "false" ? false : true; // default to true
	const enableBase = searchParams?.get("base") === "true" ? true : false;
	const enableDamping =
		searchParams?.get("enableDamping") === "false" ? false : true; // default to true
	const SCALE = parseFloat(searchParams?.get("scale") || "1"); // default to 1

	return (
		<SingleFoldPageUIWrapper>
			<Stack sx={{ width: '100%', height: '100%' }}>
				<Stack sx={{ display: 'flex', flexDirection: 'row', gap: 2, mx: 'auto', flexWrap: 'wrap', justifyContent: 'center' }}>
					<FormControl error={dateErr && dateErr !== "" ? true : false}>
						<FormLabel>Username:</FormLabel>
						<Input type="text" disabled value={username} />
					</FormControl>
					<FormControl error={dateErr && dateErr !== "" ? true : false}>
						<FormLabel>Start Date:</FormLabel>
						<Input type="date" disabled value={formatDate(startDate)} />
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
							defaultValue={formatDate(endDate)}
							onChange={handleChange}
						/>
						{dateErr && dateErr !== "" && (
							<FormHelperText>{dateErr}</FormHelperText>
						)}
					</FormControl>
					<FormControl>
						<FormLabel sx={{ mx: 'auto' }}>Indoor Lights</FormLabel>
						<Toggle state={indoorLights} setState={setIndoorLights} onComponent={<Lightbulb />} offComponent={<LightbulbOutlined />} />
					</FormControl>
					<FormControl>
						<FormLabel sx={{ mx: 'auto' }}>Sunlight</FormLabel>
						<Toggle state={sunlight} setState={setSunlight} onComponent={<WbSunny />} offComponent={<CurtainsClosed />} />
					</FormControl>
					<FormControl>
						<FormLabel sx={{ mx: 'auto' }}>Download</FormLabel>
						<Download3DButton scene={scene} username={username} dateRange={dateRange} setError={setErrorMessage} />
					</FormControl>
					<FormControl>
						<FormLabel sx={{ mx: 'auto' }}>Embed</FormLabel>
						<EmbedButton username={username} endDate={formatDate(endDate)} />
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
						<Lights sunlight={sunlight} indoorLights={indoorLights} SCALE={SCALE} />
						<ambientLight intensity={0.4} color={errorMessage || dateErr ? 'red' : 'white'} />
						<Skyline3d data={timeline} username={username} dateRange={dateRange} position={[0, -8 * SCALE, 0]} setScene={setScene} SCALE={SCALE} />
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

import { FormControl, FormHelperText, FormLabel, Input, Skeleton, Stack, Typography } from "@mui/joy";
import SingleFoldPageUIWrapper from "../../components/SingleFoldPageUIWrapper";
import { Canvas } from "@react-three/fiber";
import { Vector3 } from "three";
import Skyline3d from "../../components/Skyline3D";
import { getFirstDayOfYearFromLastDay, structureTimelineByWeek } from "../../utils/generateContributionTimeline";
import { useEffect, useState } from "react";
import { getUserContributions } from "../../utils/getUserContributions";

function SkylinePage({ username }: { username: string }) {
	const [timeline, setTimeline] = useState<number[][]>();
	const [errorMessage, setErrorMessage] = useState("");

	const currentDate = new Date();
	const minDate = '2008-01-01';
	const maxDate = `${currentDate.getFullYear()}-12-31`;
	const [endDate, setEndDate] = useState(currentDate);
	const [dateErr, setDateErr] = useState("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const enteredDate = new Date(e.target.value);
		const minDateObj = new Date(minDate)
		const maxDateObj = new Date(maxDate)
		if (enteredDate < minDateObj || enteredDate > maxDateObj) {
			// Show an error message or handle out-of-range input as needed
			const errMsg = `Valid dates: ${minDateObj.getFullYear()}-${maxDateObj.getFullYear()}`
			console.error(`Invalid date: out of range (${minDateObj.getFullYear()}-${maxDateObj.getFullYear()})`);
			setDateErr(errMsg);
		} else {
			setDateErr("")
			setEndDate(enteredDate);
		}
	};

	useEffect(() => {
		if (!username || username === "") {
			window.location.href = `/?err=${encodeURIComponent("Please enter a username")}`
			setErrorMessage(`No username provided!`);
			return;
		}
		getUserContributions(username, endDate).then((userContributions) => {
			const weekWiseTimeline = structureTimelineByWeek(userContributions);
			setTimeline(weekWiseTimeline);
		}).catch((err: Error) => {
			console.error('Error in getting data:', err);
			const errorMsg = `Error in getting data: ${err.message}`
			window.location.href = `/?err=${encodeURIComponent(errorMsg)}`
			setErrorMessage(errorMsg);
		})
	}, [username, endDate])

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
				<Stack sx={{ display: 'flex', flexDirection: 'row', gap: 2, mx: 'auto' }}>
					<FormControl error={dateErr && dateErr !== "" ? true : false}>
						<FormLabel>Username:</FormLabel>
						<Input type="text" disabled value={username} />
					</FormControl>
					<FormControl error={dateErr && dateErr !== "" ? true : false}>
						<FormLabel>Start Date:</FormLabel>
						<Input type="date" disabled value={getFirstDayOfYearFromLastDay(endDate).toISOString().split('T')[0]} />
					</FormControl>
					<FormControl error={dateErr && dateErr !== "" ? true : false}>
						<FormLabel>End Date:</FormLabel>
						<Input
							type="date"
							slotProps={{
								input: {
									min: '2008-01-01',
									max: `${new Date().getFullYear()}-12-31`,
								}
							}}
							defaultValue={currentDate.toISOString().split('T')[0]}
							onChange={handleChange}
						/>
						{dateErr && dateErr !== "" && (
							<FormHelperText>{dateErr}</FormHelperText>
						)}
					</FormControl>
				</Stack>
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
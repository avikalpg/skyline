import { FormLabel, Grid, Input, Option, Select } from "@mui/joy";
import { formatDate } from "src/utils/generateContributionTimeline";
import { Skyline3DPrintColor } from "src/types/ship";
import PrintSampleViewer from './PrintSampleViewer';

export default function FinalizeSkyline({ username, startDate, endDate, color, setColor, customMessage, setCustomMessage }: {
	username: string;
	startDate: Date;
	endDate: Date;
	color: Skyline3DPrintColor;
	setColor: (color: Skyline3DPrintColor) => void;
	customMessage: string;
	setCustomMessage: (message: string) => void;
}) {
	const colorOptions: Skyline3DPrintColor[] = [
		{ value: "grey", label: "Grey" },
		{ value: "red", label: "Red" },
		{ value: "blue", label: "Blue" },
		{ value: "pink", label: "Pink" },
		{ value: "orange", label: "Orange" },
	]
	const CUSTOM_MESSAGE_MAX_LENGTH = 35;

	return (
		<Grid container spacing={2} sx={{ mt: 2, flex: 1 }}>
			<Grid item xs={12} md={6}>
				<FormLabel>Username</FormLabel>
				<Input value={username} disabled fullWidth />
				<FormLabel sx={{ mt: 2 }}>Date Range</FormLabel>
				<Input value={`${startDate.toDateString()} - ${endDate.toDateString()}`} disabled fullWidth />
				<FormLabel sx={{ mt: 2 }}>Custom Message (optional)</FormLabel>
				<Input
					placeholder="Contributor of the year!"
					fullWidth
					onChange={(e) => setCustomMessage(e.target.value.slice(0, CUSTOM_MESSAGE_MAX_LENGTH))}
					value={customMessage}
					endDecorator={<span>{customMessage.length}/{CUSTOM_MESSAGE_MAX_LENGTH}</span>}
					error={customMessage.length >= CUSTOM_MESSAGE_MAX_LENGTH}
				/>
				<FormLabel sx={{ mt: 2 }}>Color</FormLabel>
				<Select
					value={color.value}
					onChange={(e, newValue) => {
						const selectedColor = colorOptions.find(c => c.value === newValue)
						if (selectedColor) setColor(selectedColor)
					}}
					sx={{ width: '100%' }}
				>
					{colorOptions.map((option) => (
						<Option key={option.value} value={option.value}>{option.label}</Option>
					))}
				</Select>
				<PrintSampleViewer color={color.value} />
			</Grid>
			<Grid item xs={12} md={6}>
				<iframe
					src={`/${username}/embed?endDate=${formatDate(endDate)}&color=${color.value}&customMessage=${encodeURIComponent(customMessage)}&sunlight=false&indoorLights=true`}
					width="100%"
					height="100%"
				></iframe>
			</Grid>
		</Grid>
	);
}
import { useState } from 'react';
import { IconButton, Modal, Typography, Button, Stack, Stepper, Step, StepIndicator } from '@mui/joy';
import { ArrowBack, ArrowForward, Check, Close, LocalShipping } from '@mui/icons-material';
import FinalizeSkyline from './FinalizeSkyline';
import ShippingDetails from './ShippingDetails';
import ReviewOrderAndPay from './ReviewOrderAndPay';
import { ShippingAddress } from 'src/types/ship';

export function ShipButton({ username, startDate, endDate }: {
	username: string;
	startDate: Date;
	endDate: Date;
}) {
	const steps = [
		'Finalize your 3D skyline',
		'Enter shipping details',
		'Review your order & pay',
	]
	const [open, setOpen] = useState(false);
	const [activeStep, setActiveStep] = useState(0);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleNext = () => {
		setActiveStep(prev => Math.min(steps.length, prev + 1));
	};

	const handleBack = () => {
		setActiveStep(prev => Math.max(0, prev - 1));
	};

	const [color, setColor] = useState({ label: 'grey', value: 'grey' });
	const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
		name: '',
		mobile: '',
		building: '',
		street: '',
		city: '',
		state: '',
		zip: '',
		country: 'India'
	});

	return (
		<div>
			<IconButton variant="contained" onClick={handleClickOpen}>
				<LocalShipping />
			</IconButton>
			<Modal open={open} onClose={handleClose}>
				<Stack
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						width: "80%",
						minHeight: "70vh",
						maxHeight: "90%",
						overflow: 'auto',
						boxShadow: 24,
						p: 4,
						borderRadius: '6px',
						bgcolor: 'background.surface',
					}}
				>
					<Stack direction="row" spacing={2} sx={{ mb: 2, justifyContent: 'space-between' }}>
						<Typography level="h4" component="h2">
							Get your 3D-printed Skyline shipped to you!
						</Typography>
						<IconButton onClick={handleClose} variant="plain" color="primary" sx={{ mt: 2 }}>
							<Close />
						</IconButton>
					</Stack>

					<Stepper activeStep={activeStep} sx={{ my: 2 }}>
						{steps.map((label, index) => (
							<Step key={label} completed={index < activeStep} indicator={
								<StepIndicator variant={(index < activeStep) ? "solid" : "soft"} color="primary">
									{(index < activeStep) && <Check />}
								</StepIndicator>
							}>
								{label}
							</Step>
						))}
					</Stepper>
					{activeStep === 0 && (<FinalizeSkyline username={username} startDate={startDate} endDate={endDate} color={color} setColor={setColor} />)}
					{activeStep === 1 && (<ShippingDetails address={shippingAddress} setAddress={setShippingAddress} />)}
					{activeStep === 2 && (<ReviewOrderAndPay username={username} startDate={startDate} endDate={endDate} color={color} shippingAddress={shippingAddress} />)}
					<Stack direction="row" spacing={1} sx={{ mt: 4, justifyContent: 'space-between' }}>
						<Button onClick={handleBack} variant="soft" color="primary" startDecorator={<ArrowBack />} sx={{ mt: 2 }}>
							Back
						</Button>
						{(activeStep < steps.length - 1) && (
							<Button onClick={handleNext} variant="soft" color="primary" endDecorator={<ArrowForward />} sx={{ mt: 2 }}>
								Next
							</Button>
						)}
					</Stack>
				</Stack>
			</Modal>
		</div>
	);
};
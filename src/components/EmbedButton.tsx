import React, { useState } from 'react';
import { IconButton, Modal, Box, Typography, Textarea, Button, Stack } from '@mui/joy';
import { Close, Code } from '@mui/icons-material';

export function EmbedButton({ username, endDate }: {
	username: string;
	endDate: string;
}) {
	const [open, setOpen] = useState(false);
	const embedCode = `<iframe
		src="https://gitskyline.vercel.app/${username}/embed?endDate=${endDate}&enableZoom=false"
		width="100%"
		height="100%"
		frameborder="0"
	></iframe>`;

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<IconButton variant="contained" onClick={handleClickOpen}>
				<Code />
			</IconButton>
			<Modal open={open} onClose={handleClose}>
				<Stack
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						width: 400,
						boxShadow: 24,
						p: 4,
						borderRadius: 2,
						bgcolor: 'background.surface',
					}}
				>
					<Typography level="h6" component="h2">
						Embed 3D Skyline
					</Typography>
					<Typography sx={{ mt: 2 }}>
						To embed the 3D skyline into your website, use the following iframe code:
					</Typography>
					<Textarea
						minRows={4}
						fullWidth
						variant="outlined"
						value={embedCode}
						readOnly
						sx={{ my: 2 }}
					/>
					<Button onClick={handleClose} color="primary" startDecorator={<Close />}>
						Close
					</Button>
				</Stack>
			</Modal>
		</div>
	);
};
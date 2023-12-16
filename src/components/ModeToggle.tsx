"use client"

import React from 'react';
import { useColorScheme } from '@mui/joy/styles';
import { DarkMode, LightMode } from "@mui/icons-material";
import Switch from '@mui/joy/Switch';

function ModeToggle() {
	const { mode, setMode } = useColorScheme();
	const [mounted, setMounted] = React.useState(false);

	// necessary for server-side rendering
	// because mode is undefined on the server
	React.useEffect(() => {
		setMounted(true);
	}, []);
	if (!mounted) {
		return (
			<div className='w-full h-8'></div>
		);
	}

	return (
		<Switch
			color="neutral"
			slotProps={{
				track: {
					children: (
						<React.Fragment>
							<DarkMode />
							<LightMode />
						</React.Fragment>
					),
					sx: {
						justifyContent: 'space-around',
					},
				},
			}}
			sx={{
				'--Switch-thumbSize': '24px',
				'--Switch-trackWidth': '64px',
				'--Switch-trackHeight': '32px',
				mx: 'auto',
				textAlign: 'start'
			}}
			checked={mode === 'light'}
			onChange={() => setMode(mode === 'light' ? 'dark' : 'light')}
		/>
	);
}

export default ModeToggle;
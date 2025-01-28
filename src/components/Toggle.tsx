import React from 'react';
import Switch from '@mui/joy/Switch';

function Toggle({ state, setState, onComponent, offComponent }: {
	state: boolean,
	setState: (state: boolean) => void,
	onComponent: React.ReactNode,
	offComponent: React.ReactNode,
}) {
	return (
		<Switch
			color="neutral"
			slotProps={{
				track: {
					children: (
						<React.Fragment>
							{offComponent}
							{onComponent}
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
				ml: '10px',
				mr: '10px',
				px: '5px',
				textAlign: 'start'
			}}
			checked={state}
			onChange={() => setState(!state)}
		/>
	);
}

export default Toggle;
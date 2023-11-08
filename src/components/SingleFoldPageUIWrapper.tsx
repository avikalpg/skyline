import Sheet from '@mui/joy/Sheet';
import ModeToggle from "../components/ModeToggle";
import { PropsWithChildren } from 'react';

function SingleFoldPageUIWrapper(props: PropsWithChildren) {
	return (
		<Sheet variant='soft' sx={{
			width: '100%',
			height: '100vh',
			mx: 'auto', // margin left & right
			py: 3, // padding top & bottom
			px: 2, // padding left & right
			display: 'flex',
			flexDirection: 'column',
			gap: 10,
			boxSizing: 'border-box',
			textAlign: 'center'
		}}>
			<ModeToggle />
			{props.children}
		</Sheet>
	)
}

export default SingleFoldPageUIWrapper;
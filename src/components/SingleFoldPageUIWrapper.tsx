import Sheet from '@mui/joy/Sheet';
import { PropsWithChildren } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Box } from '@mui/joy';

function SingleFoldPageUIWrapper(props: PropsWithChildren) {
	return (
		<Sheet variant='soft' sx={{
			width: '100%',
			height: '100vh',
			mx: 'auto', // margin left & right
			display: 'flex',
			flexDirection: 'column',
			gap: '2px',
			boxSizing: 'border-box',
			textAlign: 'center'
		}}>
			<Header />
			<Box sx={{
				flex: 1,
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				gap: '2em',
				px: '2em',
				py: '2em',
			}}>
				{props.children}
			</Box>
			<Footer />
		</Sheet>
	)
}

export default SingleFoldPageUIWrapper;
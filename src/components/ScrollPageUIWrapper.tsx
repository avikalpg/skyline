import Sheet from '@mui/joy/Sheet';
import { PropsWithChildren } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

function ScrollPageUIWrapper(props: PropsWithChildren) {
	return (
		<Sheet variant='soft' sx={{
			width: '100%',
			minHeight: '100vh',
			mx: 'auto',
			display: 'flex',
			flexDirection: 'column',
			gap: '2px',
			boxSizing: 'border-box',
		}}>
			<Header />
			<div style={{
				flex: 1,
				display: 'flex',
				flexDirection: 'column',
				padding: '2em',
			}}>
				{props.children}
			</div>
			<Footer />
		</Sheet>
	)
}

export default ScrollPageUIWrapper;
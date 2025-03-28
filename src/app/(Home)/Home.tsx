'use client';

import Typography from '@mui/joy/Typography';
import UsernameSearchBar from '../../components/UsernameSearchBar';
import SingleFoldPageUIWrapper from '../../components/SingleFoldPageUIWrapper';
import { Suspense } from 'react';

function Home() {
	return (
		<SingleFoldPageUIWrapper>
			<div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
				<Typography level="h1" component="h1">
					Your GitHub story in 3D
				</Typography>
				<Typography level="body-sm">View a 3D model of your GitHub contribution graph.</Typography>
				<Typography level="body-sm">Share it, print it, and more!</Typography>
			</div>

			<Suspense fallback={<div>Loading...</div>}>
				<UsernameSearchBar />
			</Suspense>
		</SingleFoldPageUIWrapper>
	);
}

export default Home;

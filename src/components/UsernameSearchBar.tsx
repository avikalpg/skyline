import React from 'react';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import { Stack, Typography } from '@mui/joy';
import { useSearchParams } from 'next/navigation';

function UsernameSearchBar() {
	const searchParams = useSearchParams();
	const [username, setUsername] = React.useState("");
	const [errorMessage, setErrorMessage] = React.useState(searchParams.get('err'));

	const getGitHubContributions = () => {
		if (username === "") {
			setErrorMessage(`Please enter a username.`);
			return;
		}
		window.location.href = `/${username}`;
	}

	return (
		<Stack>
			<Input
				id='searchUser'
				name="githubHandle"
				type="text"
				autoComplete='off'
				required
				placeholder="github_username"
				size="md"
				endDecorator={
					<Button variant='plain' size="sm" onClick={getGitHubContributions}>
						Create a Skyline --&gt;
					</Button>
				}
				sx={{
					width: '100%',
					maxWidth: 500,
					mx: 'auto',
					'--Input-radius': `16px`,
					'--Input-decoratorChildHeight': `28px`,
				}}
				onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)}
			/>
			{(!errorMessage || errorMessage === "") ? null : (
				<Typography color='danger' level='body-md' variant='soft' sx={{
					px: 2,
					width: 'auto'
				}}>{errorMessage}</Typography>
			)}
		</Stack>
	);
}

export default UsernameSearchBar;
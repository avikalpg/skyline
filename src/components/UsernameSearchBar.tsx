import React from 'react';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import { getUserEvents } from '../utils/getUserEvents';
import { generateContributionTimeline } from '../utils/generateContributionTimeline';
import { Stack, Typography } from '@mui/joy';


function UsernameSearchBar() {
	const [username, setUsername] = React.useState("");
	const [errorMessage, setErrorMessage] = React.useState("");

	const getGitHubContributions = () => { // TODO: take the event types
		if (username === "") {
			setErrorMessage(`Please enter a username.`);
			return;
		}
		getUserEvents(username)
			.then((userEvents) => {
				// groupEventsByType(userEvents)
				const timeline = generateContributionTimeline(userEvents);
				if (timeline) {
					localStorage.setItem("data", JSON.stringify({ username, timeline }))
					window.location.href = '/skyline'
				}
				else {
					setErrorMessage(`We did not find any @${username} on GitHub, try it again.`)
				}
			})
			.catch(err => {
				console.error('Error in getting data:', err);
			})
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
					<Button variant="soft" size="sm" onClick={getGitHubContributions}>
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
				onChange={(event) => setUsername(event.target.value)}
			/>
			{(errorMessage === "") ? null : (
				<Typography color='danger' level='body-md' variant='soft' sx={{
					px: 2,
					width: 'auto'
				}}>{errorMessage}</Typography>
			)}
		</Stack>
	);
}

export default UsernameSearchBar;
import React from 'react';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import { getUserEvents } from '../utils/getUserEvents';
import { generateContributionTimeline, groupEventsByType } from '../utils/generateContributionTimeline';

function UsernameSearchBar() {
	const [username, setUsername] = React.useState("");

	const getGitHubContributions = () => { // TODO: take the event types
		console.log("Not implemented.")
	}

	return (
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
				width: 500,
				mx: 'auto',
				'--Input-radius': `16px`,
				'--Input-decoratorChildHeight': `28px`,
			}}
			onChange={(event) => setUsername(event.target.value)}
		/>
	);
}

export default UsernameSearchBar;
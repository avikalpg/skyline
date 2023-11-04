import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import ModeToggle from "../components/ModeToggle";

function App() {
	return (
		<CssVarsProvider>
			<Sheet variant='soft' sx={{
				minWidth: 500,
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
				<div>
					<Typography level="h1" component="h1">
						Your GitHub story in 3D
					</Typography>
					<Typography level="body-sm">View a 3D model of your GitHub contribution graph.</Typography>
					<Typography level="body-sm">Share it, print it, and more!</Typography>
				</div>

				<Input
					id='searchUser'
					name="githubHandle"
					type="text"
					autoComplete='off'
					required
					placeholder="github_username"
					size="md"
					endDecorator={
						<Button variant="soft" size="sm">
							Create a Skyline --&gt;
						</Button>
					}
					sx={{
						width: 500,
						mx: 'auto',
						'--Input-radius': `16px`,
						'--Input-decoratorChildHeight': `28px`,
					}}
				/>

			</Sheet>
		</CssVarsProvider>
	);
}

export default App;

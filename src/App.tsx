import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import { CssVarsProvider } from '@mui/joy/styles';
import SkylinePage from './pages/SkylinePage';

function App() {
	return (
		<CssVarsProvider>
			<Router>
				<Routes>
					<Route path="/" Component={Home} />
					<Route path="/skyline" Component={SkylinePage} />
				</Routes>
			</Router>
		</CssVarsProvider>
	);
}

export default App;
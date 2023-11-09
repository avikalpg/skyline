import { Routes, Route, HashRouter } from 'react-router-dom';
import Home from './pages/Home';
import { CssVarsProvider } from '@mui/joy/styles';
import SkylinePage from './pages/SkylinePage';

function App() {
	return (
		<CssVarsProvider>
			<HashRouter>
				<Routes>
					<Route path="/" Component={Home} />
					<Route path="/skyline" Component={Home} />
					<Route path="/skyline/:username" Component={SkylinePage} />
				</Routes>
			</HashRouter>
		</CssVarsProvider>
	);
}

export default App;
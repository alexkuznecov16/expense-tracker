import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Header from './components/Header';
import ExpensesPage from './pages/ExpensesPage';
import AuthPage from './pages/AuthPage';

const ProtectedRoute = ({element}: {element: React.ReactElement}) => {
	const isAuthenticated = !!localStorage.getItem('token');

	return isAuthenticated ? element : <Navigate to='/auth' replace />;
};

function App() {
	return (
		<Router>
			<Header />
			<main className='main-content'>
				<Routes>
					<Route path='/' element={<ProtectedRoute element={<ExpensesPage />} />} />
					<Route path='/auth' element={<AuthPage />} />
					<Route path='*' element={<Navigate to='/' replace />} />
				</Routes>
			</main>
		</Router>
	);
}

export default App;

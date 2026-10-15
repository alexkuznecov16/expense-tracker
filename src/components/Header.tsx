import {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import '../styles/Header.scss';

const Header = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('token'));

	useEffect(() => {
		const handleAuthChange = () => {
			setIsAuthenticated(!!localStorage.getItem('token'));
		};

		window.addEventListener('auth-change', handleAuthChange);
		return () => window.removeEventListener('auth-change', handleAuthChange);
	}, []);

	const handleLogOut = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		window.dispatchEvent(new Event('auth-change'));

		navigate('/auth');
	};

	return (
		<header className='expenses-header'>
			<div className='expenses-header__container'>
				<div className='expenses-header__brand'>
					<h1 className='expenses-header__title'>Expense Tracker</h1>
					<p className='expenses-header__subtitle'>Manage and track your expenses</p>
				</div>

				<nav className='expenses-header__nav'>
					<Link to='/' className={`expenses-header__link ${location.pathname === '/' ? 'expenses-header__link--active' : ''}`}>
						Home
					</Link>

					{isAuthenticated ? (
						<button onClick={handleLogOut} className='expenses-header__auth-btn expenses-header__auth-btn--logout'>
							Log Out
						</button>
					) : (
						<Link to='/auth' className={`expenses-header__auth-btn ${location.pathname === '/auth' ? 'expenses-header__auth-btn--active' : ''}`}>
							Sign In
						</Link>
					)}
				</nav>
			</div>
		</header>
	);
};

export default Header;

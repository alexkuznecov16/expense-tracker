import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Notification from '../components/Notification';
import '../styles/AuthPage.scss';

type NotificationState = {
	success: boolean;
	message: string;
} | null;

const AuthPage = () => {
	const [isLogin, setIsLogin] = useState(true);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const [notification, setNotification] = useState<NotificationState>(null);
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setNotification(null);

		const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';

		try {
			const response = await fetch(`http://localhost:3000${endpoint}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({username, password}),
			});

			const data = await response.json();

			if (!response.ok) {
				setNotification({
					success: false,
					message: data.message || 'Authentication failed!',
				});
				return;
			}

			setNotification({
				success: true,
				message: isLogin ? 'Login successful! Redirecting...' : 'Registration successful! You can now log in.',
			});

			if (isLogin) {
				localStorage.setItem('token', data.token);
				if (data.user) {
					localStorage.setItem('user', JSON.stringify(data.user));
				}

				window.dispatchEvent(new Event('auth-change'));

				setTimeout(() => {
					navigate('/');
				}, 500);
			} else {
				setTimeout(() => {
					setIsLogin(true);
					setPassword('');
					setNotification(null);
				}, 500);
			}
		} catch (error) {
			console.error(error);
			setNotification({
				success: false,
				message: 'Server connection error. Please try again later.',
			});
		}
	};

	return (
		<div className='auth-container'>
			{notification && <Notification success={notification.success} message={notification.message} onClose={() => setNotification(null)} />}

			<div className='auth-card'>
				<div className='auth-card__header'>
					<h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
					<p>{isLogin ? 'Enter your details to access your tracker' : 'Sign up to start managing your expenses'}</p>
				</div>

				<form className='auth-form' onSubmit={handleSubmit}>
					<div className='auth-form__group'>
						<label htmlFor='username'>Username</label>
						<input type='text' id='username' placeholder='Enter your username' value={username} onChange={e => setUsername(e.target.value)} required />
					</div>

					<div className='auth-form__group'>
						<label htmlFor='password'>Password</label>
						<input type='password' id='password' placeholder='••••••••' value={password} onChange={e => setPassword(e.target.value)} required />
					</div>

					<button type='submit' className='auth-form__submit'>
						{isLogin ? 'Sign In' : 'Sign Up'}
					</button>
				</form>

				<div className='auth-card__footer'>
					<span>{isLogin ? "Don't have an account?" : 'Already have an account?'}</span>
					<button className='auth-card__toggle-btn' onClick={() => setIsLogin(!isLogin)}>
						{isLogin ? 'Register here' : 'Login here'}
					</button>
				</div>
			</div>
		</div>
	);
};

export default AuthPage;

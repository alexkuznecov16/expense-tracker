import {useEffect, useState} from 'react';
import '../styles/Notification.scss';

type NotificationProps = {
	success: boolean;
	message: string;
	onClose: () => void;
};

const Notification = ({success, message, onClose}: NotificationProps) => {
	const [progress, setProgress] = useState(100);

	useEffect(() => {
		const duration = 3000;
		const intervalTime = 30;

		const interval = setInterval(() => {
			setProgress(prev => {
				const nextValue = prev - (intervalTime / duration) * 100;

				if (nextValue <= 0) {
					clearInterval(interval);
					onClose();

					return 0;
				}

				return nextValue;
			});
		}, intervalTime);

		return () => {
			clearInterval(interval);
		};
	}, [onClose]);

	return (
		<div className={`notification-block ${success ? 'success' : 'error'}`}>
			<div className='notification-block__content'>
				<span className='notification-block__icon'>{success ? '✓' : '×'}</span>

				<div className='notification-block__text'>
					<p className='notification-block__title'>{success ? 'Success' : 'Error'}</p>

					<p className='notification-block__message'>{message}</p>
				</div>
			</div>

			<div className='notification-block__progress'>
				<div className='notification-block__progress-bar' style={{width: `${progress}%`}} />
			</div>
		</div>
	);
};

export default Notification;

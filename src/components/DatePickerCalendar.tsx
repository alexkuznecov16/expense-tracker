import {getFirstDayOfMonth, getDaysInMonth, formatDate} from '../utils/dateUtils';

type DatePickerCalendarProps = {
	currentDate: Date;
	value: string;
	onChange: (date: string) => void;
	onPreviousMonth: () => void;
	onNextMonth: () => void;
};

const DatePickerCalendar = ({currentDate, value, onChange, onPreviousMonth, onNextMonth}: DatePickerCalendarProps) => {
	const month = currentDate.getMonth();
	const year = currentDate.getFullYear();

	const monthName = currentDate.toLocaleString('en-US', {
		month: 'long',
	});

	const firstDay = getFirstDayOfMonth(year, month);
	const daysInMonth = getDaysInMonth(year, month);

	const days = [];

	for (let i = 0; i < firstDay; i++) {
		days.push(<div key={`empty-${i}`} className='date-picker__day date-picker__day--empty' />);
	}

	for (let day = 1; day <= daysInMonth; day++) {
		const date = formatDate(year, month, day);

		const isSelected = date === value;

		days.push(
			<button key={day} type='button' className={`date-picker__day ${isSelected ? 'date-picker__day--selected' : ''}`} onClick={() => onChange(date)}>
				{day}
			</button>,
		);
	}

	return (
		<div className='date-picker__calendar'>
			<div className='date-picker__header'>
				<button type='button' className='date-picker__navigation' onClick={onPreviousMonth}>
					←
				</button>

				<span className='date-picker__month'>
					{monthName} {year}
				</span>

				<button type='button' className='date-picker__navigation' onClick={onNextMonth}>
					→
				</button>
			</div>

			<div className='date-picker__weekdays'>
				<span>Su</span>
				<span>Mo</span>
				<span>Tu</span>
				<span>We</span>
				<span>Th</span>
				<span>Fr</span>
				<span>Sa</span>
			</div>

			<div className='date-picker__days'>{days}</div>
		</div>
	);
};

export default DatePickerCalendar;

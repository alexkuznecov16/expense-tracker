import {useState} from 'react';

import DatePickerCalendar from './DatePickerCalendar';

import '../styles/DatePicker.scss';

type DatePickerProps = {
	value: string;
	onChange: (date: string) => void;
};

const DatePicker = ({value, onChange}: DatePickerProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const selectedDate = value ? new Date(`${value}T00:00:00`) : new Date();

	const [currentDate, setCurrentDate] = useState(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));

	const previousMonth = () => {
		setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
	};

	const nextMonth = () => {
		setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
	};

	const selectDate = (date: string) => {
		onChange(date);
		setIsOpen(false);
	};

	return (
		<div className='date-picker'>
			<button type='button' className='date-picker__input' onClick={() => setIsOpen(!isOpen)}>
				<span className='date-picker__icon'>📅</span>

				<span className={value ? 'date-picker__value' : 'date-picker__placeholder'}>{value || 'Select date'}</span>
			</button>

			{isOpen && <DatePickerCalendar currentDate={currentDate} value={value} onChange={selectDate} onPreviousMonth={previousMonth} onNextMonth={nextMonth} />}
		</div>
	);
};

export default DatePicker;

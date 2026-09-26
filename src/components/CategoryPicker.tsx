import {useState} from 'react';
import CategoryPickerOptions from './CategoryPickerOptions';
import '../styles/CategoryPicker.scss';

type CategoryPickerProps = {value: string; onChange: (category: string) => void};

const CategoryPicker = ({value, onChange}: CategoryPickerProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const selectCategory = (category: string) => {
		onChange(category);
		setIsOpen(false);
	};

	return (
		<div className='category-picker'>
			<button type='button' className='category-picker__input' onClick={() => setIsOpen(!isOpen)}>
				<span className={value ? 'category-picker__value' : 'category-picker__placeholder'}> {value || 'Select category'} </span> <span className='category-picker__icon'> {isOpen ? '▲' : '▼'} </span>
			</button>
			{isOpen && <CategoryPickerOptions value={value} onChange={selectCategory} />}
		</div>
	);
};

export default CategoryPicker;

import {categories, type Category} from '../utils/categoryUtils';
type CategoryPickerOptionsProps = {value: string; onChange: (category: Category) => void};
const CategoryPickerOptions = ({value, onChange}: CategoryPickerOptionsProps) => {
	return (
		<div className='category-picker__options'>
			{' '}
			{categories.map(category => (
				<button key={category} type='button' className={`category-picker__option ${category === value ? 'category-picker__option--selected' : ''}`} onClick={() => onChange(category)}>
					{' '}
					{category}{' '}
				</button>
			))}{' '}
		</div>
	);
};
export default CategoryPickerOptions;

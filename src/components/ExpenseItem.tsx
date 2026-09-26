import type {ExpenseItemProps} from '../types/expense';
import '../styles/ExpenseItem.scss';

const ExpenseItem = ({expense}: ExpenseItemProps) => {
	const formattedTitle = expense.title.length > 10 ? `${expense.title.slice(0, 10)}...` : expense.title;

	return (
		<>
			<div className='expense-item'>
				<div className='expense-item__row'>
					<span className='expense-item__label'>Title</span>
					<span className='expense-item__value'>{formattedTitle}</span>
				</div>

				<div className='expense-item__row'>
					<span className='expense-item__label'>Amount</span>
					<span className='expense-item__value expense-item__amount'>€{expense.amount}</span>
				</div>

				<div className='expense-item__row'>
					<span className='expense-item__label'>Category</span>
					<span className='expense-item__value'>{expense.category}</span>
				</div>

				<div className='expense-item__row'>
					<span className='expense-item__label'>Date</span>
					<span className='expense-item__value'>{expense.expense_date}</span>
				</div>
			</div>
		</>
	);
};

export default ExpenseItem;

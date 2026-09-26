import type {ExpenseListProps} from '../types/expense';
import ExpenseCard from './ExpenseCard';
import '../styles/ExpenseList.scss';

const ExpenseList = ({expenses, onExpenseDeleted, onNotification}: ExpenseListProps) => {
	return (
		<div className='expense-list'>
			{expenses.map(expense => (
				<ExpenseCard key={expense.id} expense={expense} onExpenseDeleted={onExpenseDeleted} onNotification={onNotification} />
			))}
		</div>
	);
};

export default ExpenseList;

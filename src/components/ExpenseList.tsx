import type {ExpenseListProps} from '../types/expense';
import ExpenseCard from './ExpenseCard';
import '../styles/ExpenseList.scss';

const ExpenseList = ({expenses, onExpenseDeleted, onNotification, onEdit}: ExpenseListProps) => {
	if (expenses.length === 0) {
		return <div className='expense-list__empty'>No expenses yet.</div>;
	}

	return (
		<div className='expense-list'>
			{expenses.map(expense => (
				<ExpenseCard key={expense.id} expense={expense} onExpenseDeleted={onExpenseDeleted} onNotification={onNotification} onEdit={onEdit} />
			))}
		</div>
	);
};

export default ExpenseList;

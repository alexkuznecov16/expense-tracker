import type {ExpenseListProps} from '../types/expense';
import ExpenseCard from './ExpenseCard';
import '../styles/ExpenseList.scss';

const ExpenseList = ({expenses, onExpenseDeleted, onNotification}: ExpenseListProps) => {
	return (
		<>
			{expenses.map(expense => (
				<ExpenseCard key={expense.id} expense={expense} onExpenseDeleted={onExpenseDeleted} onNotification={onNotification} />
			))}
		</>
	);
};

export default ExpenseList;

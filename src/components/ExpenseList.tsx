import type {ExpenseListProps} from '../types/expense';
import ExpenseCard from './ExpenseCard';

const ExpenseList = ({expenses, onExpenseDeleted}: ExpenseListProps) => {
	return (
		<>
			{expenses.map(expense => (
				<ExpenseCard key={expense.id} expense={expense} onExpenseDeleted={onExpenseDeleted} />
			))}
		</>
	);
};

export default ExpenseList;

import type {ExpenseListProps} from '../types/expense';
import ExpenseCard from './ExpenseCard';

const ExpenseList = ({expenses}: ExpenseListProps) => {
	return (
		<>
			{expenses.map(expense => (
				<ExpenseCard key={expense.id} expense={expense} />
			))}
		</>
	);
};

export default ExpenseList;

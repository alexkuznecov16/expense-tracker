import type {ExpenseCardProps} from '../types/expense';

const ExpenseItem = ({expense}: ExpenseCardProps) => {
	return (
		<>
			<p>
				Title: <span>{expense.title}</span>
			</p>
			<p>
				Amount: <span>{expense.amount}</span>
			</p>
			<p>
				Category: <span>{expense.category}</span>
			</p>
			<p>
				Expense date: <span>{expense.expense_date}</span>
			</p>
		</>
	);
};

export default ExpenseItem;

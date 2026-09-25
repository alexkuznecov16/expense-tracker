import type {ExpenseCardProps} from '../types/expense';
import ExpenseItem from './ExpenseItem';
import {deleteExpense} from '../services/expenseService';

const ExpenseCard = ({expense, onExpenseDeleted}: ExpenseCardProps) => {
	const toDeleteExpense = async (expenseId: number) => {
		await deleteExpense(expenseId);

		await onExpenseDeleted();
	};

	return (
		<div style={{border: '2px solid #000', padding: '20px', position: 'relative'}}>
			<button type='button' style={{position: 'absolute', top: '5px', right: '5px', fontSize: '20px', color: '#000'}} onClick={() => toDeleteExpense(expense.id)}>
				x
			</button>
			<ExpenseItem expense={expense} />
		</div>
	);
};

export default ExpenseCard;

import type {ExpenseCardProps} from '../types/expense';
import ExpenseItem from './ExpenseItem';
import {deleteExpense} from '../services/expenseService';
import '../styles/ExpenseCard.scss';

const ExpenseCard = ({expense, onExpenseDeleted, onNotification, onEdit}: ExpenseCardProps) => {
	const toDeleteExpense = async (expenseId: number) => {
		try {
			await deleteExpense(expenseId);
			await onExpenseDeleted();
			onNotification(true, 'Expense deleted successfully!');
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (error) {
			onNotification(false, 'Failed to delete expense!');
		}
	};

	return (
		<div className='expense-card' onClick={() => onEdit(expense)}>
			<button
				className='expense-card__delete'
				type='button'
				onClick={e => {
					e.stopPropagation();
					toDeleteExpense(expense.id);
				}}
				aria-label={`Delete ${expense.title}`}
			>
				x
			</button>
			<ExpenseItem expense={expense} />
		</div>
	);
};

export default ExpenseCard;

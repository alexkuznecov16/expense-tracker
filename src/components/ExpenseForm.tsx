import {useState} from 'react';
import {createExpense} from '../services/expenseService';

const ExpenseForm = ({onExpenseCreated}: {onExpenseCreated: () => Promise<void>}) => {
	const [input, setInput] = useState({
		title: '',
		amount: 0,
		category: '',
		expense_date: '',
	});

	const toCreateExpense = async () => {
		await createExpense(input.title, input.amount, input.category, input.expense_date);

		await onExpenseCreated();
	};

	return (
		<form
			action='#'
			method='POST'
			onSubmit={e => {
				e.preventDefault();
				toCreateExpense();
			}}
		>
			<input type='text' name='title' id='title' onChange={e => setInput({...input, title: e.target.value})} value={input.title} />

			<input type='number' name='amount' id='amount' onChange={e => setInput({...input, amount: Number(e.target.value)})} value={input.amount} />

			<input type='text' name='category' id='category' onChange={e => setInput({...input, category: e.target.value})} value={input.category} />

			<input type='date' name='expense_date' id='expense_date' onChange={e => setInput({...input, expense_date: e.target.value})} value={input.expense_date} />

			<button type='submit'>Create</button>
		</form>
	);
};

export default ExpenseForm;

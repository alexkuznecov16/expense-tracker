import {useState} from 'react';
import {createExpense} from '../services/expenseService';
import type {ExpenseFormProps} from '../types/expense';

import '../styles/ExpenseForm.scss';
import DatePicker from './DatePicker';
import CategoryPicker from './CategoryPicker';

const ExpenseForm = ({onExpenseCreated, onNotification}: ExpenseFormProps) => {
	const [input, setInput] = useState({
		title: '',
		amount: NaN,
		category: '',
		expense_date: '',
	});

	const toCreateExpense = async () => {
		try {
			await createExpense(input.title, input.amount, input.category, input.expense_date);

			await onExpenseCreated();
			onNotification(true, 'Expense created successfully!');
			setInput({title: '', amount: NaN, category: '', expense_date: ''});
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (error) {
			onNotification(false, 'Failed to create expense!');
		}
	};

	return (
		<form
			className='expense-form'
			action='#'
			method='POST'
			onSubmit={e => {
				e.preventDefault();
				toCreateExpense();
			}}
		>
			<input className='expense-form__input' type='text' name='title' id='title' placeholder='Enter title' minLength={1} onChange={e => setInput({...input, title: e.target.value})} value={input.title} />

			{/* <input className='expense-form__input' type='number' name='amount' id='amount' placeholder='Enter amount' min={1} onChange={e => setInput({...input, amount: Number(e.target.value)})} value={input.amount} /> */}

			<div className='expense-form__amount'>
				{' '}
				<input className='expense-form__input' type='number' name='amount' id='amount' placeholder='Enter amount' min={1} onChange={e => setInput({...input, amount: Number(e.target.value)})} value={Number.isNaN(input.amount) ? '' : input.amount} />{' '}
				<div className='expense-form__amount-controls'>
					{' '}
					<button type='button' className='expense-form__amount-button' onClick={() => setInput({...input, amount: Number.isNaN(input.amount) ? 1 : input.amount + 1})}>
						{' '}
						▲{' '}
					</button>{' '}
					<button type='button' className='expense-form__amount-button' onClick={() => setInput({...input, amount: Number.isNaN(input.amount) ? 1 : Math.max(1, input.amount - 1)})}>
						{' '}
						▼{' '}
					</button>{' '}
				</div>{' '}
			</div>

			<CategoryPicker
				value={input.category}
				onChange={category =>
					setInput({
						...input,
						category,
					})
				}
			/>

			<DatePicker
				value={input.expense_date}
				onChange={date =>
					setInput({
						...input,
						expense_date: date,
					})
				}
			/>

			<button className='expense-form__button' type='submit'>
				Create
			</button>
		</form>
	);
};

export default ExpenseForm;

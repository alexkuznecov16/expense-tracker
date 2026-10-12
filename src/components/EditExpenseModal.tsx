import {useEffect, useState} from 'react';

import type {Expense} from '../types/expense';

import {changeExpense} from '../services/expenseService';

import DatePicker from './DatePicker';
import CategoryPicker from './CategoryPicker';

import '../styles/EditExpenseModal.scss';

type EditExpenseModalProps = {
	expense: Expense;
	onClose: () => void;
	onExpenseUpdated: () => Promise<void>;
	onNotification: (success: boolean, message: string) => void;
};

const EditExpenseModal = ({expense, onClose, onExpenseUpdated, onNotification}: EditExpenseModalProps) => {
	const [input, setInput] = useState({
		title: expense.title,
		amount: expense.amount,
		category: expense.category,
		expense_date: expense.expense_date,
	});

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setInput({
			title: expense.title,
			amount: expense.amount,
			category: expense.category,
			expense_date: expense.expense_date,
		});
	}, [expense]);

	const toUpdateExpense = async () => {
		try {
			await changeExpense(expense.id, input.title, input.amount, input.category, input.expense_date);

			await onExpenseUpdated();

			onNotification(true, 'Expense updated successfully!');

			onClose();
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (error) {
			onNotification(false, 'Failed to update expense!');
		}
	};

	return (
		<div className='edit-expense-modal' onClick={onClose}>
			<div className='edit-expense-modal__content' onClick={e => e.stopPropagation()}>
				<div className='edit-expense-modal__header'>
					<div>
						<h2 className='edit-expense-modal__title'>Edit expense</h2>

						<p className='edit-expense-modal__subtitle'>Change the information about this expense</p>
					</div>

					<button type='button' className='edit-expense-modal__close' onClick={onClose}>
						×
					</button>
				</div>

				<form
					className='edit-expense-modal__form'
					onSubmit={e => {
						e.preventDefault();
						toUpdateExpense();
					}}
				>
					<div className='edit-expense-modal__field'>
						<label className='edit-expense-modal__label' htmlFor='edit-title'>
							Title
						</label>

						<input
							className='edit-expense-modal__input'
							type='text'
							id='edit-title'
							placeholder='Enter title'
							minLength={1}
							value={input.title}
							onChange={e =>
								setInput({
									...input,
									title: e.target.value,
								})
							}
						/>
					</div>

					<div className='edit-expense-modal__field'>
						<label className='edit-expense-modal__label' htmlFor='edit-amount'>
							Amount
						</label>

						<div className='edit-expense-modal__amount'>
							<input
								className='edit-expense-modal__input'
								type='number'
								id='edit-amount'
								placeholder='Enter amount'
								min={1}
								value={Number.isNaN(input.amount) ? '' : input.amount}
								onChange={e =>
									setInput({
										...input,
										amount: Number(e.target.value),
									})
								}
							/>

							<div className='edit-expense-modal__amount-controls'>
								<button
									type='button'
									className='edit-expense-modal__amount-button'
									onClick={() =>
										setInput({
											...input,
											amount: Number.isNaN(input.amount) ? 1 : input.amount + 1,
										})
									}
								>
									▲
								</button>

								<button
									type='button'
									className='edit-expense-modal__amount-button'
									onClick={() =>
										setInput({
											...input,
											amount: Number.isNaN(input.amount) ? 1 : Math.max(1, input.amount - 1),
										})
									}
								>
									▼
								</button>
							</div>
						</div>
					</div>

					<div className='edit-expense-modal__field'>
						<label className='edit-expense-modal__label'>Category</label>

						<CategoryPicker
							value={input.category}
							onChange={category =>
								setInput({
									...input,
									category,
								})
							}
						/>
					</div>

					<div className='edit-expense-modal__field'>
						<label className='edit-expense-modal__label'>Date</label>

						<DatePicker
							value={input.expense_date}
							onChange={date =>
								setInput({
									...input,
									expense_date: date,
								})
							}
						/>
					</div>

					<div className='edit-expense-modal__actions'>
						<button type='button' className='edit-expense-modal__cancel' onClick={onClose}>
							Cancel
						</button>

						<button type='submit' className='edit-expense-modal__save'>
							Save changes
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default EditExpenseModal;

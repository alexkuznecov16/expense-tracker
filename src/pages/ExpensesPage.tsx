import ExpenseList from '../components/ExpenseList';
import ExpenseForm from '../components/ExpenseForm';
import '../styles/ExpensesPage.scss';
import useExpenses from '../hooks/useExpenses';
import Notification from '../components/Notification';
import {useState} from 'react';
import type {Expense} from '../types/expense';
import EditExpenseModal from '../components/EditExpenseModal';
import ExpenseStatistics from '../components/ExpenseStatistics';

type NotificationState = {success: boolean; message: string};

const ExpensesPage = () => {
	const {expenses, loading, error, loadExpenses} = useExpenses();
	const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
	const [notification, setNotification] = useState<NotificationState | null>(null);

	const showNotification = (success: boolean, message: string) => {
		setNotification({success, message});
	};

	return (
		<main className='expenses-page'>
			{notification && <Notification success={notification.success} message={notification.message} onClose={() => setNotification(null)} />}

			{editingExpense && <EditExpenseModal expense={editingExpense} onClose={() => setEditingExpense(null)} onExpenseUpdated={loadExpenses} onNotification={showNotification} />}
			<div className='expenses-page__container'>
				<div className='expenses-page__content'>
					<section className='expenses-page__form'>
						<ExpenseForm onExpenseCreated={loadExpenses} onNotification={showNotification} />
					</section>
					<section className='expenses-page__list'>
						{loading ? (
							<p>Loading expenses...</p>
						) : error ? (
							<div className='expenses-page__error-state'>
								<div className='expenses-page__error-icon'>⚡</div>
								<h3 className='expenses-page__error-title'>Connection Error</h3>
								<p className='expenses-page__error-message'>{error}</p>
								<button className='expenses-page__retry-btn' onClick={loadExpenses}>
									Try Again
								</button>
							</div>
						) : (
							<ExpenseList expenses={expenses} onExpenseDeleted={loadExpenses} onNotification={showNotification} onEdit={setEditingExpense} />
						)}
					</section>
				</div>
				<ExpenseStatistics expenses={expenses} />
			</div>
		</main>
	);
};

export default ExpensesPage;

import ExpenseList from '../components/ExpenseList';
import ExpenseForm from '../components/ExpenseForm';
import '../styles/ExpensesPage.scss';
import Header from '../components/Header';
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
				<Header />
				<div className='expenses-page__content'>
					<section className='expenses-page__form'>
						<ExpenseForm onExpenseCreated={loadExpenses} onNotification={showNotification} />
					</section>
					<section className='expenses-page__list'>{loading ? <p>Loading expenses...</p> : error ? <p>{error}</p> : <ExpenseList expenses={expenses} onExpenseDeleted={loadExpenses} onNotification={showNotification} onEdit={setEditingExpense} />}</section>
				</div>
				<ExpenseStatistics expenses={expenses} />
			</div>
		</main>
	);
};

export default ExpensesPage;

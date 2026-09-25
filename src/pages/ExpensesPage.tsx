import {getExpenses} from '../services/expenseService';
import {useState, useEffect} from 'react';
import type {Expense} from '../types/expense';
import ExpenseList from '../components/ExpenseList';
import ExpenseForm from '../components/ExpenseForm';

const ExpensesPage = () => {
	const [expenses, setExpenses] = useState<Expense[]>([]);

	const loadExpenses = async () => {
		setExpenses(await getExpenses());
	};

	useEffect(() => {
		loadExpenses();
	}, []);

	console.log(expenses);

	return (
		<div>
			<h1>Expenses:</h1>
			<div style={{display: 'flex', flexWrap: 'wrap'}}>
				<ExpenseForm onExpenseCreated={loadExpenses} />

				<ExpenseList expenses={expenses} />
			</div>
		</div>
	);
};

export default ExpensesPage;

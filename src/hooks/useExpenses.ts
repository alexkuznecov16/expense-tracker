import {useEffect, useState} from 'react';
import type {Expense} from '../types/expense';
import {getExpenses} from '../services/expenseService';

const useExpenses = () => {
	const [expenses, setExpenses] = useState<Expense[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const loadExpenses = async () => {
		setLoading(true);
		setError(null);
		try {
			setExpenses(await getExpenses());
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (error) {
			setError('Failed to connect to the database!');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		loadExpenses();
	}, []);

	return {
		expenses,
		loading,
    error,
		loadExpenses,
	};
};

export default useExpenses;

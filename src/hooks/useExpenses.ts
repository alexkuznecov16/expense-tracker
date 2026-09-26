import {useEffect, useState} from 'react';
import type {Expense} from '../types/expense';
import {getExpenses} from '../services/expenseService';

const useExpenses = () => {
	const [expenses, setExpenses] = useState<Expense[]>([]);

	const loadExpenses = async () => {
		setExpenses(await getExpenses());
	};

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		loadExpenses();
	}, []);

	return {
		expenses,
		loadExpenses,
	};
};

export default useExpenses;

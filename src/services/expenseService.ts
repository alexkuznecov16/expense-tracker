import type {Expense} from '../types/expense';

const BASE_URL = 'https://expense-tracker-chwk.onrender.com/api/expenses';

const getHeaders = () => {
	const token = localStorage.getItem('token');
	return {
		'Content-Type': 'application/json',
		// Inject the token using the Bearer schema if it exists
		...(token ? {Authorization: `Bearer ${token}`} : {}),
	};
};

// GET
export const getExpenses = async (): Promise<Expense[]> => {
	try {
		const response = await fetch(BASE_URL, {
			method: 'GET',
			headers: getHeaders(),
		});
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}

		const result = await response.json();
		return result;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

// GET
export const getExpenseById = async (id: number): Promise<Expense> => {
	try {
		const response = await fetch(`${BASE_URL}/${id}`, {
			method: 'GET',
			headers: getHeaders(),
		});

		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}

		const result = await response.json();
		return result;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

// POST
export const createExpense = async (title: string, amount: number, category: string, expense_date: string): Promise<{message: string}> => {
	try {
		const response = await fetch(BASE_URL, {
			method: 'POST',
			headers: getHeaders(),
			body: JSON.stringify({
				title,
				amount,
				category,
				expense_date,
			}),
		});

		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}

		const result = await response.json();
		return result;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

// PUT
export const changeExpense = async (id: number, title: string, amount: number, category: string, expense_date: string): Promise<{message: string}> => {
	try {
		const response = await fetch(`${BASE_URL}/${id}`, {
			method: 'PUT',
			headers: getHeaders(),
			body: JSON.stringify({
				title,
				amount,
				category,
				expense_date,
			}),
		});

		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}

		const result = await response.json();
		return result;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

// DELETE
export const deleteExpense = async (id: number): Promise<{message: string}> => {
	try {
		const response = await fetch(`${BASE_URL}/${id}`, {
			method: 'DELETE',
			headers: getHeaders(),
		});

		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}

		const result = await response.json();
		return result;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

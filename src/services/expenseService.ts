import type {Expense} from '../types/expense';

// GET
export const getExpenses = async (): Promise<Expense[]> => {
	const url = 'http://localhost:8200/api/expenses';

	try {
		const response = await fetch(url);
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
	const url = `http://localhost:8200/api/expenses/${id}`;

	try {
		const response = await fetch(url);
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
	const url = `http://localhost:8200/api/expenses`;

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
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
	const url = `http://localhost:8200/api/expenses/${id}`;

	try {
		const response = await fetch(url, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
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
	const url = `http://localhost:8200/api/expenses/${id}`;

	try {
		const response = await fetch(url, {
			method: 'DELETE',
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

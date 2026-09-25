export type Expense = {
	id: number;
	title: string;
	amount: number;
	category: string;
	expense_date: string;
	created_at: string;
};

export type ExpenseListProps = {
	expenses: Expense[];
};

export type ExpenseCardProps = {
	expense: Expense;
};

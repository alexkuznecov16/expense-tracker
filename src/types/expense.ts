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
	onExpenseDeleted: () => Promise<void>;
};

export type ExpenseCardProps = {
	expense: Expense;
	onExpenseDeleted: () => Promise<void>;
};

export type ExpenseItemProps = {
	expense: Expense;
};

export type ExpenseFormProps = {
	onExpenseCreated: () => Promise<void>;
};

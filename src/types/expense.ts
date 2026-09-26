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
	onNotification: (success: boolean, message: string) => void;
};

export type ExpenseCardProps = {
	expense: Expense;
	onExpenseDeleted: () => Promise<void>;
	onNotification: (success: boolean, message: string) => void;
};

export type ExpenseItemProps = {
	expense: Expense;
};

export type ExpenseFormProps = {
	onExpenseCreated: () => Promise<void>;
	onNotification: (success: boolean, message: string) => void;
};

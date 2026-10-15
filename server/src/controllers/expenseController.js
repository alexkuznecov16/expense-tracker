const pool = require('../config/database');

// GET
const getExpenses = async (req, res) => {
	try {
		const userId = req.user.id;

		const [result] = await pool.query(
			`
		SELECT
			id,
			title,
			amount,
			category,
			DATE_FORMAT(expense_date, '%Y-%m-%d') AS expense_date,
			created_at
		FROM expenses
		WHERE user_id = ? 
		ORDER BY expense_date DESC
	`,
			[userId],
		);

		res.status(200).json(result);
	} catch (error) {
		console.error(error);

		res.status(500).json({
			message: 'Failed to fetch expenses!',
		});
	}
};

// GET
const getExpenseById = async (req, res) => {
	try {
		const {id} = req.params;
		const userId = req.user.id;
		const [result] = await pool.query(
			`
			SELECT
				id,
				title,
				amount,
				category,
				DATE_FORMAT(expense_date, '%Y-%m-%d') AS expense_date,
				created_at
			FROM expenses
			WHERE id = ? AND user_id = ?
		`,
			[id, userId],
		);

		if (result.length < 1) {
			return res.status(404).json({
				message: 'This expense does not exist!',
			});
		}

		res.status(200).json(result[0]);
	} catch (error) {
		console.error(error);

		res.status(500).json({
			message: 'Failed to fetch expense by id!',
		});
	}
};

// CREATE
const createExpense = async (req, res) => {
	try {
		const {title, amount, category, expense_date} = req.body;
		const userId = req.user.id;

		const formattedDate = new Date(expense_date).toISOString().split('T')[0];

		// Query
		await pool.query(`INSERT INTO expenses (title, amount, category, expense_date, user_id) values (?, ?, ?, ?, ?)`, [title, amount, category, formattedDate, userId]);

		res.status(201).json({
			message: 'Created successfully!',
		});
	} catch (error) {
		console.error(error);

		res.status(500).json({
			message: 'Failed to create expense!',
		});
	}
};

// UPDATE
const updateExpense = async (req, res) => {
	try {
		const {id} = req.params;
		const {title, category, expense_date} = req.body;
		const formattedAmount = Number(Number(req.body.amount).toFixed(2));
		const userId = req.user.id;

		// Check if expense exists
		const [existingExpense] = await pool.query('SELECT id FROM expenses WHERE id = ? AND user_id = ?', [id, userId]);

		if (existingExpense.length === 0) {
			return res.status(404).json({
				message: 'Expense not found!',
			});
		}

		const formattedDate = new Date(expense_date).toISOString().split('T')[0];

		// Query
		const [result] = await pool.query(`UPDATE expenses SET title = ?, amount = ?, category = ?, expense_date = ? WHERE id = ? AND user_id = ?`, [title, formattedAmount, category, formattedDate, id, userId]);

		if (result.affectedRows === 0) {
			return res.status(200).json({message: 'Nothing was changed!'});
		}

		res.status(200).json({
			message: 'Changed successfully!',
		});
	} catch (error) {
		console.error(error);

		res.status(500).json({
			message: 'Failed to change expense!',
		});
	}
};

// DELETE
const deleteExpense = async (req, res) => {
	try {
		const userId = req.user.id;

		const {id} = req.params;

		// Check if expense exists
		const [existingExpense] = await pool.query('SELECT id FROM expenses WHERE id = ? AND user_id = ?', [id, userId]);

		if (existingExpense.length === 0) {
			return res.status(404).json({
				message: 'Expense not found!',
			});
		}

		// Query
		await pool.query('DELETE from expenses WHERE id = ? AND user_id = ?', [id, userId]);

		res.status(200).json({
			message: 'Deleted successfully!',
		});
	} catch (error) {
		console.error(error);

		res.status(500).json({
			message: 'Failed to delete expense!',
		});
	}
};

module.exports = {
	getExpenses,
	getExpenseById,
	createExpense,
	updateExpense,
	deleteExpense,
};

const pool = require('../config/database');

// GET
const getExpenses = async (req, res) => {
	try {
		const [result] = await pool.query(`
  SELECT
    id,
    title,
    amount,
    category,
    DATE_FORMAT(expense_date, '%Y-%m-%d') AS expense_date,
    created_at
  FROM expenses
  ORDER BY expense_date DESC
`);

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
  WHERE id = ?
`,
			id,
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

		const formattedDate = new Date(expense_date).toISOString().split('T')[0];

		// Query
		await pool.query(`INSERT INTO expenses (title, amount, category, expense_date) values (?, ?, ?, ?)`, [title, amount, category, formattedDate]);

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
		const {title, amount, category, expense_date} = req.body;

		// Check if expense exists
		const [existingExpense] = await pool.query('SELECT id FROM expenses WHERE id = ?', id);

		if (existingExpense.length === 0) {
			return res.status(404).json({
				message: 'Expense not found!',
			});
		}

		const formattedDate = new Date(expense_date).toISOString().split('T')[0];

		// Query
		const [result] = await pool.query(`UPDATE expenses SET title = ?, amount = ?, category = ?, expense_date = ? WHERE id = ?`, [title, amount, category, formattedDate, id]);

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
		const {id} = req.params;

		// Check if expense exists
		const [existingExpense] = await pool.query('SELECT id FROM expenses WHERE id = ?', id);

		if (existingExpense.length === 0) {
			return res.status(404).json({
				message: 'Expense not found!',
			});
		}

		// Query
		await pool.query('DELETE from expenses WHERE id = ?', id);

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

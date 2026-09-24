const validation = (req, res, next) => {
	const {title, amount, category, expense_date} = req.body;

	// 1. title
	if (typeof title !== 'string' || title.trim() === '') {
		return res.status(400).json({
			message: 'Title cannot be empty!',
		});
	}

	// 2. amount
	if (typeof amount !== 'number' || !Number.isFinite(amount) || amount <= 0) {
		return res.status(400).json({
			message: 'Amount must be a number greater than 0!',
		});
	}

	// 3. category
	if (typeof category !== 'string' || category.trim() === '') {
		return res.status(400).json({
			message: 'Category cannot be empty!',
		});
	}

	// 4. expense_date
	if (typeof expense_date !== 'string' || expense_date.trim() === '' || Number.isNaN(Date.parse(expense_date))) {
		return res.status(400).json({
			message: 'Expense date must be a valid date!',
		});
	}

	next();
};

module.exports = validation;

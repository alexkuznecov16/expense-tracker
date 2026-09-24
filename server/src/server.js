require('dotenv').config();

const express = require('express');
const cors = require('cors');

const pool = require('./config/database');
const expenseRoutes = require('./routes/expenseRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/expenses', expenseRoutes);

app.get('/', (req, res) => {
	res.json({
		message: 'Expense tracker API is running!',
	});
});

app.get('/api/test-db', async (req, res) => {
	try {
		const [rows] = await pool.query('SELECT 1 + 1 as result');

		res.json({
			message: 'MySQL connection works!',
			result: rows[0].result,
		});
	} catch (error) {
		console.error(error);

		res.status(500).json({
			message: 'Database connection failed!',
		});
	}
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server is running on https://localhost:${PORT}`);
});

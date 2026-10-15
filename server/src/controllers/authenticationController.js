require('dotenv').config();

const pool = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

// POST
const registerUser = async (req, res) => {
	try {
		const {username, password} = req.body;

		if (!username || !password) {
			return res.status(400).json({message: 'Username and password are required!'});
		}

		const saltRounds = 10;
		const passwordHash = await bcrypt.hash(password, saltRounds);

		const [result] = await pool.query(`INSERT INTO users (username, password_hash) VALUES (?, ?)`, [username, passwordHash]);

		res.status(201).json({
			message: 'User registered successfully!',
			userId: result.insertId,
		});
	} catch (error) {
		if (error.code === 'ER_DUP_ENTRY') {
			return res.status(400).json({message: 'Username is already taken!'});
		}

		res.status(500).json({
			message: 'Failed to register user!',
		});
	}
};

// POST
const loginUser = async (req, res) => {
	try {
		const {username, password} = req.body;

		const [result] = await pool.query(`SELECT * FROM users WHERE username = ?`, [username]);

		if (result.length < 1) {
			return res.status(401).json({
				message: 'Invalid username or password!',
			});
		}

		const user = result[0];

		const isPasswordValid = await bcrypt.compare(password, user.password_hash);

		if (!isPasswordValid) {
			return res.status(401).json({
				message: 'Invalid username or password!',
			});
		}

		const token = jwt.sign({id: user.id, username: user.username}, JWT_SECRET, {expiresIn: '24h'});

		res.status(200).json({
			message: 'Login successful!',
			token: token,
			user: {
				id: user.id,
				username: user.username,
			},
		});
	} catch (error) {
		console.error(error);

		res.status(500).json({
			message: 'Failed to login user!',
		});
	}
};

module.exports = {
	registerUser,
	loginUser,
};

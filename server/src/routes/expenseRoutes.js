const express = require('express');
const router = express.Router();
const validation = require('../middleware/validation');
const {getExpenses, getExpenseById, createExpense, updateExpense, deleteExpense} = require('../controllers/expenseController');

// GET
router.get('/', getExpenses);

// GET by id
router.get('/:id', getExpenseById);

// CREATE
router.post('/', validation, createExpense);

// UPDATE
router.put('/:id', validation, updateExpense);

// DELETE
router.delete('/:id', deleteExpense);

module.exports = router;

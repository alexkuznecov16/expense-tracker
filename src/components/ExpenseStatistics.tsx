import {useMemo, useState} from 'react';
import type {ExpenseStatisticsProps} from '../types/expense';
import '../styles/ExpenseStatistics.scss';

type Period = 'all' | 'month' | 'week';

const ExpenseStatistics = ({expenses}: ExpenseStatisticsProps) => {
	const [selectedPeriod, setSelectedPeriod] = useState<Period>('all');

	const filteredExpenses = useMemo(() => {
		const now = new Date();

		return expenses.filter(expense => {
			if (!expense.expense_date) return true;
			const expenseDate = new Date(expense.expense_date);

			if (selectedPeriod === 'month') {
				return expenseDate.getMonth() === now.getMonth() && expenseDate.getFullYear() === now.getFullYear();
			}

			if (selectedPeriod === 'week') {
				const oneWeekAgo = new Date();
				oneWeekAgo.setDate(now.getDate() - 7);
				return expenseDate >= oneWeekAgo && expenseDate <= now;
			}

			return true;
		});
	}, [expenses, selectedPeriod]);

	const totalAmount = useMemo(() => {
		return filteredExpenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);
	}, [filteredExpenses]);

	const averageAmount = useMemo(() => {
		if (filteredExpenses.length === 0) return 0;
		return totalAmount / filteredExpenses.length;
	}, [filteredExpenses, totalAmount]);

	const categoryStats = useMemo(() => {
		const map: Record<string, number> = {};

		filteredExpenses.forEach(item => {
			const cat = item.category || 'Other';
			map[cat] = (map[cat] || 0) + Number(item.amount || 0);
		});

		return Object.entries(map)
			.map(([category, amount]) => ({
				category,
				amount,
				percentage: totalAmount > 0 ? Math.round((amount / totalAmount) * 100) : 0,
			}))
			.sort((a, b) => b.amount - a.amount);
	}, [filteredExpenses, totalAmount]);

	return (
		<div className='expense-stats'>
			<div className='expense-stats__header'>
				<h2 className='expense-stats__title'>Statistics</h2>

				<div className='expense-stats__filter'>
					<button className={`expense-stats__filter-btn ${selectedPeriod === 'all' ? 'active' : ''}`} onClick={() => setSelectedPeriod('all')}>
						All
					</button>
					<button className={`expense-stats__filter-btn ${selectedPeriod === 'month' ? 'active' : ''}`} onClick={() => setSelectedPeriod('month')}>
						Month
					</button>
					<button className={`expense-stats__filter-btn ${selectedPeriod === 'week' ? 'active' : ''}`} onClick={() => setSelectedPeriod('week')}>
						Week
					</button>
				</div>
			</div>

			<div className='expense-stats__summary'>
				<div className='expense-stats__card'>
					<span className='expense-stats__card-label'>Total Spent</span>
					<span className='expense-stats__card-value'>${totalAmount.toFixed(2)}</span>
				</div>
				<div className='expense-stats__card'>
					<span className='expense-stats__card-label'>Average Expense</span>
					<span className='expense-stats__card-value'>${averageAmount.toFixed(2)}</span>
				</div>
				<div className='expense-stats__card'>
					<span className='expense-stats__card-label'>Total Items</span>
					<span className='expense-stats__card-value'>{filteredExpenses.length}</span>
				</div>
			</div>

			<div className='expense-stats__categories'>
				<h3 className='expense-stats__subtitle'>By Category</h3>

				{categoryStats.length === 0 ? (
					<p className='expense-stats__empty'>No data for selected period</p>
				) : (
					<div className='expense-stats__bars'>
						{categoryStats.map(item => (
							<div key={item.category} className='expense-stats__bar-item'>
								<div className='expense-stats__bar-info'>
									<span className='expense-stats__cat-name'>{item.category}</span>
									<span className='expense-stats__cat-amount'>
										${item.amount.toFixed(2)} ({item.percentage}%)
									</span>
								</div>
								<div className='expense-stats__progress-bg'>
									<div className='expense-stats__progress-fill' style={{width: `${item.percentage}%`}} />
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default ExpenseStatistics;

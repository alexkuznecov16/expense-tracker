import type {ExpenseCardProps} from '../types/expense';
import ExpenseItem from './ExpenseItem';

const ExpenseCard = ({expense}: ExpenseCardProps) => {
	return (
		<div style={{border: '2px solid #fff', padding: '10px'}}>
			<ExpenseItem expense={expense} />
		</div>
	);
};

export default ExpenseCard;

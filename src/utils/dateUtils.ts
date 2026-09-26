export const getFirstDayOfMonth = (year: number, month: number) => {
	return new Date(year, month, 1).getDay();
};

export const getDaysInMonth = (year: number, month: number) => {
	return new Date(year, month + 1, 0).getDate();
};

export const formatDate = (year: number, month: number, day: number) => {
	return [year, String(month + 1).padStart(2, '0'), String(day).padStart(2, '0')].join('-');
};

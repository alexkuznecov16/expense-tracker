export const categories = ['Food', 'Transport', 'Home', 'Work', 'Entertainment', 'Shopping', 'Other'] as const;

export type Category = (typeof categories)[number];

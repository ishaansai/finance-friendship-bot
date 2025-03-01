
/**
 * Formats a number as a currency string using the user's locale
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

/**
 * Calculates what percentage one number is of another
 */
export const calculatePercentage = (value: number, total: number): number => {
  if (total === 0) return 0;
  return (value / total) * 100;
};

/**
 * Groups transactions by category and calculates total for each
 */
export const groupByCategory = <T extends { category: string; amount: number }>(
  items: T[]
): Record<string, number> => {
  return items.reduce(
    (acc, item) => {
      const { category, amount } = item;
      acc[category] = (acc[category] || 0) + amount;
      return acc;
    },
    {} as Record<string, number>
  );
};

/**
 * Calculate savings rate (savings as percentage of income)
 */
export const calculateSavingsRate = (income: number, expenses: number): number => {
  if (income === 0) return 0;
  const savings = income - expenses;
  return (savings / income) * 100;
};

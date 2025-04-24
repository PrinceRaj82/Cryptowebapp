
/**
 * Format a number as currency
 */
export function formatCurrency(num: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: num >= 1 ? 2 : num >= 0.1 ? 2 : 4,
    maximumFractionDigits: num >= 1 ? 2 : num >= 0.1 ? 4 : 8
  }).format(num);
}

/**
 * Format a number to a compact representation
 */
export function formatCompact(num: number): string {
  return new Intl.NumberFormat('en-US', { 
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 2
  }).format(num);
}

/**
 * Format a percentage
 */
export function formatPercent(num: number): string {
  const formattedNum = num.toFixed(2);
  const sign = num > 0 ? '+' : '';
  return `${sign}${formattedNum}%`;
}

/**
 * Format a supply number with symbol
 */
export function formatSupply(num: number, symbol: string): string {
  // Convert to millions or billions
  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num / 1000000);
  
  return `${formatted}M ${symbol}`;
}

/**
 * Utility Functions
 * Helper functions for common operations in the Masharee platform
 */

/**
 * Convert English numerals to Arabic numerals
 * Example: 123 -> ١٢٣
 */
export const toArabicNumeral = (num: number | string): string => {
  const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return String(num).replace(/\d/g, (digit) => arabicNumerals[parseInt(digit)]);
};

/**
 * Format currency in Arabic format
 * Example: 1000000 -> ١,٠٠٠,٠٠٠ ر.س
 */
export const formatCurrency = (
  amount: number,
  currency: string = 'ر.س',
  includeArabic: boolean = true
): string => {
  const formatted = amount.toLocaleString('ar-SA');
  const arabicFormatted = includeArabic ? toArabicNumeral(formatted) : formatted;
  return `${arabicFormatted} ${currency}`;
};

/**
 * Format large numbers in a readable way
 * Example: 2500000000 -> 2.5 مليار
 */
export const formatLargeNumber = (num: number): string => {
  if (num >= 1000000000) {
    const billions = (num / 1000000000).toFixed(1);
    return `${toArabicNumeral(billions)} مليار`;
  } else if (num >= 1000000) {
    const millions = (num / 1000000).toFixed(1);
    return `${toArabicNumeral(millions)} مليون`;
  } else if (num >= 1000) {
    const thousands = (num / 1000).toFixed(1);
    return `${toArabicNumeral(thousands)} ألف`;
  }
  return toArabicNumeral(num);
};

/**
 * Merge classnames (cn utility)
 * Used for conditionally joining classnames
 */
export function cn(...inputs: Array<string | undefined | null | false>) {
  return inputs.filter(Boolean).join(' ');
}

/**
 * Delay execution for async operations
 */
export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Validate Saudi phone number
 */
export const isValidSaudiPhone = (phone: string): boolean => {
  return /^(05|5)\d{8}$/.test(phone.replace(/\s/g, ''));
};

/**
 * Validate email
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Calculate investment returns
 */
export const calculateInvestmentReturns = (
  principal: number,
  rate: number,
  years: number
) => {
  const annualReturn = Math.floor((principal * rate) / 100);
  const totalProfit = Math.floor(annualReturn * years);
  const finalValue = principal + totalProfit;

  return {
    annualReturn,
    totalProfit,
    finalValue,
  };
};

/**
 * Format percentage
 */
export const formatPercentage = (percentage: number, decimals: number = 0): string => {
  const formatted = percentage.toFixed(decimals);
  return `${toArabicNumeral(formatted)}%`;
};

/**
 * Get badge color style based on badge type
 */
export const getBadgeStyle = (badgeType: string): string => {
  const styles: Record<string, string> = {
    جديد: 'glass border border-accent-green/30 text-accent-green',
    مميز: 'glass border border-accent-orange/30 text-accent-orange',
    حصري: 'glass border border-accent-purple/30 text-accent-purple',
    'عوائد دورية': 'glass border border-primary/30 text-primary-400',
    'متوافق مع الشريعة': 'glass border border-accent-teal/30 text-accent-teal',
    'فندقي': 'glass border border-primary/30 text-primary-400',
  };
  return styles[badgeType] || 'glass border border-primary/30 text-primary-400';
};

/**
 * Truncate text to a specific length
 */
export const truncateText = (text: string, length: number): string => {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
};

/**
 * Parse query parameters from URL
 */
export const parseQueryParams = (queryString: string): Record<string, string> => {
  const params = new URLSearchParams(queryString);
  const result: Record<string, string> = {};

  params.forEach((value, key) => {
    result[key] = value;
  });

  return result;
};

/**
 * Generate a random ID
 */
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 11);
};

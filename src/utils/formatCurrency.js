export const formatCurrency = (amount, currencyCode = 'INR', minimumFractionDigits = 2) => {
  const localeMap = {
    'USD': 'en-US',
    'INR': 'en-IN',
    'TSH': 'sw-TZ',
    'KSH': 'sw-KE'
  };
  const locale = localeMap[currencyCode] || 'en-US';
  return new Intl.NumberFormat(locale, { style: 'currency', currency: currencyCode, minimumFractionDigits }).format(amount);
};

export const getCurrencySymbol = (currencyCode) => {
  return formatCurrency(0, currencyCode).replace(/[\d.,\s]/g, '');
};

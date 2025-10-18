export const formatCurrency = (amount, currencyCode = 'TSH', minimumFractionDigits = 2) => {
  const localeMap = {
    'TSH': 'sw-TZ',
    'KSH': 'sw-KE'
  };
  const locale = localeMap[currencyCode] || 'sw-TZ';
  return new Intl.NumberFormat(locale, { style: 'currency', currency: currencyCode, minimumFractionDigits }).format(amount);
};

export const getCurrencySymbol = (currencyCode) => {
  return formatCurrency(0, currencyCode).replace(/[\d.,\s]/g, '');
};

import React from 'react';
import BaseTemplate from './BaseTemplate';
import { formatCurrency } from '../../utils/formatCurrency';

const Template10 = ({ data }) => {
  const { 
    billTo, 
    shipTo, 
    invoice, 
    yourCompany, 
    items, 
    taxPercentage, 
    taxAmount, 
    subTotal, 
    grandTotal, 
    notes, 
    selectedCurrency,
    companyLogo,
    qrCode 
  } = data;

  return (
    <BaseTemplate data={data}>
      <div className="bg-white w-full h-full flex flex-col" style={{ margin: "0", padding: "24px" }}>
        {/* Header with Logo */}
        <div className="flex justify-between items-start mb-8 pb-6 border-b-4 border-emerald-600">
          <div className="flex items-center gap-4">
            {companyLogo ? (
              <img 
                src={companyLogo} 
                alt="Company Logo" 
                className="h-20 w-20 object-contain rounded-lg"
              />
            ) : (
              <div className="h-20 w-20 bg-emerald-100 rounded-lg flex items-center justify-center">
                <span className="text-emerald-600 text-2xl font-bold">
                  {yourCompany.name?.charAt(0) || 'C'}
                </span>
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold text-emerald-700">{yourCompany.name}</h1>
              <p className="text-gray-600 text-sm">{yourCompany.address}</p>
              <p className="text-gray-600 text-sm">{yourCompany.phone}</p>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-4xl font-bold text-emerald-600 mb-2">INVOICE</h2>
            <p className="text-gray-700"><span className="font-semibold">Invoice #:</span> {invoice.number}</p>
            <p className="text-gray-700"><span className="font-semibold">Date:</span> {invoice.date}</p>
            <p className="text-gray-700"><span className="font-semibold">Due:</span> {invoice.paymentDate}</p>
          </div>
        </div>

        {/* Bill To / Ship To */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div className="bg-emerald-50 p-4 rounded-lg">
            <h3 className="text-sm font-bold text-emerald-700 uppercase tracking-wide mb-2">Bill To</h3>
            <p className="font-semibold text-gray-800">{billTo.name}</p>
            <p className="text-gray-600 text-sm">{billTo.address}</p>
            <p className="text-gray-600 text-sm">{billTo.phone}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-2">Ship To</h3>
            <p className="font-semibold text-gray-800">{shipTo.name}</p>
            <p className="text-gray-600 text-sm">{shipTo.address}</p>
            <p className="text-gray-600 text-sm">{shipTo.phone}</p>
          </div>
        </div>

        {/* Items Table */}
        <table className="w-full mb-6">
          <thead>
            <tr className="bg-emerald-600 text-white">
              <th className="p-3 text-left rounded-tl-lg">Item</th>
              <th className="p-3 text-center">Qty</th>
              <th className="p-3 text-right">Rate</th>
              <th className="p-3 text-right rounded-tr-lg">Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr 
                key={index} 
                className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b border-gray-200`}
              >
                <td className="p-3">
                  <span className="font-medium">{item.name}</span>
                  {item.description && (
                    <span className="block text-xs text-gray-500">{item.description}</span>
                  )}
                </td>
                <td className="p-3 text-center">{item.quantity}</td>
                <td className="p-3 text-right">{formatCurrency(item.amount, selectedCurrency)}</td>
                <td className="p-3 text-right font-medium">{formatCurrency(item.quantity * item.amount, selectedCurrency)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals and QR Code */}
        <div className="flex justify-between items-end mb-6">
          {/* QR Code Section */}
          <div className="flex flex-col items-center">
            {qrCode ? (
              <div className="p-2 bg-white border-2 border-gray-200 rounded-lg">
                <img 
                  src={qrCode} 
                  alt="Payment QR Code" 
                  className="h-24 w-24 object-contain"
                />
              </div>
            ) : (
              <div className="h-24 w-24 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                <span className="text-gray-400 text-xs text-center px-2">QR Code</span>
              </div>
            )}
            <span className="text-xs text-gray-500 mt-1">Scan to Pay</span>
          </div>

          {/* Totals */}
          <div className="w-64">
            <div className="flex justify-between py-2 border-b border-gray-200">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium">{formatCurrency(subTotal, selectedCurrency)}</span>
            </div>
            {taxPercentage > 0 && (
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Tax ({taxPercentage}%):</span>
                <span className="font-medium">{formatCurrency(taxAmount, selectedCurrency)}</span>
              </div>
            )}
            <div className="flex justify-between py-3 bg-emerald-600 text-white px-4 rounded-lg mt-2">
              <span className="font-bold">Total Due:</span>
              <span className="font-bold text-lg">{formatCurrency(grandTotal, selectedCurrency)}</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {notes && (
          <div className="mt-auto pt-4 border-t border-gray-200">
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-2">Notes & Terms</h3>
            <p className="text-gray-600 text-sm">{notes}</p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 pt-4 border-t-2 border-emerald-200 text-center">
          <p className="text-emerald-600 font-medium">Thank you for your business!</p>
        </div>
      </div>
    </BaseTemplate>
  );
};

export default Template10;

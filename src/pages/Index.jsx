import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../utils/formatCurrency'; // Corrected import path
import FloatingLabelInput from '../components/FloatingLabelInput';
import BillToSection from '../components/BillToSection';
import ShipToSection from '../components/ShipToSection';
import ItemDetails from "../components/ItemDetails";
import ImageUpload from "../components/ImageUpload";
import { templates } from "../utils/templateRegistry";
import { FiEdit, FiFileText, FiTrash2 } from "react-icons/fi"; // Added FiTrash2 icon
import { RefreshCw, Image, QrCode } from "lucide-react";
import { set, sub } from "date-fns";

const generateRandomInvoiceNumber = () => {
  const length = Math.floor(Math.random() * 6) + 3;
  const alphabetCount = Math.min(Math.floor(Math.random() * 4), length);
  let result = "";
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";

  for (let i = 0; i < alphabetCount; i++) {
    result += alphabet[Math.floor(Math.random() * alphabet.length)];
  }

  for (let i = alphabetCount; i < length; i++) {
    result += numbers[Math.floor(Math.random() * numbers.length)];
  }

  return result;
};

const noteOptions = [
  "Thank you for choosing us today! We hope your shopping experience was pleasant and seamless. Your satisfaction matters to us, and we look forward to serving you again soon. Keep this receipt for any returns or exchanges.",
  "Your purchase supports our community! We believe in giving back and working towards a better future. Thank you for being a part of our journey. We appreciate your trust and hope to see you again soon.",
  "We value your feedback! Help us improve by sharing your thoughts on the text message survey link. Your opinions help us serve you better and improve your shopping experience. Thank you for shopping with us!",
  "Did you know you can save more with our loyalty program? Ask about it on your next visit and earn points on every purchase. It’s our way of saying thank you for being a loyal customer. See you next time!",
  "Need assistance with your purchase? We’re here to help! Reach out to our customer support, or visit our website for more information. We’re committed to providing you with the best service possible.",
  "Keep this receipt for returns or exchanges.",
  "Every purchase makes a difference! We are dedicated to eco-friendly practices and sustainability. Thank you for supporting a greener planet with us. Together, we can build a better tomorrow.",
  "Have a great day!",
  "“Thank you for shopping with us today. Did you know you can return or exchange your items within 30 days with this receipt? We want to ensure that you’re happy with your purchase, so don’t hesitate to come back if you need assistance.",
  "Eco-friendly business. This receipt is recyclable.",
  "We hope you enjoyed your shopping experience! Remember, for every friend you refer, you can earn exclusive rewards. Visit www.example.com/refer for more details. We look forward to welcoming you back soon!",
  "Thank you for choosing us! We appreciate your business and look forward to serving you again. Keep this receipt for any future inquiries or returns.",
  "Your purchase supports local businesses and helps us continue our mission. Thank you for being a valued customer. We hope to see you again soon!",
  "We hope you had a great shopping experience today. If you have any feedback, please share it with us on our website. We are always here to assist you.",
  "Thank you for your visit! Remember, we offer exclusive discounts to returning customers. Check your email for special offers on your next purchase.",
  "Your satisfaction is our top priority. If you need any help or have questions about your purchase, don’t hesitate to contact us. Have a great day!",
  "We love our customers! Thank you for supporting our business. Follow us on social media for updates on promotions and new products. See you next time!",
  "Every purchase counts! We are committed to making a positive impact, and your support helps us achieve our goals. Thank you for shopping with us today!",
  "We hope you found everything you needed. If not, please let us know so we can improve your experience. Your feedback helps us serve you better. Thank you!",
  "Thank you for visiting! Did you know you can save more with our rewards program? Ask about it during your next visit and start earning points today!",
  "We appreciate your trust in us. If you ever need assistance with your order, please visit our website or call customer service. We’re here to help!",
];

const Index = () => {
  const navigate = useNavigate();
  const [selectedCurrency, setSelectedCurrency] = useState("INR");
  const [billTo, setBillTo] = useState({ name: "", address: "", phone: "" });
  const [shipTo, setShipTo] = useState({ name: "", address: "", phone: "" });
  const [invoice, setInvoice] = useState({
    date: "",
    paymentDate: "",
    number: "",
  });
  const [yourCompany, setYourCompany] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [items, setItems] = useState([]);
  const [taxPercentage, settaxPercentage] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [notes, setNotes] = useState("");
  const [companyLogo, setCompanyLogo] = useState(null);
  const [qrCode, setQrCode] = useState(null);

  const refreshNotes = () => {
    const randomIndex = Math.floor(Math.random() * noteOptions.length);
    setNotes(noteOptions[randomIndex]);
  };

  useEffect(() => {
    // Load form data from localStorage on component mount
    const savedFormData = localStorage.getItem("formData");
    if (savedFormData) {
      const parsedData = JSON.parse(savedFormData);
      setBillTo(parsedData.billTo || { name: "", address: "", phone: "" });
      setShipTo(parsedData.shipTo || { name: "", address: "", phone: "" });
      setInvoice(
        parsedData.invoice || { date: "", paymentDate: "", number: "" }
      );
      setYourCompany(
        parsedData.yourCompany || { name: "", address: "", phone: "" }
      );
      setItems(parsedData.items || []);
      settaxPercentage(parsedData.taxPercentage || 0);
      setNotes(parsedData.notes || "");
      setSelectedCurrency(parsedData.selectedCurrency || "INR");
      setCompanyLogo(parsedData.companyLogo || null);
      setQrCode(parsedData.qrCode || null);
    } else {
      // If no saved data, set invoice number
      setInvoice((prev) => ({
        ...prev,
        number: generateRandomInvoiceNumber(),
      }));
    }
  }, []);

  useEffect(() => {
    // Save form data to localStorage whenever it changes
    const formData = {
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
      qrCode,
    };
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [
    billTo,
    shipTo,
    invoice,
    yourCompany,
    items,
    taxPercentage,
    notes,
    taxAmount,
    subTotal,
    grandTotal,
    selectedCurrency,
    companyLogo,
    qrCode,
  ]);

  const handleInputChange = (setter) => (e) => {
    const { name, value } = e.target;
    setter((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    if (field === "quantity" || field === "amount") {
      newItems[index].total = newItems[index].quantity * newItems[index].amount;
    }
    setItems(newItems);
    updateTotals();
  };

  const addItem = () => {
    setItems([
      ...items,
      { name: "", description: "", quantity: 0, amount: 0, total: 0 },
    ]);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const calculateSubTotal = () => {
    const calculatedSubTotal = items.reduce((sum, item) => sum + (item.quantity * item.amount), 0);
    setSubTotal(calculatedSubTotal); // Store as number
    return calculatedSubTotal;
  };

  const calculateTaxAmount = (subTotalValue) => { // Renamed param to avoid conflict with state
    const tax = (subTotalValue * taxPercentage) / 100;
    setTaxAmount(tax); // Store as number
    return tax;
  };

  const calculateGrandTotal = (subTotalValue, taxAmountValue) => { // Renamed params to avoid conflict with state
    const total = parseFloat(subTotalValue) + parseFloat(taxAmountValue);
    setGrandTotal(total); // Store as number
    return total;
  };

  const updateTotals = () => {
    const currentSubTotal = calculateSubTotal();
    const currentTaxAmount = calculateTaxAmount(currentSubTotal);
    // setGrandTotal will be called by calculateGrandTotal via currentTaxAmount's setter,
    // or directly if we prefer explicit calls.
    // For clarity and directness, let's call it explicitly here.
    calculateGrandTotal(currentSubTotal, currentTaxAmount);
    // Note: setSubTotal and setTaxAmount are called within their respective calculate functions.
  };

  const handleTaxPercentageChange = (e) => {
    const taxRate = parseFloat(e.target.value) || 0;
    settaxPercentage(taxRate);
    // updateTotals will be called by the useEffect listening to taxPercentage change
  };

  useEffect(() => {
    updateTotals();
  }, [items, taxPercentage]); // subTotal, taxAmount, grandTotal removed from deps as they are set by updateTotals & its chain

  const handleTemplateClick = (templateNumber) => {
    const formData = {
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
      qrCode,
    };
    navigate("/template", {
      state: { formData, selectedTemplate: templateNumber },
    });
  };

  const fillDummyData = () => {
    setBillTo({
      name: "John Doe",
      address: "123 Main St, Anytown, USA",
      phone: "(555) 123-4567",
    });
    setShipTo({
      name: "Jane Smith",
      address: "456 Elm St, Othertown, USA",
      phone: "(555) 987-6543",
    });
    setInvoice({
      date: new Date().toISOString().split("T")[0],
      paymentDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      number: generateRandomInvoiceNumber(),
    });
    setYourCompany({
      name: "Your Company",
      address: "789 Oak St, Businessville, USA",
      phone: "(555) 555-5555",
    });
    setItems([
      {
        name: "Product A",
        description: "High-quality item",
        quantity: 2,
        amount: 50,
        total: 100,
      },
      {
        name: "Service B",
        description: "Professional service",
        quantity: 1,
        amount: 200,
        total: 200,
      },
      {
        name: "Product C",
        description: "Another great product",
        quantity: 3,
        amount: 30,
        total: 90,
      },
      {
        name: "Service D",
        description: "Another professional service",
        quantity: 2,
        amount: 150,
        total: 300,
      },
      {
        name: "Product E",
        description: "Yet another product",
        quantity: 1,
        amount: 75,
        total: 75,
      },
      {
        name: "Service F",
        description: "Yet another service",
        quantity: 4,
        amount: 100,
        total: 400,
      },
    ]);
    settaxPercentage(10);
    calculateSubTotal();
    setNotes("Thank you for your business!");
  };

  const clearForm = () => {
    setBillTo({ name: "", address: "", phone: "" });
    setShipTo({ name: "", address: "", phone: "" });
    setInvoice({
      date: "",
      paymentDate: "",
      number: generateRandomInvoiceNumber(),
    });
    setYourCompany({ name: "", address: "", phone: "" });
    setItems([{ name: "", description: "", quantity: 0, amount: 0, total: 0 }]);
    settaxPercentage(0);
    setNotes("");
    setCompanyLogo(null);
    setQrCode(null);
    localStorage.removeItem("formData");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="container mx-auto px-4 py-8 relative">
        {/* Header with gradient text */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold mb-3 gradient-text">Bill & Receipt Generator</h1>
          <p className="text-muted-foreground text-lg">Create professional invoices and receipts in seconds</p>
        </div>


        {/* Action buttons with modern styling */}
        <div className="fixed top-6 left-6 flex gap-3 z-50 animate-slide-in-right">
          <button
            onClick={clearForm}
            className="group bg-destructive hover:bg-destructive/90 text-destructive-foreground p-3 rounded-xl shadow-elegant hover:shadow-xl transition-all duration-300 hover:scale-105"
            aria-label="Clear Form"
          >
            <FiTrash2 size={20} className="group-hover:rotate-12 transition-transform" />
          </button>
          <button
            onClick={fillDummyData}
            className="group gradient-primary text-white p-3 rounded-xl shadow-elegant hover:shadow-xl transition-all duration-300 hover:scale-105"
            aria-label="Fill with Dummy Data"
          >
            <FiEdit size={20} className="group-hover:rotate-12 transition-transform" />
          </button>
        </div>
        
        <button
          onClick={() =>
            navigate("/receipt", {
              state: {
                formData: {
                  billTo,
                  shipTo,
                  invoice,
                  yourCompany,
                  items,
                  taxPercentage,
                  notes,
                  selectedCurrency,
                },
              },
            })
          }
          className="group fixed top-6 right-6 z-50 gradient-secondary text-white px-4 py-3 rounded-xl shadow-elegant hover:shadow-xl transition-all duration-300 hover:scale-105 animate-slide-in-right flex items-center gap-2 font-medium"
          aria-label="Switch to Receipt Generator"
        >
          <FiFileText size={20} className="group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline">Generate Receipt</span>
        </button>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2 glass-effect p-8 rounded-2xl shadow-card animate-scale-in backdrop-blur-xl">
            <form>
            <BillToSection
              billTo={billTo}
              handleInputChange={handleInputChange(setBillTo)}
              selectedCurrency={selectedCurrency}
              setSelectedCurrency={setSelectedCurrency}
            />
            <ShipToSection
              shipTo={shipTo}
              handleInputChange={handleInputChange(setShipTo)}
              billTo={billTo}
            />

            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">
                Invoice Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FloatingLabelInput
                  id="invoiceNumber"
                  label="Invoice Number"
                  value={invoice.number}
                  onChange={handleInputChange(setInvoice)}
                  name="number"
                />
                <FloatingLabelInput
                  id="invoiceDate"
                  label="Invoice Date"
                  type="date"
                  value={invoice.date}
                  onChange={handleInputChange(setInvoice)}
                  name="date"
                />
                <FloatingLabelInput
                  id="paymentDate"
                  label="Payment Date"
                  type="date"
                  value={invoice.paymentDate}
                  onChange={handleInputChange(setInvoice)}
                  name="paymentDate"
                />
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-4">Your Company</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FloatingLabelInput
                  id="yourCompanyName"
                  label="Name"
                  value={yourCompany.name}
                  onChange={handleInputChange(setYourCompany)}
                  name="name"
                />
                <FloatingLabelInput
                  id="yourCompanyPhone"
                  label="Phone"
                  value={yourCompany.phone}
                  onChange={handleInputChange(setYourCompany)}
                  name="phone"
                />
              </div>
              <FloatingLabelInput
                id="yourCompanyAddress"
                label="Address"
                value={yourCompany.address}
                onChange={handleInputChange(setYourCompany)}
                name="address"
                className="mt-4"
              />
              
              {/* Image Uploads for Logo and QR Code */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <ImageUpload
                  label="Company Logo"
                  value={companyLogo}
                  onChange={setCompanyLogo}
                  placeholder="Upload your logo"
                  icon={Image}
                />
                <ImageUpload
                  label="Payment QR Code"
                  value={qrCode}
                  onChange={setQrCode}
                  placeholder="Upload QR code"
                  icon={QrCode}
                />
              </div>
            </div>

            <ItemDetails
              items={items}
              handleItemChange={handleItemChange}
              addItem={addItem}
              removeItem={removeItem}
              currencyCode={selectedCurrency}
            />

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Totals</h3>
              <div className="flex justify-between mb-2">
                <span>Sub Total:</span>
                <span>{formatCurrency(subTotal, selectedCurrency)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Tax Rate (%):</span>
                <input
                  type="number"
                  value={taxPercentage}
                  onChange={(e) => handleTaxPercentageChange(e)}
                  className="w-24 p-2 border rounded"
                  min="0"
                  max="28"
                  step="1"
                />
              </div>
              <div className="flex justify-between mb-2">
                <span>Tax Amount:</span>
                <span>{formatCurrency(taxAmount, selectedCurrency)}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Grand Total:</span>
                <span>{formatCurrency(grandTotal, selectedCurrency)}</span>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-lg font-semibold">Notes</h3>
                <button
                  type="button"
                  onClick={refreshNotes}
                  className="group p-2 rounded-lg hover:bg-accent/10 transition-colors"
                  title="Refresh Notes"
                >
                  <RefreshCw size={18} className="text-accent group-hover:rotate-180 transition-transform duration-500" />
                </button>
              </div>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-4 border-2 border-input focus:border-primary rounded-xl bg-background/50 focus:bg-background transition-all duration-200 focus:ring-4 focus:ring-primary/10 outline-none resize-none"
                rows="4"
                placeholder="Add notes for your invoice..."
              ></textarea>
            </div>

            {/* Clear Form button removed */}
          </form>
        </div>

        <div className="w-full lg:w-1/2 glass-effect p-8 rounded-2xl shadow-card animate-scale-in backdrop-blur-xl overflow-y-auto">
          <h2 className="text-3xl font-bold mb-6 gradient-text">Template Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {templates.map((template, index) => (
              <div
                key={index}
                className="group relative bg-card p-5 rounded-xl cursor-pointer shadow-card hover:shadow-elegant transition-all duration-300 hover:scale-105 hover:-translate-y-1 border border-border/50 hover:border-primary/50 overflow-hidden"
                onClick={() => handleTemplateClick(index + 1)}
              >
                <div className="absolute inset-0 gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="bg-muted rounded-lg overflow-hidden mb-4 aspect-[3/4] flex items-center justify-center">
                    <img
                      src={`/assets/template${index + 1}-preview.png`}
                      alt={template.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <p className="text-center font-semibold text-foreground group-hover:text-primary transition-colors">{template.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Index;

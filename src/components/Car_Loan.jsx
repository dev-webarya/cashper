import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { submitLoanApplication } from '../utils/api';
import { 
  Car, Clock, CheckCircle, TrendingUp, FileText, Upload, Users, Shield,
  IndianRupee, Zap, Award, ArrowRight, Phone, Mail, AlertCircle,
  ChevronDown, ChevronUp, ArrowLeft, BadgeCheck, Building2, CreditCard,
  Home, Briefcase, Percent, PieChart, Star, ThumbsUp, TrendingDown,
  Wallet, X, CheckCircle2, Heart, Book, Calculator, UserCheck, FileCheck
} from 'lucide-react';

const Car_Loan = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  
  // Calculator State
  const [loanAmount, setLoanAmount] = useState(500000);
  const [loanTenure, setLoanTenure] = useState(60);
  const [interestRate, setInterestRate] = useState(9.5);
  const [downPayment, setDownPayment] = useState(100000);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', loanAmount: '', purpose: 'Car Purchase',
    employment: '', monthlyIncome: '', panNumber: '', aadharNumber: '',
    address: '', city: '', state: '', pincode: '', companyName: '',
    workExperience: '', creditScore: '', vehicleType: '', vehicleModel: '',
    vehiclePrice: '', downPayment: ''
  });

  // Document Upload State
  const [documents, setDocuments] = useState({
    aadhar: null, pan: null, bankStatement: null, salarySlip: null, photo: null
  });

  // Calculate EMI
  const calculateEMI = () => {
    const principal = loanAmount - downPayment;
    const rate = interestRate / 12 / 100;
    const time = loanTenure;
    
    const emi = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
    const totalPayment = emi * time;
    const totalInterest = totalPayment - principal;
    
    return {
      emi: Math.round(emi),
      totalPayment: Math.round(totalPayment) + downPayment,
      totalInterest: Math.round(totalInterest)
    };
  };

  const { emi, totalPayment, totalInterest } = calculateEMI();

  // Handle Form Input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let sanitizedValue = value;
    
    if (name === 'phone' || name === 'aadharNumber') {
      sanitizedValue = value.replace(/\D/g, '');
    } else if (name === 'panNumber') {
      sanitizedValue = value.toUpperCase();
    } else if (name === 'pincode') {
      sanitizedValue = value.replace(/\D/g, '').substring(0, 6);
    }
    
    setFormData(prev => ({ ...prev, [name]: sanitizedValue }));
  };

  // Handle File Upload
  const handleFileUpload = (e, docType) => {
    const file = e.target.files[0];
    if (file) {
      setDocuments(prev => ({ ...prev, [docType]: file }));
    }
  };

  // Validate Step
  const validateStep = (step) => {
    let errors = [];
    
    switch(step) {
      case 1:
        if (!formData.fullName?.trim()) errors.push('Full Name is required');
        if (!formData.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          errors.push('Valid email is required');
        }
        if (!formData.phone?.trim() || !/^\d{10}$/.test(formData.phone)) {
          errors.push('Valid 10-digit phone number is required');
        }
        break;
        
      case 2:
        if (!formData.loanAmount) errors.push('Loan amount is required');
        if (!formData.employment?.trim()) errors.push('Employment status is required');
        if (!formData.monthlyIncome) errors.push('Monthly income is required');
        if (!formData.vehicleType?.trim()) errors.push('Vehicle type is required');
        if (!formData.vehicleModel?.trim()) errors.push('Vehicle model is required');
        break;
        
      case 3:
        if (!formData.panNumber?.trim() || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber)) {
          errors.push('Valid PAN number is required (e.g., ABCDE1234F)');
        }
        if (!formData.aadharNumber?.trim() || !/^\d{12}$/.test(formData.aadharNumber)) {
          errors.push('Valid 12-digit Aadhar number is required');
        }
        if (!formData.address?.trim()) errors.push('Address is required');
        if (!formData.city?.trim()) errors.push('City is required');
        if (!formData.state?.trim()) errors.push('State is required');
        if (!formData.pincode?.trim() || !/^\d{6}$/.test(formData.pincode)) {
          errors.push('Valid 6-digit pincode is required');
        }
        break;
        
      case 4:
        if (!documents.aadhar) errors.push('Aadhar document is required');
        if (!documents.pan) errors.push('PAN document is required');
        if (!documents.bankStatement) errors.push('Bank statement is required');
        if (!documents.salarySlip) errors.push('Salary slip is required');
        if (!documents.photo) errors.push('Photo is required');
        break;
    }
    
    if (errors.length > 0) {
      alert('Please correct the following:\n• ' + errors.join('\n• '));
      return false;
    }
    
    return true;
  };

  // Next Step
  const handleNextStep = () => {
    if (validateStep(currentStep) && !isTransitioning) {
      setIsTransitioning(true);
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsTransitioning(false);
      }, 300);
    }
  };

  // Previous Step
  const handlePreviousStep = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setIsTransitioning(false);
      }, 300);
    }
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep(4) && !isTransitioning) {
      setIsTransitioning(true);
      
      try {
        const response = await submitLoanApplication('car-loan', formData, documents);
        
        console.log('Application submitted successfully:', response);
        
        if (response.data && response.data.referenceNumber) {
          setFormData(prev => ({
            ...prev,
            referenceNumber: response.data.referenceNumber
          }));
        }
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        setTimeout(() => {
          setCurrentStep(5);
          setIsTransitioning(false);
        }, 300);
      } catch (error) {
        console.error('Error submitting application:', error);
        alert(`Failed to submit application: ${error.message}. Please try again.`);
        setIsTransitioning(false);
      }
    }
  };

  // FAQ Data
  const faqs = [
    {
      question: "What is a Car Loan?",
      answer: "A car loan is a secured loan provided to purchase a new or used vehicle. The car serves as collateral, and the loan typically has a repayment period of 1 to 7 years with competitive interest rates starting from 9% per annum."
    },
    {
      question: "What is the maximum loan amount available?",
      answer: "You can avail car loans up to 90% of the on-road price of the vehicle. The loan amount ranges from ₹50,000 to ₹50 Lakhs depending on your income and credit profile."
    },
    {
      question: "What documents are required?",
      answer: "Basic documents include: Identity Proof (Aadhar/PAN), Address Proof, Income Proof (Salary Slips/ITR), Bank Statements (last 3-6 months), Vehicle Invoice/Quotation, and Passport Size Photographs."
    },
    {
      question: "How quickly can I get the loan approved?",
      answer: "With our streamlined process, you can get in-principle approval within 24-48 hours. Final approval and disbursal typically takes 3-7 days depending on documentation completion."
    },
    {
      question: "What is the interest rate?",
      answer: "Car loan interest rates typically range from 9% to 15% per annum, depending on your credit profile, loan amount, and vehicle type. Better credit scores qualify for lower interest rates."
    },
    {
      question: "Can I prepay my car loan?",
      answer: "Yes, you can prepay your car loan partially or fully. Most lenders don't charge prepayment penalties for loans after the first 12 months. Check specific terms with your lender."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-green-800 text-white py-16 sm:py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full mb-6 shadow-lg">
              <Car className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6">
              Car Loan
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-green-100 mb-8 max-w-3xl mx-auto">
              Drive Your Dream Car Home with Affordable Financing
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#apply-form" className="inline-flex items-center justify-center gap-2 bg-white text-green-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-green-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                Apply Now <ArrowRight className="w-5 h-5" />
              </a>
              <a href="#calculator" className="inline-flex items-center justify-center gap-2 bg-green-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-green-600 transition-all duration-300 shadow-lg">
                <Calculator className="w-5 h-5" /> EMI Calculator
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              { icon: <Clock className="w-8 h-8" />, title: "Quick Approval", desc: "Get approved in 24-48 hours" },
              { icon: <IndianRupee className="w-8 h-8" />, title: "Up to 90% Funding", desc: "Minimal down payment required" },
              { icon: <Percent className="w-8 h-8" />, title: "Low Interest", desc: "Starting from 9% per annum" },
              { icon: <Shield className="w-8 h-8" />, title: "Secure Process", desc: "100% safe and secure" }
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="bg-gradient-to-br from-green-500 to-green-600 w-16 h-16 rounded-xl flex items-center justify-center text-white mb-4 shadow-md">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EMI Calculator Section */}
      <section id="calculator" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">EMI Calculator</h2>
            <p className="text-lg text-gray-600">Calculate your monthly installment</p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10">
            <div className="space-y-8">
              {/* Loan Amount */}
              <div>
                <label className="flex justify-between text-sm font-semibold text-gray-700 mb-3">
                  <span>Loan Amount</span>
                  <span className="text-green-600">₹{loanAmount.toLocaleString('en-IN')}</span>
                </label>
                <input
                  type="range"
                  min="50000"
                  max="5000000"
                  step="50000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(parseInt(e.target.value))}
                  className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>₹50K</span>
                  <span>₹50L</span>
                </div>
              </div>

              {/* Down Payment */}
              <div>
                <label className="flex justify-between text-sm font-semibold text-gray-700 mb-3">
                  <span>Down Payment</span>
                  <span className="text-green-600">₹{downPayment.toLocaleString('en-IN')}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max={loanAmount * 0.5}
                  step="10000"
                  value={downPayment}
                  onChange={(e) => setDownPayment(parseInt(e.target.value))}
                  className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                />
              </div>

              {/* Loan Tenure */}
              <div>
                <label className="flex justify-between text-sm font-semibold text-gray-700 mb-3">
                  <span>Loan Tenure</span>
                  <span className="text-green-600">{loanTenure} months ({(loanTenure / 12).toFixed(1)} years)</span>
                </label>
                <input
                  type="range"
                  min="12"
                  max="84"
                  step="12"
                  value={loanTenure}
                  onChange={(e) => setLoanTenure(parseInt(e.target.value))}
                  className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>1 year</span>
                  <span>7 years</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <label className="flex justify-between text-sm font-semibold text-gray-700 mb-3">
                  <span>Interest Rate</span>
                  <span className="text-green-600">{interestRate}% per annum</span>
                </label>
                <input
                  type="range"
                  min="9"
                  max="18"
                  step="0.5"
                  value={interestRate}
                  onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                  className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>9%</span>
                  <span>18%</span>
                </div>
              </div>

              {/* Results */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t-2 border-gray-200">
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl text-center">
                  <p className="text-sm text-gray-600 mb-2">Monthly EMI</p>
                  <p className="text-2xl sm:text-3xl font-bold text-green-600">₹{emi.toLocaleString('en-IN')}</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl text-center">
                  <p className="text-sm text-gray-600 mb-2">Total Interest</p>
                  <p className="text-2xl sm:text-3xl font-bold text-blue-600">₹{totalInterest.toLocaleString('en-IN')}</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl text-center">
                  <p className="text-sm text-gray-600 mb-2">Total Payment</p>
                  <p className="text-2xl sm:text-3xl font-bold text-purple-600">₹{totalPayment.toLocaleString('en-IN')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply-form" className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Apply for Car Loan</h2>
            <p className="text-lg text-gray-600">Complete the form below to get started</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex-1 flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    currentStep >= step ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'
                  }`}>
                    {completedSteps.includes(step) ? <CheckCircle className="w-6 h-6" /> : step}
                  </div>
                  {step < 4 && (
                    <div className={`flex-1 h-1 ${currentStep > step ? 'bg-green-600' : 'bg-gray-300'}`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-6 sm:p-8 lg:p-10">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="animate-fadeInUp">
                  <div className="flex items-center gap-3 mb-8 pb-6 border-b-2 border-gray-200">
                    <div className="bg-green-100 p-3 rounded-xl">
                      <Users className="w-6 h-6 text-green-700" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Personal Information</h3>
                      <p className="text-gray-600">Tell us about yourself</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="10-digit mobile number"
                        maxLength="10"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-4 mt-8">
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
                    >
                      Next Step <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Loan Details */}
              {currentStep === 2 && (
                <div className="animate-fadeInUp">
                  <div className="flex items-center gap-3 mb-8 pb-6 border-b-2 border-gray-200">
                    <div className="bg-green-100 p-3 rounded-xl">
                      <IndianRupee className="w-6 h-6 text-green-700" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Loan & Vehicle Details</h3>
                      <p className="text-gray-600">Tell us about the car and your finances</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Vehicle Type *</label>
                      <select
                        name="vehicleType"
                        value={formData.vehicleType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                        required
                      >
                        <option value="">Select vehicle type</option>
                        <option value="New Car">New Car</option>
                        <option value="Used Car">Used Car</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Vehicle Model *</label>
                      <input
                        type="text"
                        name="vehicleModel"
                        value={formData.vehicleModel}
                        onChange={handleInputChange}
                        placeholder="e.g., Honda City, Hyundai Creta"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Vehicle Price (₹) *</label>
                      <input
                        type="number"
                        name="vehiclePrice"
                        value={formData.vehiclePrice}
                        onChange={handleInputChange}
                        placeholder="On-road price"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Down Payment (₹) *</label>
                      <input
                        type="number"
                        name="downPayment"
                        value={formData.downPayment}
                        onChange={handleInputChange}
                        placeholder="Initial payment amount"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Loan Amount Required (₹) *</label>
                      <input
                        type="number"
                        name="loanAmount"
                        value={formData.loanAmount}
                        onChange={handleInputChange}
                        placeholder="Amount you need to borrow"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Employment Status *</label>
                      <select
                        name="employment"
                        value={formData.employment}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                        required
                      >
                        <option value="">Select employment status</option>
                        <option value="Salaried">Salaried</option>
                        <option value="Self-Employed">Self-Employed</option>
                        <option value="Business">Business Owner</option>
                        <option value="Professional">Professional</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Monthly Income (₹) *</label>
                      <input
                        type="number"
                        name="monthlyIncome"
                        value={formData.monthlyIncome}
                        onChange={handleInputChange}
                        placeholder="Your monthly income"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        placeholder="Your employer/business name"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between gap-4 mt-8">
                    <button
                      type="button"
                      onClick={handlePreviousStep}
                      className="bg-gray-200 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300 flex items-center gap-2"
                    >
                      <ArrowLeft className="w-5 h-5" /> Previous
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
                    >
                      Next Step <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Address & KYC */}
              {currentStep === 3 && (
                <div className="animate-fadeInUp">
                  <div className="flex items-center gap-3 mb-8 pb-6 border-b-2 border-gray-200">
                    <div className="bg-green-100 p-3 rounded-xl">
                      <Home className="w-6 h-6 text-green-700" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Address & KYC Details</h3>
                      <p className="text-gray-600">Provide your address and identity proof</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">PAN Number *</label>
                      <input
                        type="text"
                        name="panNumber"
                        value={formData.panNumber}
                        onChange={handleInputChange}
                        placeholder="ABCDE1234F"
                        maxLength="10"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all uppercase"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Aadhar Number *</label>
                      <input
                        type="text"
                        name="aadharNumber"
                        value={formData.aadharNumber}
                        onChange={handleInputChange}
                        placeholder="12-digit Aadhar number"
                        maxLength="12"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Address *</label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Complete residential address"
                        rows="3"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                        required
                      ></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Your city"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">State *</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="Your state"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Pincode *</label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        placeholder="6-digit pincode"
                        maxLength="6"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-between gap-4 mt-8">
                    <button
                      type="button"
                      onClick={handlePreviousStep}
                      className="bg-gray-200 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300 flex items-center gap-2"
                    >
                      <ArrowLeft className="w-5 h-5" /> Previous
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
                    >
                      Next Step <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Documents */}
              {currentStep === 4 && (
                <div className="animate-fadeInUp">
                  <div className="flex items-center gap-3 mb-8 pb-6 border-b-2 border-gray-200">
                    <div className="bg-green-100 p-3 rounded-xl">
                      <Upload className="w-6 h-6 text-green-700" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Upload Documents</h3>
                      <p className="text-gray-600">Upload required documents (PDF/JPG, max 5MB each)</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { key: 'aadhar', label: 'Aadhar Card *', icon: <BadgeCheck className="w-5 h-5" /> },
                      { key: 'pan', label: 'PAN Card *', icon: <CreditCard className="w-5 h-5" /> },
                      { key: 'bankStatement', label: 'Bank Statement *', icon: <FileText className="w-5 h-5" /> },
                      { key: 'salarySlip', label: 'Salary Slip *', icon: <FileText className="w-5 h-5" /> },
                      { key: 'photo', label: 'Passport Photo *', icon: <Users className="w-5 h-5" /> }
                    ].map((doc) => (
                      <div key={doc.key} className="relative">
                        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                          {doc.icon} {doc.label}
                        </label>
                        <div className="relative">
                          <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleFileUpload(e, doc.key)}
                            className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl focus:border-green-500 outline-none transition-all cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-50 file:text-green-700 file:font-semibold hover:file:bg-green-100"
                            required
                          />
                          {documents[doc.key] && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                              <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                          )}
                        </div>
                        {documents[doc.key] && (
                          <p className="text-sm text-green-600 mt-1">✓ {documents[doc.key].name}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between gap-4 mt-8">
                    <button
                      type="button"
                      onClick={handlePreviousStep}
                      className="bg-gray-200 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300 flex items-center gap-2"
                    >
                      <ArrowLeft className="w-5 h-5" /> Previous
                    </button>
                    <button
                      type="submit"
                      disabled={isTransitioning}
                      className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isTransitioning ? 'Submitting...' : 'Submit Application'} <CheckCircle className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 5: Success */}
              {currentStep === 5 && (
                <div className="animate-fadeInUp text-center py-12">
                  <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-16 h-16 text-green-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">Application Submitted Successfully!</h3>
                  <p className="text-lg text-gray-600 mb-6">Your car loan application has been received.</p>
                  {formData.referenceNumber && (
                    <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-8 max-w-md mx-auto">
                      <p className="text-sm text-gray-600 mb-2">Your Reference Number</p>
                      <p className="text-2xl font-bold text-green-600">{formData.referenceNumber}</p>
                      <p className="text-sm text-gray-500 mt-2">Please save this for future reference</p>
                    </div>
                  )}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      to="/"
                      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg"
                    >
                      <Home className="w-5 h-5" /> Back to Home
                    </Link>
                    <Link
                      to="/dashboard"
                      className="inline-flex items-center justify-center gap-2 bg-white text-green-600 border-2 border-green-600 px-8 py-3 rounded-xl font-semibold hover:bg-green-50 transition-all duration-300"
                    >
                      <FileText className="w-5 h-5" /> View Dashboard
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">Find answers to common questions about car loans</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-md overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 pr-8">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-green-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4 text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Car_Loan;




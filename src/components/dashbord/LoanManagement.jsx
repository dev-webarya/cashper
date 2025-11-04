import React, { useState, useRef, useEffect } from 'react';
import { Calculator, X, Download, FileText, Phone } from 'lucide-react';

// Import loan application components
import Personal_loan from '../Personal_loan';
import Home_Loan from '../Home_Loan';
import Business_loan from '../Business_loan';

const LoanManagement = () => {
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [showEMICalculator, setShowEMICalculator] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showLoanForm, setShowLoanForm] = useState(false);
  const [selectedLoanType, setSelectedLoanType] = useState('');
  const [showPayEMIModal, setShowPayEMIModal] = useState(false);
  const [showLoanDetailsModal, setShowLoanDetailsModal] = useState(false);
  const [selectedLoanForPayment, setSelectedLoanForPayment] = useState(null);
  const loanFormRef = useRef(null);

  // Scroll to form when it opens
  useEffect(() => {
    if (showLoanForm && loanFormRef.current) {
      setTimeout(() => {
        const formSection = loanFormRef.current.querySelector('#apply-form');
        if (formSection) {
          formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [showLoanForm, selectedLoanType]);
  
  // EMI Calculator State
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(12);
  const [tenure, setTenure] = useState(36);
  
  // Calculate EMI
  const calculateEMI = () => {
    const principal = loanAmount;
    const ratePerMonth = interestRate / 12 / 100;
    const months = tenure;
    
    const emi = (principal * ratePerMonth * Math.pow(1 + ratePerMonth, months)) / 
                (Math.pow(1 + ratePerMonth, months) - 1);
    
    const totalAmount = emi * months;
    const totalInterest = totalAmount - principal;
    
    return {
      emi: Math.round(emi),
      totalAmount: Math.round(totalAmount),
      totalInterest: Math.round(totalInterest),
      principal: principal
    };
  };
  
  const emiResult = calculateEMI();

  const loans = [
    {
      id: 1,
      type: 'Personal Loan',
      amount: '₹5,00,000',
      outstanding: '₹3,50,000',
      emi: '₹15,000',
      nextDue: 'Jan 5, 2025',
      status: 'active',
      progress: 30,
      interestRate: '12.5%',
      tenure: '36 months',
      monthsCompleted: 12
    },
    {
      id: 2,
      type: 'Home Loan',
      amount: '₹50,00,000',
      outstanding: '₹45,00,000',
      emi: '₹45,000',
      nextDue: 'Jan 5, 2025',
      status: 'active',
      progress: 10,
      interestRate: '8.5%',
      tenure: '240 months',
      monthsCompleted: 24
    },
    {
      id: 3,
      type: 'Business Loan',
      amount: '₹10,00,000',
      outstanding: '₹2,50,000',
      emi: '₹25,000',
      nextDue: 'Jan 5, 2025',
      status: 'active',
      progress: 75,
      interestRate: '14%',
      tenure: '48 months',
      monthsCompleted: 36
    }
  ];

  const loanApplications = [
    { id: 1, type: 'Short-Term Loan', amount: '₹2,00,000', date: 'Dec 28, 2024', status: 'pending' },
    { id: 2, type: 'Vehicle Loan', amount: '₹7,50,000', date: 'Dec 20, 2024', status: 'approved' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Loan Management</h1>
          <p className="text-gray-600 mt-1">Manage all your loans in one place</p>
        </div>
        <button 
          onClick={() => setShowApplyModal(true)}
          className="bg-gradient-to-r from-green-600 via-green-700 to-green-800 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          + Apply for New Loan
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm mb-2">Total Loan Amount</p>
              <p className="text-3xl font-bold">₹65,00,000</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm mb-2">Outstanding Amount</p>
              <p className="text-3xl font-bold">₹51,00,000</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-100 text-sm mb-2">Monthly EMI</p>
              <p className="text-3xl font-bold">₹85,000</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Active Loans */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Active Loans</h2>
        <div className="space-y-4">
          {loans.map((loan) => (
            <div
              key={loan.id}
              className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedLoan(loan)}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-gray-800">{loan.type}</h3>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                      Active
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Total Amount</p>
                      <p className="text-sm font-semibold text-gray-800">{loan.amount}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Outstanding</p>
                      <p className="text-sm font-semibold text-gray-800">{loan.outstanding}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Monthly EMI</p>
                      <p className="text-sm font-semibold text-gray-800">{loan.emi}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Next Due</p>
                      <p className="text-sm font-semibold text-gray-800">{loan.nextDue}</p>
                    </div>
                  </div>

                  <div className="mb-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-600">Repayment Progress</span>
                      <span className="text-xs font-semibold text-gray-800">{loan.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${loan.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="flex lg:flex-col gap-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedLoanForPayment(loan);
                      setShowPayEMIModal(true);
                    }}
                    className="flex-1 lg:flex-none px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg text-sm font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-md"
                  >
                    Pay EMI
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedLoan(loan);
                      setShowLoanDetailsModal(true);
                    }}
                    className="flex-1 lg:flex-none px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-all"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Loan Applications */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Applications</h2>
        <div className="space-y-4">
          {loanApplications.map((app) => (
            <div key={app.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors gap-4">
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-800 mb-1">{app.type}</h3>
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                  <span>Amount: {app.amount}</span>
                  <span>•</span>
                  <span>Applied on: {app.date}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  app.status === 'approved' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {app.status === 'approved' ? 'Approved' : 'Pending'}
                </span>
                <button 
                  onClick={() => alert(`Tracking Application:\n\n${app.type}\nAmount: ${app.amount}\nStatus: ${app.status.toUpperCase()}\nApplied: ${app.date}\n\nApplication ID: APP${app.id}00${new Date().getFullYear()}\n\nYou'll receive updates via SMS and email.`)}
                  className="px-4 py-2 text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline"
                >
                  Track →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* Apply for Loan Modal - Selection */}
      {showApplyModal && !showLoanForm && (
        <div className="fixed inset-0 bg-black/10 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-4 sm:p-6 relative animate-fadeInUp max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowApplyModal(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600 z-10"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 pr-8">Apply for New Loan</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-6">Choose your preferred loan type to get started</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {[
                { name: 'Short-Term Loan', component: 'personal', desc: 'Quick loans for immediate needs' },
                { name: 'Personal Loan', component: 'personal', desc: 'For personal expenses & goals' },
                { name: 'Home Loan', component: 'home', desc: 'Finance your dream home' },
                { name: 'Business Loan', component: 'business', desc: 'Grow your business' }
              ].map((loanType) => (
                <button
                  key={loanType.name}
                  onClick={() => {
                    setSelectedLoanType(loanType.component);
                    setShowLoanForm(true);
                    setShowApplyModal(false);
                  }}
                  className="p-4 sm:p-5 bg-gradient-to-br from-gray-50 to-gray-100 hover:from-green-50 hover:to-green-100 border-2 border-gray-200 hover:border-green-500 rounded-xl text-left transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="font-semibold text-sm sm:text-base text-gray-800 group-hover:text-green-700 mb-1">{loanType.name}</div>
                      <div className="text-xs text-gray-500 group-hover:text-gray-600">{loanType.desc}</div>
                    </div>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-green-600 flex-shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Loan Application Form - Opens in Same Page */}
      {showLoanForm && (
        <div className="mt-6">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 sm:px-6 py-4 rounded-xl mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg sm:text-xl font-bold">
                  Apply for {selectedLoanType === 'personal' ? 'Personal/Short-Term Loan' : 
                             selectedLoanType === 'home' ? 'Home Loan' : 
                             'Business Loan'}
                </h3>
                <p className="text-xs sm:text-sm text-green-100 mt-1">Fill the form below to proceed with your application</p>
              </div>
              <button
                onClick={() => {
                  setShowLoanForm(false);
                  setSelectedLoanType('');
                }}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-all"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>

          {/* Form Container */}
          <div ref={loanFormRef} className="loan-form-container">
            <style>{`
              /* Hide everything except the application form */
              .loan-form-container > div > *:not(#apply-form) {
                display: none !important;
              }
              
              .loan-form-container nav,
              .loan-form-container > div > header:not(#apply-form header),
              .loan-form-container footer {
                display: none !important;
              }
              
              .loan-form-container #apply-form {
                display: block !important;
                margin: 0 !important;
                padding: 0 !important;
                max-width: 100% !important;
              }
            `}</style>
            
            {selectedLoanType === 'personal' && <Personal_loan />}
            {selectedLoanType === 'home' && <Home_Loan />}
            {selectedLoanType === 'business' && <Business_loan />}
          </div>
        </div>
      )}

      {/* Pay EMI Modal */}
      {showPayEMIModal && selectedLoanForPayment && (
        <div className="fixed inset-0 bg-black/10 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-4 sm:p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setShowPayEMIModal(false);
                setSelectedLoanForPayment(null);
              }}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 pr-8">Pay EMI</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-6">{selectedLoanForPayment.type}</p>
            
            {/* EMI Details */}
            <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-200">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">EMI Amount:</span>
                  <span className="font-bold text-blue-700">{selectedLoanForPayment.emi}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Due Date:</span>
                  <span className="font-semibold">{selectedLoanForPayment.nextDue}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Outstanding:</span>
                  <span className="font-semibold">{selectedLoanForPayment.outstanding}</span>
                </div>
              </div>
            </div>

            {/* Payment Options */}
            <div className="space-y-3 mb-6">
              <h4 className="font-semibold text-gray-800 text-sm">Select Payment Method</h4>
              
              {[
                { method: 'UPI', icon: '📱', desc: 'Pay via UPI apps' },
                { method: 'Net Banking', icon: '🏦', desc: 'Pay through your bank' },
                { method: 'Debit/Credit Card', icon: '💳', desc: 'Pay with card' },
                { method: 'Wallet', icon: '👛', desc: 'Paytm, PhonePe, etc.' }
              ].map((payment) => (
                <button
                  key={payment.method}
                  onClick={() => {
                    alert(`Processing EMI Payment\n\nLoan: ${selectedLoanForPayment.type}\nAmount: ${selectedLoanForPayment.emi}\nMethod: ${payment.method}\n\nRedirecting to payment gateway...`);
                    setShowPayEMIModal(false);
                    setSelectedLoanForPayment(null);
                  }}
                  className="w-full p-4 bg-gray-50 hover:bg-green-50 border-2 border-gray-200 hover:border-green-500 rounded-xl text-left transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{payment.icon}</span>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800 group-hover:text-green-700">{payment.method}</div>
                      <div className="text-xs text-gray-500">{payment.desc}</div>
                    </div>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>

            <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
              <p className="text-xs text-yellow-800">
                <strong>Note:</strong> Late payment may attract additional charges. Pay before due date to avoid penalties.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Loan Details Modal */}
      {showLoanDetailsModal && selectedLoan && (
        <div className="fixed inset-0 bg-black/10 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-4 sm:p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setShowLoanDetailsModal(false);
                setSelectedLoan(null);
              }}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600 z-10"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            
            <div className="pr-8">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">{selectedLoan.type}</h3>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                {selectedLoan.status === 'active' ? 'Active' : 'Inactive'}
              </span>
            </div>
            
            <div className="space-y-4 sm:space-y-6 mt-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-blue-50 rounded-lg p-3 sm:p-4">
                  <p className="text-xs text-gray-600 mb-1">Loan Amount</p>
                  <p className="text-base sm:text-lg font-bold text-gray-800">{selectedLoan.amount}</p>
                </div>
                <div className="bg-red-50 rounded-lg p-3 sm:p-4">
                  <p className="text-xs text-gray-600 mb-1">Outstanding</p>
                  <p className="text-base sm:text-lg font-bold text-gray-800">{selectedLoan.outstanding}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-3 sm:p-4">
                  <p className="text-xs text-gray-600 mb-1">Monthly EMI</p>
                  <p className="text-base sm:text-lg font-bold text-gray-800">{selectedLoan.emi}</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-3 sm:p-4">
                  <p className="text-xs text-gray-600 mb-1">Interest Rate</p>
                  <p className="text-base sm:text-lg font-bold text-gray-800">{selectedLoan.interestRate}</p>
                </div>
              </div>

              {/* Detailed Information */}
              <div className="border-t pt-4 sm:pt-6">
                <h4 className="font-bold text-gray-800 mb-3 sm:mb-4 text-sm sm:text-base">Loan Information</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-600">Total Tenure:</span>
                    <span className="font-semibold">{selectedLoan.tenure}</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-600">Completed Months:</span>
                    <span className="font-semibold">{selectedLoan.monthsCompleted} months</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-600">Next EMI Due:</span>
                    <span className="font-semibold text-red-600">{selectedLoan.nextDue}</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-600">Repayment Progress:</span>
                    <span className="font-semibold text-green-600">{selectedLoan.progress}%</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-600">Loan Repayment Status</span>
                    <span className="text-xs font-semibold text-gray-800">{selectedLoan.progress}% Completed</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${selectedLoan.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button 
                  onClick={() => {
                    setShowLoanDetailsModal(false);
                    setSelectedLoanForPayment(selectedLoan);
                    setShowPayEMIModal(true);
                  }}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all text-sm sm:text-base"
                >
                  Pay EMI
                </button>
                <button 
                  onClick={() => {
                    alert('Downloading loan statement...');
                  }}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <Download className="w-4 h-4" />
                  Download Statement
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanManagement;

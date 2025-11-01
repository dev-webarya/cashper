import React, { useState } from 'react';
import { Calculator, X, Download, FileText, Phone } from 'lucide-react';

const LoanManagement = () => {
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [showEMICalculator, setShowEMICalculator] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  
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
                  <button className="flex-1 lg:flex-none px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg text-sm font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-md">
                    Pay EMI
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      alert(`View full details for ${loan.type}\n\nLoan Amount: ${loan.amount}\nOutstanding: ${loan.outstanding}\nEMI: ${loan.emi}\nInterest Rate: ${loan.interestRate}\nTenure: ${loan.tenure}\nCompleted: ${loan.monthsCompleted} months`);
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
                  onClick={() => alert(`Tracking ${app.type}\nStatus: ${app.status}\nAmount: ${app.amount}\nDate: ${app.date}`)}
                  className="px-4 py-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Track →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* EMI Calculator - Now Fully Functional */}
      <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl shadow-lg p-6 border border-purple-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">EMI Calculator</h2>
            <p className="text-gray-600">Calculate your loan EMI before applying</p>
          </div>
          <Calculator className="w-8 h-8 text-purple-600" />
        </div>
        
        {!showEMICalculator ? (
          <button 
            onClick={() => setShowTaxCalculator(true)}
            className="bg-gradient-to-r from-green-600 via-green-700 to-green-800 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Open Calculator
          </button>
        ) : (
          <div className="mt-6 space-y-6">
            {/* Input Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Loan Amount */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Loan Amount (₹)
                </label>
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-purple-500 focus:outline-none text-gray-800 font-semibold"
                  min="10000"
                  max="10000000"
                />
                <input
                  type="range"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  min="10000"
                  max="10000000"
                  step="10000"
                  className="w-full mt-2"
                />
                <p className="text-xs text-gray-500 mt-1">₹10,000 - ₹1 Crore</p>
              </div>

              {/* Interest Rate */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Interest Rate (% per annum)
                </label>
                <input
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-purple-500 focus:outline-none text-gray-800 font-semibold"
                  min="1"
                  max="30"
                  step="0.1"
                />
                <input
                  type="range"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  min="1"
                  max="30"
                  step="0.1"
                  className="w-full mt-2"
                />
                <p className="text-xs text-gray-500 mt-1">1% - 30%</p>
              </div>

              {/* Tenure */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Loan Tenure (months)
                </label>
                <input
                  type="number"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-purple-500 focus:outline-none text-gray-800 font-semibold"
                  min="6"
                  max="360"
                />
                <input
                  type="range"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  min="6"
                  max="360"
                  step="6"
                  className="w-full mt-2"
                />
                <p className="text-xs text-gray-500 mt-1">6 - 360 months ({Math.round(tenure/12)} years)</p>
              </div>
            </div>

            {/* Results Section */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Calculation Results</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border-l-4 border-green-600">
                  <p className="text-xs text-gray-600 mb-1">Monthly EMI</p>
                  <p className="text-2xl font-bold text-green-700">₹{emiResult.emi.toLocaleString()}</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border-l-4 border-blue-600">
                  <p className="text-xs text-gray-600 mb-1">Principal Amount</p>
                  <p className="text-2xl font-bold text-blue-700">₹{emiResult.principal.toLocaleString()}</p>
                </div>
                <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4 border-l-4 border-red-600">
                  <p className="text-xs text-gray-600 mb-1">Total Interest</p>
                  <p className="text-2xl font-bold text-red-700">₹{emiResult.totalInterest.toLocaleString()}</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border-l-4 border-purple-600">
                  <p className="text-xs text-gray-600 mb-1">Total Amount</p>
                  <p className="text-2xl font-bold text-purple-700">₹{emiResult.totalAmount.toLocaleString()}</p>
                </div>
              </div>

              {/* Visual Breakdown */}
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Payment Breakdown</h4>
                <div className="flex h-8 rounded-lg overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-semibold"
                    style={{ width: `${(emiResult.principal / emiResult.totalAmount) * 100}%` }}
                  >
                    Principal {Math.round((emiResult.principal / emiResult.totalAmount) * 100)}%
                  </div>
                  <div 
                    className="bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center text-white text-xs font-semibold"
                    style={{ width: `${(emiResult.totalInterest / emiResult.totalAmount) * 100}%` }}
                  >
                    Interest {Math.round((emiResult.totalInterest / emiResult.totalAmount) * 100)}%
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={() => setShowApplyModal(true)}
                  className="flex-1 bg-gradient-to-r from-green-600 via-green-700 to-green-800 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
                >
                  Apply for This Loan
                </button>
                <button 
                  onClick={() => window.print()}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
                <button 
                  onClick={() => setShowEMICalculator(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold transition-all"
                >
                  Close Calculator
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Apply for Loan Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative animate-fadeInUp">
            <button
              onClick={() => setShowApplyModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Apply for New Loan</h3>
            <p className="text-gray-600 mb-6">Choose your preferred loan type to get started</p>
            
            <div className="space-y-3">
              {['Personal Loan', 'Home Loan', 'Business Loan', 'Vehicle Loan', 'Education Loan'].map((loanType) => (
                <button
                  key={loanType}
                  onClick={() => {
                    alert(`Starting application for ${loanType}!\n\nYou'll be redirected to the application form.`);
                    setShowApplyModal(false);
                  }}
                  className="w-full p-4 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-green-50 hover:to-green-100 border-2 border-gray-200 hover:border-green-500 rounded-xl text-left transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-800 group-hover:text-green-700">{loanType}</span>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-blue-900">Need Help?</p>
                  <p className="text-xs text-blue-700 mt-1">Call us at 1800-XXX-XXXX for instant assistance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanManagement;

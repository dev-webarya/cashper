import React, { useState, useRef, useEffect } from 'react';
import { PieChart, X, TrendingUp, ArrowUpRight, ArrowDownRight, Download, Info, Calendar, Bell } from 'lucide-react';
import Mutual_funds from '../Mutual_funds';
import SIP from '../SIP';

const InvestmentManagement = () => {
  const [showNewSIPModal, setShowNewSIPModal] = useState(false);
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  const [showInvestMoreModal, setShowInvestMoreModal] = useState(false);
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [selectedFund, setSelectedFund] = useState(null);
  const [investAmount, setInvestAmount] = useState('');
  const [redeemAmount, setRedeemAmount] = useState('');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showInvestmentForm, setShowInvestmentForm] = useState(false);
  const [selectedInvestmentType, setSelectedInvestmentType] = useState('');
  const investmentFormRef = useRef(null);

  useEffect(() => {
    if (showInvestmentForm && investmentFormRef.current) {
      setTimeout(() => {
        const applyForm = investmentFormRef.current.querySelector('#apply-form');
        if (applyForm) {
          applyForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [showInvestmentForm]);

  const investments = [
    {
      id: 1,
      name: 'HDFC Equity Fund',
      type: 'Mutual Fund',
      invested: 50000,
      current: 62500,
      returns: 25,
      returnsType: 'positive',
      sipAmount: 5000,
      nextSIP: 'Jan 5, 2025',
      nav: 125.50,
      units: 497.51,
      startDate: 'Jan 2024',
      exitLoad: '1% if redeemed within 1 year',
      riskLevel: 'High',
      fundManager: 'Chirag Setalvad',
      aum: '₹12,500 Cr'
    },
    {
      id: 2,
      name: 'ICICI Liquid Fund',
      type: 'Mutual Fund',
      invested: 100000,
      current: 106000,
      returns: 6,
      returnsType: 'positive',
      sipAmount: 10000,
      nextSIP: 'Jan 10, 2025',
      nav: 3105.25,
      units: 34.14,
      startDate: 'Mar 2024',
      exitLoad: 'Nil',
      riskLevel: 'Low',
      fundManager: 'Manish Banthia',
      aum: '₹45,200 Cr'
    },
    {
      id: 3,
      name: 'SBI Bluechip Fund',
      type: 'SIP',
      invested: 75000,
      current: 82500,
      returns: 10,
      returnsType: 'positive',
      sipAmount: 5000,
      nextSIP: 'Jan 15, 2025',
      nav: 82.15,
      units: 1004.26,
      startDate: 'Jun 2024',
      exitLoad: '1% if redeemed within 1 year',
      riskLevel: 'Moderate',
      fundManager: 'R. Srinivasan',
      aum: '₹38,400 Cr'
    }
  ];

  const portfolioDistribution = [
    { category: 'Equity Funds', percentage: 45, amount: 112500, color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-500' },
    { category: 'Debt Funds', percentage: 30, amount: 75000, color: 'from-green-500 to-green-600', bgColor: 'bg-green-500' },
    { category: 'Liquid Funds', percentage: 25, amount: 62500, color: 'from-indigo-500 to-indigo-600', bgColor: 'bg-indigo-500' }
  ];

  const recentTransactions = [
    { id: 1, type: 'SIP Investment', fund: 'HDFC Equity Fund', amount: 5000, date: 'Dec 28, 2024', status: 'completed' },
    { id: 2, type: 'Redemption', fund: 'ICICI Liquid Fund', amount: 15000, date: 'Dec 25, 2024', status: 'completed' },
    { id: 3, type: 'SIP Investment', fund: 'SBI Bluechip Fund', amount: 5000, date: 'Dec 20, 2024', status: 'completed' },
    { id: 4, type: 'Lumpsum Investment', fund: 'HDFC Equity Fund', amount: 25000, date: 'Dec 15, 2024', status: 'completed' }
  ];

  const totalInvested = investments.reduce((sum, inv) => sum + inv.invested, 0);
  const totalCurrent = investments.reduce((sum, inv) => sum + inv.current, 0);
  const totalReturns = totalCurrent - totalInvested;
  const returnsPercentage = ((totalReturns / totalInvested) * 100).toFixed(2);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleInvestMore = (investment) => {
    setSelectedFund(investment);
    setShowInvestMoreModal(true);
    setInvestAmount('');
  };

  const handleRedeem = (investment) => {
    setSelectedFund(investment);
    setShowRedeemModal(true);
    setRedeemAmount('');
  };

  const handleViewDetails = (investment) => {
    setSelectedInvestment(investment);
    setShowDetailsModal(true);
  };

  const submitInvestMore = (e) => {
    e.preventDefault();
    if (investAmount && parseFloat(investAmount) >= 500) {
      alert(`Investment Successful!\n\nFund: ${selectedFund.name}\nAmount: ₹${investAmount}\n\nYour investment will be processed within 1-2 business days.`);
      setShowInvestMoreModal(false);
      setInvestAmount('');
    }
  };

  const submitRedeem = (e) => {
    e.preventDefault();
    const maxRedeem = selectedFund.current;
    if (redeemAmount && parseFloat(redeemAmount) > 0 && parseFloat(redeemAmount) <= maxRedeem) {
      const exitLoadApplicable = selectedFund.exitLoad !== 'Nil' ? '\n\nNote: Exit load of 1% will be applicable.' : '';
      alert(`Redemption Request Submitted!\n\nFund: ${selectedFund.name}\nAmount: ₹${redeemAmount}\nAvailable in: 2-3 business days${exitLoadApplicable}`);
      setShowRedeemModal(false);
      setRedeemAmount('');
    } else {
      alert(`Please enter a valid amount (Max: ₹${maxRedeem})`);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">Investment Management</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Track and manage your investment portfolio</p>
        </div>
        <button 
          onClick={() => setShowNewSIPModal(true)}
          className="w-full sm:w-auto bg-gradient-to-r from-green-600 via-green-700 to-green-800 hover:from-green-700 hover:to-green-800 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
        >
          + Start New Investment
        </button>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-xs sm:text-sm mb-1 sm:mb-2">Total Invested</p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold">{formatCurrency(totalInvested)}</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-xs sm:text-sm mb-1 sm:mb-2">Current Value</p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold">{formatCurrency(totalCurrent)}</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-100 text-xs sm:text-sm mb-1 sm:mb-2">Total Returns</p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold">{formatCurrency(totalReturns)}</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-xs sm:text-sm mb-1 sm:mb-2">Returns %</p>
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold">+{returnsPercentage}%</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Distribution with Interactive Donut Chart */}
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">Portfolio Distribution</h2>
          <PieChart className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Interactive Donut Chart */}
          <div className="flex items-center justify-center">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64">
              {/* Donut Chart SVG */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#f3f4f6"
                  strokeWidth="12"
                />
                
                {/* Equity Funds - 45% */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="url(#blueGradient)"
                  strokeWidth="12"
                  strokeDasharray="113 251"
                  strokeDashoffset="0"
                  className="transition-all duration-500 hover:stroke-width-14 cursor-pointer"
                  strokeLinecap="round"
                />
                
                {/* Debt Funds - 30% */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="url(#greenGradient)"
                  strokeWidth="12"
                  strokeDasharray="75 251"
                  strokeDashoffset="-113"
                  className="transition-all duration-500 hover:stroke-width-14 cursor-pointer"
                  strokeLinecap="round"
                />
                
                {/* Liquid Funds - 25% */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="url(#indigoGradient)"
                  strokeWidth="12"
                  strokeDasharray="63 251"
                  strokeDashoffset="-188"
                  className="transition-all duration-500 hover:stroke-width-14 cursor-pointer"
                  strokeLinecap="round"
                />
                
                {/* Gradient Definitions */}
                <defs>
                  <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#3b82f6'}} />
                    <stop offset="100%" style={{stopColor: '#2563eb'}} />
                  </linearGradient>
                  <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#10b981'}} />
                    <stop offset="100%" style={{stopColor: '#059669'}} />
                  </linearGradient>
                  <linearGradient id="indigoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#6366f1'}} />
                    <stop offset="100%" style={{stopColor: '#4f46e5'}} />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Center Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-2xl sm:text-3xl font-bold text-gray-800">{formatCurrency(totalCurrent)}</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">Total Value</p>
              </div>
            </div>
          </div>

          {/* Distribution Details */}
          <div className="space-y-3 sm:space-y-4">
            {portfolioDistribution.map((item, index) => (
              <div key={index} className="group hover:bg-gray-50 p-3 sm:p-4 rounded-lg transition-all cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded ${item.bgColor}`}></div>
                    <span className="text-xs sm:text-sm font-semibold text-gray-700">{item.category}</span>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-600 font-semibold">{item.percentage}%</span>
                </div>
                <div className="ml-5 sm:ml-7">
                  <p className="text-base sm:text-lg font-bold text-gray-800">{formatCurrency(item.amount)}</p>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2 mt-2">
                    <div
                      className={`bg-gradient-to-r ${item.color} h-1.5 sm:h-2 rounded-full transition-all duration-500 group-hover:h-2 sm:group-hover:h-2.5`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Active Investments */}
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">Active Investments</h2>
        <div className="space-y-3 sm:space-y-4">
          {investments.map((investment) => (
            <div
              key={investment.id}
              className="border border-gray-200 rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex flex-col gap-4">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-800">{investment.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-500">{investment.type}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold w-fit flex items-center gap-1 ${
                    investment.returnsType === 'positive' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {investment.returnsType === 'positive' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {investment.returns > 0 ? '+' : ''}{investment.returns}%
                  </span>
                </div>
                
                {/* Details Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Invested</p>
                    <p className="text-sm sm:text-base font-semibold text-gray-800">{formatCurrency(investment.invested)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Current Value</p>
                    <p className="text-sm sm:text-base font-semibold text-gray-800">{formatCurrency(investment.current)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">SIP Amount</p>
                    <p className="text-sm sm:text-base font-semibold text-gray-800">{formatCurrency(investment.sipAmount)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Next SIP</p>
                    <p className="text-sm sm:text-base font-semibold text-gray-800">{investment.nextSIP}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button 
                    onClick={() => handleInvestMore(investment)}
                    className="px-4 py-2 bg-gradient-to-r from-green-600 via-green-700 to-green-800 text-white rounded-lg text-xs sm:text-sm font-semibold hover:from-green-700 hover:to-green-800 transition-all shadow-md"
                  >
                    Invest More
                  </button>
                  <button 
                    onClick={() => handleRedeem(investment)}
                    className="px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg text-xs sm:text-sm font-semibold hover:from-orange-700 hover:to-orange-800 transition-all shadow-md"
                  >
                    Redeem
                  </button>
                  <button 
                    onClick={() => handleViewDetails(investment)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-xs sm:text-sm font-semibold hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                  >
                    <Info className="w-4 h-4" />
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">Recent Transactions</h2>
          <button className="text-xs sm:text-sm text-green-600 font-semibold hover:text-green-700 flex items-center gap-1">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
        <div className="space-y-3 sm:space-y-4">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors gap-3">
              <div className="flex-1">
                <h3 className="text-xs sm:text-sm font-semibold text-gray-800 mb-1">{transaction.type}</h3>
                <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                  <span className="truncate max-w-[200px]">{transaction.fund}</span>
                  <span className="hidden sm:inline">•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {transaction.date}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                <span className="text-sm sm:text-base font-bold text-gray-900">{formatCurrency(transaction.amount)}</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                  Completed
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Start New Investment Modal */}
      {showNewSIPModal && !showInvestmentForm && (
        <div className="fixed inset-0 bg-black/10 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-4 sm:p-6 relative animate-fadeInUp max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowNewSIPModal(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600 z-10"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 pr-8">Start New Investment</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-6">Choose the best investment option for your financial goals</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {[
                { 
                  name: 'Mutual Funds', 
                  component: 'mutual', 
                  desc: 'Diversified equity & debt funds'
                },
                { 
                  name: 'SIP', 
                  component: 'sip', 
                  desc: 'Systematic Investment Plan'
                }
              ].map((investment) => (
                <button
                  key={investment.name}
                  onClick={() => {
                    setSelectedInvestmentType(investment.component);
                    setShowInvestmentForm(true);
                    setShowNewSIPModal(false);
                  }}
                  className="p-5 sm:p-6 bg-gradient-to-br from-gray-50 to-gray-100 hover:from-green-50 hover:to-green-100 border-2 border-gray-200 hover:border-green-500 rounded-xl text-left transition-all group"
                >
                  <div className="flex flex-col">
                    <div className="font-semibold text-base sm:text-lg text-gray-800 group-hover:text-green-700 mb-1">
                      {investment.name}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500 group-hover:text-gray-600 mb-3">
                      {investment.desc}
                    </div>
                    <div className="flex justify-end">
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Invest More Modal */}
      {showInvestMoreModal && selectedFund && (
        <div className="fixed inset-0 bg-black/10 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-4 sm:p-6 relative animate-fadeInUp">
            <button
              onClick={() => setShowInvestMoreModal(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 pr-8">Invest More</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">{selectedFund.name}</p>
            
            <form onSubmit={submitInvestMore} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Investment Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                  <input
                    type="number"
                    value={investAmount}
                    onChange={(e) => setInvestAmount(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
                    placeholder="Enter amount (Min: ₹500)"
                    min="500"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Minimum investment: ₹500</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Current Investment:</span>
                  <span className="font-semibold">{formatCurrency(selectedFund.invested)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Current Value:</span>
                  <span className="font-semibold">{formatCurrency(selectedFund.current)}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all shadow-md"
              >
                Invest Now
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Redeem Modal */}
      {showRedeemModal && selectedFund && (
        <div className="fixed inset-0 bg-black/10 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-4 sm:p-6 relative animate-fadeInUp">
            <button
              onClick={() => setShowRedeemModal(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 pr-8">Redeem Investment</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">{selectedFund.name}</p>
            
            <form onSubmit={submitRedeem} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Redemption Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                  <input
                    type="number"
                    value={redeemAmount}
                    onChange={(e) => setRedeemAmount(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none"
                    placeholder="Enter amount"
                    max={selectedFund.current}
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Available to redeem: {formatCurrency(selectedFund.current)}</p>
              </div>

              <div className="bg-yellow-50 rounded-lg p-3 sm:p-4 border border-yellow-200">
                <p className="text-xs sm:text-sm text-yellow-800">
                  <strong>Exit Load:</strong> {selectedFund.exitLoad}
                </p>
                <p className="text-xs text-yellow-700 mt-1">
                  Amount will be credited to your bank account in 2-3 business days.
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-600 to-orange-700 text-white py-3 rounded-lg font-semibold hover:from-orange-700 hover:to-orange-800 transition-all shadow-md"
              >
                Submit Redemption Request
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedInvestment && (
        <div className="fixed inset-0 bg-black/10 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-4 sm:p-6 relative animate-fadeInUp max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowDetailsModal(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600 z-10"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1 pr-8">{selectedInvestment.name}</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">{selectedInvestment.type}</p>
            
            <div className="space-y-4 sm:space-y-6">
              {/* Investment Summary */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-blue-50 rounded-lg p-3 sm:p-4">
                  <p className="text-xs text-gray-600 mb-1">Total Invested</p>
                  <p className="text-lg sm:text-xl font-bold text-gray-800">{formatCurrency(selectedInvestment.invested)}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-3 sm:p-4">
                  <p className="text-xs text-gray-600 mb-1">Current Value</p>
                  <p className="text-lg sm:text-xl font-bold text-gray-800">{formatCurrency(selectedInvestment.current)}</p>
                </div>
                <div className="bg-indigo-50 rounded-lg p-3 sm:p-4">
                  <p className="text-xs text-gray-600 mb-1">Total Returns</p>
                  <p className="text-lg sm:text-xl font-bold text-green-600">
                    {formatCurrency(selectedInvestment.current - selectedInvestment.invested)}
                  </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-3 sm:p-4">
                  <p className="text-xs text-gray-600 mb-1">Returns %</p>
                  <p className="text-lg sm:text-xl font-bold text-green-600">+{selectedInvestment.returns}%</p>
                </div>
              </div>

              {/* Fund Details */}
              <div className="border-t pt-4 sm:pt-6">
                <h4 className="font-bold text-gray-800 mb-3 sm:mb-4">Fund Details</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">NAV:</span>
                    <span className="font-semibold">₹{selectedInvestment.nav}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Units Held:</span>
                    <span className="font-semibold">{selectedInvestment.units}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">SIP Amount:</span>
                    <span className="font-semibold">{formatCurrency(selectedInvestment.sipAmount)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Next SIP Date:</span>
                    <span className="font-semibold">{selectedInvestment.nextSIP}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Start Date:</span>
                    <span className="font-semibold">{selectedInvestment.startDate}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Risk Level:</span>
                    <span className={`font-semibold ${
                      selectedInvestment.riskLevel === 'High' ? 'text-orange-600' :
                      selectedInvestment.riskLevel === 'Moderate' ? 'text-blue-600' :
                      'text-green-600'
                    }`}>{selectedInvestment.riskLevel}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Exit Load:</span>
                    <span className="font-semibold">{selectedInvestment.exitLoad}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Fund Manager:</span>
                    <span className="font-semibold">{selectedInvestment.fundManager}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">AUM:</span>
                    <span className="font-semibold">{selectedInvestment.aum}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Investment Application Form - Inline */}
      {showInvestmentForm && (
        <div className="mt-6">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 sm:px-6 py-4 rounded-xl mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg sm:text-xl font-bold">
                  Apply for {selectedInvestmentType === 'mutual' ? 'Mutual Funds' : 'SIP'}
                </h3>
                <p className="text-xs sm:text-sm text-green-100 mt-1">
                  Fill the form below to proceed with your application
                </p>
              </div>
              <button
                onClick={() => {
                  setShowInvestmentForm(false);
                  setSelectedInvestmentType('');
                }}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-all"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>

          {/* Form Container */}
          <div ref={investmentFormRef} className="investment-form-container">
            <style>{`
              /* Hide everything except the application form */
              .investment-form-container > div > *:not(#apply-form) {
                display: none !important;
              }
              .investment-form-container nav,
              .investment-form-container > div > header:not(#apply-form header),
              .investment-form-container footer {
                display: none !important;
              }
              .investment-form-container #apply-form {
                display: block !important;
                margin: 0 !important;
                padding: 0 !important;
                max-width: 100% !important;
              }
            `}</style>
            {selectedInvestmentType === 'mutual' && <Mutual_funds />}
            {selectedInvestmentType === 'sip' && <SIP />}
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestmentManagement;

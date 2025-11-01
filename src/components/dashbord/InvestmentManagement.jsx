import React, { useState } from 'react';
import { PieChart, X, TrendingUp, ArrowUpRight } from 'lucide-react';

const InvestmentManagement = () => {
  const [showNewSIPModal, setShowNewSIPModal] = useState(false);
  const [selectedInvestment, setSelectedInvestment] = useState(null);

  const investments = [
    {
      id: 1,
      name: 'HDFC Equity Fund',
      type: 'Mutual Fund',
      invested: '₹50,000',
      current: '₹62,500',
      returns: '+25%',
      returnsType: 'positive',
      sipAmount: '₹5,000',
      nextSIP: 'Jan 5, 2025'
    },
    {
      id: 2,
      name: 'ICICI Liquid Fund',
      type: 'Mutual Fund',
      invested: '₹1,00,000',
      current: '₹1,06,000',
      returns: '+6%',
      returnsType: 'positive',
      sipAmount: '₹10,000',
      nextSIP: 'Jan 10, 2025'
    },
    {
      id: 3,
      name: 'SBI Bluechip Fund',
      type: 'SIP',
      invested: '₹75,000',
      current: '₹82,500',
      returns: '+10%',
      returnsType: 'positive',
      sipAmount: '₹5,000',
      nextSIP: 'Jan 15, 2025'
    }
  ];

  const portfolioDistribution = [
    { category: 'Equity Funds', percentage: 45, amount: '₹1,12,500', color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-500' },
    { category: 'Debt Funds', percentage: 30, amount: '₹75,000', color: 'from-green-500 to-green-600', bgColor: 'bg-green-500' },
    { category: 'Liquid Funds', percentage: 25, amount: '₹62,500', color: 'from-indigo-500 to-indigo-600', bgColor: 'bg-indigo-500' }
  ];

  const recentTransactions = [
    { id: 1, type: 'SIP Investment', fund: 'HDFC Equity Fund', amount: '₹5,000', date: 'Dec 28, 2024', status: 'completed' },
    { id: 2, type: 'Redemption', fund: 'ICICI Liquid Fund', amount: '₹15,000', date: 'Dec 25, 2024', status: 'completed' },
    { id: 3, type: 'SIP Investment', fund: 'SBI Bluechip Fund', amount: '₹5,000', date: 'Dec 20, 2024', status: 'completed' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Investment Management</h1>
          <p className="text-gray-600 mt-1">Track and manage your investment portfolio</p>
        </div>
        <button 
          onClick={() => setShowNewSIPModal(true)}
          className="bg-gradient-to-r from-green-600 via-green-700 to-green-800 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          + Start New SIP
        </button>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm mb-2">Total Invested</p>
              <p className="text-3xl font-bold">₹2,25,000</p>
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
              <p className="text-green-100 text-sm mb-2">Current Value</p>
              <p className="text-3xl font-bold">₹2,51,000</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-100 text-sm mb-2">Total Returns</p>
              <p className="text-3xl font-bold">₹26,000</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm mb-2">Returns %</p>
              <p className="text-3xl font-bold">+11.56%</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio Distribution with Interactive Donut Chart */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Portfolio Distribution</h2>
          <PieChart className="w-6 h-6 text-gray-600" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Interactive Donut Chart */}
          <div className="flex items-center justify-center">
            <div className="relative w-64 h-64">
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
                <p className="text-3xl font-bold text-gray-800">₹2.5L</p>
                <p className="text-sm text-gray-500 mt-1">Total Value</p>
              </div>
            </div>
          </div>

          {/* Distribution Details */}
          <div className="space-y-4">
            {portfolioDistribution.map((item, index) => (
              <div key={index} className="group hover:bg-gray-50 p-4 rounded-lg transition-all cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded ${item.bgColor}`}></div>
                    <span className="text-sm font-semibold text-gray-700">{item.category}</span>
                  </div>
                  <span className="text-sm text-gray-600 font-semibold">{item.percentage}%</span>
                </div>
                <div className="ml-7">
                  <p className="text-lg font-bold text-gray-800">{item.amount}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className={`bg-gradient-to-r ${item.color} h-2 rounded-full transition-all duration-500 group-hover:h-2.5`}
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
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Active Investments</h2>
        <div className="space-y-4">
          {investments.map((investment) => (
            <div
              key={investment.id}
              className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedInvestment(investment)}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{investment.name}</h3>
                      <p className="text-sm text-gray-500">{investment.type}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold w-fit ${
                      investment.returnsType === 'positive' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {investment.returns}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Invested</p>
                      <p className="text-sm font-semibold text-gray-800">{investment.invested}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Current Value</p>
                      <p className="text-sm font-semibold text-gray-800">{investment.current}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">SIP Amount</p>
                      <p className="text-sm font-semibold text-gray-800">{investment.sipAmount}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Next SIP</p>
                      <p className="text-sm font-semibold text-gray-800">{investment.nextSIP}</p>
                    </div>
                  </div>
                </div>

                <div className="flex lg:flex-col gap-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      alert(`Invest More in ${investment.name}\n\nCurrent Investment: ${investment.invested}\nCurrent Value: ${investment.current}\nReturns: ${investment.returns}`);
                    }}
                    className="flex-1 lg:flex-none px-4 py-2 bg-gradient-to-r from-green-600 via-green-700 to-green-800 text-white rounded-lg text-sm font-semibold hover:from-green-700 hover:to-green-800 transition-all shadow-md"
                  >
                    Invest More
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      alert(`Redeem from ${investment.name}\n\nAvailable to Redeem: ${investment.current}\n\nNote: Exit load and tax implications may apply.`);
                    }}
                    className="flex-1 lg:flex-none px-4 py-2 bg-gradient-to-r from-green-600 via-green-700 to-green-800 text-white rounded-lg text-sm font-semibold hover:from-green-700 hover:to-green-800 transition-all shadow-md"
                  >
                    Redeem
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      alert(`${investment.name} - Full Details\n\nType: ${investment.type}\nInvested: ${investment.invested}\nCurrent Value: ${investment.current}\nReturns: ${investment.returns}\nSIP Amount: ${investment.sipAmount}\nNext SIP Date: ${investment.nextSIP}`);
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

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Transactions</h2>
        <div className="space-y-4">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors gap-4">
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-800 mb-1">{transaction.type}</h3>
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                  <span>{transaction.fund}</span>
                  <span>•</span>
                  <span>{transaction.date}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-gray-900">{transaction.amount}</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                  Completed
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Investment Goal Planner */}
      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-lg p-6 border border-green-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Investment Goal Planner</h2>
            <p className="text-gray-600">Plan your investments to achieve your financial goals</p>
          </div>
          <TrendingUp className="w-8 h-8 text-green-600" />
        </div>
        <button 
          onClick={() => alert('Investment Goal Planner\n\nCreate personalized investment plans for:\n• Retirement Planning\n• Child Education\n• Dream Home\n• Wealth Creation\n• Emergency Fund\n\nFeature coming soon!')}
          className="bg-gradient-to-r from-green-600 via-green-700 to-green-800 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          Create Goal Plan
        </button>
      </div>

      {/* Start New SIP Modal */}
      {showNewSIPModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 relative animate-fadeInUp max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowNewSIPModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Start New SIP</h3>
            <p className="text-gray-600 mb-6">Choose from our top-performing mutual funds</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'HDFC Top 100 Fund', returns: '18.5%', risk: 'High', minSIP: '₹500' },
                { name: 'ICICI Prudential Bluechip', returns: '16.2%', risk: 'Moderate', minSIP: '₹500' },
                { name: 'SBI Magnum Midcap', returns: '20.5%', risk: 'High', minSIP: '₹1,000' },
                { name: 'Axis Long Term Equity', returns: '15.8%', risk: 'Moderate', minSIP: '₹500' },
                { name: 'Parag Parikh Flexi Cap', returns: '19.3%', risk: 'High', minSIP: '₹1,000' },
                { name: 'Mirae Asset Tax Saver', returns: '17.1%', risk: 'Moderate', minSIP: '₹500' }
              ].map((fund, index) => (
                <div
                  key={index}
                  className="border-2 border-gray-200 hover:border-green-500 rounded-xl p-4 cursor-pointer transition-all group hover:shadow-lg"
                  onClick={() => {
                    alert(`Starting SIP in ${fund.name}\n\n3-Year Returns: ${fund.returns}\nRisk Level: ${fund.risk}\nMinimum SIP: ${fund.minSIP}\n\nYou'll be redirected to complete the investment.`);
                    setShowNewSIPModal(false);
                  }}
                >
                  <h4 className="font-bold text-gray-800 mb-2 group-hover:text-green-700">{fund.name}</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">3Y Returns:</span>
                      <span className="font-semibold text-green-600 flex items-center">
                        <ArrowUpRight className="w-3 h-3 mr-1" />
                        {fund.returns}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Risk Level:</span>
                      <span className={`font-semibold ${fund.risk === 'High' ? 'text-orange-600' : 'text-blue-600'}`}>
                        {fund.risk}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Min SIP:</span>
                      <span className="font-semibold text-gray-800">{fund.minSIP}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> Mutual fund investments are subject to market risks. Please read all scheme related documents carefully before investing.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestmentManagement;

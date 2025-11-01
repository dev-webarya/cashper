import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IndianRupee, Shield, TrendingUp, PiggyBank, ArrowUpRight, ArrowDownRight, Clock, CheckCircle, AlertCircle, FileText, CreditCard, Home, Car, Briefcase, Heart, ShieldCheck, Activity, Calculator, DollarSign, TrendingDown } from 'lucide-react';

const DashboardOverview = () => {
  const navigate = useNavigate();
  const [showLoanModal, setShowLoanModal] = useState(false);
  const [showInsuranceModal, setShowInsuranceModal] = useState(false);
  const [showInvestmentModal, setShowInvestmentModal] = useState(false);
  const [showTaxModal, setShowTaxModal] = useState(false);
  const [showAllActivities, setShowAllActivities] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const statsCards = [
    {
      title: 'Active Loans',
      value: '3',
      change: '+2 this month',
      changeType: 'increase',
      icon: <IndianRupee className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8" />,
      color: 'from-green-600 to-green-700',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Insurance Policies',
      value: '5',
      change: 'All active',
      changeType: 'neutral',
      icon: <Shield className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8" />,
      color: 'from-emerald-600 to-teal-600',
      bgColor: 'bg-emerald-50'
    },
    {
      title: 'Investments',
      value: '₹2.5L',
      change: '+12.5% growth',
      changeType: 'increase',
      icon: <TrendingUp className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8" />,
      color: 'from-blue-600 to-indigo-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Tax Saved',
      value: '₹45K',
      change: 'This year',
      changeType: 'neutral',
      icon: <PiggyBank className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8" />,
      color: 'from-purple-600 to-pink-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const recentActivities = [
    { id: 1, title: 'Personal Loan EMI Paid', amount: '₹15,000', date: 'Today', status: 'success', icon: CheckCircle },
    { id: 2, title: 'SIP Investment', amount: '₹5,000', date: 'Yesterday', status: 'success', icon: CheckCircle },
    { id: 3, title: 'Health Insurance Premium', amount: '₹8,500', date: '3 days ago', status: 'pending', icon: Clock },
    { id: 4, title: 'Tax Planning Consultation', amount: 'Free', date: '5 days ago', status: 'success', icon: CheckCircle }
  ];

  const upcomingPayments = [
    { id: 1, title: 'Home Loan EMI', amount: '₹25,000', dueDate: 'Jan 5, 2025', type: 'loan', urgent: true },
    { id: 2, title: 'Motor Insurance Renewal', amount: '₹12,000', dueDate: 'Jan 10, 2025', type: 'insurance', urgent: false },
    { id: 3, title: 'Mutual Fund SIP', amount: '₹5,000', dueDate: 'Jan 15, 2025', type: 'investment', urgent: false }
  ];

  const quickActions = [
    { 
      name: 'Apply for Loan', 
      icon: '💰', 
      color: 'from-green-600 to-green-700', 
      hoverColor: 'hover:from-green-700 hover:to-green-800',
      onClick: () => setShowLoanModal(true)
    },
    { 
      name: 'Buy Insurance', 
      icon: '🛡️', 
      color: 'from-emerald-600 to-teal-600', 
      hoverColor: 'hover:from-emerald-700 hover:to-teal-700',
      onClick: () => setShowInsuranceModal(true)
    },
    { 
      name: 'Start SIP', 
      icon: '📈', 
      color: 'from-blue-600 to-indigo-600', 
      hoverColor: 'hover:from-blue-700 hover:to-indigo-700',
      onClick: () => setShowInvestmentModal(true)
    },
    { 
      name: 'Tax Planning', 
      icon: '📊', 
      color: 'from-purple-600 to-pink-600', 
      hoverColor: 'hover:from-purple-700 hover:to-pink-700',
      onClick: () => setShowTaxModal(true)
    }
  ];

  return (
    <div className="space-y-4 xs:space-y-5 sm:space-y-6">
      {/* Welcome Banner - Mobile Friendly */}
      <div className="bg-gradient-to-r from-green-600 via-green-700 to-green-800 rounded-xl sm:rounded-2xl shadow-lg p-4 xs:p-5 sm:p-6 text-white">
        <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold mb-2">Welcome to Your Dashboard! 👋</h2>
        <p className="text-xs xs:text-sm sm:text-base text-green-50">Here's an overview of your financial activities</p>
      </div>

      {/* Stats Grid - Fully Responsive */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-5 lg:gap-6">
        {statsCards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
          >
            <div className="p-4 xs:p-5 sm:p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs xs:text-sm font-medium text-gray-600 mb-2">{card.title}</p>
                  <p className="text-2xl xs:text-3xl sm:text-3xl font-bold text-gray-900 mb-2">{card.value}</p>
                  <div className="flex items-center">
                    {card.changeType === 'increase' && (
                      <ArrowUpRight className="w-3 h-3 xs:w-4 xs:h-4 text-green-600 mr-1" />
                    )}
                    <p className={`text-xs xs:text-sm font-medium ${
                      card.changeType === 'increase' ? 'text-green-600' : 'text-gray-500'
                    }`}>
                      {card.change}
                    </p>
                  </div>
                </div>
                <div className={`w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white shadow-lg`}>
                  {card.icon}
                </div>
              </div>
            </div>
            <div className={`h-1 bg-gradient-to-r ${card.color}`}></div>
          </div>
        ))}
      </div>

      {/* Quick Actions - Mobile Optimized */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 xs:p-5 sm:p-6">
        <h3 className="text-base xs:text-lg sm:text-xl font-bold text-gray-900 mb-3 xs:mb-4 sm:mb-5">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 xs:gap-3 sm:gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className={`flex flex-col items-center justify-center p-3 xs:p-4 sm:p-6 bg-gradient-to-br ${action.color} ${action.hoverColor} text-white rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95`}
            >
              <span className="text-2xl xs:text-3xl sm:text-4xl mb-2">{action.icon}</span>
              <span className="text-xs xs:text-sm sm:text-base font-semibold text-center">{action.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Two Column Layout - Responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 xs:gap-5 sm:gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 xs:p-5 sm:p-6">
          <h3 className="text-base xs:text-lg sm:text-xl font-bold text-gray-900 mb-3 xs:mb-4 sm:mb-5">Recent Activities</h3>
          <div className="space-y-3 xs:space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-3 xs:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center flex-1 min-w-0">
                  <div className={`p-2 rounded-lg mr-3 flex-shrink-0 ${
                    activity.status === 'success' ? 'bg-green-100' : 'bg-yellow-100'
                  }`}>
                    <activity.icon className={`w-4 h-4 xs:w-5 xs:h-5 ${
                      activity.status === 'success' ? 'text-green-600' : 'text-yellow-600'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs xs:text-sm font-semibold text-gray-900 truncate">{activity.title}</p>
                    <p className="text-[10px] xs:text-xs text-gray-500">{activity.date}</p>
                  </div>
                </div>
                <p className="text-xs xs:text-sm font-bold text-green-700 ml-2 flex-shrink-0">{activity.amount}</p>
              </div>
            ))}
          </div>
          <button 
            onClick={() => setShowAllActivities(true)}
            className="w-full mt-4 px-4 py-2 xs:py-2.5 border-2 border-green-600 text-green-700 rounded-lg hover:bg-green-50 transition-colors font-semibold text-xs xs:text-sm"
          >
            View All Activities
          </button>
        </div>

        {/* Upcoming Payments */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 xs:p-5 sm:p-6">
          <h3 className="text-base xs:text-lg sm:text-xl font-bold text-gray-900 mb-3 xs:mb-4 sm:mb-5">Upcoming Payments</h3>
          <div className="space-y-3 xs:space-y-4">
            {upcomingPayments.map((payment) => (
              <div
                key={payment.id}
                className={`p-3 xs:p-4 rounded-lg border-l-4 ${
                  payment.urgent ? 'border-red-500 bg-red-50' : 'border-green-500 bg-green-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs xs:text-sm font-semibold text-gray-900">{payment.title}</p>
                  {payment.urgent && (
                    <span className="px-2 py-0.5 bg-red-500 text-white text-[10px] xs:text-xs font-bold rounded-full">
                      Urgent
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xl xs:text-2xl font-bold text-gray-900">{payment.amount}</p>
                  <p className="text-[10px] xs:text-xs text-gray-500">Due: {payment.dueDate}</p>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => setShowPaymentModal(true)}
            className="w-full mt-4 px-4 py-2 xs:py-2.5 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg transition-all font-semibold text-xs xs:text-sm shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Pay Now
          </button>
        </div>
      </div>

      {/* Financial Growth Over Time - Professional Chart */}
      <div className="bg-gradient-to-br from-white via-gray-50 to-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
        {/* Premium Header with Homepage Color Scheme */}
        <div className="bg-gradient-to-r from-green-600 via-green-700 to-green-800 px-6 py-5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                📊 Financial Growth Over Time
              </h3>
              <p className="text-green-100 text-sm mt-1">Track your monthly income, investments, and expenses with real-time analytics</p>
            </div>
            <div className="flex gap-3">
              <select className="px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white rounded-lg transition-all cursor-pointer font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-white/50">
                <option className="text-gray-800">Last 6 Months</option>
                <option className="text-gray-800">Last Year</option>
                <option className="text-gray-800">All Time</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Quick Stats Bar */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl p-4 border-2 border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                <span className="text-xs font-bold text-gray-600 uppercase tracking-wide">Avg Income</span>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-green-700">₹88K</p>
              <p className="text-xs text-green-600 mt-1 font-semibold">per month</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-4 border-2 border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                <span className="text-xs font-bold text-gray-600 uppercase tracking-wide">Avg Investment</span>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-blue-700">₹72.5K</p>
              <p className="text-xs text-blue-600 mt-1 font-semibold">per month</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl p-4 border-2 border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></div>
                <span className="text-xs font-bold text-gray-600 uppercase tracking-wide">Savings Rate</span>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-purple-700">43%</p>
              <p className="text-xs text-purple-600 mt-1 font-semibold">after expenses</p>
            </div>
          </div>

          {/* Compact Vertical Bar Chart */}
          <div className="bg-white rounded-2xl p-4 xs:p-5 sm:p-6 border-2 border-gray-100 shadow-inner">
            {/* Legend */}
            <div className="flex flex-wrap items-center justify-center gap-3 xs:gap-4 sm:gap-6 mb-6 pb-4 border-b-2 border-gray-100">
              <div className="flex items-center gap-2 px-3 xs:px-4 py-2 bg-green-50 rounded-lg border border-green-300">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                <span className="text-xs xs:text-sm font-bold text-gray-700">Income</span>
              </div>
              <div className="flex items-center gap-2 px-3 xs:px-4 py-2 bg-blue-50 rounded-lg border border-blue-300">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <span className="text-xs xs:text-sm font-bold text-gray-700">Investment</span>
              </div>
              <div className="flex items-center gap-2 px-3 xs:px-4 py-2 bg-red-50 rounded-lg border border-red-300">
                <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                <span className="text-xs xs:text-sm font-bold text-gray-700">Expense</span>
              </div>
            </div>

            {/* Vertical Bar Chart Container */}
            <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 xs:p-5 sm:p-6">
              {/* Y-axis scale */}
              <div className="flex mb-3">
                <div className="w-12 flex flex-col justify-between text-right pr-3 text-[10px] xs:text-xs font-bold text-gray-500" style={{ height: '300px' }}>
                  <span>100K</span>
                  <span>75K</span>
                  <span>50K</span>
                  <span>25K</span>
                  <span>0</span>
                </div>
                
                {/* Chart Area */}
                <div className="flex-1 relative" style={{ height: '300px' }}>
                  {/* Horizontal grid lines */}
                  <div className="absolute inset-0 flex flex-col justify-between">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-full h-px bg-gray-200"></div>
                    ))}
                  </div>

                  {/* Vertical Bars */}
                  <div className="absolute inset-0 flex items-end justify-around gap-2 xs:gap-3 sm:gap-4 px-2">
                    {[
                      { month: 'Jul', income: 85, investment: 60, expense: 45 },
                      { month: 'Aug', income: 78, investment: 65, expense: 50 },
                      { month: 'Sep', income: 90, investment: 70, expense: 48 },
                      { month: 'Oct', income: 92, investment: 75, expense: 52 },
                      { month: 'Nov', income: 88, investment: 80, expense: 55 },
                      { month: 'Dec', income: 95, investment: 85, expense: 50 }
                    ].map((data, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center group">
                        {/* Bars Container */}
                        <div className="w-full flex justify-center gap-0.5 xs:gap-1 mb-2" style={{ height: '280px' }}>
                          {/* Income Bar */}
                          <div className="relative flex flex-col justify-end flex-1 max-w-[20px] xs:max-w-[24px] group/bar">
                            <div 
                              className="w-full bg-gradient-to-t from-green-600 to-green-400 rounded-t-lg transition-all duration-700 ease-out hover:from-green-700 hover:to-green-500 shadow-lg relative overflow-hidden"
                              style={{ height: `${data.income}%` }}
                            >
                              {/* Shine effect */}
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                              {/* Value on hover */}
                              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity bg-green-800 text-white px-2 py-0.5 rounded text-[9px] xs:text-[10px] font-bold whitespace-nowrap">
                                ₹{data.income}K
                              </div>
                            </div>
                          </div>

                          {/* Investment Bar */}
                          <div className="relative flex flex-col justify-end flex-1 max-w-[20px] xs:max-w-[24px] group/bar">
                            <div 
                              className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all duration-700 ease-out hover:from-blue-700 hover:to-blue-500 shadow-lg relative overflow-hidden"
                              style={{ height: `${data.investment}%` }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity bg-blue-800 text-white px-2 py-0.5 rounded text-[9px] xs:text-[10px] font-bold whitespace-nowrap">
                                ₹{data.investment}K
                              </div>
                            </div>
                          </div>

                          {/* Expense Bar */}
                          <div className="relative flex flex-col justify-end flex-1 max-w-[20px] xs:max-w-[24px] group/bar">
                            <div 
                              className="w-full bg-gradient-to-t from-red-600 to-red-400 rounded-t-lg transition-all duration-700 ease-out hover:from-red-700 hover:to-red-500 shadow-lg relative overflow-hidden"
                              style={{ height: `${data.expense}%` }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity bg-red-800 text-white px-2 py-0.5 rounded text-[9px] xs:text-[10px] font-bold whitespace-nowrap">
                                ₹{data.expense}K
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Month Label */}
                        <div className="text-center">
                          <p className="text-[10px] xs:text-xs font-bold text-gray-700 group-hover:text-green-700 transition-colors">
                            {data.month}
                          </p>
                          <p className="text-[9px] xs:text-[10px] font-semibold text-green-600 mt-0.5">
                            ₹{data.income - data.expense}K
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bar Labels */}
              <div className="flex justify-center gap-4 xs:gap-6 mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 xs:w-4 xs:h-4 bg-gradient-to-t from-green-600 to-green-400 rounded"></div>
                  <span className="text-[10px] xs:text-xs font-semibold text-gray-600">I</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 xs:w-4 xs:h-4 bg-gradient-to-t from-blue-600 to-blue-400 rounded"></div>
                  <span className="text-[10px] xs:text-xs font-semibold text-gray-600">Inv</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 xs:w-4 xs:h-4 bg-gradient-to-t from-red-600 to-red-400 rounded"></div>
                  <span className="text-[10px] xs:text-xs font-semibold text-gray-600">Exp</span>
                </div>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-3 gap-3 xs:gap-4 mt-6">
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-3 xs:p-4 border-2 border-green-200">
                <p className="text-[10px] xs:text-xs text-gray-600 font-medium mb-1">Total Income</p>
                <p className="text-lg xs:text-xl font-bold text-green-700">₹5.28L</p>
                <p className="text-[9px] xs:text-[10px] text-green-600 font-semibold mt-1">+12.5% ↗</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 xs:p-4 border-2 border-blue-200">
                <p className="text-[10px] xs:text-xs text-gray-600 font-medium mb-1">Total Invested</p>
                <p className="text-lg xs:text-xl font-bold text-blue-700">₹4.35L</p>
                <p className="text-[9px] xs:text-[10px] text-blue-600 font-semibold mt-1">+18.2% ↗</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-3 xs:p-4 border-2 border-purple-200">
                <p className="text-[10px] xs:text-xs text-gray-600 font-medium mb-1">Net Savings</p>
                <p className="text-lg xs:text-xl font-bold text-purple-700">₹2.28L</p>
                <p className="text-[9px] xs:text-[10px] text-purple-600 font-semibold mt-1">43.2% 💰</p>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Growth Statistics Cards - Homepage Color Matched */}
        <div className="p-6 pt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Total Income Card */}
            <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 transform relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-white/80 text-sm font-semibold mb-2 uppercase tracking-wide">Total Income</p>
                <p className="text-4xl sm:text-5xl font-bold mb-4">₹5.28L</p>
                <div className="flex items-center justify-between pt-4 border-t border-white/20">
                  <div className="flex items-center gap-2">
                    <ArrowUpRight className="w-4 h-4" />
                    <span className="text-sm font-bold">+12.5% Growth</span>
                  </div>
                  <span className="text-xs bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full font-semibold">6 months</span>
                </div>
              </div>
            </div>

            {/* Total Invested Card */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 transform relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                    <PiggyBank className="w-6 h-6" />
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-white/80 text-sm font-semibold mb-2 uppercase tracking-wide">Total Invested</p>
                <p className="text-4xl sm:text-5xl font-bold mb-4">₹4.35L</p>
                <div className="flex items-center justify-between pt-4 border-t border-white/20">
                  <div className="flex items-center gap-2">
                    <ArrowUpRight className="w-4 h-4" />
                    <span className="text-sm font-bold">+18.2% Growth</span>
                  </div>
                  <span className="text-xs bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full font-semibold">6 months</span>
                </div>
              </div>
            </div>

            {/* Net Savings Card */}
            <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 transform relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-white/80 text-sm font-semibold mb-2 uppercase tracking-wide">Net Savings</p>
                <p className="text-4xl sm:text-5xl font-bold mb-4">₹2.28L</p>
                <div className="flex items-center justify-between pt-4 border-t border-white/20">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-bold">43.2% Rate</span>
                  </div>
                  <span className="text-xs bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full font-semibold">Excellent</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loan Application Modal */}
      {showLoanModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowLoanModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <AlertCircle className="w-6 h-6" />
            </button>
            
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <IndianRupee className="w-8 h-8 text-green-600" />
              Apply for Loan
            </h3>
            <p className="text-gray-600 mb-6">Choose the type of loan you want to apply for</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'Personal Loan', icon: FileText, route: '/loans/personal', color: 'from-blue-500 to-blue-600', desc: 'Quick personal loans' },
                { name: 'Home Loan', icon: Home, route: '/loans/home', color: 'from-green-500 to-green-600', desc: 'Finance your dream home' },
                { name: 'Business Loan', icon: Briefcase, route: '/loans/business', color: 'from-purple-500 to-purple-600', desc: 'Grow your business' },
                { name: 'Car Loan', icon: Car, route: '/loans/car', color: 'from-indigo-500 to-indigo-600', desc: 'Buy your dream car' },
                { name: 'Short-Term Loan', icon: Clock, route: '/loans/short-term', color: 'from-orange-500 to-orange-600', desc: 'Quick cash loans' },
              ].map((loan, index) => (
                <button
                  key={index}
                  onClick={() => {
                    navigate(loan.route);
                    setShowLoanModal(false);
                  }}
                  className="flex items-center gap-4 p-4 border-2 border-gray-200 hover:border-green-500 rounded-xl transition-all group hover:shadow-lg"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${loan.color} flex items-center justify-center flex-shrink-0`}>
                    <loan.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-bold text-gray-800 group-hover:text-green-700">{loan.name}</p>
                    <p className="text-xs text-gray-500">{loan.desc}</p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-green-600" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Insurance Modal */}
      {showInsuranceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowInsuranceModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <AlertCircle className="w-6 h-6" />
            </button>
            
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Shield className="w-8 h-8 text-emerald-600" />
              Buy Insurance
            </h3>
            <p className="text-gray-600 mb-6">Protect yourself and your loved ones with our insurance plans</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'Health Insurance', icon: Heart, route: '/insurance/health', color: 'from-red-500 to-red-600', desc: 'Comprehensive health coverage' },
                { name: 'Term Insurance', icon: ShieldCheck, route: '/insurance/term', color: 'from-blue-500 to-blue-600', desc: 'Life protection for family' },
                { name: 'Motor Insurance', icon: Car, route: '/insurance/motor', color: 'from-purple-500 to-purple-600', desc: 'Vehicle insurance plans' },
              ].map((insurance, index) => (
                <button
                  key={index}
                  onClick={() => {
                    navigate(insurance.route);
                    setShowInsuranceModal(false);
                  }}
                  className="flex items-center gap-4 p-4 border-2 border-gray-200 hover:border-emerald-500 rounded-xl transition-all group hover:shadow-lg"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${insurance.color} flex items-center justify-center flex-shrink-0`}>
                    <insurance.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-bold text-gray-800 group-hover:text-emerald-700">{insurance.name}</p>
                    <p className="text-xs text-gray-500">{insurance.desc}</p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-600" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Investment Modal */}
      {showInvestmentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowInvestmentModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <AlertCircle className="w-6 h-6" />
            </button>
            
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp className="w-8 h-8 text-blue-600" />
              Start Investing
            </h3>
            <p className="text-gray-600 mb-6">Choose your investment plan and start building wealth</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'Start SIP', icon: TrendingUp, route: '/investments/sip', color: 'from-blue-500 to-blue-600', desc: 'Systematic Investment Plan' },
                { name: 'Mutual Funds', icon: PiggyBank, route: '/investments/mutual-funds', color: 'from-green-500 to-green-600', desc: 'Diversified fund options' },
              ].map((investment, index) => (
                <button
                  key={index}
                  onClick={() => {
                    navigate(investment.route);
                    setShowInvestmentModal(false);
                  }}
                  className="flex items-center gap-4 p-4 border-2 border-gray-200 hover:border-blue-500 rounded-xl transition-all group hover:shadow-lg"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${investment.color} flex items-center justify-center flex-shrink-0`}>
                    <investment.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-bold text-gray-800 group-hover:text-blue-700">{investment.name}</p>
                    <p className="text-xs text-gray-500">{investment.desc}</p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tax Planning Modal */}
      {showTaxModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowTaxModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <AlertCircle className="w-6 h-6" />
            </button>
            
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Calculator className="w-8 h-8 text-purple-600" />
              Tax Planning Services
            </h3>
            <p className="text-gray-600 mb-6">Save more with smart tax planning strategies</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'Personal Tax Planning', icon: Calculator, route: '/tax-planning/personal', color: 'from-purple-500 to-purple-600', desc: 'Individual tax solutions' },
                { name: 'Business Tax Planning', icon: Briefcase, route: '/tax-planning/business', color: 'from-pink-500 to-pink-600', desc: 'Corporate tax strategies' },
              ].map((tax, index) => (
                <button
                  key={index}
                  onClick={() => {
                    navigate(tax.route);
                    setShowTaxModal(false);
                  }}
                  className="flex items-center gap-4 p-4 border-2 border-gray-200 hover:border-purple-500 rounded-xl transition-all group hover:shadow-lg"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tax.color} flex items-center justify-center flex-shrink-0`}>
                    <tax.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-bold text-gray-800 group-hover:text-purple-700">{tax.name}</p>
                    <p className="text-xs text-gray-500">{tax.desc}</p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* All Activities Modal */}
      {showAllActivities && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowAllActivities(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <AlertCircle className="w-6 h-6" />
            </button>
            
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Activity className="w-8 h-8 text-blue-600" />
              All Activities
            </h3>
            <p className="text-gray-600 mb-6">Complete history of your financial activities</p>
            
            <div className="space-y-3">
              {[
                ...recentActivities,
                { id: 5, title: 'Car Insurance Payment', amount: '₹10,500', date: '1 week ago', status: 'success', icon: CheckCircle },
                { id: 6, title: 'Loan Application Submitted', amount: 'N/A', date: '2 weeks ago', status: 'success', icon: CheckCircle },
                { id: 7, title: 'Investment Rebalanced', amount: '₹20,000', date: '2 weeks ago', status: 'success', icon: CheckCircle },
                { id: 8, title: 'Document Upload', amount: 'N/A', date: '3 weeks ago', status: 'success', icon: CheckCircle },
                { id: 9, title: 'Profile Updated', amount: 'N/A', date: '1 month ago', status: 'success', icon: CheckCircle },
                { id: 10, title: 'Account Verification', amount: 'N/A', date: '1 month ago', status: 'success', icon: CheckCircle },
              ].map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center flex-1 min-w-0">
                    <div className={`p-2 rounded-lg mr-3 flex-shrink-0 ${
                      activity.status === 'success' ? 'bg-green-100' : 'bg-yellow-100'
                    }`}>
                      <activity.icon className={`w-5 h-5 ${
                        activity.status === 'success' ? 'text-green-600' : 'text-yellow-600'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{activity.title}</p>
                      <p className="text-xs text-gray-500">{activity.date}</p>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-green-700 ml-2 flex-shrink-0">{activity.amount}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowAllActivities(false)}
              className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <AlertCircle className="w-6 h-6" />
            </button>
            
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <CreditCard className="w-8 h-8 text-green-600" />
              Make Payment
            </h3>
            <p className="text-gray-600 mb-6">Select which payment you want to make</p>
            
            <div className="space-y-4">
              {upcomingPayments.map((payment) => (
                <div
                  key={payment.id}
                  className={`p-4 rounded-lg border-l-4 cursor-pointer transition-all hover:shadow-lg ${
                    payment.urgent ? 'border-red-500 bg-red-50' : 'border-green-500 bg-green-50'
                  }`}
                  onClick={() => {
                    setSelectedPayment(payment);
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-gray-900">{payment.title}</p>
                    {payment.urgent && (
                      <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">
                        Urgent
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold text-gray-900">{payment.amount}</p>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Due: {payment.dueDate}</p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          alert(`Processing payment for ${payment.title}\n\nAmount: ${payment.amount}\n\nYou will be redirected to payment gateway.`);
                          setShowPaymentModal(false);
                        }}
                        className="mt-2 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg text-sm font-semibold shadow-md transition-all"
                      >
                        Pay {payment.amount}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-900 mb-2">
                <strong>Payment Methods:</strong> Credit Card, Debit Card, UPI, Net Banking
              </p>
              <p className="text-xs text-blue-700">
                All transactions are secured with 256-bit encryption
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardOverview;

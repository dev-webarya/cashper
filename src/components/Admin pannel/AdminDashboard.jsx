import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Users, IndianRupee, Shield, BarChart3, Activity, AlertCircle } from 'lucide-react';

const AdminDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  // Stats Cards Data
  const stats = [
    {
      title: 'Total Users',
      value: '12,345',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      gradient: 'from-blue-600 to-blue-700',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700'
    },
    {
      title: 'Active Loans',
      value: '₹45.2Cr',
      change: '+8.3%',
      trend: 'up',
      icon: IndianRupee,
      gradient: 'from-green-600 to-green-700',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      title: 'Insurance Policies',
      value: '8,432',
      change: '+15.2%',
      trend: 'up',
      icon: Shield,
      gradient: 'from-emerald-600 to-teal-600',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-700'
    },
    {
      title: 'Total Revenue',
      value: '₹128.5Cr',
      change: '+22.8%',
      trend: 'up',
      icon: TrendingUp,
      gradient: 'from-purple-600 to-pink-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700'
    }
  ];

  // Revenue Chart Data (Last 7 months)
  const revenueData = [
    { month: 'Jan', value: 85, label: '₹85Cr' },
    { month: 'Feb', value: 92, label: '₹92Cr' },
    { month: 'Mar', value: 78, label: '₹78Cr' },
    { month: 'Apr', value: 105, label: '₹105Cr' },
    { month: 'May', value: 118, label: '₹118Cr' },
    { month: 'Jun', value: 125, label: '₹125Cr' },
    { month: 'Jul', value: 142, label: '₹142Cr' }
  ];

  // User Growth Chart Data
  const userGrowthData = [
    { month: 'Jan', value: 8500 },
    { month: 'Feb', value: 9200 },
    { month: 'Mar', value: 9800 },
    { month: 'Apr', value: 10500 },
    { month: 'May', value: 11200 },
    { month: 'Jun', value: 11800 },
    { month: 'Jul', value: 12345 }
  ];

  // Loan Distribution Data
  const loanDistribution = [
    { type: 'Personal Loan', percentage: 35, amount: '₹15.8Cr', color: 'bg-blue-500' },
    { type: 'Home Loan', percentage: 40, amount: '₹18.1Cr', color: 'bg-green-500' },
    { type: 'Business Loan', percentage: 15, amount: '₹6.8Cr', color: 'bg-yellow-500' },
    { type: 'Vehicle Loan', percentage: 10, amount: '₹4.5Cr', color: 'bg-purple-500' }
  ];

  // Insurance Distribution
  const insuranceDistribution = [
    { type: 'Health', count: 3500, percentage: 41.5, color: 'bg-green-500' },
    { type: 'Term', count: 2800, percentage: 33.2, color: 'bg-blue-500' },
    { type: 'Motor', count: 1532, percentage: 18.2, color: 'bg-yellow-500' },
    { type: 'Other', count: 600, percentage: 7.1, color: 'bg-purple-500' }
  ];

  // Recent Activities
  const recentActivities = [
    { id: 1, action: 'New user registered', user: 'Rahul Sharma', time: '2 min ago', type: 'user', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 2, action: 'Loan approved', user: 'Admin Team', time: '15 min ago', type: 'loan', icon: IndianRupee, color: 'text-green-600', bg: 'bg-green-50' },
    { id: 3, action: 'Insurance claim processed', user: 'Support Agent', time: '45 min ago', type: 'insurance', icon: Shield, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { id: 4, action: 'New SIP started', user: 'Priya Patel', time: '1 hour ago', type: 'investment', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
    { id: 5, action: 'Payment received', user: 'Amit Kumar', time: '2 hours ago', type: 'payment', icon: Activity, color: 'text-indigo-600', bg: 'bg-indigo-50' }
  ];

  // Pending Approvals
  const pendingApprovals = [
    { id: 1, type: 'Loan', customer: 'Rahul Sharma', amount: '₹5,00,000', date: 'Jan 15, 2025', urgent: true },
    { id: 2, type: 'Insurance', customer: 'Priya Patel', amount: '₹2,50,000', date: 'Jan 15, 2025', urgent: false },
    { id: 3, type: 'Loan', customer: 'Amit Kumar', amount: '₹10,00,000', date: 'Jan 14, 2025', urgent: true },
    { id: 4, type: 'Investment', customer: 'Sneha Gupta', amount: '₹3,00,000', date: 'Jan 14, 2025', urgent: false }
  ];

  const maxRevenueValue = Math.max(...revenueData.map(d => d.value));
  const maxUserValue = Math.max(...userGrowthData.map(d => d.value));

  return (
    <div className="space-y-4 xs:space-y-5 sm:space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl sm:rounded-2xl shadow-lg p-4 xs:p-5 sm:p-6 text-white">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold mb-2">Admin Dashboard 👨‍💼</h2>
            <p className="text-xs xs:text-sm sm:text-base text-green-50">Monitor and manage your platform analytics</p>
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 xs:px-4 py-1.5 xs:py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white text-xs xs:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <option value="today" className="text-gray-900">Today</option>
              <option value="week" className="text-gray-900">This Week</option>
              <option value="month" className="text-gray-900">This Month</option>
              <option value="year" className="text-gray-900">This Year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-5 lg:gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
          >
            <div className="p-4 xs:p-5 sm:p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <p className="text-xs xs:text-sm font-medium text-gray-600 mb-2">{stat.title}</p>
                  <p className="text-2xl xs:text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-2.5 xs:p-3 rounded-lg bg-gradient-to-br ${stat.gradient}`}>
                  <stat.icon className="w-5 h-5 xs:w-6 xs:h-6 text-white" />
                </div>
              </div>
              <div className="flex items-center">
                {stat.trend === 'up' ? (
                  <TrendingUp className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-green-600 mr-1" />
                ) : (
                  <TrendingDown className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-red-600 mr-1" />
                )}
                <span className={`text-xs xs:text-sm font-semibold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
                <span className="text-xs text-gray-500 ml-2">vs last period</span>
              </div>
            </div>
            <div className={`h-1 bg-gradient-to-r ${stat.gradient}`}></div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 xs:gap-5 sm:gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 xs:p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div>
              <h3 className="text-base xs:text-lg sm:text-xl font-bold text-gray-900">Revenue Trend</h3>
              <p className="text-xs xs:text-sm text-gray-500 mt-1">Last 7 months performance</p>
            </div>
            <BarChart3 className="w-5 h-5 xs:w-6 xs:h-6 text-green-600" />
          </div>
          
          {/* Bar Chart */}
          <div className="space-y-3 xs:space-y-4">
            {revenueData.map((item, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between text-xs xs:text-sm">
                  <span className="font-medium text-gray-700">{item.month}</span>
                  <span className="font-semibold text-green-700">{item.label}</span>
                </div>
                <div className="relative h-8 xs:h-10 bg-gray-100 rounded-lg overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-500 to-green-600 rounded-lg transition-all duration-700 ease-out flex items-center justify-end pr-2"
                    style={{ width: `${(item.value / maxRevenueValue) * 100}%` }}
                  >
                    <span className="text-white text-xs font-medium">{item.value}Cr</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Growth Chart */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 xs:p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div>
              <h3 className="text-base xs:text-lg sm:text-xl font-bold text-gray-900">User Growth</h3>
              <p className="text-xs xs:text-sm text-gray-500 mt-1">Total registered users</p>
            </div>
            <Users className="w-5 h-5 xs:w-6 xs:h-6 text-blue-600" />
          </div>
          
          {/* Line Chart */}
          <div className="relative h-48 xs:h-56 sm:h-64">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="border-t border-gray-200"></div>
              ))}
            </div>
            
            {/* Chart */}
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="userGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              
              {/* Area */}
              <path
                d={`M 0 ${100 - (userGrowthData[0].value / maxUserValue) * 100} ${userGrowthData.map((d, i) => 
                  `L ${(i / (userGrowthData.length - 1)) * 100} ${100 - (d.value / maxUserValue) * 100}`
                ).join(' ')} L 100 100 L 0 100 Z`}
                fill="url(#userGradient)"
                vectorEffect="non-scaling-stroke"
              />
              
              {/* Line */}
              <polyline
                points={userGrowthData.map((d, i) => 
                  `${(i / (userGrowthData.length - 1)) * 100},${100 - (d.value / maxUserValue) * 100}`
                ).join(' ')}
                fill="none"
                stroke="rgb(59, 130, 246)"
                strokeWidth="3"
                vectorEffect="non-scaling-stroke"
              />
              
              {/* Points */}
              {userGrowthData.map((d, i) => (
                <circle
                  key={i}
                  cx={`${(i / (userGrowthData.length - 1)) * 100}`}
                  cy={`${100 - (d.value / maxUserValue) * 100}`}
                  r="4"
                  fill="rgb(59, 130, 246)"
                  stroke="white"
                  strokeWidth="2"
                />
              ))}
            </svg>
            
            {/* X-axis labels */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-between px-1">
              {userGrowthData.map((item, i) => (
                <span key={i} className="text-[10px] xs:text-xs text-gray-600 font-medium">
                  {item.month}
                </span>
              ))}
            </div>
          </div>
          
          {/* Legend */}
          <div className="mt-4 flex items-center justify-center space-x-4 text-xs xs:text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
              <span className="text-gray-600">Total Users</span>
            </div>
          </div>
        </div>
      </div>

      {/* Distribution Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 xs:gap-5 sm:gap-6">
        {/* Loan Distribution */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 xs:p-5 sm:p-6">
          <h3 className="text-base xs:text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-5">Loan Distribution</h3>
          <div className="space-y-4">
            {loanDistribution.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                    <span className="text-xs xs:text-sm font-medium text-gray-700">{item.type}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs xs:text-sm font-bold text-gray-900">{item.amount}</p>
                    <p className="text-[10px] xs:text-xs text-gray-500">{item.percentage}%</p>
                  </div>
                </div>
                <div className="relative h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`absolute inset-y-0 left-0 ${item.color} rounded-full transition-all duration-700`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-700">Total Disbursed</span>
              <span className="text-base xs:text-lg font-bold text-green-700">₹45.2 Crore</span>
            </div>
          </div>
        </div>

        {/* Insurance Distribution */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 xs:p-5 sm:p-6">
          <h3 className="text-base xs:text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-5">Insurance Distribution</h3>
          
          {/* Donut Chart */}
          <div className="flex items-center justify-center mb-6">
            <div className="relative w-40 h-40 xs:w-48 xs:h-48">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {insuranceDistribution.reduce((acc, item, index) => {
                  const startAngle = acc.angle;
                  const angle = (item.percentage / 100) * 360;
                  const endAngle = startAngle + angle;
                  
                  const startRad = (startAngle * Math.PI) / 180;
                  const endRad = (endAngle * Math.PI) / 180;
                  
                  const x1 = 50 + 35 * Math.cos(startRad);
                  const y1 = 50 + 35 * Math.sin(startRad);
                  const x2 = 50 + 35 * Math.cos(endRad);
                  const y2 = 50 + 35 * Math.sin(endRad);
                  
                  const largeArc = angle > 180 ? 1 : 0;
                  
                  const colors = ['#10b981', '#3b82f6', '#eab308', '#a855f7'];
                  
                  acc.paths.push(
                    <path
                      key={index}
                      d={`M 50 50 L ${x1} ${y1} A 35 35 0 ${largeArc} 1 ${x2} ${y2} Z`}
                      fill={colors[index]}
                      stroke="white"
                      strokeWidth="0.5"
                    />
                  );
                  
                  acc.angle = endAngle;
                  return acc;
                }, { paths: [], angle: 0 }).paths}
                
                {/* Center circle */}
                <circle cx="50" cy="50" r="20" fill="white" />
                <text x="50" y="48" textAnchor="middle" className="text-xs font-bold fill-gray-900">8,432</text>
                <text x="50" y="56" textAnchor="middle" className="text-[8px] fill-gray-600">Policies</text>
              </svg>
            </div>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-3">
            {insuranceDistribution.map((item, index) => (
              <div key={index} className="flex items-start space-x-2">
                <div className={`w-3 h-3 rounded-full ${item.color} mt-1 flex-shrink-0`}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs xs:text-sm font-medium text-gray-700 truncate">{item.type}</p>
                  <p className="text-xs text-gray-500">{item.count} ({item.percentage}%)</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activities and Approvals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 xs:gap-5 sm:gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 xs:p-5 sm:p-6">
          <h3 className="text-base xs:text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-5">Recent Activities</h3>
          <div className="space-y-3 xs:space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${activity.bg} flex-shrink-0`}>
                  <activity.icon className={`w-4 h-4 xs:w-5 xs:h-5 ${activity.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs xs:text-sm font-semibold text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-600 truncate">{activity.user}</p>
                  <p className="text-[10px] xs:text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 xs:p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <h3 className="text-base xs:text-lg sm:text-xl font-bold text-gray-900">Pending Approvals</h3>
            <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">
              {pendingApprovals.length}
            </span>
          </div>
          <div className="space-y-3">
            {pendingApprovals.map((item) => (
              <div
                key={item.id}
                className={`p-3 rounded-lg border-l-4 ${item.urgent ? 'border-red-500 bg-red-50' : 'border-green-500 bg-green-50'}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-xs font-bold text-gray-900">{item.type}</span>
                      {item.urgent && (
                        <span className="flex items-center px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Urgent
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-700 font-medium truncate">{item.customer}</p>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <p className="text-sm font-bold text-gray-900">{item.amount}</p>
                    <p className="text-[10px] text-gray-500">{item.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="flex-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded-lg transition-colors">
                    Approve
                  </button>
                  <button className="flex-1 px-3 py-1.5 bg-gray-600 hover:bg-gray-700 text-white text-xs font-semibold rounded-lg transition-colors">
                    Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

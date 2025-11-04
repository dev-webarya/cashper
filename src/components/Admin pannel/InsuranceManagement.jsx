import React, { useState } from 'react';

const InsuranceManagement = () => {
  const [filterType, setFilterType] = useState('all');

  const policies = [
    {
      id: 'INS001',
      customer: 'Rahul Sharma',
      type: 'Term Insurance',
      premium: '₹12,000/year',
      coverage: '₹1 Crore',
      status: 'Active',
      startDate: '2024-01-01',
      endDate: '2044-01-01',
      nominee: 'Mrs. Sharma',
      phone: '+91 98765 43210'
    },
    {
      id: 'INS002',
      customer: 'Priya Patel',
      type: 'Health Insurance',
      premium: '₹18,000/year',
      coverage: '₹10 Lakhs',
      status: 'Pending',
      startDate: '2024-02-01',
      endDate: '2025-02-01',
      nominee: 'Mr. Patel',
      phone: '+91 98765 43211'
    },
    {
      id: 'INS003',
      customer: 'Amit Kumar',
      type: 'Motor Insurance',
      premium: '₹8,500/year',
      coverage: '₹5 Lakhs',
      status: 'Active',
      startDate: '2023-12-15',
      endDate: '2024-12-15',
      nominee: 'Self',
      phone: '+91 98765 43212'
    },
    {
      id: 'INS004',
      customer: 'Sneha Gupta',
      type: 'Term Insurance',
      premium: '₹15,000/year',
      coverage: '₹50 Lakhs',
      status: 'Expired',
      startDate: '2020-03-01',
      endDate: '2024-01-01',
      nominee: 'Parents',
      phone: '+91 98765 43213'
    },
  ];

  const claims = [
    { id: 'CLM001', policyId: 'INS001', customer: 'Rahul Sharma', type: 'Health', amount: '₹1,50,000', status: 'Under Review', date: '2024-01-10' },
    { id: 'CLM002', policyId: 'INS002', customer: 'Priya Patel', type: 'Health', amount: '₹85,000', status: 'Approved', date: '2024-01-08' },
    { id: 'CLM003', policyId: 'INS003', customer: 'Amit Kumar', type: 'Motor', amount: '₹45,000', status: 'Pending', date: '2024-01-12' },
  ];

  const filteredPolicies = policies.filter(policy =>
    filterType === 'all' || policy.type === filterType
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Expired':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getClaimStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-700';
      case 'Under Review':
        return 'bg-blue-100 text-blue-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Insurance Management</h1>
          <p className="text-gray-600 mt-1">Manage insurance policies and claims</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-semibold">Total Policies</p>
              <p className="text-3xl font-bold text-blue-900 mt-2">8,432</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-semibold">Active Policies</p>
              <p className="text-3xl font-bold text-green-900 mt-2">7,654</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-semibold">Total Claims</p>
              <p className="text-3xl font-bold text-purple-900 mt-2">345</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 border border-indigo-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-600 text-sm font-semibold">Premium Collected</p>
              <p className="text-3xl font-bold text-indigo-900 mt-2">₹12.5Cr</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-wrap gap-2">
          {['all', 'Term Insurance', 'Health Insurance', 'Motor Insurance'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 capitalize ${
                filterType === type
                  ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Policies and Claims Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Policies List */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Insurance Policies</h2>
          <div className="space-y-4">
            {filteredPolicies.map((policy) => (
              <div key={policy.id} className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 hover:shadow-md transition-all duration-300">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {policy.customer.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{policy.customer}</p>
                      <p className="text-xs text-gray-500">{policy.id}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(policy.status)}`}>
                    {policy.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded-lg">
                    <p className="text-xs text-gray-600">Type</p>
                    <p className="font-semibold text-gray-900 text-sm">{policy.type}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <p className="text-xs text-gray-600">Premium</p>
                    <p className="font-semibold text-gray-900 text-sm">{policy.premium}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <p className="text-xs text-gray-600">Coverage</p>
                    <p className="font-semibold text-gray-900 text-sm">{policy.coverage}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <p className="text-xs text-gray-600">Valid Till</p>
                    <p className="font-semibold text-gray-900 text-sm">{policy.endDate}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-105">
                    View Details
                  </button>
                  <button className="flex-1 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-105">
                    Renew
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Claims List */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Recent Claims</h2>
            <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-semibold rounded-full">
              {claims.length} Claims
            </span>
          </div>
          <div className="space-y-4">
            {claims.map((claim) => (
              <div key={claim.id} className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 hover:shadow-md transition-all duration-300">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-gray-900">{claim.customer}</p>
                    <p className="text-xs text-gray-500 mt-1">{claim.id} | Policy: {claim.policyId}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getClaimStatusColor(claim.status)}`}>
                    {claim.status}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div className="bg-white p-3 rounded-lg">
                    <p className="text-xs text-gray-600">Type</p>
                    <p className="font-semibold text-gray-900 text-sm">{claim.type}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <p className="text-xs text-gray-600">Amount</p>
                    <p className="font-semibold text-gray-900 text-sm">{claim.amount}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <p className="text-xs text-gray-600">Date</p>
                    <p className="font-semibold text-gray-900 text-sm">{claim.date}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-105">
                    Approve
                  </button>
                  <button className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-105">
                    Reject
                  </button>
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-105">
                    Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Renewals */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Upcoming Renewals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {policies.filter(p => p.status === 'Active').slice(0, 3).map((policy) => (
            <div key={policy.id} className="bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-gray-900">{policy.customer}</p>
                <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-sm text-gray-600 mb-1">{policy.type}</p>
              <p className="text-xs text-yellow-700 font-semibold">Expires: {policy.endDate}</p>
              <button className="mt-3 w-full px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-105">
                Send Renewal Notice
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InsuranceManagement;

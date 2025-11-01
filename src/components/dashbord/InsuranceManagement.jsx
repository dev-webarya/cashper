import React from 'react';

const InsuranceManagement = () => {
  const insurancePolicies = [
    {
      id: 1,
      type: 'Health Insurance',
      provider: 'Star Health',
      policyNumber: 'SH123456789',
      premium: '₹15,000/year',
      coverage: '₹10,00,000',
      status: 'active',
      renewalDate: 'Mar 15, 2025',
      daysToRenewal: 78
    },
    {
      id: 2,
      type: 'Term Insurance',
      provider: 'LIC',
      policyNumber: 'LIC987654321',
      premium: '₹25,000/year',
      coverage: '₹50,00,000',
      status: 'active',
      renewalDate: 'Jun 10, 2025',
      daysToRenewal: 165
    },
    {
      id: 3,
      type: 'Motor Insurance',
      provider: 'ICICI Lombard',
      policyNumber: 'IL456789123',
      premium: '₹12,000/year',
      coverage: '₹8,00,000',
      status: 'expiring',
      renewalDate: 'Jan 20, 2025',
      daysToRenewal: 20
    }
  ];

  const claimHistory = [
    { id: 1, type: 'Health Insurance', claim: '₹45,000', date: 'Dec 15, 2024', status: 'approved' },
    { id: 2, type: 'Motor Insurance', claim: '₹25,000', date: 'Nov 20, 2024', status: 'processing' },
    { id: 3, type: 'Health Insurance', claim: '₹15,000', date: 'Oct 10, 2024', status: 'settled' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Insurance Management</h1>
          <p className="text-gray-600 mt-1">Manage your insurance policies and claims</p>
        </div>
        <button className="bg-gradient-to-r from-green-600 via-green-700 to-green-800 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          + Buy New Policy
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm mb-2">Active Policies</p>
              <p className="text-3xl font-bold">5</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm mb-2">Total Coverage</p>
              <p className="text-3xl font-bold">₹78L</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm mb-2">Annual Premium</p>
              <p className="text-3xl font-bold">₹67,000</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Active Policies */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Active Policies</h2>
        <div className="space-y-4">
          {insurancePolicies.map((policy) => (
            <div
              key={policy.id}
              className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                    <h3 className="text-lg font-bold text-gray-800">{policy.type}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold w-fit ${
                      policy.status === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {policy.status === 'active' ? 'Active' : 'Expiring Soon'}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Provider</p>
                      <p className="text-sm font-semibold text-gray-800">{policy.provider}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Policy Number</p>
                      <p className="text-sm font-semibold text-gray-800">{policy.policyNumber}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Premium</p>
                      <p className="text-sm font-semibold text-gray-800">{policy.premium}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Coverage</p>
                      <p className="text-sm font-semibold text-gray-800">{policy.coverage}</p>
                    </div>
                  </div>

                  <div className={`p-3 rounded-lg ${
                    policy.daysToRenewal <= 30 
                      ? 'bg-red-50 border border-red-200' 
                      : 'bg-blue-50 border border-blue-200'
                  }`}>
                    <p className="text-xs text-gray-600">
                      Renewal Due: <span className="font-semibold">{policy.renewalDate}</span>
                      <span className={`ml-2 ${policy.daysToRenewal <= 30 ? 'text-red-600' : 'text-blue-600'}`}>
                        ({policy.daysToRenewal} days remaining)
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex lg:flex-col gap-2">
                  <button className="flex-1 lg:flex-none px-4 py-2 bg-gradient-to-r from-green-600 via-green-700 to-green-800 text-white rounded-lg text-sm font-semibold hover:from-green-700 hover:to-green-800 transition-all shadow-md">
                    Renew Now
                  </button>
                  <button className="flex-1 lg:flex-none px-4 py-2 bg-gradient-to-r from-green-600 via-green-700 to-green-800 text-white rounded-lg text-sm font-semibold hover:from-green-700 hover:to-green-800 transition-all shadow-md">
                    File Claim
                  </button>
                  <button className="flex-1 lg:flex-none px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-200 transition-all">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Claim History */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Claim History</h2>
        <div className="space-y-4">
          {claimHistory.map((claim) => (
            <div key={claim.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors gap-4">
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-800 mb-1">{claim.type}</h3>
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                  <span>Claim Amount: {claim.claim}</span>
                  <span>•</span>
                  <span>Filed on: {claim.date}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  claim.status === 'approved' || claim.status === 'settled'
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                </span>
                <button className="px-4 py-2 text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Track →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insurance Recommendations */}
      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-lg p-6 border border-green-200">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Need More Coverage?</h2>
        <p className="text-gray-600 mb-4">Get personalized insurance recommendations based on your needs</p>
        <button className="bg-gradient-to-r from-green-600 via-green-700 to-green-800 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
          Get Recommendations
        </button>
      </div>
    </div>
  );
};

export default InsuranceManagement;

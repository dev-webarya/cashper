import React, { useState } from 'react';

const LoanManagement = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [showLoanDetails, setShowLoanDetails] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);

  const loans = [
    {
      id: 'LN001',
      customer: 'Rahul Sharma',
      type: 'Personal Loan',
      amount: '₹5,00,000',
      status: 'Pending',
      appliedDate: '2024-01-15',
      tenure: '36 months',
      interestRate: '12%',
      email: 'rahul@example.com',
      phone: '+91 98765 43210',
      purpose: 'Medical Emergency',
      income: '₹60,000/month',
      cibilScore: 750
    },
    {
      id: 'LN002',
      customer: 'Priya Patel',
      type: 'Home Loan',
      amount: '₹50,00,000',
      status: 'Under Review',
      appliedDate: '2024-01-14',
      tenure: '240 months',
      interestRate: '8.5%',
      email: 'priya@example.com',
      phone: '+91 98765 43211',
      purpose: 'Property Purchase',
      income: '₹1,20,000/month',
      cibilScore: 820
    },
    {
      id: 'LN003',
      customer: 'Amit Kumar',
      type: 'Business Loan',
      amount: '₹10,00,000',
      status: 'Approved',
      appliedDate: '2024-01-12',
      tenure: '60 months',
      interestRate: '14%',
      email: 'amit@example.com',
      phone: '+91 98765 43212',
      purpose: 'Business Expansion',
      income: '₹2,00,000/month',
      cibilScore: 780
    },
    {
      id: 'LN004',
      customer: 'Sneha Gupta',
      type: 'Education Loan',
      amount: '₹3,00,000',
      status: 'Rejected',
      appliedDate: '2024-01-10',
      tenure: '84 months',
      interestRate: '10%',
      email: 'sneha@example.com',
      phone: '+91 98765 43213',
      purpose: 'Higher Education',
      income: '₹40,000/month',
      cibilScore: 650
    },
    {
      id: 'LN005',
      customer: 'Vikram Singh',
      type: 'Vehicle Loan',
      amount: '₹8,00,000',
      status: 'Disbursed',
      appliedDate: '2024-01-08',
      tenure: '60 months',
      interestRate: '11%',
      email: 'vikram@example.com',
      phone: '+91 98765 43214',
      purpose: 'Car Purchase',
      income: '₹80,000/month',
      cibilScore: 790
    },
  ];

  const filteredLoans = loans.filter(loan => 
    filterStatus === 'all' || loan.status.toLowerCase() === filterStatus.toLowerCase()
  );

  const handleViewLoan = (loan) => {
    setSelectedLoan(loan);
    setShowLoanDetails(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Under Review':
        return 'bg-blue-100 text-blue-700';
      case 'Approved':
        return 'bg-green-100 text-green-700';
      case 'Rejected':
        return 'bg-red-100 text-red-700';
      case 'Disbursed':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Loan Management</h1>
          <p className="text-gray-600 mt-1">Review and manage all loan applications</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-600 text-sm font-semibold">Pending</p>
              <p className="text-3xl font-bold text-yellow-900 mt-2">23</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-semibold">Under Review</p>
              <p className="text-3xl font-bold text-blue-900 mt-2">15</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-semibold">Approved</p>
              <p className="text-3xl font-bold text-green-900 mt-2">182</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-600 text-sm font-semibold">Rejected</p>
              <p className="text-3xl font-bold text-red-900 mt-2">45</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-semibold">Disbursed</p>
              <p className="text-3xl font-bold text-purple-900 mt-2">1,234</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-wrap gap-2">
          {['all', 'pending', 'under review', 'approved', 'rejected', 'disbursed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 capitalize ${
                filterStatus === status
                  ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Loans Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Loan ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">Type</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden lg:table-cell">Applied Date</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredLoans.map((loan) => (
                <tr key={loan.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-900">{loan.id}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
                        {loan.customer.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{loan.customer}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 hidden md:table-cell">{loan.type}</td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-900">{loan.amount}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 hidden lg:table-cell">{loan.appliedDate}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(loan.status)}`}>
                      {loan.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewLoan(loan)}
                        className="p-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                        title="View Details"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      {(loan.status === 'Pending' || loan.status === 'Under Review') && (
                        <>
                          <button
                            className="p-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                            title="Approve"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </button>
                          <button
                            className="p-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                            title="Reject"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Loan Details Modal */}
      {showLoanDetails && selectedLoan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">Loan Application Details</h3>
                <p className="text-sm text-green-100">{selectedLoan.id}</p>
              </div>
              <button
                onClick={() => setShowLoanDetails(false)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-3">Customer Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-600 text-sm">Name</p>
                    <p className="font-semibold text-gray-900">{selectedLoan.customer}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-600 text-sm">Email</p>
                    <p className="font-semibold text-gray-900">{selectedLoan.email}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-600 text-sm">Phone</p>
                    <p className="font-semibold text-gray-900">{selectedLoan.phone}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-600 text-sm">Monthly Income</p>
                    <p className="font-semibold text-gray-900">{selectedLoan.income}</p>
                  </div>
                </div>
              </div>

              {/* Loan Details */}
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-3">Loan Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                    <p className="text-green-600 text-sm font-semibold">Loan Amount</p>
                    <p className="text-2xl font-bold text-green-900 mt-1">{selectedLoan.amount}</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                    <p className="text-blue-600 text-sm font-semibold">Loan Type</p>
                    <p className="text-xl font-bold text-blue-900 mt-1">{selectedLoan.type}</p>
                  </div>
                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-lg border border-indigo-200">
                    <p className="text-indigo-600 text-sm font-semibold">Tenure</p>
                    <p className="text-xl font-bold text-indigo-900 mt-1">{selectedLoan.tenure}</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                    <p className="text-purple-600 text-sm font-semibold">Interest Rate</p>
                    <p className="text-xl font-bold text-purple-900 mt-1">{selectedLoan.interestRate}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-600 text-sm">Applied Date</p>
                    <p className="font-semibold text-gray-900">{selectedLoan.appliedDate}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-600 text-sm">Purpose</p>
                    <p className="font-semibold text-gray-900">{selectedLoan.purpose}</p>
                  </div>
                </div>
              </div>

              {/* Credit Score */}
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-3">Credit Assessment</h4>
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-lg border border-yellow-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-yellow-600 text-sm font-semibold">CIBIL Score</p>
                      <p className="text-4xl font-bold text-yellow-900 mt-1">{selectedLoan.cibilScore}</p>
                    </div>
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="w-full bg-white rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${(selectedLoan.cibilScore / 900) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  Approve Loan
                </button>
                <button className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  Reject Loan
                </button>
                <button className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition-all duration-300">
                  Request More Info
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

import React, { useState, useRef, useEffect } from 'react';
import { Shield, FileText, AlertCircle, CheckCircle, Clock, X } from 'lucide-react';

// Import insurance components
import Health_Insurence from '../Health_Insurence';
import Moter_Insurance from '../Moter_Insurance';
import Term_Insurance from '../Term_Insurance';

const InsuranceManagement = () => {
  const [showPolicyDetails, setShowPolicyDetails] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [showInsuranceForm, setShowInsuranceForm] = useState(false);
  const [selectedInsuranceType, setSelectedInsuranceType] = useState('');
  const insuranceFormRef = useRef(null);

  // Scroll to form when it opens
  useEffect(() => {
    if (showInsuranceForm && insuranceFormRef.current) {
      setTimeout(() => {
        const formSection = insuranceFormRef.current.querySelector('#apply-form');
        if (formSection) {
          formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [showInsuranceForm, selectedInsuranceType]);
  const [showRenewModal, setShowRenewModal] = useState(false);
  const [showBuyPolicyModal, setShowBuyPolicyModal] = useState(false);

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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">Insurance Management</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Manage your insurance policies and claims</p>
        </div>
        <button 
          onClick={() => setShowBuyPolicyModal(true)}
          className="w-full sm:w-auto bg-gradient-to-r from-green-600 via-green-700 to-green-800 hover:from-green-700 hover:to-green-800 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
        >
          + Buy New Policy
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-xs sm:text-sm mb-1 sm:mb-2">Active Policies</p>
              <p className="text-2xl sm:text-3xl font-bold">5</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-xs sm:text-sm mb-1 sm:mb-2">Total Coverage</p>
              <p className="text-2xl sm:text-3xl font-bold">₹78L</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-xs sm:text-sm mb-1 sm:mb-2">Annual Premium</p>
              <p className="text-2xl sm:text-3xl font-bold">₹67,000</p>
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Active Policies */}
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">Active Policies</h2>
        <div className="space-y-3 sm:space-y-4">
          {insurancePolicies.map((policy) => (
            <div
              key={policy.id}
              className="border border-gray-200 rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-gray-800">{policy.type}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold w-fit ${
                      policy.status === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {policy.status === 'active' ? 'Active' : 'Expiring Soon'}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Provider</p>
                      <p className="text-xs sm:text-sm font-semibold text-gray-800">{policy.provider}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Policy Number</p>
                      <p className="text-xs sm:text-sm font-semibold text-gray-800 truncate">{policy.policyNumber}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Premium</p>
                      <p className="text-xs sm:text-sm font-semibold text-gray-800">{policy.premium}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Coverage</p>
                      <p className="text-xs sm:text-sm font-semibold text-gray-800">{policy.coverage}</p>
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

                <div className="flex flex-row sm:flex-row lg:flex-col gap-2 w-full lg:w-auto">
                  <button 
                    onClick={() => {
                      setSelectedPolicy(policy);
                      setShowRenewModal(true);
                    }}
                    className="flex-1 lg:flex-none lg:w-36 px-3 sm:px-4 py-2 bg-gradient-to-r from-green-600 via-green-700 to-green-800 text-white rounded-lg text-xs sm:text-sm font-semibold hover:from-green-700 hover:to-green-800 transition-all shadow-md"
                  >
                    Renew Now
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedPolicy(policy);
                      setShowClaimModal(true);
                    }}
                    className="flex-1 lg:flex-none lg:w-36 px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg text-xs sm:text-sm font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-md"
                  >
                    File Claim
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedPolicy(policy);
                      setShowPolicyDetails(true);
                    }}
                    className="flex-1 lg:flex-none lg:w-36 px-3 sm:px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-xs sm:text-sm font-semibold hover:bg-gray-200 transition-all"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Claim History */}
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6">Claim History</h2>
        <div className="space-y-3 sm:space-y-4">
          {claimHistory.map((claim) => (
            <div key={claim.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors gap-3 sm:gap-4">
              <div className="flex-1 w-full sm:w-auto">
                <h3 className="text-sm font-semibold text-gray-800 mb-1">{claim.type}</h3>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-gray-500">
                  <span>Claim Amount: {claim.claim}</span>
                  <span className="hidden sm:inline">•</span>
                  <span>Filed on: {claim.date}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end">
                <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${
                  claim.status === 'approved' || claim.status === 'settled'
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                </span>
                <button 
                  onClick={() => alert(`Tracking claim:\n\nType: ${claim.type}\nAmount: ${claim.claim}\nStatus: ${claim.status}\n\nClaim ID: CLM${claim.id}00${new Date().getFullYear()}`)}
                  className="px-3 sm:px-4 py-2 text-blue-600 hover:text-blue-700 text-xs sm:text-sm font-medium"
                >
                  Track →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Policy Details Modal */}
      {showPolicyDetails && selectedPolicy && (
        <div className="fixed inset-0 bg-black/10 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-4 sm:p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setShowPolicyDetails(false);
                setSelectedPolicy(null);
              }}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600 z-10"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            
            <div className="pr-8">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">{selectedPolicy.type}</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">{selectedPolicy.provider}</p>
            </div>
            
            <div className="space-y-4 sm:space-y-6">
              {/* Policy Summary Cards */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-blue-50 rounded-lg p-3 sm:p-4">
                  <p className="text-xs text-gray-600 mb-1">Policy Number</p>
                  <p className="text-sm sm:text-base font-bold text-gray-800 break-all">{selectedPolicy.policyNumber}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-3 sm:p-4">
                  <p className="text-xs text-gray-600 mb-1">Coverage</p>
                  <p className="text-sm sm:text-base font-bold text-gray-800">{selectedPolicy.coverage}</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-3 sm:p-4">
                  <p className="text-xs text-gray-600 mb-1">Premium</p>
                  <p className="text-sm sm:text-base font-bold text-gray-800">{selectedPolicy.premium}</p>
                </div>
                <div className="bg-indigo-50 rounded-lg p-3 sm:p-4">
                  <p className="text-xs text-gray-600 mb-1">Status</p>
                  <p className={`text-sm sm:text-base font-bold ${selectedPolicy.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                    {selectedPolicy.status === 'active' ? 'Active' : 'Expiring Soon'}
                  </p>
                </div>
              </div>

              {/* Policy Details */}
              <div className="border-t pt-4 sm:pt-6">
                <h4 className="font-bold text-gray-800 mb-3 sm:mb-4 text-sm sm:text-base">Policy Information</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-600">Renewal Date:</span>
                    <span className="font-semibold">{selectedPolicy.renewalDate}</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-600">Days to Renewal:</span>
                    <span className={`font-semibold ${selectedPolicy.daysToRenewal <= 30 ? 'text-red-600' : 'text-blue-600'}`}>
                      {selectedPolicy.daysToRenewal} days
                    </span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-600">Provider:</span>
                    <span className="font-semibold">{selectedPolicy.provider}</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-semibold">{selectedPolicy.type}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button 
                  onClick={() => {
                    setShowPolicyDetails(false);
                    setShowRenewModal(true);
                  }}
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all text-sm sm:text-base"
                >
                  Renew Policy
                </button>
                <button 
                  onClick={() => {
                    setShowPolicyDetails(false);
                    setShowClaimModal(true);
                  }}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all text-sm sm:text-base"
                >
                  File Claim
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* File Claim Modal */}
      {showClaimModal && selectedPolicy && (
        <div className="fixed inset-0 bg-black/10 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-4 sm:p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setShowClaimModal(false);
                setSelectedPolicy(null);
              }}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 pr-8">File Insurance Claim</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">{selectedPolicy.type} - {selectedPolicy.policyNumber}</p>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              alert(`Claim filed successfully!\n\nPolicy: ${selectedPolicy.type}\nPolicy Number: ${selectedPolicy.policyNumber}\n\nClaim ID: CLM${selectedPolicy.id}00${new Date().getFullYear()}\n\nYour claim will be processed within 7-10 business days.`);
              setShowClaimModal(false);
              setSelectedPolicy(null);
            }} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Claim Type</label>
                <select className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-sm sm:text-base">
                  <option>Medical Treatment</option>
                  <option>Hospitalization</option>
                  <option>Accident</option>
                  <option>Surgery</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Claim Amount (₹)</label>
                <input
                  type="number"
                  placeholder="Enter claim amount"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-sm sm:text-base"
                  required
                  min="1"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Incident Date</label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-sm sm:text-base"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  placeholder="Describe the incident..."
                  rows="3"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-sm sm:text-base"
                  required
                />
              </div>

              <div className="bg-yellow-50 rounded-lg p-3 sm:p-4 border border-yellow-200">
                <p className="text-xs sm:text-sm text-yellow-800">
                  <strong>Note:</strong> Please keep all medical bills, prescriptions, and relevant documents ready for verification.
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-md text-sm sm:text-base"
              >
                Submit Claim
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Renew Policy Modal */}
      {showRenewModal && selectedPolicy && (
        <div className="fixed inset-0 bg-black/10 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-4 sm:p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setShowRenewModal(false);
                setSelectedPolicy(null);
              }}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 pr-8">Renew Policy</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">{selectedPolicy.type} - {selectedPolicy.policyNumber}</p>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              alert(`Policy Renewal Successful!\n\nPolicy: ${selectedPolicy.type}\nPolicy Number: ${selectedPolicy.policyNumber}\nNew Expiry Date: ${new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}\n\nPayment confirmation will be sent to your registered email.`);
              setShowRenewModal(false);
              setSelectedPolicy(null);
            }} className="space-y-4">
              
              {/* Current Policy Details */}
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h4 className="font-semibold text-gray-800 mb-3 text-sm sm:text-base">Current Policy Details</h4>
                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Coverage:</span>
                    <span className="font-semibold">{selectedPolicy.coverage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current Premium:</span>
                    <span className="font-semibold">{selectedPolicy.premium}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Expiry Date:</span>
                    <span className="font-semibold text-red-600">{selectedPolicy.renewalDate}</span>
                  </div>
                </div>
              </div>

              {/* Renewal Options */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Renewal Period</label>
                <select className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none text-sm sm:text-base" required>
                  <option value="1">1 Year - {selectedPolicy.premium}</option>
                  <option value="2">2 Years - ₹{parseInt(selectedPolicy.premium.replace(/[^0-9]/g, '')) * 1.9}/year (5% discount)</option>
                  <option value="3">3 Years - ₹{parseInt(selectedPolicy.premium.replace(/[^0-9]/g, '')) * 1.8}/year (10% discount)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Update Coverage (Optional)</label>
                <select className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none text-sm sm:text-base">
                  <option>Keep Current - {selectedPolicy.coverage}</option>
                  <option>Increase to ₹15,00,000 (+20% premium)</option>
                  <option>Increase to ₹25,00,000 (+40% premium)</option>
                  <option>Increase to ₹50,00,000 (+80% premium)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Add-ons (Optional)</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className="text-sm">Critical Illness Cover (+₹2,000/year)</span>
                  </label>
                  <label className="flex items-center gap-2 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className="text-sm">Personal Accident Cover (+₹1,500/year)</span>
                  </label>
                  <label className="flex items-center gap-2 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className="text-sm">No Claim Bonus Protection (+₹1,000/year)</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Payment Method</label>
                <select className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none text-sm sm:text-base" required>
                  <option>Credit/Debit Card</option>
                  <option>Net Banking</option>
                  <option>UPI</option>
                  <option>Wallet</option>
                </select>
              </div>

              <div className="bg-green-50 rounded-lg p-3 sm:p-4 border border-green-200">
                <p className="text-xs sm:text-sm text-green-800">
                  <strong>Benefits:</strong> No medical examination required for renewal. Instant policy issuance on payment.
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all shadow-md text-sm sm:text-base"
              >
                Proceed to Payment
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Buy New Policy Modal - Selection */}
      {showBuyPolicyModal && !showInsuranceForm && (
        <div className="fixed inset-0 bg-black/10 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-4 sm:p-6 relative animate-fadeInUp max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowBuyPolicyModal(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600 z-10"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 pr-8">Buy New Insurance Policy</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-6">Choose the best insurance plan for you and your family</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {[
                { name: 'Health Insurance', component: 'health', desc: 'Medical coverage for family' },
                { name: 'Motor Insurance', component: 'motor', desc: 'Car/Bike insurance' },
                { name: 'Term Insurance', component: 'term', desc: 'Life coverage protection' }
              ].map((insurance) => (
                <button
                  key={insurance.name}
                  onClick={() => {
                    setSelectedInsuranceType(insurance.component);
                    setShowInsuranceForm(true);
                    setShowBuyPolicyModal(false);
                  }}
                  className="p-4 sm:p-5 bg-gradient-to-br from-gray-50 to-gray-100 hover:from-green-50 hover:to-green-100 border-2 border-gray-200 hover:border-green-500 rounded-xl text-left transition-all group"
                >
                  <div className="flex flex-col">
                    <div className="font-semibold text-sm sm:text-base text-gray-800 group-hover:text-green-700 mb-1">{insurance.name}</div>
                    <div className="text-xs text-gray-500 group-hover:text-gray-600 mb-3">{insurance.desc}</div>
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

      {/* Insurance Application Form - Opens in Same Page */}
      {showInsuranceForm && (
        <div className="mt-6">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 sm:px-6 py-4 rounded-xl mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg sm:text-xl font-bold">
                  Apply for {selectedInsuranceType === 'health' ? 'Health Insurance' : 
                             selectedInsuranceType === 'motor' ? 'Motor Insurance' : 
                             'Term Insurance'}
                </h3>
                <p className="text-xs sm:text-sm text-green-100 mt-1">Fill the form below to proceed with your application</p>
              </div>
              <button
                onClick={() => {
                  setShowInsuranceForm(false);
                  setSelectedInsuranceType('');
                }}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-all"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>

          {/* Form Container */}
          <div ref={insuranceFormRef} className="insurance-form-container">
            <style>{`
              /* Hide everything except the application form */
              .insurance-form-container > div > *:not(#apply-form) {
                display: none !important;
              }
              
              .insurance-form-container nav,
              .insurance-form-container > div > header:not(#apply-form header),
              .insurance-form-container footer {
                display: none !important;
              }
              
              .insurance-form-container #apply-form {
                display: block !important;
                margin: 0 !important;
                padding: 0 !important;
                max-width: 100% !important;
              }
            `}</style>
            
            {selectedInsuranceType === 'health' && <Health_Insurence />}
            {selectedInsuranceType === 'motor' && <Moter_Insurance />}
            {selectedInsuranceType === 'term' && <Term_Insurance />}
          </div>
        </div>
      )}

    </div>
  );
};

export default InsuranceManagement;

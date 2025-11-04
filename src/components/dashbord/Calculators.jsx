import React, { useState } from 'react';
import { Calculator, TrendingUp, Home, Briefcase, Heart, Shield, PieChart, DollarSign, X } from 'lucide-react';
import './calculators.css';

// Import existing calculator components
import Personal_loan from '../Personal_loan';
import Home_Loan from '../Home_Loan';
import Business_loan from '../Business_loan';
import Health_Insurence from '../Health_Insurence';
import Moter_Insurance from '../Moter_Insurance';
import Term_Insurance from '../Term_Insurance';
import Mutual_funds from '../Mutual_funds';
import SIP from '../SIP';
import Personal_tax_planning from '../Personal_tax_planning';
import Business_Tax_planning from '../Business_Tax_planning';

const Calculators = () => {
  const [selectedCalculator, setSelectedCalculator] = useState(null);

  const calculators = [
    {
      id: 'personal-loan',
      name: 'Personal Loan EMI',
      description: 'Calculate EMI for Personal Loans',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600',
      component: Personal_loan
    },
    {
      id: 'home-loan',
      name: 'Home Loan EMI',
      description: 'Calculate EMI for Home Loans',
      icon: <Home className="w-6 h-6" />,
      color: 'from-green-500 to-green-600',
      component: Home_Loan
    },
    {
      id: 'business-loan',
      name: 'Business Loan EMI',
      description: 'Calculate EMI for Business Loans',
      icon: <Briefcase className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-600',
      component: Business_loan
    },
    {
      id: 'health-insurance',
      name: 'Health Insurance',
      description: 'Calculate Health Insurance Premium',
      icon: <Heart className="w-6 h-6" />,
      color: 'from-red-500 to-red-600',
      component: Health_Insurence
    },
    {
      id: 'motor-insurance',
      name: 'Motor Insurance',
      description: 'Calculate Vehicle Insurance Premium',
      icon: <Shield className="w-6 h-6" />,
      color: 'from-orange-500 to-orange-600',
      component: Moter_Insurance
    },
    {
      id: 'term-insurance',
      name: 'Term Insurance',
      description: 'Calculate Term Insurance Premium',
      icon: <Shield className="w-6 h-6" />,
      color: 'from-teal-500 to-teal-600',
      component: Term_Insurance
    },
    {
      id: 'mutual-funds',
      name: 'Mutual Funds',
      description: 'Calculate Mutual Fund Returns',
      icon: <PieChart className="w-6 h-6" />,
      color: 'from-indigo-500 to-indigo-600',
      component: Mutual_funds
    },
    {
      id: 'sip',
      name: 'SIP Calculator',
      description: 'Calculate SIP Returns',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'from-pink-500 to-pink-600',
      component: SIP
    },
    {
      id: 'personal-tax',
      name: 'Personal Tax Planning',
      description: 'Plan Your Personal Taxes',
      icon: <Calculator className="w-6 h-6" />,
      color: 'from-yellow-500 to-yellow-600',
      component: Personal_tax_planning
    },
    {
      id: 'business-tax',
      name: 'Business Tax Strategy',
      description: 'Plan Your Business Taxes',
      icon: <Calculator className="w-6 h-6" />,
      color: 'from-cyan-500 to-cyan-600',
      component: Business_Tax_planning
    }
  ];

  const handleCalculatorSelect = (calculator) => {
    setSelectedCalculator(calculator);
    // Scroll to top when calculator is selected
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseCalculator = () => {
    setSelectedCalculator(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If a calculator is selected, render only that calculator component
  if (selectedCalculator) {
    const CalculatorComponent = selectedCalculator.component;
    
    return (
      <div className="relative">
        {/* Close Button - Fixed at top right */}
        <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm mb-4">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 bg-gradient-to-br ${selectedCalculator.color} rounded-lg flex items-center justify-center text-white`}>
                {selectedCalculator.icon}
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">{selectedCalculator.name}</h2>
                <p className="text-xs text-gray-500">{selectedCalculator.description}</p>
              </div>
            </div>
            <button
              onClick={handleCloseCalculator}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close calculator"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Render the full calculator component */}
        <div className="calculator-wrapper">
          <CalculatorComponent />
        </div>
      </div>
    );
  }

  // Default view: Show calculator grid
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl mb-4">
          <Calculator className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tax & Financial Calculators</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Select a calculator from the dropdown to get started with your financial planning
        </p>
      </div>

      {/* Calculator Dropdown */}
      <div className="max-w-2xl mx-auto">
        <label className="block text-gray-700 font-semibold mb-2">Select Calculator Type</label>
        <select
          onChange={(e) => {
            const calculator = calculators.find(c => c.id === e.target.value);
            if (calculator) handleCalculatorSelect(calculator);
          }}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none transition-colors text-lg"
          defaultValue=""
        >
          <option value="" disabled>Choose a calculator...</option>
          
          <optgroup label="Loan EMI Calculators">
            <option value="personal-loan">Personal Loan EMI Calculator</option>
            <option value="home-loan">Home Loan EMI Calculator</option>
            <option value="business-loan">Business Loan EMI Calculator</option>
          </optgroup>
          
          <optgroup label="Insurance Calculators">
            <option value="health-insurance">Health Insurance Calculator</option>
            <option value="motor-insurance">Motor Insurance Calculator</option>
            <option value="term-insurance">Term Insurance Calculator</option>
          </optgroup>
          
          <optgroup label="Investment Calculators">
            <option value="mutual-funds">Mutual Funds Calculator</option>
            <option value="sip">SIP Calculator</option>
          </optgroup>
          
          <optgroup label="Tax Planning">
            <option value="personal-tax">Personal Tax Planning</option>
            <option value="business-tax">Business Tax Strategy</option>
          </optgroup>
        </select>
      </div>

      {/* Calculator Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
        {calculators.map((calculator) => (
          <button
            key={calculator.id}
            onClick={() => handleCalculatorSelect(calculator)}
            className="group bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 border-transparent hover:border-green-500 text-left"
          >
            <div className={`w-12 h-12 bg-gradient-to-br ${calculator.color} rounded-lg flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
              {calculator.icon}
            </div>
            <h3 className="font-bold text-gray-900 mb-1 group-hover:text-green-700 transition-colors">
              {calculator.name}
            </h3>
            <p className="text-sm text-gray-600">{calculator.description}</p>
            <div className="mt-4 flex items-center text-green-600 text-sm font-semibold">
              <span>Calculate Now</span>
              <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        ))}
      </div>

      {/* Info Section */}
      <div className="mt-12 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Use Our Calculators?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Accurate Results</h3>
              <p className="text-sm text-gray-600">Get precise calculations based on latest rates and formulas</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">Instant Results</h3>
              <p className="text-sm text-gray-600">Calculate EMI, premiums, and returns in seconds</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">100% Secure</h3>
              <p className="text-sm text-gray-600">Your data is safe and never shared with third parties</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculators;

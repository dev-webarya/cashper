import React, { useState } from 'react';
import { X } from 'lucide-react';

const TaxPlanning = () => {
  const [showTaxCalculator, setShowTaxCalculator] = useState(false);
  const [showConsultation, setShowConsultation] = useState(false);
  const [selectedCalculator, setSelectedCalculator] = useState('income-tax'); // Calculator type
  
  // Tax Calculator State
  const [grossIncome, setGrossIncome] = useState(1200000);
  const [deductions80C, setDeductions80C] = useState(150000);
  const [deductions80D, setDeductions80D] = useState(25000);
  const [deductionsNPS, setDeductionsNPS] = useState(50000);
  const [hraExemption, setHraExemption] = useState(240000);
  const [homeLoanInterest, setHomeLoanInterest] = useState(200000);
  const [taxRegime, setTaxRegime] = useState('old'); // 'old' or 'new'

  // EMI Calculator State
  const [emiLoanAmount, setEmiLoanAmount] = useState(500000);
  const [emiInterestRate, setEmiInterestRate] = useState(10);
  const [emiTenure, setEmiTenure] = useState(36);

  // SIP Calculator State
  const [sipMonthlyInvestment, setSipMonthlyInvestment] = useState(5000);
  const [sipExpectedReturn, setSipExpectedReturn] = useState(12);
  const [sipTimePeriod, setSipTimePeriod] = useState(10);

  // Mutual Fund Calculator State
  const [mfInvestmentType, setMfInvestmentType] = useState('lumpsum');
  const [mfLumpsumAmount, setMfLumpsumAmount] = useState(100000);
  const [mfSipAmount, setMfSipAmount] = useState(5000);
  const [mfReturnRate, setMfReturnRate] = useState(12);
  const [mfTimePeriod, setMfTimePeriod] = useState(5);

  // Business Tax Calculator State
  const [businessType, setBusinessType] = useState('private');
  const [annualTurnover, setAnnualTurnover] = useState(5000000);
  const [annualProfit, setAnnualProfit] = useState(1000000);
  const [depreciation, setDepreciation] = useState(100000);
  const [salaryExpenses, setSalaryExpenses] = useState(500000);
  const [rdExpenses, setRdExpenses] = useState(50000);

  // Calculator Options
  const calculatorTypes = [
    { id: 'income-tax', name: 'Income Tax Calculator' },
    { id: 'emi', name: 'EMI Calculator' },
    { id: 'sip', name: 'SIP Calculator' },
    { id: 'mutual-fund', name: 'Mutual Fund Calculator' },
    { id: 'business-tax', name: 'Business Tax Savings Calculator' }
  ];

  // Calculate EMI
  const calculateEMI = () => {
    const principal = emiLoanAmount;
    const ratePerMonth = emiInterestRate / 12 / 100;
    const months = emiTenure;
    
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

  // Calculate SIP
  const calculateSIP = () => {
    const P = sipMonthlyInvestment;
    const r = sipExpectedReturn / 12 / 100;
    const n = sipTimePeriod * 12;
    
    const futureValue = P * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
    const invested = P * n;
    const returns = futureValue - invested;
    
    return {
      futureValue: Math.round(futureValue),
      invested: Math.round(invested),
      returns: Math.round(returns)
    };
  };

  // Calculate Mutual Fund Returns
  const calculateMutualFund = () => {
    if (mfInvestmentType === 'lumpsum') {
      const invested = mfLumpsumAmount;
      const futureValue = invested * Math.pow((1 + mfReturnRate / 100), mfTimePeriod);
      const returns = futureValue - invested;
      return {
        invested: Math.round(invested),
        returns: Math.round(returns),
        totalValue: Math.round(futureValue)
      };
    } else {
      const P = mfSipAmount;
      const r = mfReturnRate / 12 / 100;
      const n = mfTimePeriod * 12;
      const futureValue = P * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
      const invested = P * n;
      const returns = futureValue - invested;
      return {
        invested: Math.round(invested),
        returns: Math.round(returns),
        totalValue: Math.round(futureValue)
      };
    }
  };

  // Calculate Business Tax
  const calculateBusinessTax = () => {
    const netProfit = annualProfit;
    const totalDeductions = depreciation + salaryExpenses + rdExpenses;
    const taxableIncome = Math.max(0, netProfit - totalDeductions);
    
    let taxRate = 0;
    if (businessType === 'private') {
      taxRate = 0.25; // 25% for private limited
    } else if (businessType === 'partnership') {
      taxRate = 0.30; // 30% for partnership
    } else {
      taxRate = 0.30; // 30% for others
    }
    
    const taxWithoutPlanning = Math.round(netProfit * taxRate * 1.04); // with 4% cess
    const taxAfterPlanning = Math.round(taxableIncome * taxRate * 1.04);
    const totalSavings = taxWithoutPlanning - taxAfterPlanning;
    
    return {
      turnover: annualTurnover,
      netProfit: netProfit,
      totalDeductions: totalDeductions,
      taxableIncome: taxableIncome,
      taxWithoutPlanning: taxWithoutPlanning,
      taxAfterPlanning: taxAfterPlanning,
      totalSavings: totalSavings
    };
  };

  // Calculate Tax
  const calculateTax = () => {
    let taxableIncome = grossIncome;
    let totalDeductions = 0;

    if (taxRegime === 'old') {
      totalDeductions = Math.min(deductions80C, 150000) + 
                       Math.min(deductions80D, 25000) + 
                       Math.min(deductionsNPS, 50000) + 
                       Math.min(hraExemption, 240000) + 
                       Math.min(homeLoanInterest, 200000);
      taxableIncome = grossIncome - totalDeductions;
    }

    let tax = 0;
    let remainingIncome = taxableIncome;

    if (taxRegime === 'old') {
      // Old Tax Regime Slabs
      if (remainingIncome > 250000) {
        if (remainingIncome <= 500000) {
          tax += (remainingIncome - 250000) * 0.05;
        } else {
          tax += 250000 * 0.05;
          if (remainingIncome <= 1000000) {
            tax += (remainingIncome - 500000) * 0.20;
          } else {
            tax += 500000 * 0.20;
            tax += (remainingIncome - 1000000) * 0.30;
          }
        }
      }
    } else {
      // New Tax Regime Slabs (2024-25)
      if (remainingIncome > 300000) {
        if (remainingIncome <= 600000) {
          tax += (remainingIncome - 300000) * 0.05;
        } else if (remainingIncome <= 900000) {
          tax += 300000 * 0.05;
          tax += (remainingIncome - 600000) * 0.10;
        } else if (remainingIncome <= 1200000) {
          tax += 300000 * 0.05;
          tax += 300000 * 0.10;
          tax += (remainingIncome - 900000) * 0.15;
        } else if (remainingIncome <= 1500000) {
          tax += 300000 * 0.05;
          tax += 300000 * 0.10;
          tax += 300000 * 0.15;
          tax += (remainingIncome - 1200000) * 0.20;
        } else {
          tax += 300000 * 0.05;
          tax += 300000 * 0.10;
          tax += 300000 * 0.15;
          tax += 300000 * 0.20;
          tax += (remainingIncome - 1500000) * 0.30;
        }
      }
    }

    // Add 4% Cess
    const cess = tax * 0.04;
    const totalTax = tax + cess;

    return {
      grossIncome,
      totalDeductions,
      taxableIncome,
      tax: Math.round(tax),
      cess: Math.round(cess),
      totalTax: Math.round(totalTax),
      effectiveRate: taxableIncome > 0 ? ((totalTax / grossIncome) * 100).toFixed(2) : 0
    };
  };

  const taxResult = calculateTax();
  const emiResult = calculateEMI();
  const sipResult = calculateSIP();
  const mfResult = calculateMutualFund();
  const businessTaxResult = calculateBusinessTax();

  const taxSummary = [
    { year: '2024-25', income: '₹12,00,000', taxPaid: '₹1,25,000', taxSaved: '₹45,000', status: 'ongoing' },
    { year: '2023-24', income: '₹10,50,000', taxPaid: '₹95,000', taxSaved: '₹35,000', status: 'completed' },
    { year: '2022-23', income: '₹9,00,000', taxPaid: '₹75,000', taxSaved: '₹25,000', status: 'completed' }
  ];

  const taxSavingInvestments = [
    { name: 'ELSS Mutual Funds', invested: '₹1,50,000', taxSaved: '₹46,800', category: '80C' },
    { name: 'PPF', invested: '₹50,000', taxSaved: '₹15,600', category: '80C' },
    { name: 'Health Insurance', invested: '₹25,000', taxSaved: '₹7,800', category: '80D' },
    { name: 'NPS', invested: '₹50,000', taxSaved: '₹15,600', category: '80CCD' }
  ];

  const upcomingDeadlines = [
    { task: 'Advance Tax Q4', date: 'Mar 15, 2025', amount: '₹30,000', priority: 'high' },
    { task: 'ITR Filing FY 2024-25', date: 'Jul 31, 2025', amount: 'N/A', priority: 'medium' },
    { task: 'Tax Saving Investments', date: 'Mar 31, 2025', amount: '₹1,00,000', priority: 'high' }
  ];

  const taxDeductions = [
    { section: '80C', limit: '₹1,50,000', utilized: '₹1,50,000', percentage: 100 },
    { section: '80D', limit: '₹25,000', utilized: '₹25,000', percentage: 100 },
    { section: '80CCD(1B)', limit: '₹50,000', utilized: '₹50,000', percentage: 100 },
    { section: 'HRA', limit: 'Variable', utilized: '₹2,40,000', percentage: 80 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Tax Planning</h1>
          <p className="text-gray-600 mt-1">Optimize your tax savings with smart planning</p>
        </div>
        <button 
          onClick={() => setShowConsultation(true)}
          className="bg-gradient-to-r from-green-600 via-green-700 to-green-800 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          Schedule Consultation
        </button>
      </div>

      {/* Current Year Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm mb-2">Gross Income</p>
              <p className="text-3xl font-bold">₹12L</p>
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
              <p className="text-green-100 text-sm mb-2">Tax Saved</p>
              <p className="text-3xl font-bold">₹45K</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-100 text-sm mb-2">Tax Paid</p>
              <p className="text-3xl font-bold">₹1.25L</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm mb-2">Effective Tax Rate</p>
              <p className="text-3xl font-bold">10.4%</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Tax Deductions Overview - Vertical Bars */}
      <div className="bg-white rounded-xl shadow-lg p-4 xs:p-5 sm:p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Tax Deductions Utilized</h2>
        
        {/* Vertical Bar Chart Container */}
        <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 xs:p-5 sm:p-6">
          {/* Chart Area */}
          <div className="flex items-end justify-center gap-6 xs:gap-8 sm:gap-10 px-4" style={{ height: '320px' }}>
            {taxDeductions.map((deduction, index) => (
              <div key={index} className="flex flex-col items-center group">
                {/* Bar Container */}
                <div className="flex justify-center mb-3 relative" style={{ height: '280px', width: '50px' }}>
                  {/* Vertical Bar */}
                  <div className="relative flex flex-col justify-end w-[35px] group/bar">
                    <div 
                      className={`w-full bg-gradient-to-t ${
                        deduction.percentage === 100 
                          ? 'from-green-600 to-green-400' 
                          : 'from-blue-600 to-blue-400'
                      } rounded-t-lg transition-all duration-700 ease-out hover:${
                        deduction.percentage === 100 
                          ? 'from-green-700 to-green-500' 
                          : 'from-blue-700 to-blue-500'
                      } shadow-lg relative overflow-hidden`}
                      style={{ height: `${deduction.percentage}%` }}
                    >
                      {/* Shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                      
                      {/* Percentage Label */}
                      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-white font-bold text-xs xs:text-sm">
                        {deduction.percentage}%
                      </div>
                      
                      {/* Value on hover */}
                      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity bg-gray-800 text-white px-2 xs:px-3 py-1 xs:py-1.5 rounded-lg text-xs xs:text-sm font-bold whitespace-nowrap shadow-lg z-10">
                        {deduction.utilized}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section Label */}
                <div className="text-center">
                  <p className="text-xs xs:text-sm font-bold text-gray-800 group-hover:text-green-700 transition-colors mb-1">
                    Section {deduction.section}
                  </p>
                  <p className="text-[10px] xs:text-xs font-medium text-gray-500">
                    Limit: {deduction.limit}
                  </p>
                  <p className="text-xs xs:text-sm font-semibold text-green-600 mt-1">
                    {deduction.utilized}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tax Saving Investments */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Tax Saving Investments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {taxSavingInvestments.map((investment, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-bold text-gray-800">{investment.name}</h3>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold">
                  {investment.category}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Invested</p>
                  <p className="text-sm font-semibold text-gray-800">{investment.invested}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Tax Saved</p>
                  <p className="text-sm font-semibold text-green-600">{investment.taxSaved}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Deadlines */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Upcoming Deadlines</h2>
        <div className="space-y-4">
          {upcomingDeadlines.map((deadline, index) => (
            <div
              key={index}
              className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg border-l-4 ${
                deadline.priority === 'high' 
                  ? 'bg-red-50 border-red-500' 
                  : 'bg-yellow-50 border-yellow-500'
              } hover:shadow-md transition-all gap-4`}
            >
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-800 mb-1">{deadline.task}</h3>
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                  <span>Due: {deadline.date}</span>
                  {deadline.amount !== 'N/A' && (
                    <>
                      <span>•</span>
                      <span>Amount: {deadline.amount}</span>
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  deadline.priority === 'high' 
                    ? 'bg-red-100 text-red-700' 
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {deadline.priority === 'high' ? 'High Priority' : 'Medium Priority'}
                </span>
                <button 
                  onClick={() => alert(`Action for: ${deadline.task}\n\nDue Date: ${deadline.date}\nAmount: ${deadline.amount}\n\nSet a reminder or proceed with the action.`)}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg text-sm font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-md"
                >
                  Take Action
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Year-wise Tax Summary */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Tax History</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Financial Year</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Income</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Tax Paid</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Tax Saved</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {taxSummary.map((year, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-800">{year.year}</td>
                  <td className="py-3 px-4 text-sm text-gray-800">{year.income}</td>
                  <td className="py-3 px-4 text-sm text-gray-800">{year.taxPaid}</td>
                  <td className="py-3 px-4 text-sm text-green-600 font-semibold">{year.taxSaved}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      year.status === 'completed' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {year.status === 'completed' ? 'Completed' : 'Ongoing'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tax Calculator - Redesigned with Frontend Layout */}
      <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Tax & Financial Calculators</h2>
            <p className="text-gray-600">Select a calculator from the dropdown to get started</p>
          </div>
        </div>

        {/* Calculator Selector Dropdown */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Select Calculator Type</label>
          <div className="relative">
            <select
              value={selectedCalculator}
              onChange={(e) => {
                setSelectedCalculator(e.target.value);
                setShowTaxCalculator(false);
              }}
              className="w-full px-4 py-3 pr-10 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none text-gray-800 font-semibold bg-white appearance-none cursor-pointer transition-all hover:border-green-400"
            >
              {calculatorTypes.map((calc) => (
                <option key={calc.id} value={calc.id}>
                  {calc.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {!showTaxCalculator ? (
          <button 
            onClick={() => setShowTaxCalculator(true)}
            className="w-full sm:w-auto bg-gradient-to-r from-green-600 via-green-700 to-green-800 hover:from-green-700 hover:to-green-800 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Open {calculatorTypes.find(c => c.id === selectedCalculator)?.name}
          </button>
        ) : (
          <div className="mt-6">
            {/* Calculator Title Bar */}
              <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-4 rounded-xl mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div>
                  <h3 className="text-xl font-bold">{calculatorTypes.find(c => c.id === selectedCalculator)?.name}</h3>
                  <p className="text-sm text-green-100">Fill in the details below to calculate</p>
                </div>
              </div>
              <button
                onClick={() => setShowTaxCalculator(false)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Render Calculator Based on Selection */}
            {selectedCalculator === 'income-tax' && (
              <>
            {/* Tax Regime Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Select Tax Regime</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => setTaxRegime('old')}
                  className={`p-5 rounded-xl border-2 transition-all duration-300 ${
                    taxRegime === 'old' 
                      ? 'border-green-500 bg-gradient-to-br from-green-50 to-green-100 shadow-lg transform scale-105' 
                      : 'border-gray-300 bg-white hover:border-green-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-bold text-gray-800">Old Tax Regime</h4>
                    {taxRegime === 'old' && (
                      <span className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center">
                        ✓
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 text-left">With Deductions & Exemptions</p>
                  <p className="text-xs text-green-600 font-semibold mt-2 text-left">Best for: Salaried with investments</p>
                </button>
                
                <button
                  onClick={() => setTaxRegime('new')}
                  className={`p-5 rounded-xl border-2 transition-all duration-300 ${
                    taxRegime === 'new' 
                      ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg transform scale-105' 
                      : 'border-gray-300 bg-white hover:border-blue-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-bold text-gray-800">New Tax Regime</h4>
                    {taxRegime === 'new' && (
                      <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center">
                        ✓
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 text-left">Lower Tax Rates, No Deductions</p>
                  <p className="text-xs text-blue-600 font-semibold mt-2 text-left">Best for: No investments/deductions</p>
                </button>
              </div>
            </div>

            {/* Grid Layout - Left: Inputs, Right: Results */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Side - Input Form */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 shadow-md border border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Enter Your Details</h3>
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Annual Gross Income (₹) *
                    </label>
                    <input
                      type="number"
                      value={grossIncome}
                      onChange={(e) => setGrossIncome(Number(e.target.value))}
                      placeholder="e.g., 1200000"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none text-gray-800 font-semibold"
                    />
                  </div>

                  {taxRegime === 'old' && (
                    <>
                      <div className="border-t pt-4">
                        <p className="text-sm font-bold text-green-700 mb-3">📊 Available Deductions (Old Regime)</p>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Section 80C Investments (₹) - Max ₹1,50,000
                        </label>
                        <input
                          type="number"
                          value={deductions80C}
                          onChange={(e) => setDeductions80C(Number(e.target.value))}
                          placeholder="e.g., 150000"
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none text-gray-800 font-semibold"
                          max="150000"
                        />
                        <p className="text-xs text-gray-500 mt-1">PPF, ELSS, Life Insurance, NSC, etc.</p>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Section 80D - Health Insurance (₹) - Max ₹50,000
                        </label>
                        <input
                          type="number"
                          value={deductions80D}
                          onChange={(e) => setDeductions80D(Number(e.target.value))}
                          placeholder="e.g., 25000"
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none text-gray-800 font-semibold"
                          max="50000"
                        />
                        <p className="text-xs text-gray-500 mt-1">Self, Family & Parents Insurance Premium</p>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          NPS - Section 80CCD(1B) (₹) - Max ₹50,000
                        </label>
                        <input
                          type="number"
                          value={deductionsNPS}
                          onChange={(e) => setDeductionsNPS(Number(e.target.value))}
                          placeholder="e.g., 50000"
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none text-gray-800 font-semibold"
                          max="50000"
                        />
                        <p className="text-xs text-gray-500 mt-1">Additional NPS Investment</p>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Home Loan Interest - 24(b) (₹) - Max ₹2,00,000
                        </label>
                        <input
                          type="number"
                          value={homeLoanInterest}
                          onChange={(e) => setHomeLoanInterest(Number(e.target.value))}
                          placeholder="e.g., 200000"
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none text-gray-800 font-semibold"
                          max="200000"
                        />
                        <p className="text-xs text-gray-500 mt-1">Interest paid on Home Loan</p>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          HRA Exemption (₹)
                        </label>
                        <input
                          type="number"
                          value={hraExemption}
                          onChange={(e) => setHraExemption(Number(e.target.value))}
                          placeholder="e.g., 240000"
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none text-gray-800 font-semibold"
                        />
                        <p className="text-xs text-gray-500 mt-1">House Rent Allowance Exemption</p>
                      </div>
                    </>
                  )}

                  {taxRegime === 'new' && (
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mt-4">
                      <p className="text-sm text-blue-800 font-semibold mb-2">ℹ️ New Tax Regime</p>
                      <p className="text-xs text-blue-700">
                        In the new tax regime, you cannot claim deductions under Section 80C, 80D, HRA, etc. 
                        However, you benefit from lower tax rates.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Side - Results Display */}
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 shadow-xl border-2 border-green-300">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Your Tax Summary</h3>
                <div className="mb-4 px-3 py-2 bg-white rounded-lg border-l-4 border-green-600">
                  <p className="text-xs font-semibold text-gray-700">
                    {taxRegime === 'old' ? '📊 Old Tax Regime (With Deductions)' : '📊 New Tax Regime (Lower Rates)'}
                  </p>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="bg-white rounded-lg p-4 shadow">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Gross Annual Income</span>
                      <span className="text-lg font-bold text-gray-800">₹{taxResult.grossIncome.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {taxRegime === 'old' && taxResult.totalDeductions > 0 && (
                    <div className="bg-white rounded-lg p-4 shadow">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Total Deductions</span>
                        <span className="text-lg font-bold text-green-600">₹{taxResult.totalDeductions.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  )}

                  <div className="bg-white rounded-lg p-4 shadow">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Taxable Income</span>
                      <span className="text-lg font-bold text-gray-800">₹{taxResult.taxableIncome.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-4 shadow border-2 border-red-300">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold text-gray-700">Tax Payable (with cess)</span>
                      <span className="text-lg font-bold text-red-600">₹{taxResult.totalTax.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 shadow">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Effective Tax Rate</span>
                      <span className="text-lg font-bold text-purple-700">{taxResult.effectiveRate}%</span>
                    </div>
                  </div>
                </div>

                {/* Total Savings Highlight */}
                {taxRegime === 'old' && taxResult.totalDeductions > 0 && (
                  <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-6 text-center text-white shadow-xl mb-6">
                    <p className="text-sm mb-2 opacity-90">Your Tax Savings with Planning</p>
                    <p className="text-4xl font-bold mb-2">₹{Math.round(taxResult.totalDeductions * 0.31).toLocaleString('en-IN')}</p>
                    <p className="text-xs opacity-90">Save up to 30% with proper planning!</p>
                  </div>
                )}

                {taxRegime === 'new' && (
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-center text-white shadow-xl mb-6">
                    <p className="text-sm mb-2 opacity-90">New Tax Regime Benefits</p>
                    <p className="text-2xl font-bold mb-2">Lower Tax Slabs</p>
                    <p className="text-xs opacity-90">Simplified taxation without deduction claims!</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="mt-6 flex flex-col gap-3">
                  <button 
                    onClick={() => window.print()}
                    className="w-full bg-white text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download Report
                  </button>
                  <button 
                    onClick={() => setShowConsultation(true)}
                    className="w-full bg-gradient-to-r from-green-600 via-green-700 to-green-800 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-md"
                  >
                    Get Personalized Tax Plan
                  </button>
                </div>
              </div>
            </div>

            {/* Note */}
            <div className="mt-6 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
              <p className="text-xs text-gray-600">
                <strong>Note:</strong> This is an indicative calculator. Actual tax savings may vary based on your complete financial profile, additional deductions, and applicable tax regime. Consult our tax experts for accurate personalized planning.
              </p>
            </div>
            </>
            )}

            {/* EMI Calculator */}
            {selectedCalculator === 'emi' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 shadow-md border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Loan Details</h3>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Loan Amount (₹)
                      </label>
                      <input
                        type="number"
                        value={emiLoanAmount}
                        onChange={(e) => setEmiLoanAmount(Number(e.target.value))}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Interest Rate (% per annum)
                      </label>
                      <input
                        type="number"
                        value={emiInterestRate}
                        onChange={(e) => setEmiInterestRate(Number(e.target.value))}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Loan Tenure (Months)
                      </label>
                      <input
                        type="number"
                        value={emiTenure}
                        onChange={(e) => setEmiTenure(Number(e.target.value))}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 shadow-xl border-2 border-green-300">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">EMI Summary</h3>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 shadow">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Loan Amount</span>
                        <span className="text-lg font-bold text-gray-800">₹{emiResult.principal.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-6 text-center text-white shadow-xl">
                      <p className="text-sm mb-2 opacity-90">Monthly EMI</p>
                      <p className="text-4xl font-bold mb-2">₹{emiResult.emi.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Total Interest</span>
                        <span className="text-lg font-bold text-orange-600">₹{emiResult.totalInterest.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Total Amount Payable</span>
                        <span className="text-lg font-bold text-red-600">₹{emiResult.totalAmount.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SIP Calculator */}
            {selectedCalculator === 'sip' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 shadow-md border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">SIP Investment Details</h3>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Monthly Investment (₹)
                      </label>
                      <input
                        type="number"
                        value={sipMonthlyInvestment}
                        onChange={(e) => setSipMonthlyInvestment(Number(e.target.value))}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Expected Return Rate (% per annum)
                      </label>
                      <input
                        type="number"
                        value={sipExpectedReturn}
                        onChange={(e) => setSipExpectedReturn(Number(e.target.value))}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Time Period (Years)
                      </label>
                      <input
                        type="number"
                        value={sipTimePeriod}
                        onChange={(e) => setSipTimePeriod(Number(e.target.value))}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 shadow-xl border-2 border-green-300">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">SIP Returns Summary</h3>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 shadow">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Total Invested</span>
                        <span className="text-lg font-bold text-gray-800">₹{sipResult.invested.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Estimated Returns</span>
                        <span className="text-lg font-bold text-green-600">₹{sipResult.returns.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-6 text-center text-white shadow-xl">
                      <p className="text-sm mb-2 opacity-90">Future Value</p>
                      <p className="text-4xl font-bold mb-2">₹{sipResult.futureValue.toLocaleString('en-IN')}</p>
                      <p className="text-xs opacity-90">Grow your wealth with SIP!</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Mutual Fund Calculator */}
            {selectedCalculator === 'mutual-fund' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 shadow-md border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Investment Details</h3>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Investment Type</label>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          onClick={() => setMfInvestmentType('lumpsum')}
                          className={`p-4 rounded-xl border-2 transition-all ${mfInvestmentType === 'lumpsum' ? 'border-green-500 bg-green-50' : 'border-gray-300'}`}
                        >
                          <p className="text-sm font-semibold">Lumpsum</p>
                        </button>
                        <button
                          onClick={() => setMfInvestmentType('sip')}
                          className={`p-4 rounded-xl border-2 transition-all ${mfInvestmentType === 'sip' ? 'border-green-500 bg-green-50' : 'border-gray-300'}`}
                        >
                          <p className="text-sm font-semibold">SIP</p>
                        </button>
                      </div>
                    </div>
                    {mfInvestmentType === 'lumpsum' ? (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Lumpsum Amount (₹)
                        </label>
                        <input
                          type="number"
                          value={mfLumpsumAmount}
                          onChange={(e) => setMfLumpsumAmount(Number(e.target.value))}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none"
                        />
                      </div>
                    ) : (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Monthly SIP Amount (₹)
                        </label>
                        <input
                          type="number"
                          value={mfSipAmount}
                          onChange={(e) => setMfSipAmount(Number(e.target.value))}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none"
                        />
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Expected Return Rate (% per annum)
                      </label>
                      <input
                        type="number"
                        value={mfReturnRate}
                        onChange={(e) => setMfReturnRate(Number(e.target.value))}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Time Period (Years)
                      </label>
                      <input
                        type="number"
                        value={mfTimePeriod}
                        onChange={(e) => setMfTimePeriod(Number(e.target.value))}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 shadow-xl border-2 border-green-300">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Returns Summary</h3>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 shadow">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Total Invested</span>
                        <span className="text-lg font-bold text-gray-800">₹{mfResult.invested.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Estimated Returns</span>
                        <span className="text-lg font-bold text-green-600">₹{mfResult.returns.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-center text-white shadow-xl">
                      <p className="text-sm mb-2 opacity-90">Total Value</p>
                      <p className="text-4xl font-bold mb-2">₹{mfResult.totalValue.toLocaleString('en-IN')}</p>
                      <p className="text-xs opacity-90">Invest smart, grow wealth!</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Business Tax Calculator */}
            {selectedCalculator === 'business-tax' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 shadow-md border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Business Details</h3>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Business Type</label>
                      <select
                        value={businessType}
                        onChange={(e) => setBusinessType(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none"
                      >
                        <option value="private">Private Limited (25%)</option>
                        <option value="partnership">Partnership (30%)</option>
                        <option value="llp">LLP (30%)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Annual Turnover (₹)
                      </label>
                      <input
                        type="number"
                        value={annualTurnover}
                        onChange={(e) => setAnnualTurnover(Number(e.target.value))}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Annual Profit (₹)
                      </label>
                      <input
                        type="number"
                        value={annualProfit}
                        onChange={(e) => setAnnualProfit(Number(e.target.value))}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Depreciation (₹)
                      </label>
                      <input
                        type="number"
                        value={depreciation}
                        onChange={(e) => setDepreciation(Number(e.target.value))}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Salary Expenses (₹)
                      </label>
                      <input
                        type="number"
                        value={salaryExpenses}
                        onChange={(e) => setSalaryExpenses(Number(e.target.value))}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        R&D Expenses (₹)
                      </label>
                      <input
                        type="number"
                        value={rdExpenses}
                        onChange={(e) => setRdExpenses(Number(e.target.value))}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 shadow-xl border-2 border-green-300">
                  <h3 className="text-xl font-bold text-gray-800 mb-6">Business Tax Summary</h3>
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 shadow">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Annual Turnover</span>
                        <span className="text-lg font-bold text-gray-800">₹{businessTaxResult.turnover.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Net Profit</span>
                        <span className="text-lg font-bold text-gray-800">₹{businessTaxResult.netProfit.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Total Deductions</span>
                        <span className="text-lg font-bold text-green-600">₹{businessTaxResult.totalDeductions.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-4 shadow border-2 border-red-300">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-gray-700">Tax Without Planning</span>
                        <span className="text-lg font-bold text-red-600">₹{businessTaxResult.taxWithoutPlanning.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 shadow border-2 border-green-400">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-gray-700">Tax After Planning</span>
                        <span className="text-lg font-bold text-green-600">₹{businessTaxResult.taxAfterPlanning.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-6 text-center text-white shadow-xl">
                      <p className="text-sm mb-2 opacity-90">Your Business Tax Savings</p>
                      <p className="text-4xl font-bold mb-2">₹{businessTaxResult.totalSavings.toLocaleString('en-IN')}</p>
                      <p className="text-xs opacity-90">Smart planning saves money!</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Consultation Modal */}
      {showConsultation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative animate-fadeInUp">
            <button
              onClick={() => setShowConsultation(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Schedule Tax Consultation</h3>
            <p className="text-gray-600 mb-6">Book a free consultation with our tax experts</p>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-green-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-green-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Preferred Date</label>
                <input
                  type="date"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-green-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Query</label>
                <textarea
                  placeholder="Describe your tax planning needs..."
                  rows="3"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-green-500 focus:outline-none"
                />
              </div>
            </div>
            
            <button 
              onClick={() => {
                alert('Consultation request submitted!\n\nOur tax expert will call you within 24 hours.');
                setShowConsultation(false);
              }}
              className="w-full mt-6 bg-gradient-to-r from-green-600 via-green-700 to-green-800 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Schedule Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaxPlanning;

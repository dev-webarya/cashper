import React, { useState, useEffect, useRef } from 'react';
import { X, Download } from 'lucide-react';

// Import calculator components from home pages
import Personal_loan from '../Personal_loan';
import Home_Loan from '../Home_Loan';
import Business_loan from '../Business_loan';
import Mutual_funds from '../Mutual_funds';
import SIP from '../SIP';
import Personal_tax_planning from '../Personal_tax_planning';
import Business_Tax_planning from '../Business_Tax_planning';

const TaxPlanning = () => {
  const [showTaxCalculator, setShowTaxCalculator] = useState(false);
  const [showConsultation, setShowConsultation] = useState(false);
  const [selectedCalculator, setSelectedCalculator] = useState('personal-loan'); // Calculator type
  const calculatorContainerRef = useRef(null);
  const [showTaxPlanningModal, setShowTaxPlanningModal] = useState(false);
  const [showTaxPlanningForm, setShowTaxPlanningForm] = useState(false);
  const [selectedTaxPlanningType, setSelectedTaxPlanningType] = useState('');
  const taxPlanningFormRef = useRef(null);
  
  // Extract calculator section after component renders
  useEffect(() => {
    if (showTaxCalculator && calculatorContainerRef.current) {
      setTimeout(() => {
        const calculatorSection = calculatorContainerRef.current.querySelector('#calculator');
        if (calculatorSection) {
          // Scroll calculator section into view
          calculatorSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [showTaxCalculator, selectedCalculator]);

  // Scroll to tax planning form when opened
  useEffect(() => {
    if (showTaxPlanningForm && taxPlanningFormRef.current) {
      setTimeout(() => {
        // Scroll to the form container directly
        taxPlanningFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Then try to find and scroll to the specific form section
        const formId = selectedTaxPlanningType === 'business' ? '#business-contact-form' : '#apply-form';
        const applyForm = taxPlanningFormRef.current.querySelector(formId);
        if (applyForm) {
          setTimeout(() => {
            applyForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 200);
        }
      }, 300);
    }
  }, [showTaxPlanningForm, selectedTaxPlanningType]);
  
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

  // Calculator Options - Loans, Investments, and Tax Planning only
  const calculatorTypes = [
    { id: 'personal-loan', name: 'Personal Loan', component: Personal_loan },
    { id: 'home-loan', name: 'Home Loan', component: Home_Loan },
    { id: 'business-loan', name: 'Business Loan', component: Business_loan },
    { id: 'mutual-funds', name: 'Mutual Funds', component: Mutual_funds },
    { id: 'sip', name: 'SIP', component: SIP },
    { id: 'personal-tax', name: 'Personal Tax Planning', component: Personal_tax_planning },
    { id: 'business-tax', name: 'Business Tax Strategy', component: Business_Tax_planning }
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
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button 
            onClick={() => setShowTaxPlanningModal(true)}
            className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            + New Tax Planning
          </button>
          <button 
            onClick={() => setShowConsultation(true)}
            className="bg-gradient-to-r from-green-600 via-green-700 to-green-800 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Schedule Consultation
          </button>
        </div>
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


      {/* Tax Planning Services */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg p-6 border border-blue-100">
        <h2 className="text-xl font-bold text-gray-800 mb-3">Tax Planning Services</h2>
        <p className="text-gray-600 mb-6 text-sm">Get expert guidance for your tax planning needs</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Personal Tax Planning Service */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border-2 border-transparent hover:border-blue-500">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Personal Tax Planning</h3>
                <p className="text-sm text-gray-600">Individual income tax optimization & planning</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            <ul className="space-y-2 mb-4">
              <li className="flex items-center text-sm text-gray-700">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Tax regime selection
              </li>
              <li className="flex items-center text-sm text-gray-700">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Maximize deductions (80C, 80D)
              </li>
              <li className="flex items-center text-sm text-gray-700">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                ITR filing assistance
              </li>
            </ul>
            <button
              onClick={() => {
                setSelectedTaxPlanningType('personal');
                setShowTaxPlanningForm(true);
                setShowTaxPlanningModal(false);
              }}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
            >
              Apply for Personal Tax Planning Service
            </button>
          </div>

          {/* Business Tax Planning Service */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border-2 border-transparent hover:border-indigo-500">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Business Tax Strategy</h3>
                <p className="text-sm text-gray-600">Business tax planning & compliance solutions</p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
            <ul className="space-y-2 mb-4">
              <li className="flex items-center text-sm text-gray-700">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Corporate tax optimization
              </li>
              <li className="flex items-center text-sm text-gray-700">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                GST & compliance support
              </li>
              <li className="flex items-center text-sm text-gray-700">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Tax audit & advisory
              </li>
            </ul>
            <button
              onClick={() => {
                setSelectedTaxPlanningType('business');
                setShowTaxPlanningForm(true);
                setShowTaxPlanningModal(false);
              }}
              className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white px-4 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
            >
              Apply for Business Tax Planning Service
            </button>
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
            {/* Render External Calculator Component if available */}
            {(() => {
              const currentCalc = calculatorTypes.find(c => c.id === selectedCalculator);
              
              // If it's an external component calculator
              if (currentCalc && currentCalc.component) {
                const CalculatorComponent = currentCalc.component;
                return (
                  <div className="relative">
                    {/* Close Button Bar */}
                    <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-4 rounded-xl mb-6 flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold">{currentCalc.name}</h3>
                        <p className="text-sm text-green-100">View and calculate your requirements</p>
                      </div>
                      <button
                        onClick={() => setShowTaxCalculator(false)}
                        className="text-white hover:bg-white/20 p-2 rounded-lg transition-all"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                    
                    {/* Render only the calculator section */}
                    <div ref={calculatorContainerRef} className="calculator-only-view">
                      <style>{`
                        /* Hide everything except calculator section */
                        .calculator-only-view > div > *:not(#calculator) {
                          display: none !important;
                        }
                        
                        .calculator-only-view nav,
                        .calculator-only-view header:not(#calculator *),
                        .calculator-only-view footer {
                          display: none !important;
                        }
                        
                        .calculator-only-view #calculator {
                          display: block !important;
                          margin: 0 !important;
                          padding: 1rem 0 !important;
                        }
                        
                        .calculator-only-view {
                          max-height: 85vh;
                          overflow-y: auto;
                          overflow-x: hidden;
                          background: transparent;
                        }
                      `}</style>
                      <CalculatorComponent />
                    </div>
                  </div>
                );
              }
              
              return null;
            })()}
          </div>
        )}
      </div>

      {/* New Tax Planning Modal */}
      {showTaxPlanningModal && !showTaxPlanningForm && (
        <div className="fixed inset-0 bg-black/10 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-4 sm:p-6 relative animate-fadeInUp max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowTaxPlanningModal(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600 z-10"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 pr-8">New Tax Planning</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-6">Choose the best tax planning strategy for you</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {[
                { 
                  name: 'Personal Tax Planning', 
                  component: 'personal', 
                  desc: 'Individual income tax optimization'
                },
                { 
                  name: 'Business Tax Strategy', 
                  component: 'business', 
                  desc: 'Business tax planning & compliance'
                }
              ].map((taxPlan) => (
                <button
                  key={taxPlan.name}
                  onClick={() => {
                    setSelectedTaxPlanningType(taxPlan.component);
                    setShowTaxPlanningForm(true);
                    setShowTaxPlanningModal(false);
                  }}
                  className="p-5 sm:p-6 bg-gradient-to-br from-gray-50 to-gray-100 hover:from-blue-50 hover:to-blue-100 border-2 border-gray-200 hover:border-blue-500 rounded-xl text-left transition-all group"
                >
                  <div className="flex flex-col">
                    <div className="font-semibold text-base sm:text-lg text-gray-800 group-hover:text-blue-700 mb-1">
                      {taxPlan.name}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500 group-hover:text-gray-600 mb-3">
                      {taxPlan.desc}
                    </div>
                    <div className="flex justify-end">
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* Tax Planning Application Form - Inline */}
      {showTaxPlanningForm && (
        <div className="mt-6">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 sm:px-6 py-4 rounded-xl mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg sm:text-xl font-bold">
                  Apply for {selectedTaxPlanningType === 'personal' ? 'Personal Tax Planning' : 'Business Tax Strategy'}
                </h3>
                <p className="text-xs sm:text-sm text-blue-100 mt-1">
                  Fill the form below to proceed with your application
                </p>
              </div>
              <button
                onClick={() => {
                  setShowTaxPlanningForm(false);
                  setSelectedTaxPlanningType('');
                }}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-all"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>

          {/* Form Container */}
          <div ref={taxPlanningFormRef} className="tax-planning-form-container">
            <style>{`
              /* HIDE EVERYTHING BY DEFAULT */
              .tax-planning-form-container * {
                display: none !important;
              }
              
              /* Show only the form and its parent containers */
              .tax-planning-form-container,
              .tax-planning-form-container > div {
                display: block !important;
              }
              
              /* Show only #apply-form or #business-contact-form */
              .tax-planning-form-container #apply-form,
              .tax-planning-form-container #business-contact-form {
                display: block !important;
                max-width: 600px !important;
                margin: 0 auto !important;
                width: 100% !important;
                background: white !important;
                border-radius: 12px !important;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1) !important;
                padding: 1.5rem !important;
              }
              
              /* Show all children of the form */
              .tax-planning-form-container #apply-form *,
              .tax-planning-form-container #business-contact-form * {
                display: revert !important;
              }
              
              /* Reset form element displays */
              .tax-planning-form-container #apply-form h3,
              .tax-planning-form-container #business-contact-form h3 {
                display: block !important;
              }
              
              .tax-planning-form-container #apply-form form,
              .tax-planning-form-container #business-contact-form form {
                display: block !important;
              }
              
              .tax-planning-form-container #apply-form input,
              .tax-planning-form-container #apply-form select,
              .tax-planning-form-container #apply-form textarea,
              .tax-planning-form-container #apply-form button,
              .tax-planning-form-container #business-contact-form input,
              .tax-planning-form-container #business-contact-form select,
              .tax-planning-form-container #business-contact-form textarea,
              .tax-planning-form-container #business-contact-form button {
                display: block !important;
                width: 100% !important;
              }
              
              .tax-planning-form-container #apply-form button[type="submit"],
              .tax-planning-form-container #business-contact-form button[type="submit"] {
                display: inline-block !important;
                width: 100% !important;
              }
            `}</style>
            {selectedTaxPlanningType === 'personal' && <Personal_tax_planning />}
            {selectedTaxPlanningType === 'business' && <Business_Tax_planning />}
          </div>
        </div>
      )}

      {/* Consultation Modal - Moved outside */}
      {showConsultation && (
        <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative animate-fadeInUp shadow-2xl">
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

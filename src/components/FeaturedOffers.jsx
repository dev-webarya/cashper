import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const FeaturedOffers = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();
  const location = useLocation();

  const handleApplyNow = (link) => {
    const [path, hash] = link.split('#');
    const currentPath = location.pathname;
    
    // If we're already on the target page, just scroll
    if (currentPath === path) {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // Navigate to the path with hash
      navigate(`${path}#${hash}`);
      
      // Wait for navigation to complete, then scroll to the form
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    }
  };
  const offers = [
    // Loans
    {
      id: 1,
      title: 'Short-Term Loan',
      subtitle: 'Quick Cash',
      description: 'Get immediate financial assistance for urgent needs with our short-term loans up to ₹5 lakhs.',
      features: ['Same day approval', 'No collateral required', 'Flexible repayment'],
      amount: 'Up to ₹2L',
      type: 'loan',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      link: '/loans/short-term#apply-form'
    },
    {
      id: 2,
      title: 'Personal Loan',
      subtitle: 'Quick Approval',
      description: 'Get instant personal loans up to ₹50 lakhs with competitive interest rates starting from 10.99% p.a.',
      features: ['Instant approval', 'No collateral required', 'Flexible tenure'],
      interestRate: '10.99%',
      amount: 'Up to ₹50L',
      type: 'loan',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      link: '/loans/personal#apply-form'
    },
    {
      id: 3,
      title: 'Home Loan',
      subtitle: 'Dream Home',
      description: 'Make your dream home a reality with our home loans starting from 8.50% p.a. with flexible EMI options.',
      features: ['Low interest rates', 'Long tenure up to 30 years', 'Quick processing'],
      interestRate: '8.50%',
      amount: 'Up to ₹5Cr',
      type: 'loan',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      link: '/loans/home#apply-form'
    },
    {
      id: 4,
      title: 'Business Loan',
      subtitle: 'Grow Your Business',
      description: 'Fuel your business growth with our business loans up to ₹2 crores with flexible repayment options.',
      features: ['Quick disbursal', 'Competitive rates', 'No prepayment penalty'],
      interestRate: '12%',
      amount: 'Up to ₹2Cr',
      type: 'loan',
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-600',
      link: '/loans/business#apply-form'
    },
    // Insurance
    {
      id: 5,
      title: 'Health Insurance',
      subtitle: 'Comprehensive Coverage',
      description: 'Protect your family with comprehensive health insurance coverage up to ₹1 crore with cashless treatment.',
      features: ['Cashless treatment', 'Pre & post hospitalization', 'No claim bonus'],
      interestRate: ' ₹500/month',
      amount: 'Up to ₹2Cr',
      rateLabel: 'Starting From',
      type: 'insurance',
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      link: '/insurance/health#apply-form'
    },
    {
      id: 6,
      title: 'Motor Insurance',
      subtitle: 'Protect Your Vehicle',
      description: 'Comprehensive motor insurance with 24/7 roadside assistance and quick claim settlement.',
      features: ['24/7 assistance', 'Quick claims', 'Zero depreciation'],
      interestRate: ' ₹5,000/year',
      amount: 'Full Coverage',
      rateLabel: 'Starting From',
      type: 'insurance',
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
      link: '/insurance/motor#apply-form'
    },
    {
      id: 7,
      title: 'Term Insurance',
      subtitle: 'Life Protection',
      description: 'Secure your family\'s future with our term life insurance plans offering high coverage at affordable premiums.',
      features: ['High coverage', 'Affordable premiums', 'Tax benefits'],
      interestRate: '₹1,000/month',
      amount: 'Up to ₹1Cr',
      rateLabel: 'Starting From',
      type: 'insurance',
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-600',
      link: '/insurance/term#apply-form'
    },
    // Investments
    {
      id: 8,
      title: 'Mutual Funds',
      subtitle: 'Professional Management',
      description: 'Invest in professionally managed mutual funds with expert guidance and diversified portfolios.',
      features: ['Expert management', 'Diversified portfolio', 'Liquidity'],
      interestRate: '12-18%',
      amount: ' ',
      rateLabel: 'Expected Returns as per Market',
      type: 'investment',
      color: 'from-teal-500 to-teal-600',
      bgColor: 'bg-teal-50',
      textColor: 'text-teal-600',
      link: '/investments/mutual-funds#apply-form'
    },
    {
      id: 9,
      title: 'SIP Investment',
      subtitle: 'Start Small, Dream Big',
      description: 'Start your investment journey with SIPs starting from just ₹500 per month and build wealth over time.',
      features: ['Start from ₹500', 'Systematic approach', 'Professional management'],
      interestRate: '12-15%',
      amount: 'Expected Returns',
      rateLabel: 'Expected Returns',
      type: 'investment',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      link: '/investments/sip#apply-form'
    },
    // Tax Planning
    {
      id: 10,
      title: 'Personal Tax Planning',
      subtitle: 'Maximize Savings',
      description: 'Optimize your tax savings with personalized tax planning strategies and investment recommendations.',
      features: ['Tax optimization', 'Investment advice', 'Compliance support'],
      interestRate: 'Save up to 30%',
      amount: 'Tax Benefits',
      rateLabel: 'Tax Benefits',
      type: 'tax',
      color: 'from-cyan-500 to-cyan-600',
      bgColor: 'bg-cyan-50',
      textColor: 'text-cyan-600',
      link: '/services/tax-planning#apply-form'
    },
    {
      id: 11,
      title: 'Business Tax Strategy',
      subtitle: 'Corporate Solutions',
      description: 'Comprehensive tax planning solutions for businesses to minimize tax liability and maximize profits.',
      features: ['Corporate tax planning', 'Compliance management', 'Audit support'],
      interestRate: 'Save up to 25%',
      amount: 'Tax Benefits',
      rateLabel: 'Tax Benefits',
      type: 'tax',
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600',
      link: '/tax-planning/business#apply-form'
    }
  ];
  const categories = [
    { id: 'all', name: 'All Products', count: offers.length },
    { id: 'loan', name: 'Loans', count: offers.filter(offer => offer.type === 'loan').length },
    { id: 'insurance', name: 'Insurance', count: offers.filter(offer => offer.type === 'insurance').length },
    { id: 'investment', name: 'Investments', count: offers.filter(offer => offer.type === 'investment').length },
    { id: 'tax', name: 'Tax Planning', count: offers.filter(offer => offer.type === 'tax').length }
  ];
  const filteredOffers = selectedCategory === 'all' 
    ? offers 
    : offers.filter(offer => offer.type === selectedCategory);
  return (
    <section id="popular-products" className="py-12 sm:py-14 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Popular Financial Products
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
            Choose from our most popular financial products with exclusive benefits, 
            competitive rates, and instant approval. Each product is designed to meet 
            your specific financial goals.
          </p>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 text-sm sm:text-base ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
                <span className={`ml-1.5 sm:ml-2 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs ${
                  selectedCategory === category.id
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {filteredOffers.map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="p-4 sm:p-5 md:p-6">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 ${offer.bgColor} rounded-lg flex items-center justify-center`}>
                    <span className="text-xl sm:text-2xl">
                      {offer.type === 'loan' ? '💰' : 
                       offer.type === 'insurance' ? '🛡️' : 
                       offer.type === 'investment' ? '📈' : 
                       offer.type === 'tax' ? '📊' : '💼'}
                    </span>
                  </div>
                  <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${offer.bgColor} ${offer.textColor}`}>
                    {offer.subtitle}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2">{offer.title}</h3>
                <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">{offer.description}</p>

                <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                  {offer.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-xs sm:text-sm text-gray-600">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-3 sm:mb-4 p-2.5 sm:p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-xs text-gray-500">
                      {offer.title === 'Short-Term Loan' 
                        ? 'Interest Rate up to 1% / day' 
                        : offer.rateLabel || 'Interest Rate'}
                    </p>
                    <p className={`font-bold text-sm sm:text-base ${offer.textColor}`}>{offer.interestRate}</p>
                  </div>
                  {offer.rateLabel !== 'Expected Returns as per Market' && (
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Amount</p>
                      <p className="font-bold text-sm sm:text-base text-gray-900">{offer.amount}</p>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleApplyNow(offer.link)}
                  className={`w-full bg-gradient-to-r ${offer.color} text-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg font-medium text-sm sm:text-base text-center block hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer`}
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedOffers;


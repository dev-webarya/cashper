import React from 'react';
import { Link } from 'react-router-dom';

const ServicesOverview = () => {
  const scrollToPopularProducts = () => {
    const element = document.getElementById('popular-products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  const services = [
    {
      category: 'Loans',
      icon: '💰',
      description: 'Flexible loan solutions for all your financial needs',
      items: [
        { name: 'Short-Term Loan', path: '/loans/short-term' },
        { name: 'Personal Loan', path: '/loans/personal' },
        { name: 'Home Loan', path: '/loans/home' },
        { name: 'Business Loan', path: '/loans/business' }
      ],
      features: ['Quick Approval', 'Competitive Rates', 'Flexible Tenure', 'No Hidden Charges'],
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      link: '/loans',
      stats: '₹5000+ Disbursed'
    },
    {
      category: 'Insurance',
      icon: '🛡️',
      description: 'Comprehensive protection for your life, health, and valuable assets — all in one plan.',
      items: [
        { name: 'Health Insurance', path: '/insurance/health' },
        { name: 'Motor Insurance', path: '/insurance/motor' },
        { name: 'Term Insurance', path: '/insurance/term' }
      ],
      features: ['Cashless Treatment', '24/7 Support', 'Quick Claims', 'Tax Benefits for clients'],
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      link: '/insurance',
      stats: '10,000+ Policies'
    },
    {
      category: 'Investments',
      icon: '📈',
      description: 'Build wealth with expert investment guidance',
      items: [
        { name: 'Mutual Funds', path: '/investments/mutual-funds' },
        { name: 'SIP', path: '/investments/sip' }
      ],
      features: ['Expert Management', 'Diversified Portfolio', 'Systematic Approach', 'High Returns'],
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      link: '/investments',
      stats: '12-18% Returns'
    },
    {
      category: 'Tax Planning',
      icon: '📊',
      description: 'Optimize your tax savings and ensure compliance',
      items: [
        { name: 'Personal Tax Planning', path: '/tax-planning/personal' },
        { name: 'Business Tax Strategy', path: '/tax-planning/business' }
      ],
      features: ['Tax Optimization', 'Compliance Support', 'Audit Assistance', 'Maximize Savings'],
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      link: '/tax',
      stats: 'Save up to 30%'
    }
  ];

  return (
    <section id="services" className="py-12 sm:py-14 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Our Financial Services
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Comprehensive financial solutions tailored to meet your personal and business needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
            >
              {/* Compact Header with Icon and Stats */}
              <div className="relative p-4 sm:p-5 pb-3">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 ${service.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-3xl sm:text-4xl">{service.icon}</span>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm sm:text-base font-bold ${service.textColor}`}>
                      {service.stats}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-500">Achievement</div>
                  </div>
                </div>
                
                <h3 className={`text-2xl sm:text-3xl font-bold ${service.textColor} mb-2`}>
                  {service.category}
                </h3>
                
                <p className="text-gray-600 text-sm sm:text-base mb-3 leading-relaxed line-clamp-2">
                  {service.description}
                </p>
              </div>

              {/* Service Items - Compact */}
              <div className="px-4 sm:px-5 pb-3">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Available Services:</h4>
                <ul className="space-y-1.5 sm:space-y-2 mb-3">
                  {service.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-gray-600 text-sm sm:text-base flex items-center">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <Link to={item.path} className="hover:text-blue-600 hover:underline transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Features - Compact */}
              <div className="px-4 sm:px-5 pb-3">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Key Features:</h4>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {service.features.map((feature, featureIndex) => (
                    <span key={featureIndex} className="px-2 sm:px-3 py-1 sm:py-1.5 bg-gray-100 text-gray-700 text-xs sm:text-sm rounded-full">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Button - Compact */}
              <div className="px-4 sm:px-5 pb-6 sm:pb-8 text-center">
                <button
                  onClick={scrollToPopularProducts}
                  className={`inline-block w-full sm:w-auto bg-gradient-to-r ${service.color} text-white py-2.5 sm:py-3 px-6 sm:px-12 rounded-xl font-medium text-base sm:text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer`}
                >
                  Explore {service.category}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [hoveredDropdown, setHoveredDropdown] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleApplyNow = () => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById('popular-products');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      const element = document.getElementById('popular-products');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setIsMenuOpen(false);
  };

  const handleLogin = () => {
    // Add your login navigation or modal logic here
    navigate('/login');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = (dropdownName) =>
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);

  const handleMouseEnter = (dropdownName) => setHoveredDropdown(dropdownName);
  const handleMouseLeave = () => setHoveredDropdown(null);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  const isCurrentPage = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    {
      name: 'Loans',
      dropdown: [
        { name: 'Short-Term Loan', path: '/loans/short-term' },
        { name: 'Personal Loan', path: '/loans/personal' },
        { name: 'Home Loan', path: '/loans/home' },
        { name: 'Business Loan', path: '/loans/business' },
      ],
    },
    {
      name: 'Insurance',
      dropdown: [
        { name: 'Health Insurance', path: '/insurance/health' },
        { name: 'Motor Insurance', path: '/insurance/motor' },
        { name: 'Term Insurance', path: '/insurance/term' },
      ],
    },
    {
      name: 'Investments',
      dropdown: [
        { name: 'Mutual Funds', path: '/investments/mutual-funds' },
        { name: 'SIP', path: '/investments/sip' },
      ],
    },
    {
      name: 'Tax Planning',
      dropdown: [
        { name: 'Personal Tax Planning', path: '/services/tax-planning' },
        { name: 'Business Tax Strategy', path: '/tax-planning/business' },
      ],
    },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <nav className="shadow-xl border-b-2 border-blue-100 py-2 sm:py-3 fixed w-full top-0 z-50 bg-white">
      <div className="mx-auto px-3 sm:px-4 md:px-8 lg:px-10">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center group flex-shrink-0">
            <img
              src="/logo_company.png"
              alt="Cashper Logo"
              className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto group-hover:scale-105 transition-all duration-300"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navItems.map((item, index) => (
              <div
                key={index}
                className="relative dropdown-container"
                onMouseEnter={() => item.dropdown && handleMouseEnter(item.name)}
                onMouseLeave={handleMouseLeave}
              >
                {item.dropdown ? (
                  <div className="relative">
                    <button
                      className={`px-3 py-2 xl:px-5 xl:py-3 text-sm xl:text-base text-gray-700 hover:text-blue-600 font-semibold transition-all duration-300 rounded-lg hover:bg-gradient-to-r hover:from-green-500 hover:to-indigo-100 relative group flex items-center gap-1 ${
                        hoveredDropdown === item.name
                          ? 'text-blue-600 bg-gradient-to-r from-blue-50 to-indigo-50'
                          : ''
                      }`}
                      aria-expanded={hoveredDropdown === item.name}
                      aria-haspopup="true"
                      aria-label={`${item.name} dropdown menu`}
                    >
                      {item.name}
                      <svg
                        className={`w-4 h-4 transition-transform duration-300 ${
                          hoveredDropdown === item.name ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                    </button>

                    {/* Desktop Dropdown Menu */}
                    <div
                      className={`absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 transition-all duration-300 ease-in-out transform ${
                        hoveredDropdown === item.name
                          ? 'opacity-100 visible translate-y-0 scale-100'
                          : 'opacity-0 invisible -translate-y-2 scale-95'
                      }`}
                      role="menu"
                      aria-orientation="vertical"
                    >
                      <div className="py-3">
                        {item.dropdown.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            to={subItem.path}
                            className="block px-6 py-3 text-gray-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200 font-medium group/item"
                            role="menuitem"
                          >
                            <span className="flex items-center">
                              <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200"></span>
                              {subItem.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`px-3 py-2 xl:px-5 xl:py-3 text-sm xl:text-base text-gray-700 hover:text-blue-600 font-semibold transition-all duration-300 rounded-lg hover:bg-gradient-to-r hover:from-green-500 hover:to-indigo-100 relative group ${
                      isCurrentPage(item.path)
                        ? 'text-blue-600 bg-gradient-to-r from-blue-50 to-indigo-50'
                        : ''
                    }`}
                  >
                    {item.name}
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-2 flex-shrink-0">
            <button
              onClick={handleApplyNow}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-4 py-2 xl:px-5 xl:py-2.5 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm xl:text-base cursor-pointer whitespace-nowrap"
            >
              Apply Now
            </button>
            <button
              onClick={handleLogin}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-4 py-2 xl:px-5 xl:py-2.5 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm xl:text-base cursor-pointer whitespace-nowrap"
            >
              Login
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex-shrink-0">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 focus:outline-none p-2 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300"
              aria-expanded={isMenuOpen}
              aria-label="Toggle mobile menu"
            >
              <svg
                className="h-6 w-6 sm:h-7 sm:w-7 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile & Tablet Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t-2 border-blue-100 shadow-2xl max-h-[calc(100vh-80px)] overflow-y-auto animate-slideDown">
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navItems.map((item, index) => (
                <div key={index}>
                  {item.dropdown ? (
                    <div>
                      {/* Dropdown Toggle Button */}
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className={`w-full flex items-center justify-between px-4 py-3 text-base sm:text-lg text-gray-700 hover:text-blue-600 font-semibold rounded-xl transition-all duration-300 ${
                          activeDropdown === item.name
                            ? 'text-blue-600 bg-gradient-to-r from-blue-50 to-indigo-50'
                            : 'hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50'
                        }`}
                        aria-expanded={activeDropdown === item.name}
                        aria-label={`${item.name} dropdown menu`}
                      >
                        <span>{item.name}</span>
                        <svg
                          className={`w-5 h-5 transition-transform duration-300 ${
                            activeDropdown === item.name ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                      
                      {/* Dropdown Sub-Items */}
                      {activeDropdown === item.name && (
                        <div className="pl-4 space-y-1 mt-2 animate-slideDown">
                          {item.dropdown.map((subItem, subIndex) => (
                            <Link
                              key={subIndex}
                              to={subItem.path}
                              onClick={() => {
                                setIsMenuOpen(false);
                                setActiveDropdown(null);
                              }}
                              className="flex items-center px-4 py-3 text-base sm:text-lg text-gray-600 hover:text-blue-600 font-medium rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200"
                            >
                              <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      onClick={() => {
                        setIsMenuOpen(false);
                        setActiveDropdown(null);
                      }}
                      className={`block px-4 py-3 text-base sm:text-lg font-semibold rounded-xl transition-all duration-300 text-gray-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-green-500 hover:to-indigo-100 ${
                        isCurrentPage(item.path)
                          ? 'text-blue-600 bg-gradient-to-r from-blue-50 to-indigo-50'
                          : ''
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              
              {/* Mobile CTA Buttons */}
              <div className="pt-6 space-y-3 border-t-2 border-gray-100 mt-4">
                <button
                  onClick={handleApplyNow}
                  className="block w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3.5 rounded-xl font-bold transition-all duration-300 text-center shadow-lg text-base sm:text-lg cursor-pointer transform active:scale-95"
                >
                  Apply Now
                </button>
                <button
                  onClick={handleLogin}
                  className="block w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3.5 rounded-xl font-bold transition-all duration-300 text-center shadow-lg text-base sm:text-lg cursor-pointer transform active:scale-95"
                >
                  Login
                </button>,
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
export default Navbar;

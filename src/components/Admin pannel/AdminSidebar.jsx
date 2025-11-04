import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Users, IndianRupee, Shield, TrendingUp, BarChart3, Settings as SettingsIcon, ArrowLeft } from 'lucide-react';

const AdminSidebar = ({ isOpen, activeView, setActiveView, toggleSidebar }) => {
  const menuItems = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />
    },
    {
      id: 'users',
      name: 'User Management',
      icon: <Users className="w-5 h-5" />
    },
    {
      id: 'loans',
      name: 'Loan Management',
      icon: <IndianRupee className="w-5 h-5" />
    },
    {
      id: 'insurance',
      name: 'Insurance',
      icon: <Shield className="w-5 h-5" />
    },
    {
      id: 'investments',
      name: 'Investments',
      icon: <TrendingUp className="w-5 h-5" />
    },
    {
      id: 'reports',
      name: 'Reports & Analytics',
      icon: <BarChart3 className="w-5 h-5" />
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: <SettingsIcon className="w-5 h-5" />
    }
  ];

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-14 xs:top-16 sm:top-16 bottom-0 left-0 z-50 w-64 xs:w-72 sm:w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out shadow-lg lg:shadow-none lg:h-[calc(100vh-64px)] ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Close Button */}
          <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">Admin Menu</h2>
            <button
              onClick={toggleSidebar}
              className="p-2 text-gray-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
              aria-label="Close sidebar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-4 px-3 xs:px-4 overflow-y-auto">
            <ul className="space-y-1 xs:space-y-1.5">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveView(item.id);
                      if (window.innerWidth < 1024) {
                        toggleSidebar();
                      }
                    }}
                    className={`w-full flex items-center space-x-3 px-3 xs:px-4 py-2.5 xs:py-3 rounded-lg transition-all duration-200 group ${
                      activeView === item.id
                        ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-md'
                        : 'text-gray-700 hover:bg-green-50 hover:text-green-700'
                    }`}
                  >
                    <span className={`transition-transform duration-200 ${
                      activeView === item.id ? 'scale-110' : 'group-hover:scale-110'
                    }`}>
                      {item.icon}
                    </span>
                    <span className="font-medium text-sm xs:text-base">{item.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Bottom Section */}
          <div className="p-3 xs:p-4 border-t border-gray-200 mt-auto">
            <Link
              to="/"
              className="flex items-center justify-center space-x-2 px-4 py-2.5 xs:py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <ArrowLeft className="w-4 h-4 xs:w-5 xs:h-5" />
              <span className="font-semibold text-sm xs:text-base">Back to Home</span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;

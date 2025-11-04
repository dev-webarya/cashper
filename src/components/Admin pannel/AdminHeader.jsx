import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, Search, User, LogOut, Settings as SettingsIcon, HelpCircle, Menu } from 'lucide-react';

const AdminHeader = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const notifications = [
    { id: 1, type: 'loan', message: '5 new loan applications pending review', time: '5 min ago', unread: true },
    { id: 2, type: 'user', message: '12 new users registered today', time: '1 hour ago', unread: true },
    { id: 3, type: 'insurance', message: '3 insurance claims require approval', time: '2 hours ago', unread: false },
    { id: 4, type: 'alert', message: 'System backup completed successfully', time: '3 hours ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleLogout = () => {
    // Add your logout logic here
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200">
      <div className="w-full px-3 xs:px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 xs:h-16 sm:h-16">
          {/* Left Section: Logo & Menu Button */}
          <div className="flex items-center space-x-3 xs:space-x-4">
            {/* Mobile Menu Button */}
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 text-gray-600 hover:text-green-700 hover:bg-green-50 rounded-lg focus:outline-none transition-colors"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-5 h-5 xs:w-6 xs:h-6" />
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <img 
                src="/logo_company.png" 
                alt=" Cashper Logo" 
                className="h-8 xs:h-10 sm:h-12 w-auto group-hover:scale-105 transition-transform duration-300"
              />
            </Link>

            {/* Admin Badge */}
            <div className="hidden md:flex items-center ml-4">
              <span className="px-3 py-1 bg-gradient-to-r from-green-600 to-green-700 text-white text-xs font-bold rounded-full">
                ADMIN PANEL
              </span>
            </div>
          </div>

          {/* Right Section: Search, Notifications, User */}
          <div className="flex items-center space-x-1 xs:space-x-2 sm:space-x-3">
            {/* Search Bar - Hidden on small mobile */}
            <div className="hidden sm:flex items-center bg-gray-100 rounded-lg px-3 py-1.5 sm:py-2 max-w-xs lg:max-w-sm">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="ml-2 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400 w-20 sm:w-32 lg:w-48"
              />
            </div>

            {/* Search Icon for Mobile */}
            <button className="sm:hidden p-2 text-gray-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors">
              <Search className="w-5 h-5" />
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5 xs:w-6 xs:h-6" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <>
                  <div 
                    className="fixed inset-0 z-30" 
                    onClick={() => setShowNotifications(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-72 xs:w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-40">
                    <div className="bg-gradient-to-r from-green-600 to-green-700 px-4 py-3 rounded-t-xl">
                      <div className="flex items-center justify-between">
                        <h3 className="text-white font-semibold text-sm xs:text-base">Notifications</h3>
                        <span className="text-xs bg-white/20 px-2 py-1 rounded-full text-white">{unreadCount} new</span>
                      </div>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${
                            notification.unread ? 'bg-green-50' : ''
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${notification.unread ? 'bg-green-600' : 'bg-gray-300'}`} />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs xs:text-sm text-gray-800 font-medium">{notification.message}</p>
                              <p className="text-[10px] xs:text-xs text-gray-500 mt-1">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-center border-t rounded-b-xl">
                      <button className="text-xs xs:text-sm text-green-700 hover:text-green-800 font-semibold">
                        View All Notifications
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-1 xs:space-x-2 p-1 hover:bg-green-50 rounded-lg transition-colors"
                aria-label="User menu"
              >
                <div className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center text-white font-semibold text-sm xs:text-base shadow-lg">
                  AD
                </div>
                <svg className="hidden sm:block w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* User Dropdown */}
              {showUserMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-30" 
                    onClick={() => setShowUserMenu(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-200 z-40">
                    <div className="bg-gradient-to-r from-green-600 to-green-700 px-4 py-3 rounded-t-xl">
                      <p className="text-white font-semibold text-sm">Admin User</p>
                      <p className="text-xs text-green-100">sudha@gmail.com</p>
                    </div>
                    <div className="py-2">
                      <button className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors">
                        <User className="w-4 h-4" />
                        <span>My Profile</span>
                      </button>
                      <button className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors">
                        <SettingsIcon className="w-4 h-4" />
                        <span>Settings</span>
                      </button>
                      <button className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors">
                        <HelpCircle className="w-4 h-4" />
                        <span>Help & Support</span>
                      </button>
                    </div>
                    <div className="py-2 border-t border-gray-200">
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, Search, User, LogOut, Settings as SettingsIcon, HelpCircle, Menu, X, Edit, Lock, UserCircle } from 'lucide-react';

const DashboardHeader = ({ toggleSidebar, setActiveView, userData }) => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const handleProfileClick = () => {
    setActiveView('profile');
    setShowUserMenu(false);
  };

  const handleEditProfileClick = () => {
    setActiveView('profile');
    setShowUserMenu(false);
    // Trigger edit mode in profile
    setTimeout(() => {
      const editButton = document.querySelector('[data-edit-profile]');
      if (editButton) editButton.click();
    }, 100);
  };

  const handleChangePasswordClick = () => {
    setShowUserMenu(false);
    setShowPasswordModal(true);
  };

  const notifications = [
    { id: 1, title: 'Loan Approved', message: 'Your personal loan has been approved', time: '2 hours ago', unread: true },
    { id: 2, title: 'Insurance Renewal', message: 'Your health insurance is due for renewal', time: '1 day ago', unread: true },
    { id: 3, title: 'Investment Update', message: 'Your mutual fund portfolio has grown by 5%', time: '2 days ago', unread: false },
  ];

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

            {/* Welcome Message - Hidden on mobile */}
            <div className="hidden md:block ml-4">
              <h1 className="text-base lg:text-lg font-bold text-gray-900">
                Welcome back, <span className="text-green-700">{userData?.name || 'User'}</span>
              </h1>
              <p className="text-xs text-gray-500">Manage your finances</p>
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
                {notifications.some(n => n.unread) && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <>
                  <div 
                    className="fixed inset-0 z-30" 
                    onClick={() => setShowNotifications(false)}
                  ></div>
                  <div className="absolute right-0 mt-2 w-72 xs:w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-40">
                    <div className="p-3 xs:p-4 border-b border-gray-200">
                      <h3 className="text-sm xs:text-base font-semibold text-gray-900">Notifications</h3>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-3 xs:p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${
                            notification.unread ? 'bg-green-50' : ''
                          }`}
                        >
                          <div className="flex items-start">
                            <div className="flex-1">
                              <p className="text-xs xs:text-sm font-semibold text-gray-900">{notification.title}</p>
                              <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                              <p className="text-[10px] xs:text-xs text-gray-400 mt-1">{notification.time}</p>
                            </div>
                            {notification.unread && (
                              <span className="w-2 h-2 bg-green-600 rounded-full mt-1"></span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 text-center border-t border-gray-200">
                      <button className="text-xs xs:text-sm text-green-700 hover:text-green-800 font-medium">
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
                <div className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center text-white font-semibold text-sm xs:text-base">
                  {userData?.initials || 'U'}
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
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 z-40">
                    <div className="p-4 border-b border-gray-200">
                      <p className="text-sm font-semibold text-gray-900">{userData?.name || 'User'}</p>
                      <p className="text-xs text-gray-500">{userData?.email || 'user@example.com'}</p>
                    </div>
                    <div className="py-2">
                      <button 
                        onClick={handleProfileClick}
                        className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-green-100 transition-colors">
                          <UserCircle className="w-4 h-4 text-blue-600 group-hover:text-green-600" />
                        </div>
                        <span className="font-medium">My Profile</span>
                      </button>
                      
                      <button 
                        onClick={handleEditProfileClick}
                        className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center group-hover:bg-green-100 transition-colors">
                          <Edit className="w-4 h-4 text-purple-600 group-hover:text-green-600" />
                        </div>
                        <span className="font-medium">Edit Profile</span>
                      </button>
                      
                      <button 
                        onClick={handleChangePasswordClick}
                        className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center group-hover:bg-green-100 transition-colors">
                          <Lock className="w-4 h-4 text-orange-600 group-hover:text-green-600" />
                        </div>
                        <span className="font-medium">Change Password</span>
                      </button>
                    </div>
                    <div className="py-2 border-t border-gray-200">
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center group-hover:bg-red-200 transition-colors">
                          <LogOut className="w-4 h-4 text-red-600" />
                        </div>
                        <span className="font-semibold">Logout</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative animate-fadeInUp">
            <button
              onClick={() => setShowPasswordModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">Change Password</h3>
                <p className="text-xs text-gray-500">Update your account password</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Current Password</label>
                <input
                  type="password"
                  placeholder="Enter current password"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-green-500 focus:outline-none transition-all"
                />
              </div>
              
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">New Password</label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-green-500 focus:outline-none transition-all"
                />
                <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters</p>
              </div>
              
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Confirm New Password</label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-green-500 focus:outline-none transition-all"
                />
              </div>

              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-xs text-blue-800">
                  <strong>Password Tips:</strong> Use a mix of letters, numbers, and symbols for better security.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => setShowPasswordModal(false)}
                className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  alert('✅ Password changed successfully!\n\nYou will be logged out and need to log in again with your new password.');
                  setShowPasswordModal(false);
                  // Optionally logout user
                  // navigate('/login');
                }}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default DashboardHeader;

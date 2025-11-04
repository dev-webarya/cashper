import React, { useState } from 'react';
import { Bell, Check, Trash2, Filter, Search, CheckCheck } from 'lucide-react';

const AllNotifications = () => {
  const [filter, setFilter] = useState('all'); // all, unread, read
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([
    { 
      id: 1, 
      title: 'Loan Approved', 
      message: 'Your personal loan has been approved. The amount will be credited to your account within 24 hours.', 
      time: '2 hours ago', 
      unread: true,
      type: 'loan',
      date: '2025-11-03'
    },
    { 
      id: 2, 
      title: 'Insurance Renewal', 
      message: 'Your health insurance is due for renewal on November 15, 2025. Click to renew now.', 
      time: '1 day ago', 
      unread: true,
      type: 'insurance',
      date: '2025-11-02'
    },
    { 
      id: 3, 
      title: 'Investment Update', 
      message: 'Your mutual fund portfolio has grown by 5%. Current value: ₹2,50,000.', 
      time: '2 days ago', 
      unread: false,
      type: 'investment',
      date: '2025-11-01'
    },
    { 
      id: 4, 
      title: 'Tax Planning Reminder', 
      message: 'Time to optimize your tax savings for this financial year. Book a consultation with our experts.', 
      time: '3 days ago', 
      unread: false,
      type: 'tax',
      date: '2025-10-31'
    },
    { 
      id: 5, 
      title: 'New Offer Available', 
      message: 'Special interest rate on home loans - Starting from 8.5% p.a. Limited time offer!', 
      time: '4 days ago', 
      unread: true,
      type: 'offer',
      date: '2025-10-30'
    },
    { 
      id: 6, 
      title: 'Payment Reminder', 
      message: 'Your car loan EMI of ₹15,000 is due on November 5, 2025.', 
      time: '5 days ago', 
      unread: false,
      type: 'payment',
      date: '2025-10-29'
    },
    { 
      id: 7, 
      title: 'Document Verification', 
      message: 'Your KYC documents have been successfully verified. You can now apply for all services.', 
      time: '1 week ago', 
      unread: false,
      type: 'verification',
      date: '2025-10-27'
    },
    { 
      id: 8, 
      title: 'SIP Installment Success', 
      message: 'Your monthly SIP of ₹5,000 has been successfully processed for November 2025.', 
      time: '1 week ago', 
      unread: false,
      type: 'investment',
      date: '2025-10-27'
    },
  ]);

  const getTypeColor = (type) => {
    const colors = {
      loan: 'bg-blue-100 text-blue-800',
      insurance: 'bg-green-100 text-green-800',
      investment: 'bg-purple-100 text-purple-800',
      tax: 'bg-orange-100 text-orange-800',
      offer: 'bg-pink-100 text-pink-800',
      payment: 'bg-yellow-100 text-yellow-800',
      verification: 'bg-teal-100 text-teal-800',
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, unread: false } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, unread: false })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const filteredNotifications = notifications.filter(notif => {
    // Filter by read/unread status
    if (filter === 'unread' && !notif.unread) return false;
    if (filter === 'read' && notif.unread) return false;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        notif.title.toLowerCase().includes(query) ||
        notif.message.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Bell className="w-6 h-6 text-green-700" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">All Notifications</h1>
                <p className="text-sm text-gray-500 mt-1">
                  {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center space-x-2 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors text-sm font-medium"
              >
                <CheckCheck className="w-4 h-4" />
                <span>Mark All as Read</span>
              </button>
            )}
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search notifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm"
                />
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'all'
                    ? 'bg-green-700 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'unread'
                    ? 'bg-green-700 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Unread
              </button>
              <button
                onClick={() => setFilter('read')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'read'
                    ? 'bg-green-700 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Read
              </button>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No notifications found</h3>
              <p className="text-gray-500">
                {searchQuery
                  ? 'Try adjusting your search query'
                  : filter === 'unread'
                  ? "You're all caught up!"
                  : 'No notifications to display'}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 transition-all hover:shadow-md ${
                  notification.unread ? 'border-l-4 border-l-green-600' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                        {notification.title}
                      </h3>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getTypeColor(notification.type)}`}>
                        {notification.type}
                      </span>
                      {notification.unread && (
                        <span className="w-2.5 h-2.5 bg-green-600 rounded-full"></span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                      {notification.message}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-gray-400">
                      <span>{notification.time}</span>
                      <span>•</span>
                      <span>{notification.date}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    {notification.unread && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Mark as read"
                      >
                        <Check className="w-5 h-5" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete notification"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Show count */}
        {filteredNotifications.length > 0 && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Showing {filteredNotifications.length} of {notifications.length} notifications
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllNotifications;

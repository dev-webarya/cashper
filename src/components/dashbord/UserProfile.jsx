import React, { useState, useEffect } from 'react';
import { X, Upload, Check, AlertCircle, Lock, Shield, Trash2, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserProfile = ({ userData, setUserData }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const [userInfo, setUserInfo] = useState({
    name: userData?.name || 'Sudha',
    email: userData?.email || 'john.doe@example.com',
    phone: '+91 98765 43210',
    address: 'B-3011, Gaur Siddhartham, Ghaziabad, UP - 201009',
    panCard: 'ABCDE1234F',
    aadhar: 'XXXX-XXXX-5678',
    dateOfBirth: '15-Jan-1990',
    occupation: 'Software Engineer',
    annualIncome: '₹12,00,000'
  });

  useEffect(() => {
    // Load user profile from localStorage or API
    const storedProfile = localStorage.getItem('userProfile');
    const storedUser = localStorage.getItem('user');
    
    if (storedProfile) {
      const profile = JSON.parse(storedProfile);
      // Update with latest userData if available
      if (userData?.email) {
        profile.email = userData.email;
      }
      if (userData?.name) {
        profile.name = userData.name;
      }
      setUserInfo(profile);
    } else if (userData) {
      // If no stored profile but userData exists, use it
      setUserInfo(prev => ({
        ...prev,
        name: userData.name,
        email: userData.email
      }));
    }
  }, [userData]);

  const handleSaveChanges = () => {
    // Save to localStorage
    localStorage.setItem('userProfile', JSON.stringify(userInfo));
    
    // Update parent userData
    const updatedUser = {
      name: userInfo.name,
      email: userInfo.email,
      initials: getInitials(userInfo.name)
    };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUserData(updatedUser);
    
    setIsEditing(false);
    alert('✅ Profile updated successfully!');
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const handleInputChange = (field, value) => {
    setUserInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleDeleteProfile = () => {
    if (confirm('⚠️ Are you absolutely sure?\n\nThis will permanently delete your profile and all data. This action CANNOT be undone.')) {
      // Clear all user data
      localStorage.removeItem('user');
      localStorage.removeItem('userProfile');
      localStorage.removeItem('authToken');
      
      alert('Your profile has been deleted. You will be redirected to the login page.');
      navigate('/login');
    }
  };

  const documents = [
    { id: 1, name: 'PAN Card', type: 'Identity', status: 'verified', uploadDate: 'Jan 10, 2024' },
    { id: 2, name: 'Aadhar Card', type: 'Identity', status: 'verified', uploadDate: 'Jan 10, 2024' },
    { id: 3, name: 'Income Proof', type: 'Financial', status: 'verified', uploadDate: 'Feb 15, 2024' },
    { id: 4, name: 'Bank Statement', type: 'Financial', status: 'pending', uploadDate: 'Dec 20, 2024' }
  ];

  const activities = [
    { id: 1, action: 'Applied for Personal Loan', date: 'Dec 28, 2024', time: '10:30 AM' },
    { id: 2, action: 'Updated Profile Information', date: 'Dec 25, 2024', time: '03:15 PM' },
    { id: 3, action: 'Uploaded Bank Statement', date: 'Dec 20, 2024', time: '11:45 AM' },
    { id: 4, action: 'Made SIP Investment', date: 'Dec 15, 2024', time: '09:20 AM' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">My Profile</h1>
          <p className="text-gray-600 mt-1">Manage your personal information and documents</p>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <button
                onClick={() => {
                  setIsEditing(false);
                  // Reset to original values
                  const storedProfile = localStorage.getItem('userProfile');
                  if (storedProfile) {
                    setUserInfo(JSON.parse(storedProfile));
                  }
                }}
                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                Save Changes
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              data-edit-profile
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              <Edit className="w-4 h-4" />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Cover Image */}
        <div className="h-32 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 relative">
          {isEditing && (
            <button className="absolute bottom-4 right-4 px-3 py-1.5 bg-white/90 hover:bg-white text-gray-700 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all">
              <Upload className="w-3 h-3" />
              Change Cover
            </button>
          )}
        </div>
        
        {/* Profile Info */}
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 -mt-16 mb-6">
            <div className="w-32 h-32 bg-gradient-to-br from-green-600 via-green-700 to-green-800 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-xl border-4 border-white relative group">
              {getInitials(userInfo.name)}
              {isEditing && (
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Upload className="w-6 h-6 text-white" />
                </div>
              )}
            </div>
            <div className="text-center sm:text-left flex-1">
              <h2 className="text-2xl font-bold text-gray-800">{userInfo.name}</h2>
              <p className="text-gray-600">{userInfo.occupation}</p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-2">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  Verified Account
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                  Premium Member
                </span>
              </div>
            </div>
          </div>

          {/* Personal Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500 mb-1 block">Email Address</label>
                <input
                  type="email"
                  value={userInfo.email}
                  disabled
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-gray-50 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  Email cannot be changed (Login Email)
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-500 mb-1 block">Phone Number</label>
                <input
                  type="tel"
                  value={userInfo.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-lg border-2 ${isEditing ? 'border-gray-300 focus:border-green-500' : 'border-gray-200 bg-gray-50'} focus:ring-2 focus:ring-green-200 transition-all disabled:bg-gray-50`}
                />
              </div>
              <div>
                <label className="text-sm text-gray-500 mb-1 block">Date of Birth</label>
                <input
                  type="text"
                  value={userInfo.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-lg border-2 ${isEditing ? 'border-gray-300 focus:border-green-500' : 'border-gray-200 bg-gray-50'} focus:ring-2 focus:ring-green-200 transition-all disabled:bg-gray-50`}
                />
              </div>
              <div>
                <label className="text-sm text-gray-500 mb-1 block">Occupation</label>
                <input
                  type="text"
                  value={userInfo.occupation}
                  onChange={(e) => handleInputChange('occupation', e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-lg border-2 ${isEditing ? 'border-gray-300 focus:border-green-500' : 'border-gray-200 bg-gray-50'} focus:ring-2 focus:ring-green-200 transition-all disabled:bg-gray-50`}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500 mb-1 block">Address</label>
                <textarea
                  value={userInfo.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  disabled={!isEditing}
                  rows="3"
                  className={`w-full px-4 py-3 rounded-lg border-2 ${isEditing ? 'border-gray-300 focus:border-green-500' : 'border-gray-200 bg-gray-50'} focus:ring-2 focus:ring-green-200 transition-all disabled:bg-gray-50`}
                />
              </div>
              <div>
                <label className="text-sm text-gray-500 mb-1 block">PAN Card</label>
                <input
                  type="text"
                  value={userInfo.panCard}
                  onChange={(e) => handleInputChange('panCard', e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-lg border-2 ${isEditing ? 'border-gray-300 focus:border-green-500' : 'border-gray-200 bg-gray-50'} focus:ring-2 focus:ring-green-200 transition-all disabled:bg-gray-50`}
                />
              </div>
              <div>
                <label className="text-sm text-gray-500 mb-1 block">Aadhar Number</label>
                <input
                  type="text"
                  value={userInfo.aadhar}
                  onChange={(e) => handleInputChange('aadhar', e.target.value)}
                  disabled
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-gray-50"
                />
                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  Aadhar cannot be changed for security reasons
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-500 mb-1 block">Annual Income</label>
                <input
                  type="text"
                  value={userInfo.annualIncome}
                  onChange={(e) => handleInputChange('annualIncome', e.target.value)}
                  disabled={!isEditing}
                  className={`w-full px-4 py-3 rounded-lg border-2 ${isEditing ? 'border-gray-300 focus:border-green-500' : 'border-gray-200 bg-gray-50'} focus:ring-2 focus:ring-green-200 transition-all disabled:bg-gray-50`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Documents Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Documents</h2>
          <button 
            onClick={() => setShowUploadModal(true)}
            className="bg-gradient-to-r from-green-600 via-green-700 to-green-800 hover:from-green-700 hover:to-green-800 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            Upload New
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{doc.name}</p>
                  <p className="text-xs text-gray-500">{doc.type} • {doc.uploadDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  doc.status === 'verified' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {doc.status === 'verified' ? 'Verified' : 'Pending'}
                </span>
                <button 
                  onClick={() => alert(`Viewing ${doc.name}\n\nDocument Type: ${doc.type}\nStatus: ${doc.status}\nUploaded: ${doc.uploadDate}`)}
                  className="opacity-0 group-hover:opacity-100 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold hover:bg-blue-200 transition-all"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800">{activity.action}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.date} at {activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Security Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
            <div>
              <p className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Change Password
              </p>
              <p className="text-xs text-gray-500 mt-1">Last changed 3 months ago</p>
            </div>
            <button 
              onClick={() => setShowPasswordModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg text-sm font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-md"
            >
              Update
            </button>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
            <div>
              <p className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Two-Factor Authentication
              </p>
              <p className="text-xs text-gray-500 mt-1">Add an extra layer of security</p>
            </div>
            <button
              onClick={() => setShow2FAModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-green-600 via-green-700 to-green-800 text-white rounded-lg text-sm font-semibold hover:from-green-700 hover:to-green-800 transition-all shadow-md"
            >
              Enable
            </button>
          </div>
        </div>
      </div>

      {/* Delete Profile Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-red-200">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <Trash2 className="w-5 h-5 text-red-600" />
          Danger Zone
        </h2>
        <div className="bg-red-50 rounded-lg p-4 border border-red-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-800 mb-1">Delete Your Profile</p>
              <p className="text-xs text-gray-600">
                Once you delete your profile, there is no going back. All your data, documents, and history will be permanently deleted.
              </p>
            </div>
            <button 
              onClick={() => setShowDeleteModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg text-sm font-semibold transition-all shadow-md hover:shadow-lg flex items-center gap-2 whitespace-nowrap"
            >
              <Trash2 className="w-4 h-4" />
              Delete Profile
            </button>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative animate-fadeInUp">
            <button
              onClick={() => setShowPasswordModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Change Password</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Current Password</label>
                <input
                  type="password"
                  placeholder="Enter current password"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">New Password</label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Confirm New Password</label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
            
            <button 
              onClick={() => {
                alert('Password changed successfully!');
                setShowPasswordModal(false);
              }}
              className="w-full mt-6 bg-gradient-to-r from-green-600 via-green-700 to-green-800 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Update Password
            </button>
          </div>
        </div>
      )}

      {/* 2FA Modal */}
      {show2FAModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative animate-fadeInUp">
            <button
              onClick={() => setShow2FAModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Enable Two-Factor Authentication</h3>
            <p className="text-gray-600 mb-6">Add an extra layer of security to your account</p>
            
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-900 mb-2">How it works:</p>
                <ul className="text-xs text-blue-700 space-y-1 list-disc list-inside">
                  <li>Download an authenticator app (Google Authenticator, Authy)</li>
                  <li>Scan the QR code or enter the key manually</li>
                  <li>Enter the 6-digit code to verify</li>
                </ul>
              </div>
              
              <div className="bg-gray-100 rounded-lg p-6 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-48 h-48 bg-white rounded-lg flex items-center justify-center mb-3">
                    <p className="text-gray-400 text-sm">QR Code Here</p>
                  </div>
                  <p className="text-xs text-gray-600 font-mono">ABCD-EFGH-IJKL-MNOP</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Verification Code</label>
                <input
                  type="text"
                  placeholder="Enter 6-digit code"
                  maxLength="6"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-green-500 focus:outline-none text-center text-2xl font-mono"
                />
              </div>
            </div>
            
            <button 
              onClick={() => {
                alert('Two-Factor Authentication enabled successfully!');
                setShow2FAModal(false);
              }}
              className="w-full mt-6 bg-gradient-to-r from-green-600 via-green-700 to-green-800 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Enable 2FA
            </button>
          </div>
        </div>
      )}

      {/* Upload Document Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative animate-fadeInUp">
            <button
              onClick={() => setShowUploadModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Upload Document</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Document Type</label>
                <select className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-green-500 focus:outline-none">
                  <option>Select document type</option>
                  <option>PAN Card</option>
                  <option>Aadhar Card</option>
                  <option>Income Proof</option>
                  <option>Bank Statement</option>
                  <option>Address Proof</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">Upload File</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-500 transition-all cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG (Max 5MB)</p>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => {
                alert('Document uploaded successfully!\n\nYour document will be verified within 24-48 hours.');
                setShowUploadModal(false);
              }}
              className="w-full mt-6 bg-gradient-to-r from-green-600 via-green-700 to-green-800 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Upload Document
            </button>
          </div>
        </div>
      )}

      {/* Delete Profile Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative animate-fadeInUp">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Delete Profile?</h3>
              <p className="text-gray-600">This action cannot be undone</p>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="text-sm text-red-900 mb-2 font-semibold">⚠️ Warning: This will permanently delete:</p>
                <ul className="text-xs text-red-700 space-y-1 list-disc list-inside">
                  <li>Your profile and all personal information</li>
                  <li>All loan and insurance applications</li>
                  <li>Investment and transaction history</li>
                  <li>Uploaded documents and records</li>
                  <li>All saved preferences and settings</li>
                </ul>
              </div>
              
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Type <span className="text-red-600 font-bold">DELETE</span> to confirm
                </label>
                <input
                  type="text"
                  id="deleteConfirmation"
                  placeholder="Type DELETE in capital letters"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-red-500 focus:outline-none font-semibold"
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  const input = document.getElementById('deleteConfirmation');
                  if (input.value === 'DELETE') {
                    setShowDeleteModal(false);
                    handleDeleteProfile();
                  } else {
                    alert('❌ Please type DELETE (in capital letters) to confirm.');
                  }
                }}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Delete Forever
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;

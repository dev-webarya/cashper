import React, { useState, useEffect } from 'react';
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';
import DashboardOverview from './DashboardOverview';
import LoanManagement from './LoanManagement';
import InsuranceManagement from './InsuranceManagement';
import InvestmentManagement from './InvestmentManagement';
import TaxPlanning from './TaxPlanning';
import UserProfile from './UserProfile';
import ChangePassword from './ChangePassword';
import AllNotifications from './AllNotifications';
import Calculators from './Calculators';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState('overview');
  const [userData, setUserData] = useState({
    name: 'Sudha',
    email: 'john.doe@example.com',
    initials: 'SD'
  });

  useEffect(() => {
    // Get user data from localStorage or API
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserData({
        name: user.name || 'Sudha',
        email: user.email || 'john.doe@example.com',
        initials: getInitials(user.name || 'Sudha')
      });
    }
  }, []);

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'overview':
        return <DashboardOverview />;
      case 'loans':
        return <LoanManagement />;
      case 'insurance':
        return <InsuranceManagement />;
      case 'investments':
        return <InvestmentManagement />;
      case 'tax':
        return <TaxPlanning />;
      case 'calculators':
        return <Calculators />;
      case 'profile':
        return <UserProfile userData={userData} setUserData={setUserData} showEditButton={false} />;
      case 'profile-edit':
        return <UserProfile userData={userData} setUserData={setUserData} showEditButton={true} />;
      case 'change-password':
        return <ChangePassword setActiveView={setActiveView} />;
      case 'all-notifications':
        return <AllNotifications />;
      
      // Quick Access Views
      case 'notifications':
        return <NotificationsView />;
      case 'documents':
        return <DocumentsView />;
      case 'support':
        return <ContactSupportView />;
      
      default:
        return <DashboardOverview />;
    }
  };

  // Placeholder Components for New Views
  const NotificationsView = () => (
    <div className="space-y-6">
      <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Notifications</h1>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="space-y-4">
          {[
            { title: 'Loan Approved', message: 'Your personal loan application has been approved!', time: '2 hours ago', type: 'success' },
            { title: 'Insurance Renewal', message: 'Your health insurance policy is due for renewal in 15 days', time: '1 day ago', type: 'warning' },
            { title: 'EMI Payment Due', message: 'Your Home Loan EMI payment is due on Jan 5', time: '2 days ago', type: 'alert' }
          ].map((notif, i) => (
            <div key={i} className={`p-4 rounded-lg border-l-4 ${
              notif.type === 'success' ? 'bg-green-50 border-green-500' :
              notif.type === 'warning' ? 'bg-yellow-50 border-yellow-500' :
              'bg-red-50 border-red-500'
            }`}>
              <h3 className="font-bold text-gray-800">{notif.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
              <p className="text-xs text-gray-400 mt-2">{notif.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const DocumentsView = () => {
    const [documents, setDocuments] = React.useState([
      'PAN Card', 'Aadhar Card', 'Income Proof', 'Bank Statement', 'Loan Agreement', 'Insurance Policy'
    ]);
    const fileInputRef = React.useRef(null);

    const handleUploadClick = () => {
      // Directly open file selector
      fileInputRef.current?.click();
    };

    const handleFileSelect = (e) => {
      const file = e.target.files[0];
      if (file) {
        // Add new document to the list
        const fileName = file.name.replace(/\.[^/.]+$/, ''); // Remove extension
        setDocuments([fileName, ...documents]);
        // Reset file input
        e.target.value = '';
      }
    };

    const handleViewDocument = (doc) => {
      // Open document in new tab
      window.open('#', '_blank');
      // You can replace '#' with actual document URL when available
      // Example: window.open(`/documents/${doc}.pdf`, '_blank');
    };

    return (
      <div className="space-y-4 sm:space-y-6">
        {/* Header - Responsive */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">My Documents</h1>
          <button 
            onClick={handleUploadClick}
            className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg sm:rounded-xl font-semibold hover:shadow-lg transition-all text-sm sm:text-base active:scale-95"
          >
            Upload New
          </button>
        </div>
        
        {/* Documents Grid - Fully Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {documents.map((doc, i) => (
            <div key={i} className="bg-white rounded-lg sm:rounded-xl shadow-md p-4 sm:p-6 hover:shadow-xl transition-all">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 text-sm sm:text-base truncate">{doc}</p>
                  <p className="text-xs text-gray-500">Uploaded</p>
                </div>
              </div>
              <button 
                onClick={() => handleViewDocument(doc)}
                className="mt-3 sm:mt-4 w-full py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-blue-600 hover:bg-blue-50 rounded-lg transition-all active:scale-95"
              >
                View Document
              </button>
            </div>
          ))}
        </div>

        {/* Hidden File Input */}
        <input 
          ref={fileInputRef}
          type="file" 
          onChange={handleFileSelect}
          accept=".pdf,.png,.jpg,.jpeg"
          className="hidden"
        />
      </div>
    );
  };



  const ContactSupportView = () => {
    const [supportForm, setSupportForm] = React.useState({
      name: '',
      email: '',
      phone: '',
      issue: ''
    });
    const [supportErrors, setSupportErrors] = React.useState({});
    const [supportLoading, setSupportLoading] = React.useState(false);
    const [supportSuccess, setSupportSuccess] = React.useState('');

    const validateSupportForm = () => {
      const errors = {};

      // Name validation
      if (!supportForm.name.trim()) {
        errors.name = 'Name is required';
      } else if (supportForm.name.trim().length < 2) {
        errors.name = 'Name must be at least 2 characters';
      } else if (!/^[a-zA-Z\s]+$/.test(supportForm.name)) {
        errors.name = 'Name should only contain letters';
      }

      // Email validation
      if (!supportForm.email.trim()) {
        errors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(supportForm.email)) {
        errors.email = 'Please enter a valid email address';
      }

      // Phone validation
      if (!supportForm.phone.trim()) {
        errors.phone = 'Phone number is required';
      } else if (!/^[0-9]{10}$/.test(supportForm.phone.replace(/\s/g, ''))) {
        errors.phone = 'Phone number must be exactly 10 digits';
      }

      // Issue validation
      if (!supportForm.issue.trim()) {
        errors.issue = 'Please describe your issue';
      } else if (supportForm.issue.trim().length < 10) {
        errors.issue = 'Issue description must be at least 10 characters';
      } else if (supportForm.issue.trim().length > 500) {
        errors.issue = 'Issue description must not exceed 500 characters';
      }

      return errors;
    };

    const handleSupportSubmit = (e) => {
      e.preventDefault();
      const errors = validateSupportForm();
      setSupportErrors(errors);

      if (Object.keys(errors).length === 0) {
        setSupportLoading(true);
        
        // Simulate API call
        setTimeout(() => {
          setSupportLoading(false);
          setSupportSuccess('✅ Your support request has been submitted successfully! Our team will contact you within 24-48 hours.');
          setSupportForm({ name: '', email: '', phone: '', issue: '' });
          setTimeout(() => setSupportSuccess(''), 5000);
        }, 1500);
      }
    };

    const handleInputChange = (field, value) => {
      // Phone number validation - only numbers
      if (field === 'phone') {
        value = value.replace(/[^0-9]/g, '').slice(0, 10);
      }
      
      setSupportForm(prev => ({ ...prev, [field]: value }));
      if (supportErrors[field]) {
        setSupportErrors(prev => ({ ...prev, [field]: '' }));
      }
    };

    return (
      <div className="space-y-6">
        {supportSuccess && (
          <div className="fixed top-20 right-4 z-50 bg-green-600 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 animate-slideInRight max-w-md">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-sm font-semibold">{supportSuccess}</span>
          </div>
        )}
        
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Contact Support</h1>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <form onSubmit={handleSupportSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name *</label>
                  <input 
                    type="text" 
                    placeholder="Enter your full name" 
                    value={supportForm.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all ${
                      supportErrors.name ? 'border-red-500' : 'border-gray-300 focus:border-green-500'
                    }`}
                  />
                  {supportErrors.name && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {supportErrors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Your Email *</label>
                  <input 
                    type="email" 
                    placeholder="example@email.com" 
                    value={supportForm.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all ${
                      supportErrors.email ? 'border-red-500' : 'border-gray-300 focus:border-green-500'
                    }`}
                  />
                  {supportErrors.email && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {supportErrors.email}
                    </p>
                  )}
                </div>

                {/* Phone Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                  <input 
                    type="tel" 
                    placeholder="10 digit mobile number" 
                    value={supportForm.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    maxLength={10}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all ${
                      supportErrors.phone ? 'border-red-500' : 'border-gray-300 focus:border-green-500'
                    }`}
                  />
                  {supportErrors.phone && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {supportErrors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col">
                {/* Issue Field */}
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Describe Your Issue * 
                    <span className="text-xs text-gray-500 ml-2">({supportForm.issue.length}/500)</span>
                  </label>
                  <textarea 
                    placeholder="Please provide detailed information about your issue..." 
                    rows="6" 
                    value={supportForm.issue}
                    onChange={(e) => handleInputChange('issue', e.target.value)}
                    maxLength={500}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all resize-none ${
                      supportErrors.issue ? 'border-red-500' : 'border-gray-300 focus:border-green-500'
                    }`}
                  />
                  {supportErrors.issue && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {supportErrors.issue}
                    </p>
                  )}
                </div>

                <button 
                  type="submit"
                  disabled={supportLoading}
                  className="mt-4 w-full px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {supportLoading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      <span>Submit Request</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Contact Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Other Ways to Reach Us</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p className="text-xs text-gray-600">Email</p>
                  <p className="text-sm font-semibold text-gray-800">info@cashper.ai</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <p className="text-xs text-gray-600">Phone</p>
                  <p className="text-sm font-semibold text-gray-800">6200755759<br/>7393080847</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-xs text-gray-600">Hours</p>
                  <p className="text-sm font-semibold text-gray-800">Mon-Sun: 9 AM - 6 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Full-Width Header/Navbar at Top */}
      <DashboardHeader 
        toggleSidebar={toggleSidebar} 
        setActiveView={setActiveView}
        userData={userData}
      />

      {/* Main Content Area with Sidebar */}
      <div className="flex relative">
        {/* Sidebar - Below Navbar */}
        <DashboardSidebar 
          isOpen={isSidebarOpen}
          activeView={activeView}
          setActiveView={setActiveView}
          toggleSidebar={toggleSidebar}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-3 xs:p-4 sm:p-6 lg:p-8 max-w-full min-h-[calc(100vh-64px)]">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
          style={{ marginTop: '64px' }} // Below navbar
        />
      )}
    </div>
  );
};

export default Dashboard;

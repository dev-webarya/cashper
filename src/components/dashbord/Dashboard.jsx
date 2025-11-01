import React, { useState, useEffect } from 'react';
import DashboardSidebar from './DashboardSidebar';
import DashboardHeader from './DashboardHeader';
import DashboardOverview from './DashboardOverview';
import LoanManagement from './LoanManagement';
import InsuranceManagement from './InsuranceManagement';
import InvestmentManagement from './InvestmentManagement';
import TaxPlanning from './TaxPlanning';
import UserProfile from './UserProfile';

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
      case 'profile':
        return <UserProfile userData={userData} setUserData={setUserData} />;
      
      // Quick Access Views
      case 'notifications':
        return <NotificationsView />;
      case 'documents':
        return <DocumentsView />;
      case 'transactions':
        return <TransactionsView />;
      
      // Support Views
      case 'help':
        return <HelpCenterView />;
      case 'support':
        return <ContactSupportView />;
      case 'knowledge':
        return <KnowledgeBaseView />;
      
      // More Options Views
      case 'rewards':
        return <RewardsView />;
      case 'referral':
        return <ReferralView />;
      
      // Settings
      case 'settings':
        return <SettingsView />;
      
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

  const DocumentsView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">My Documents</h1>
        <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold hover:shadow-lg">
          Upload New
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {['PAN Card', 'Aadhar Card', 'Income Proof', 'Bank Statement', 'Loan Agreement', 'Insurance Policy'].map((doc, i) => (
          <div key={i} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{doc}</p>
                <p className="text-xs text-gray-500">Uploaded</p>
              </div>
            </div>
            <button className="mt-4 w-full py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
              View Document
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const TransactionsView = () => (
    <div className="space-y-6">
      <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Transaction History</h1>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 text-sm font-semibold">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold">Description</th>
                <th className="text-left py-3 px-4 text-sm font-semibold">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { date: 'Jan 1, 2025', desc: 'EMI Payment', amount: '₹15,000', status: 'Completed' },
                { date: 'Dec 28, 2024', desc: 'SIP Investment', amount: '₹5,000', status: 'Completed' },
                { date: 'Dec 25, 2024', desc: 'Insurance Premium', amount: '₹8,500', status: 'Completed' }
              ].map((txn, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm">{txn.date}</td>
                  <td className="py-3 px-4 text-sm font-semibold">{txn.desc}</td>
                  <td className="py-3 px-4 text-sm font-bold text-green-600">{txn.amount}</td>
                  <td className="py-3 px-4"><span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">{txn.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const HelpCenterView = () => (
    <div className="space-y-6">
      <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Help Center</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { title: 'Getting Started', desc: 'Learn how to use our platform', icon: '🚀' },
          { title: 'Loan FAQs', desc: 'Common questions about loans', icon: '💰' },
          { title: 'Insurance Guide', desc: 'Understanding insurance policies', icon: '🛡️' },
          { title: 'Investment Tips', desc: 'How to invest smartly', icon: '📈' }
        ].map((help, i) => (
          <div key={i} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all cursor-pointer">
            <div className="text-4xl mb-3">{help.icon}</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{help.title}</h3>
            <p className="text-gray-600">{help.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const ContactSupportView = () => (
    <div className="space-y-6">
      <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Contact Support</h1>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <input type="text" placeholder="Your Name" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none" />
            <input type="email" placeholder="Your Email" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none" />
            <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none" />
          </div>
          <div>
            <textarea placeholder="Describe your issue..." rows="6" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"></textarea>
            <button className="mt-4 w-full px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold hover:shadow-lg">
              Submit Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const KnowledgeBaseView = () => (
    <div className="space-y-6">
      <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Knowledge Base</h1>
      <div className="space-y-4">
        {[
          { category: 'Loans', articles: 25 },
          { category: 'Insurance', articles: 18 },
          { category: 'Investments', articles: 30 },
          { category: 'Tax Planning', articles: 15 }
        ].map((kb, i) => (
          <div key={i} className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between hover:shadow-xl transition-all cursor-pointer">
            <div>
              <h3 className="text-xl font-bold text-gray-800">{kb.category}</h3>
              <p className="text-gray-600">{kb.articles} articles available</p>
            </div>
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );

  const RewardsView = () => (
    <div className="space-y-6">
      <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Rewards & Offers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { title: '10% Cashback', desc: 'On next loan EMI payment', validity: 'Valid till Jan 31' },
          { title: 'Free Insurance', desc: 'Get 1 month free on new policy', validity: 'Limited time' },
          { title: '₹500 Bonus', desc: 'On SIP investment of ₹10,000+', validity: 'This month only' }
        ].map((reward, i) => (
          <div key={i} className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-md p-6 border-2 border-green-300">
            <h3 className="text-2xl font-bold text-green-700 mb-2">{reward.title}</h3>
            <p className="text-gray-700 mb-2">{reward.desc}</p>
            <p className="text-xs text-green-600 font-semibold">{reward.validity}</p>
            <button className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700">
              Claim Offer
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const ReferralView = () => (
    <div className="space-y-6">
      <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Refer & Earn</h1>
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-lg p-8 border-2 border-purple-200">
        <h2 className="text-2xl font-bold text-purple-700 mb-4">Earn ₹1,000 per referral!</h2>
        <p className="text-gray-700 mb-6">Share your unique referral code with friends and family. Earn rewards when they apply for loans or insurance!</p>
        <div className="bg-white rounded-lg p-4 border-2 border-dashed border-purple-300 mb-4">
          <p className="text-xs text-gray-500 mb-2">Your Referral Code:</p>
          <p className="text-3xl font-bold text-purple-700">CASHPER2025</p>
        </div>
        <button className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg">
          Share Code
        </button>
      </div>
    </div>
  );

  const SettingsView = () => (
    <div className="space-y-6">
      <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Settings</h1>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-semibold text-gray-800">Email Notifications</p>
              <p className="text-xs text-gray-500">Receive updates via email</p>
            </div>
            <button className="w-12 h-6 bg-green-600 rounded-full relative">
              <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
            </button>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-semibold text-gray-800">SMS Alerts</p>
              <p className="text-xs text-gray-500">Get transaction alerts via SMS</p>
            </div>
            <button className="w-12 h-6 bg-green-600 rounded-full relative">
              <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
            </button>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-semibold text-gray-800">Two-Factor Authentication</p>
              <p className="text-xs text-gray-500">Add extra security to your account</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold">Enable</button>
          </div>
        </div>
      </div>
    </div>
  );

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

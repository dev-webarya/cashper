import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import AdminDashboard from './AdminDashboard';
import UserManagement from './UserManagement';
import LoanManagement from './LoanManagement';
import InsuranceManagement from './InsuranceManagement';
import InvestmentManagement from './InvestmentManagement';
import ReportsAnalytics from './ReportsAnalytics';
import AdminSettings from './AdminSettings';

const AdminPanel = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'users':
        return <UserManagement />;
      case 'loans':
        return <LoanManagement />;
      case 'insurance':
        return <InsuranceManagement />;
      case 'investments':
        return <InvestmentManagement />;
      case 'reports':
        return <ReportsAnalytics />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Full-Width Header/Navbar at Top */}
      <AdminHeader toggleSidebar={toggleSidebar} />

      {/* Main Content Area with Sidebar */}
      <div className="flex relative">
        {/* Sidebar - Below Navbar */}
        <AdminSidebar 
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

export default AdminPanel;

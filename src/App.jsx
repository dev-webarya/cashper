import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Lazy load all components
const EnhancedHomePage = lazy(() => import('./pages/EnhancedHomePage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const Login = lazy(() => import('./components/auth').then(module => ({ default: module.Login })));
const ForgotPassword = lazy(() => import('./components/auth').then(module => ({ default: module.ForgotPassword })));
const CreateAccount = lazy(() => import('./components/auth').then(module => ({ default: module.CreateAccount })));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'));
const Health_Insurence = lazy(() => import('./components/Health_Insurence'));
const Term_Insurance = lazy(() => import('./components/Term_Insurance'));
const Moter_Insurance = lazy(() => import('./components/Moter_Insurance'));
const SIP = lazy(() => import('./components/SIP'));
const Mutual_funds = lazy(() => import('./components/Mutual_funds'));
const Personal_tax_planning = lazy(() => import('./components/Personal_tax_planning'));
const Business_Tax_planning = lazy(() => import('./components/Business_Tax_planning'));
const Short_Term_Loan = lazy(() => import('./components/Short_Term_Loan'));
const Home_Loan = lazy(() => import('./components/Home_Loan'));
const Personal_loan = lazy(() => import('./components/Personal_loan'));
const Business_loan = lazy(() => import('./components/Business_loan'));
const Car_Loan = lazy(() => import('./components/Car_Loan'));
const Dashboard = lazy(() => import('./components/dashbord/Dashboard'));

// Loading fallback component
const LoadingFallback = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    fontSize: '1.5rem',
    color: '#333'
  }}>
    <div>Loading...</div>
  </div>
);
function App() {
  return (
    <Router>
      <div className="App">
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<EnhancedHomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            
            {/* Authentication Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/create-account" element={<CreateAccount />} />
            
            {/* Dashboard Route */}
            <Route path="/dashboard" element={<Dashboard />} />
            
            <Route path="/consultation" element={<ContactPage />} />
            {/* Insurance Routes */}
            <Route path="/insurance/health" element={<Health_Insurence />} />
            <Route path="/insurance/term" element={<Term_Insurance />} />
            <Route path="/insurance/motor" element={<Moter_Insurance />} />
            
            {/* Investment Routes */}
            <Route path="/investments/sip" element={<SIP />} />
            <Route path="/investments/mutual-funds" element={<Mutual_funds />} />
            
            {/* Tax Planning Routes */}
            <Route path="/tax-planning/personal" element={<Personal_tax_planning />} />
            <Route path="/services/tax-planning" element={<Personal_tax_planning />} />
            <Route path="/tax-planning/business" element={<Business_Tax_planning />} />
            
            {/* Loan Routes */}
            <Route path="/loans/short-term" element={<Short_Term_Loan />} />
            <Route path="/loans/home" element={<Home_Loan />} />
            <Route path="/loans/personal" element={<Personal_loan />} />
            <Route path="/loans/business" element={<Business_loan />} />
            <Route path="/loans/car" element={<Car_Loan />} />
            {/* TODO: Add remaining loan routes when components are created:
            <Route path="/loans/loan-against-property" element={<Loan_Against_Property />} />
            <Route path="/loans/od-cc-limit" element={<OD_CC_Limit />} />
            <Route path="/loans/cgtmse-support" element={<CGTMSE_Support />} />
            */}
            
            {/* Legal Routes */}
            <Route path="/legal/terms" element={<TermsOfService />} />
            <Route path="/legal/privacy" element={<PrivacyPolicy />} />
            <Route path="/legal/cookies" element={<CookiePolicy />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}
export default App;

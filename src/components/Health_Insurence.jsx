import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaHospital, 
  FaAmbulance, 
  FaUserMd,
  FaRupeeSign,
  FaHeartbeat,
  FaCheckCircle,
  FaChevronDown,
  FaChevronUp,
  FaMoneyBillWave,
  FaUserShield,
  FaHandHoldingHeart,
  FaClipboardCheck,
  FaBriefcaseMedical
} from 'react-icons/fa';
import { 
  Upload, 
  X, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  FileText,
  AlertCircle,
  User,
  Phone,
  Mail,
  Calendar,
  Users,
  Home,
  MapPin,
  IdCard,
  CreditCard
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const Health_Insurence = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    familySize: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    existingConditions: '',
    coverageAmount: '',
    policyType: ''
  });

  const [documents, setDocuments] = useState({
    aadhar: null,
    pan: null,
    photo: null,
    medicalReports: null,
    addressProof: null
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [activeAccordion, setActiveAccordion] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileUpload = (e, docType) => {
    const file = e.target.files[0];
    if (file) {
      setDocuments(prev => ({
        ...prev,
        [docType]: file
      }));
    }
  };

  const validateStep = (step) => {
    switch(step) {
      case 1:
        if (!formData.name.trim()) {
          alert('Please enter your full name');
          return false;
        }
        if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          alert('Please enter a valid email address');
          return false;
        }
        if (!formData.phone.trim() || !/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ''))) {
          alert('Please enter a valid 10-digit phone number');
          return false;
        }
        if (!formData.age || formData.age < 18 || formData.age > 80) {
          alert('Please enter a valid age (18-80 years)');
          return false;
        }
        return true;
      case 2:
        if (!formData.familySize) {
          alert('Please select family size');
          return false;
        }
        if (!formData.gender) {
          alert('Please select gender');
          return false;
        }
        if (!formData.coverageAmount) {
          alert('Please select coverage amount');
          return false;
        }
        if (!formData.policyType) {
          alert('Please select policy type');
          return false;
        }
        return true;
      case 3:
        if (!formData.address.trim()) {
          alert('Please enter your address');
          return false;
        }
        if (!formData.city.trim()) {
          alert('Please enter your city');
          return false;
        }
        if (!formData.state.trim()) {
          alert('Please enter your state');
          return false;
        }
        if (!formData.pincode.trim() || !/^[0-9]{6}$/.test(formData.pincode)) {
          alert('Please enter a valid 6-digit PIN code');
          return false;
        }
        return true;
      case 4:
        const requiredDocs = ['aadhar', 'pan', 'photo'];
        for (const doc of requiredDocs) {
          if (!documents[doc]) {
            alert(`Please upload ${doc.replace(/([A-Z])/g, ' $1').toLowerCase().replace(/^./, str => str.toUpperCase())}`);
            return false;
          }
        }
        return true;
      default:
        return false;
    }
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(4)) {
      setCurrentStep(5);
      console.log('Form submitted:', formData, documents);
    }
  };

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const scrollToApplyForm = () => {
    const element = document.getElementById('apply-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const faqs = [
    {
      question: "I already have a company policy. Do I still need an individual health insurance plan?",
      answer: "Yes. Company health insurance is only valid while you're employed. An individual or family health plan offers long-term protection, portability, and broader coverage—even after you switch jobs or retire."
    },
    {
      question: "What's the difference between mediclaim and health insurance?",
      answer: "Mediclaim typically covers only hospitalization expenses, while health insurance offers comprehensive coverage including pre and post-hospitalization, daycare procedures, ambulance services, and preventive health check-ups."
    },
    {
      question: "What expenses are not covered under health insurance?",
      answer: "Generally, cosmetic procedures, experimental treatments, self-inflicted injuries, and pre-existing conditions during the waiting period are not covered. Always check your policy document for specific exclusions."
    },
    {
      question: "Can I include my entire family under one policy?",
      answer: "Yes, you can opt for a family floater plan that covers you, your spouse, children, and sometimes parents under a single sum insured, making it cost-effective and easier to manage."
    },
    {
      question: "How do I make a claim and check its status?",
      answer: "You can make a claim by informing your insurer within 24 hours of hospitalization, submitting required documents, and tracking the claim status through your insurer's portal, app, or by contacting customer service."
    }
  ];

  return (
    <>
      <Navbar />
      <div className="w-full overflow-x-hidden bg-white">
        
        {/* Hero Section */}
        <section className="relative pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-6 sm:pb-8 md:pb-10 lg:pb-12 min-h-[500px] sm:min-h-[550px] md:min-h-[580px] lg:h-[600px] bg-cover bg-center bg-no-repeat text-white flex items-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}>
          <div className="absolute inset-0 bg-gradient-to-r from-green-700/60 to-green-900/50"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10 items-center">
              <div className="space-y-3 sm:space-y-4 md:space-y-5 text-center md:text-left">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                  Protect your health. Secure your finances.
                </h1>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/95 leading-relaxed">
                  Explore the best family health insurance in India with Cashper. From zero waiting period health insurance policies to comprehensive coverage options, we help you compare health insurance plans in India, understand what's included, and track your Health India claim status—all in one place.
                </p>
                <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 justify-center md:justify-start pt-2">
                  <button 
                    onClick={scrollToApplyForm}
                    className="bg-white text-green-700 px-4 sm:px-5 md:px-6 lg:px-7 py-2 sm:py-2.5 md:py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-xs sm:text-sm md:text-base">
                    Compare Plans Now
                  </button>
                  <button 
                    onClick={scrollToApplyForm}
                    className="border-2 border-white text-white px-4 sm:px-5 md:px-6 lg:px-7 py-2 sm:py-2.5 md:py-3 rounded-xl font-semibold hover:bg-white hover:text-green-700 transition-all duration-300 text-xs sm:text-sm md:text-base">
                    Calculate Premium
                  </button>
                </div>
              </div>
              
              {/* Contact Form - Right Side */}
              <div className="bg-white rounded-xl shadow-2xl p-3 sm:p-4 md:p-5 mt-6 md:mt-0">
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-3 sm:mb-4 text-center">
                  GET IN TOUCH
                </h3>
                <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-3">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none text-gray-800 text-xs sm:text-sm"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none text-gray-800 text-xs sm:text-sm"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none text-gray-800 text-xs sm:text-sm"
                    required
                  />
                  <input
                    type="number"
                    name="age"
                    placeholder="Your Age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none text-gray-800 text-xs sm:text-sm"
                    required
                  />
                  <select
                    name="familySize"
                    value={formData.familySize}
                    onChange={handleInputChange}
                    className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-200 outline-none text-gray-800 text-xs sm:text-sm"
                    required
                  >
                    <option value="">Select Family Size</option>
                    <option value="individual">Individual</option>
                    <option value="couple">Couple (2 Members)</option>
                    <option value="family-3">Family (3-4 Members)</option>
                    <option value="family-5">Family (5+ Members)</option>
                  </select>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg text-xs sm:text-sm"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* What is Health Insurance Section */}
        <section className="py-8 md:py-10 lg:py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-gray-900">
                  What is Health Insurance?
                </h2>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                  Health insurance covers medical health care costs such as hospitalization, surgeries, diagnostics, and more. Unlike mediclaim, which only covers hospitalization, health insurance plans in India offer broader benefits, helping you manage rising healthcare expenses efficiently.
                </p>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80" 
                  alt="Health Insurance" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Why Important Section */}
        <section className="py-8 md:py-10 lg:py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 md:mb-6 text-gray-900">
              Why Is Health Insurance Important for Your Family's Well-being?
            </h2>
            <p className="text-base md:text-lg text-gray-600 text-center max-w-4xl mx-auto mb-8 md:mb-12 leading-relaxed">
              With rising medical costs, having a family health plan protects your loved ones without financial stress. It also offers tax benefits under Section 80D and ensures access to quality healthcare when it matters most.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto mb-3 sm:mb-4 md:mb-6 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center">
                  <FaRupeeSign className="text-2xl sm:text-3xl md:text-4xl text-white" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">Tax Benefits Under Section 80D</h3>
              </div>
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto mb-3 sm:mb-4 md:mb-6 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center">
                  <FaHospital className="text-2xl sm:text-3xl md:text-4xl text-white" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">Coverage of medical expenses</h3>
              </div>
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 sm:col-span-2 md:col-span-1">
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto mb-3 sm:mb-4 md:mb-6 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center">
                  <FaHeartbeat className="text-2xl sm:text-3xl md:text-4xl text-white" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">Lifetime Renewability Benefit</h3>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Cashper Section */}
        <section className="py-8 md:py-10 lg:py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-gray-900">
              Why Choose Cashper as Your Health Insurance Planner?
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 leading-relaxed">
                  At Cashper, we guide you to the right health coverage—backed by expertise, not sales pitches. Our advisors help you compare health insurance plans from trusted providers, ensuring you get the best family health insurance in India—tailored to your needs, not just your budget.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 md:gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300 hover:translate-x-2 border-l-4 border-green-600">
                    <FaCheckCircle className="text-2xl md:text-3xl text-green-600 flex-shrink-0" />
                    <span className="text-base md:text-lg font-semibold text-gray-900">Smart tools. Human guidance.</span>
                  </li>
                  <li className="flex items-center gap-3 md:gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300 hover:translate-x-2 border-l-4 border-green-600">
                    <FaCheckCircle className="text-2xl md:text-3xl text-green-600 flex-shrink-0" />
                    <span className="text-base md:text-lg font-semibold text-gray-900">Transparent advice, no fine print.</span>
                  </li>
                  <li className="flex items-center gap-3 md:gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300 hover:translate-x-2 border-l-4 border-green-600">
                    <FaCheckCircle className="text-2xl md:text-3xl text-green-600 flex-shrink-0" />
                    <span className="text-base md:text-lg font-semibold text-gray-900">Designed for today's healthcare realities.</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80" 
                  alt="Financial Planning" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Coverage Determination Section */}
        <section className="py-8 md:py-10 lg:py-12 bg-gradient-to-br from-green-700 to-green-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 md:mb-6">
              How to Determine the Right Health Insurance Coverage for You?
            </h2>
            <p className="text-base md:text-lg text-center max-w-4xl mx-auto mb-8 md:mb-12 text-white/95 leading-relaxed">
              Choosing the right health insurance starts with evaluating four essentials:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-center border-2 border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:-translate-y-2">
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto mb-3 sm:mb-4 md:mb-6 bg-white rounded-full flex items-center justify-center">
                  <FaUserShield className="text-2xl sm:text-3xl md:text-4xl text-green-700" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 md:mb-3">Age & Health Condition</h3>
                <p className="text-xs sm:text-sm md:text-base text-white/90">Your stage of life and medical history shape coverage needs</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-center border-2 border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:-translate-y-2">
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto mb-3 sm:mb-4 md:mb-6 bg-white rounded-full flex items-center justify-center">
                  <FaHospital className="text-2xl sm:text-3xl md:text-4xl text-green-700" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 md:mb-3">Hospital Preferences</h3>
                <p className="text-xs sm:text-sm md:text-base text-white/90">Costs vary widely; your choice impacts the plan type</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-center border-2 border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:-translate-y-2">
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto mb-3 sm:mb-4 md:mb-6 bg-white rounded-full flex items-center justify-center">
                  <FaHandHoldingHeart className="text-2xl sm:text-3xl md:text-4xl text-green-700" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 md:mb-3">Family Size</h3>
                <p className="text-xs sm:text-sm md:text-base text-white/90">A family health plan can offer broader protection at better value</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-center border-2 border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:-translate-y-2">
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto mb-3 sm:mb-4 md:mb-6 bg-white rounded-full flex items-center justify-center">
                  <FaMoneyBillWave className="text-2xl sm:text-3xl md:text-4xl text-green-700" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 md:mb-3">Budget</h3>
                <p className="text-xs sm:text-sm md:text-base text-white/90">Balance affordability with benefits like zero waiting period health insurance</p>
              </div>
            </div>
            <p className="text-base md:text-lg text-center max-w-4xl mx-auto mt-8 md:mt-12 text-white/95 leading-relaxed">
              Cashper helps you make the right call by guiding you through these factors to compare health insurance plans in India and unlock tax benefits under Section 80D.
            </p>
            <div className="text-center mt-6 md:mt-8">
              <button 
                onClick={() => navigate('/contact')}
                className="bg-white text-green-700 hover:bg-gray-100 font-bold px-8 md:px-12 py-3 md:py-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 text-base md:text-lg">
                Get Expert Advice Now
              </button>
            </div>
          </div>
        </section>

        {/* Medical Expenditure Section */}
        <section className="py-8 md:py-10 lg:py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 md:mb-6 text-gray-900">
              What Medical Expenditures Are Covered Under Health Insurance?
            </h2>
            <p className="text-base md:text-lg text-gray-600 text-center max-w-4xl mx-auto mb-8 md:mb-12 leading-relaxed">
              Most health insurance plans in India cover a wide range of medical expenses, ensuring you're financially protected during unexpected health events. These typically include:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
              <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-center border-2 border-gray-200 hover:border-green-600 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto mb-3 sm:mb-4 md:mb-6 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center">
                  <FaHospital className="text-2xl sm:text-3xl md:text-4xl text-white" />
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold mb-2 text-gray-900">Hospitalization Costs</h3>
                <p className="text-xs sm:text-sm text-gray-600">Room charges, nursing, ICU, and surgery fees</p>
              </div>
              <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-center border-2 border-gray-200 hover:border-green-600 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto mb-3 sm:mb-4 md:mb-6 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center">
                  <FaBriefcaseMedical className="text-2xl sm:text-3xl md:text-4xl text-white" />
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold mb-2 text-gray-900">Daycare Procedures</h3>
                <p className="text-xs sm:text-sm text-gray-600">Treatments like cataract or dialysis that don't require 24-hour admission</p>
              </div>
              <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-center border-2 border-gray-200 hover:border-green-600 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto mb-3 sm:mb-4 md:mb-6 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center">
                  <FaClipboardCheck className="text-2xl sm:text-3xl md:text-4xl text-white" />
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold mb-2 text-gray-900">Diagnostic Tests</h3>
                <p className="text-xs sm:text-sm text-gray-600">Blood tests, MRIs, scans, and other essential medical investigations</p>
              </div>
              <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-center border-2 border-gray-200 hover:border-green-600 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto mb-3 sm:mb-4 md:mb-6 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center">
                  <FaAmbulance className="text-2xl sm:text-3xl md:text-4xl text-white" />
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold mb-2 text-gray-900">Ambulance Services</h3>
                <p className="text-xs sm:text-sm text-gray-600">Emergency transport to the hospital</p>
              </div>
              <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-center border-2 border-gray-200 hover:border-green-600 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 sm:col-span-2 lg:col-span-1">
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto mb-3 sm:mb-4 md:mb-6 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center">
                  <FaUserMd className="text-2xl sm:text-3xl md:text-4xl text-white" />
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold mb-2 text-gray-900">Doctor Consultations</h3>
                <p className="text-xs sm:text-sm text-gray-600">Fees for specialists or follow-up visits</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8 md:mt-12">
              <div className="bg-gradient-to-br from-green-700 to-green-900 text-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl">
                <h4 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 md:mb-4 flex items-center gap-2 sm:gap-3">
                  <FaCheckCircle className="text-xl sm:text-2xl md:text-3xl flex-shrink-0" />
                  Pre-Hospitalization Expenses:
                </h4>
                <p className="text-sm sm:text-base md:text-lg leading-relaxed text-white/95">
                  Covers diagnostic tests, consultations, and medications up to 30 days before you're admitted.
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-700 to-green-900 text-white rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl">
                <h4 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 md:mb-4 flex items-center gap-2 sm:gap-3">
                  <FaCheckCircle className="text-xl sm:text-2xl md:text-3xl flex-shrink-0" />
                  Post-Hospitalization Expenses:
                </h4>
                <p className="text-sm sm:text-base md:text-lg leading-relaxed text-white/95">
                  Includes recovery-related costs like medicines, therapies, and check-ups—generally up to 60 or 90 days after discharge. Some plans also offer coverage with a zero waiting period, helping you access benefits immediately—especially useful in family emergencies.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Required Documents Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full mb-4">
                <FileText className="w-5 h-5 text-green-700" />
                <span className="text-green-700 font-semibold">Documents Required</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Documents Needed for Health Insurance
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Keep these documents ready for a smooth application process
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Document 1 */}
              <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100">
                <div className="flex items-start gap-4">
                  <div className="bg-green-600 text-white p-3 rounded-xl">
                    <IdCard className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Identity Proof</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Valid government-issued ID for verification
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                        Aadhar Card (Mandatory)
                      </li>
                      <li className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                        PAN Card
                      </li>
                      <li className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                        Passport / Driving License
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Document 2 */}
              <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100">
                <div className="flex items-start gap-4">
                  <div className="bg-green-600 text-white p-3 rounded-xl">
                    <Home className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Address Proof</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Current residential address verification
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                        Aadhar Card
                      </li>
                      <li className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                        Utility Bills (recent)
                      </li>
                      <li className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                        Rent Agreement
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Document 3 */}
              <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100">
                <div className="flex items-start gap-4">
                  <div className="bg-green-600 text-white p-3 rounded-xl">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Age Proof</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Date of birth verification documents
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                        Birth Certificate
                      </li>
                      <li className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                        School Leaving Certificate
                      </li>
                      <li className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                        Passport
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Document 4 */}
              <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100">
                <div className="flex items-start gap-4">
                  <div className="bg-green-600 text-white p-3 rounded-xl">
                    <FaBriefcaseMedical className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Medical Records</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Health history and medical reports
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                        Recent Medical Reports
                      </li>
                      <li className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                        Prescription (if any)
                      </li>
                      <li className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                        Medical History Form
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Document 5 */}
              <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100">
                <div className="flex items-start gap-4">
                  <div className="bg-green-600 text-white p-3 rounded-xl">
                    <User className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Photographs</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Recent passport-size photographs
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                        2 Passport Size Photos
                      </li>
                      <li className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                        White Background
                      </li>
                      <li className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                        Recent (within 6 months)
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Document 6 */}
              <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100">
                <div className="flex items-start gap-4">
                  <div className="bg-green-600 text-white p-3 rounded-xl">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Income Proof</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Financial status verification (if required)
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                        Salary Slips (last 3 months)
                      </li>
                      <li className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                        Bank Statements
                      </li>
                      <li className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                        ITR (for self-employed)
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Multi-Step Application Form Section */}
        <section id="apply-form" className="py-6 sm:py-6 lg:py-6 bg-gradient-to-br from-gray-50 to-green-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full mb-4">
                <FileText className="w-5 h-5 text-green-700" />
                <span className="text-green-700 font-semibold">Application Form</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Apply for Health Insurance
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Complete your application in 4 simple steps
              </p>
            </div>

            {/* Progress Steps */}
            <div className="mb-10">
              <div className="flex items-center justify-between max-w-3xl mx-auto">
                {[1, 2, 3, 4].map((step) => (
                  <React.Fragment key={step}>
                    <div className="flex flex-col items-center flex-1">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-300 ${
                        currentStep === step 
                          ? 'bg-green-600 text-white shadow-lg scale-110' 
                          : completedSteps.includes(step)
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}>
                        {completedSteps.includes(step) ? <FaCheckCircle className="w-6 h-6" /> : step}
                      </div>
                      <div className={`mt-2 text-xs sm:text-sm font-semibold text-center ${
                        currentStep === step ? 'text-green-700' : 'text-gray-500'
                      }`}>
                        {step === 1 && 'Personal'}
                        {step === 2 && 'Coverage'}
                        {step === 3 && 'Address'}
                        {step === 4 && 'Documents'}
                      </div>
                    </div>
                    {step < 4 && (
                      <div className={`h-1 flex-1 mx-2 transition-all duration-300 ${
                        completedSteps.includes(step) ? 'bg-green-500' : 'bg-gray-200'
                      }`}></div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="p-6 sm:p-8 lg:p-10">
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <div className="animate-fadeInUp">
                    <div className="flex items-center gap-3 mb-8 pb-6 border-b-2 border-gray-200">
                      <div className="bg-green-100 p-3 rounded-xl">
                        <User className="w-6 h-6 text-green-700" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">Personal Information</h3>
                        <p className="text-gray-600 text-sm">Tell us about yourself</p>
                      </div>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="sm:col-span-2">
                        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
                          <User className="w-4 h-4 text-green-600" />
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>

                      <div>
                        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
                          <Mail className="w-4 h-4 text-green-600" />
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>

                      <div>
                        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
                          <Phone className="w-4 h-4 text-green-600" />
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
                          placeholder="10-digit mobile number"
                          required
                        />
                      </div>

                      <div>
                        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-green-600" />
                          Age *
                        </label>
                        <input
                          type="number"
                          name="age"
                          value={formData.age}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
                          placeholder="Your age"
                          required
                          min="18"
                          max="100"
                        />
                      </div>

                      <div>
                        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
                          <User className="w-4 h-4 text-green-600" />
                          Gender *
                        </label>
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
                          required
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
                          <Users className="w-4 h-4 text-green-600" />
                          Family Size *
                        </label>
                        <select
                          name="familySize"
                          value={formData.familySize}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
                          required
                        >
                          <option value="">Select family size</option>
                          <option value="1">Individual</option>
                          <option value="2">Self + Spouse</option>
                          <option value="3">Self + Spouse + 1 Child</option>
                          <option value="4">Self + Spouse + 2 Children</option>
                          <option value="5+">5 or more members</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
                          <FaHeartbeat className="w-4 h-4 text-green-600" />
                          Existing Medical Conditions
                        </label>
                        <input
                          type="text"
                          name="existingConditions"
                          value={formData.existingConditions}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
                          placeholder="None or specify conditions"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Coverage Details */}
                {currentStep === 2 && (
                  <div className="animate-fadeInUp">
                    <div className="flex items-center gap-3 mb-8 pb-6 border-b-2 border-gray-200">
                      <div className="bg-green-100 p-3 rounded-xl">
                        <FaUserShield className="w-6 h-6 text-green-700" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">Coverage Details</h3>
                        <p className="text-gray-600 text-sm">Choose your insurance coverage</p>
                      </div>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="sm:col-span-2">
                        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
                          <FaMoneyBillWave className="w-4 h-4 text-green-600" />
                          Coverage Amount *
                        </label>
                        <select
                          name="coverageAmount"
                          value={formData.coverageAmount}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
                          required
                        >
                          <option value="">Select coverage amount</option>
                          <option value="3">₹3 Lakhs</option>
                          <option value="5">₹5 Lakhs</option>
                          <option value="10">₹10 Lakhs</option>
                          <option value="15">₹15 Lakhs</option>
                          <option value="25">₹25 Lakhs</option>
                          <option value="50">₹50 Lakhs</option>
                          <option value="100">₹1 Crore</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
                          <FaClipboardCheck className="w-4 h-4 text-green-600" />
                          Policy Type *
                        </label>
                        <select
                          name="policyType"
                          value={formData.policyType}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
                          required
                        >
                          <option value="">Select policy type</option>
                          <option value="individual">Individual Health Insurance</option>
                          <option value="family-floater">Family Floater Plan</option>
                          <option value="senior-citizen">Senior Citizen Plan</option>
                          <option value="critical-illness">Critical Illness Cover</option>
                          <option value="top-up">Top-up Plan</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2 bg-green-50 border-2 border-green-200 rounded-xl p-6">
                        <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                          <FaCheckCircle className="text-green-600" />
                          Coverage Benefits Included:
                        </h4>
                        <div className="grid sm:grid-cols-2 gap-3">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                            <span className="text-sm text-gray-700">Hospitalization expenses</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                            <span className="text-sm text-gray-700">Pre & post hospitalization</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                            <span className="text-sm text-gray-700">Daycare procedures</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                            <span className="text-sm text-gray-700">Ambulance charges</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                            <span className="text-sm text-gray-700">Annual health check-ups</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                            <span className="text-sm text-gray-700">Cashless treatment</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Address Information */}
                {currentStep === 3 && (
                  <div className="animate-fadeInUp">
                    <div className="flex items-center gap-3 mb-8 pb-6 border-b-2 border-gray-200">
                      <div className="bg-green-100 p-3 rounded-xl">
                        <MapPin className="w-6 h-6 text-green-700" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">Address Information</h3>
                        <p className="text-gray-600 text-sm">Your current residential address</p>
                      </div>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="sm:col-span-2">
                        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
                          <Home className="w-4 h-4 text-green-600" />
                          Full Address *
                        </label>
                        <textarea
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
                          placeholder="House/Flat No., Street, Locality"
                          rows="3"
                          required
                        />
                      </div>

                      <div>
                        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-green-600" />
                          City *
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
                          placeholder="Your city"
                          required
                        />
                      </div>

                      <div>
                        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-green-600" />
                          State *
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
                          placeholder="Your state"
                          required
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="text-gray-700 font-semibold mb-2 flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-green-600" />
                          PIN Code *
                        </label>
                        <input
                          type="text"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
                          placeholder="6-digit PIN code"
                          required
                          maxLength="6"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Documents Upload */}
                {currentStep === 4 && (
                  <div className="animate-fadeInUp">
                    <div className="flex items-center gap-3 mb-8 pb-6 border-b-2 border-gray-200">
                      <div className="bg-green-100 p-3 rounded-xl">
                        <FileText className="w-6 h-6 text-green-700" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">Upload Documents</h3>
                        <p className="text-gray-600 text-sm">Please upload clear copies of required documents</p>
                      </div>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-6">
                      {[
                        { key: 'aadhar', label: 'Aadhar Card', icon: <IdCard className="w-12 h-12" />, accept: '.pdf,.jpg,.jpeg,.png', size: '5MB' },
                        { key: 'pan', label: 'PAN Card', icon: <CreditCard className="w-12 h-12" />, accept: '.pdf,.jpg,.jpeg,.png', size: '5MB' },
                        { key: 'photo', label: 'Passport Size Photo', icon: <User className="w-12 h-12" />, accept: '.jpg,.jpeg,.png', size: '2MB' },
                        { key: 'medicalReports', label: 'Medical Reports', icon: <FaBriefcaseMedical className="w-12 h-12" />, accept: '.pdf,.jpg,.jpeg,.png', size: '10MB', note: 'If applicable' },
                        { key: 'addressProof', label: 'Address Proof', icon: <Home className="w-12 h-12" />, accept: '.pdf,.jpg,.jpeg,.png', size: '5MB' }
                      ].map((doc) => (
                        <div key={doc.key} className="relative">
                          <label className={`border-2 border-dashed rounded-xl p-6 cursor-pointer transition-all duration-300 block ${
                            documents[doc.key] 
                              ? 'border-green-500 bg-green-50' 
                              : 'border-gray-300 hover:border-green-400 bg-white'
                          }`}>
                            <input
                              type="file"
                              accept={doc.accept}
                              onChange={(e) => handleFileUpload(e, doc.key)}
                              className="hidden"
                            />
                            <div className="text-center">
                              <div className={`mx-auto mb-4 ${documents[doc.key] ? 'text-green-600' : 'text-gray-400'}`}>
                                {doc.icon}
                              </div>
                              <div className="text-gray-900 font-bold mb-1 text-lg">{doc.label}</div>
                              <div className="text-sm text-gray-500 mb-1">
                                {doc.note && <div className="font-medium text-green-600">{doc.note}</div>}
                                Formats: {doc.accept.replace(/\./g, '').toUpperCase()} (Max {doc.size})
                              </div>
                              {documents[doc.key] ? (
                                <div className="mt-4 flex items-center justify-center gap-2 text-green-600 font-semibold">
                                  <CheckCircle className="w-5 h-5" />
                                  {documents[doc.key].name}
                                </div>
                              ) : (
                                <div className="mt-4 inline-flex items-center gap-2 bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700 transition-colors font-semibold">
                                  <Upload className="w-4 h-4" />
                                  Choose File
                                </div>
                              )}
                            </div>
                          </label>
                          {documents[doc.key] && (
                            <button
                              type="button"
                              onClick={() => setDocuments(prev => ({ ...prev, [doc.key]: null }))}
                              className="absolute top-3 right-3 bg-red-500 text-white p-1.5 rounded-full hover:bg-green-600 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-blue-800">
                          <strong>Important:</strong> Make sure all documents are clear and readable. For family floater plans, 
                          you may need to upload documents for all family members. Medical tests may be scheduled based on age and coverage amount.
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Success Step */}
                {currentStep === 5 && (
                  <div className="text-center py-12 animate-fadeInUp">
                    <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-16 h-16 text-green-600" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">Application Submitted Successfully!</h3>
                    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                      Thank you for applying! Your application reference number is <strong className="text-green-600">#HI{Date.now().toString().slice(-8)}</strong>
                    </p>
                    <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8 max-w-2xl mx-auto mb-8">
                      <h4 className="text-xl font-bold text-gray-900 mb-4">What happens next?</h4>
                      <div className="space-y-4 text-left">
                        <div className="flex items-start gap-3">
                          <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">1</div>
                          <div>
                            <div className="font-semibold text-gray-900">Document Verification</div>
                            <div className="text-gray-600 text-sm">Our team will verify your documents within 24-48 hours</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">2</div>
                          <div>
                            <div className="font-semibold text-gray-900">Medical Assessment</div>
                            <div className="text-gray-600 text-sm">Medical tests will be scheduled if required based on your age and coverage</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">3</div>
                          <div>
                            <div className="font-semibold text-gray-900">Premium Quote</div>
                            <div className="text-gray-600 text-sm">We'll send you a customized premium quote via email and SMS</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">4</div>
                          <div>
                            <div className="font-semibold text-gray-900">Policy Activation</div>
                            <div className="text-gray-600 text-sm">Complete payment and your policy will be activated within 2-3 days</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4 justify-center">
                    <button
                      onClick={() => navigate('/')}
                      className="bg-green-600 text-white hover:bg-green-700 font-bold px-8 py-4 rounded-full shadow-xl transition-all duration-300 inline-flex items-center justify-center gap-2"
                    >
                      <Home className="w-5 h-5" />
                      Back to Home
                    </button>
                    <button
                      onClick={() => {
                        setCurrentStep(1);
                        setCompletedSteps([]);
                        setFormData({
                          name: '', email: '', phone: '', age: '', familySize: '',
                          gender: '', address: '', city: '', state: '', pincode: '',
                          existingConditions: '', coverageAmount: '', policyType: ''
                        });
                        setDocuments({ aadhar: null, pan: null, photo: null, medicalReports: null, addressProof: null });
                      }}
                      className="bg-white text-green-600 border-2 border-green-600 hover:bg-green-50 font-semibold px-8 py-4 rounded-full shadow-xl transition-all duration-300 inline-flex items-center justify-center gap-2"
                    >
                      Apply for Another Policy
                    </button>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                {currentStep < 5 && (
                  <div className="flex items-center justify-between mt-10 pt-8 border-t-2 border-gray-200">
                    <button
                      type="button"
                      onClick={handlePreviousStep}
                      disabled={currentStep === 1}
                      className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                        currentStep === 1
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      <ArrowLeft className="w-5 h-5" />
                      Previous
                    </button>

                    {currentStep < 4 ? (
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      >
                        Next Step
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      >
                        <CheckCircle className="w-5 h-5" />
                        Submit Application
                      </button>
                    )}
                  </div>
                )}
              </div>
            </form>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-8 md:py-10 lg:py-12 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-gray-900">
              FAQ's
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg sm:rounded-xl shadow-md overflow-hidden border border-gray-200">
                  <button 
                    className={`w-full flex items-center justify-between p-4 sm:p-5 md:p-6 text-left transition-all duration-300 ${
                      activeAccordion === index 
                        ? 'bg-gradient-to-r from-green-700 to-green-800 text-white' 
                        : 'bg-white text-gray-900 hover:bg-gray-50'
                    }`}
                    onClick={() => toggleAccordion(index)}
                  >
                    <span className="flex-1 pr-3 sm:pr-4 font-semibold text-sm sm:text-base md:text-lg">{faq.question}</span>
                    {activeAccordion === index ? (
                      <FaChevronUp className="text-lg sm:text-xl flex-shrink-0" />
                    ) : (
                      <FaChevronDown className="text-lg sm:text-xl flex-shrink-0" />
                    )}
                  </button>
                  {activeAccordion === index && (
                    <div className="p-4 sm:p-5 md:p-6 bg-gray-50 border-t border-gray-200 animate-fadeIn">
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Health_Insurence;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!email) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Password reset email sent to:', email);
      // Add your password reset API call here
      // Example: await sendPasswordResetEmail(email);
      
      setIsLoading(false);
      setEmailSent(true);
    }, 1500);
  };

  const handleResendEmail = () => {
    setEmailSent(false);
    setEmail('');
  };

  if (emailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center px-3 xs:px-4 sm:px-6 py-6 sm:py-8 md:py-12">
        <div className="w-full max-w-sm xs:max-w-md sm:max-w-lg md:max-w-xl lg:max-w-md">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-6 xs:p-7 sm:p-8 border border-gray-100 text-center">
            <div className="mx-auto flex items-center justify-center h-14 w-14 xs:h-16 xs:w-16 rounded-full bg-green-100 mb-5 sm:mb-6">
              <CheckCircle className="h-7 w-7 xs:h-8 xs:w-8 text-green-700" />
            </div>
            
            <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">Check Your Email</h2>
            <p className="text-sm xs:text-base text-gray-600 mb-5 sm:mb-6 px-2">
              We've sent a password reset link to <span className="font-semibold text-gray-900 break-all">{email}</span>
            </p>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 xs:p-4 mb-5 sm:mb-6 text-left">
              <p className="text-xs xs:text-sm text-green-900 mb-2 font-semibold">
                Next steps:
              </p>
              <ol className="list-decimal list-inside text-xs xs:text-sm text-green-800 space-y-1">
                <li>Check your email inbox</li>
                <li>Click the password reset link</li>
                <li>Create a new password</li>
                <li>Login with your new password</li>
              </ol>
            </div>

            <p className="text-xs xs:text-sm text-gray-600 mb-5 sm:mb-6 px-2">
              Didn't receive the email? Check your spam folder or{' '}
              <button
                onClick={handleResendEmail}
                className="text-green-700 hover:text-green-800 font-medium underline"
              >
                try again
              </button>
            </p>

            <Link
              to="/login"
              className="w-full inline-flex items-center justify-center px-5 xs:px-6 py-2.5 xs:py-3 sm:py-3.5 border border-transparent text-sm xs:text-base font-semibold rounded-lg text-white bg-green-700 hover:bg-green-800 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <ArrowLeft className="h-4 w-4 xs:h-5 xs:w-5 mr-2" />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center px-3 xs:px-4 sm:px-6 py-6 sm:py-8 md:py-12">
      <div className="w-full max-w-sm xs:max-w-md sm:max-w-lg md:max-w-xl lg:max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-6 sm:mb-8">
          <Link to="/" className="inline-block">
            <h1 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-green-700"> Cashper</h1>
          </Link>
          <p className="text-gray-600 mt-2 text-sm xs:text-base">Reset your password</p>
        </div>

        {/* Forgot Password Card */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-5 xs:p-6 sm:p-8 border border-gray-100">
          <div className="mb-5 sm:mb-6">
            <Link
              to="/login"
              className="inline-flex items-center text-xs xs:text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5 xs:h-4 xs:w-4 mr-1" />
              Back to Login
            </Link>
          </div>

          <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Forgot Password?</h2>
          <p className="text-sm xs:text-base text-gray-600 mb-5 sm:mb-6">
            No worries! Enter your email address and we'll send you a link to reset your password.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-xs xs:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 xs:h-5 xs:w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  className={`block w-full pl-9 xs:pl-10 pr-3 py-2.5 xs:py-3 text-sm xs:text-base border ${
                    error ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all outline-none`}
                  placeholder="you@example.com"
                  autoFocus
                />
              </div>
              {error && (
                <div className="flex items-center mt-2 text-red-500 text-xs xs:text-sm">
                  <AlertCircle className="h-3.5 w-3.5 xs:h-4 xs:w-4 mr-1 flex-shrink-0" />
                  {error}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-700 text-white py-2.5 xs:py-3 sm:py-3.5 rounded-lg font-semibold text-sm xs:text-base hover:bg-green-800 focus:ring-4 focus:ring-green-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4 xs:h-5 xs:w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending Reset Link...
                </>
              ) : (
                'Send Reset Link'
              )}
            </button>
          </form>

          {/* Info Box */}
          <div className="mt-5 sm:mt-6 bg-gray-50 rounded-lg p-3 xs:p-4 border border-gray-200">
            <div className="flex items-start">
              <AlertCircle className="h-4 w-4 xs:h-5 xs:w-5 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
              <div className="text-xs xs:text-sm text-gray-600">
                <p className="font-medium text-gray-700 mb-1">Helpful Tips:</p>
                <ul className="list-disc list-inside space-y-0.5 xs:space-y-1">
                  <li>Check your spam folder</li>
                  <li>The reset link expires in 1 hour</li>
                  <li>Contact support if needed</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sign Up Link */}
          <p className="mt-5 sm:mt-6 text-center text-xs xs:text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/create-account" className="font-medium text-green-700 hover:text-green-800 transition-colors">
              Sign up for free
            </Link>
          </p>
        </div>

        {/* Support Link */}
        <p className="mt-4 sm:mt-6 text-center text-[10px] xs:text-xs text-gray-500 px-2">
          Need help?{' '}
          <Link to="/contact" className="text-green-700 hover:underline">
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;

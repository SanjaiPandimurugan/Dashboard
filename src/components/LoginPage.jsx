import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaEnvelope } from 'react-icons/fa';
import { HiChip, HiCube } from 'react-icons/hi';
import image from '../assets/hydra.png';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if the email and password match the admin credentials
    if (email === 'admin@gmail.com' && password === 'admin') {
      // Clear any existing error
      setError('');
      // Navigate to the cycle time details page
      navigate('/cycle-time');
    } else {
      // Display an error message
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#f8fafc] flex items-center justify-center p-6">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-4xl w-full flex rounded-2xl shadow-[0_8px_40px_rgb(0,0,0,0.08)] relative z-10">
        {/* Left Panel - Decorative */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-800 rounded-l-2xl relative overflow-hidden">
          {/* Background Image */}
          <img 
            src={image} 
            alt="Circuit Board Background" 
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-20"
          />
          
          {/* Content Overlay */}
          <div className="relative z-10 p-8 flex flex-col justify-between h-full">
            <div>
              <HiCube className="text-5xl text-white/90 mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">Welcome to FI Auto Components</h2>
              <p className="text-blue-100">Efficient, reliable and cost-effective solutions for your manufacturing requirements</p>
            </div>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="w-full lg:w-1/2 bg-white rounded-2xl lg:rounded-l-none rounded-r-2xl p-8 lg:p-12">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <HiChip className="text-5xl text-blue-600" />
                <div className="absolute inset-0 text-blue-400 animate-ping opacity-20">
                  <HiChip className="text-5xl" />
                </div>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Sign in to your account</h1>
            <p className="text-gray-500 mt-2">Access your workspace</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative group">
                <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 bg-gray-50/50 hover:bg-gray-50 text-gray-800"
                  placeholder="name@company.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative group">
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 bg-gray-50/50 hover:bg-gray-50 text-gray-800"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 
              text-white font-semibold py-4 px-6 rounded-xl transition duration-300 ease-in-out transform 
              hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
              shadow-lg shadow-blue-500/25"
            >
              Sign in to Dashboard
            </button>
          </form>

          <div className="mt-8 pt-6 text-center border-t border-gray-100">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                Create an account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
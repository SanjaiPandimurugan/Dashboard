import { format } from 'date-fns';
import logo from '../assets/logomain.jpg';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const currentDate = format(new Date(), 'dd-MM-yyyy');
  const location = useLocation();
  const isCycleTimePage = location.pathname === '/cycle-time';

  return (
    <div className="bg-white px-4 py-2 flex justify-between items-center shadow-md border-b border-gray-200">
      {/* Left Section - Logo and Title */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 flex items-center justify-center">
          <img 
            src={logo}
            alt="Company Logo"
            className="h-full w-full object-contain"
          />
        </div>
        <h1 className="text-lg font-bold text-[#000000] tracking-wide">DASHBOARD</h1>
      </div>

      {/* Right Section - Date, Shift, and Login Button */}
      <div className="flex items-center gap-4">
        {/* Date Display */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-lg border border-[#2563eb]/20">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 text-[#2563eb]" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" 
              clipRule="evenodd" 
            />
          </svg>
          <span className="text-xs font-medium text-[#2563eb]">{currentDate}</span>
        </div>

        {/* Shift Display */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-lg border border-[#16a34a]/20">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 text-[#16a34a]" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" 
              clipRule="evenodd" 
            />
          </svg>
          <span className="text-xs font-medium text-[#16a34a]">SHIFT I</span>
          <div className="w-1.5 h-1.5 rounded-full bg-[#16a34a] animate-pulse"></div>
        </div>

        {/* Enhanced Login Button - Only show if not on cycle time page */}
        {!isCycleTimePage && (
          <Link 
            to="/login" 
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 
                       hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg 
                       transition duration-300 ease-in-out transform hover:scale-[1.02] 
                       shadow-md hover:shadow-lg"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" 
                clipRule="evenodd" 
              />
            </svg>
            <span>Login</span>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Header;
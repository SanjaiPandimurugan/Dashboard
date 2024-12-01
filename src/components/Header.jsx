function Header() {
  return (
    <div className="bg-white px-4 py-2 flex justify-between items-center shadow-md border-b border-gray-200">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Logo Upload Section */}
        <div className="flex items-center gap-1.5 text-gray-500">
          <div className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
          </div>
          <span className="text-xs">Upload Logo</span>
        </div>

        {/* Divider */}
        <div className="h-5 w-px bg-gray-300"></div>

        {/* Title and Description */}
        <div className="flex flex-col">
          <h1 className="text-lg font-bold text-gray-800">DASHBOARD TITLE</h1>
          <p className="text-xs text-gray-500">Some dummy description text</p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Last Updated Status */}
        <div className="bg-[#8B4513] text-white text-xs px-3 py-1.5 rounded">
          Data Last Updated on | 1st Jan 2022
        </div>

        {/* Login Button */}
        <button className="flex items-center gap-2 px-3 py-1.5 rounded border border-[#8B4513] hover:bg-orange-50 transition-colors group">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 text-[#8B4513]" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" 
              clipRule="evenodd" 
            />
          </svg>
          <span className="text-xs font-medium text-[#8B4513] group-hover:text-[#E97451] transition-colors">
            Login
          </span>
        </button>
      </div>
    </div>
  )
}

export default Header 
function FirstRow() {
  const OEEGauge = () => {
    const percentage = 85;
    const radius = 35;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    const rotation = (percentage / 100) * 180 - 90;

    const getColor = (value) => {
      if (value >= 80) return "#E97451";
      if (value >= 60) return "#FDB347";
      return "#FFB347";
    };

    const gaugeColor = getColor(percentage);

    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="-45 -45 90 90">
          {/* Background gradient */}
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={gaugeColor} stopOpacity="0.1"/>
              <stop offset="100%" stopColor={gaugeColor} stopOpacity="0.05"/>
            </linearGradient>
          </defs>

          {/* Background arc */}
          <path
            d="M -35 0 A 35 35 0 0 1 35 0"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="8"
          />

          {/* Filled arc based on percentage */}
          <path
            d={`M -35 0 A 35 35 0 ${percentage > 50 ? 1 : 0} 1 ${35 * Math.cos((percentage/100) * Math.PI)} ${35 * Math.sin((percentage/100) * Math.PI)}`}
            fill="none"
            stroke={gaugeColor}
            strokeWidth="8"
            className="transition-all duration-1000 ease-in-out"
          />

          {/* Pointer */}
          <g className="transform rotate-90">
            <g transform={`rotate(${rotation})`}>
              <circle cx="0" cy="0" r="3" fill={gaugeColor}/>
              <line
                x1="0"
                y1="0"
                x2="25"
                y2="0"
                stroke={gaugeColor}
                strokeWidth="2"
                strokeLinecap="round"
              />
            </g>
          </g>
        </svg>

        {/* Center text */}
        <div className="absolute flex flex-col items-center">
          <div className="text-2xl font-bold" style={{ color: gaugeColor }}>
            {percentage}%
          </div>
          <div className="text-[10px] text-gray-500 -mt-1">OEE</div>
        </div>

        {/* Bottom ticks */}
        <div className="absolute -bottom-4 w-full flex justify-between px-4 text-[9px] text-gray-400">
          <span>0</span>
          <span>50</span>
          <span>100</span>
        </div>
      </div>
    );
  };

  const MetricCard = ({ title, value, trend, prevValue }) => {
    const getColor = (title, value) => {
      switch(title) {
        case 'AVAILABILITY':
          return value >= 90 ? '#E97451' : '#FDB347';
        case 'PERFORMANCE':
          return value >= 75 ? '#E97451' : '#FDB347';
        case 'QUALITY':
          return value >= 70 ? '#E97451' : '#FDB347';
        default:
          return '#E97451';
      }
    };

    const color = getColor(title, parseInt(value));
    const isPositive = trend.includes('▲');

    return (
      <div className="bg-white p-2 h-full border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1.5">
            <div className="w-1 h-3 bg-[#8B4513] rounded-full"></div>
            <span className="text-[#8B4513] text-xs font-medium">{title}</span>
          </div>
          <div className="flex items-center gap-1">
            <div className={`w-1.5 h-1.5 rounded-full ${isPositive ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
            <span className="text-[9px] text-gray-500">Live</span>
          </div>
        </div>

        <div className="flex items-baseline justify-between mt-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold" style={{ color }}>{value}%</span>
            <span className={`text-xs ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {trend}
            </span>
          </div>
          <span className="text-[10px] text-gray-500">{prevValue}</span>
        </div>

        <div className="mt-2">
          <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-500"
              style={{ 
                width: `${value}%`,
                backgroundColor: color,
                opacity: 0.8
              }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }}></div>
              <span className="text-[9px] text-gray-500">Current</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
              <span className="text-[9px] text-gray-500">Target</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="px-4 py-2">
      <div className="grid grid-cols-12 gap-3">
        {/* Part Info Section */}
        <div className="col-span-4 grid grid-cols-2 gap-2">
          <div className="bg-white h-[110px] border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group hover:border-[#8B4513]">
            <div className="border-b border-[#8B4513] py-3 px-3 flex items-center justify-between bg-gradient-to-r from-white to-orange-50">
              <span className="text-[#8B4513] text-xs font-medium">PART NAME</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#8B4513] opacity-50" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="py-4 px-3 group-hover:bg-orange-50 transition-colors">
              <div className="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#E97451]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                </svg>
                <span className="text-lg text-gray-800 font-bold">CYLINDER</span>
              </div>
              <div className="text-xs text-center text-gray-500 mt-1">Manufacturing Part</div>
            </div>
          </div>

          <div className="bg-white h-[110px] border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group hover:border-[#8B4513]">
            <div className="border-b border-[#8B4513] py-3 px-3 flex items-center justify-between bg-gradient-to-r from-white to-orange-50">
              <span className="text-[#8B4513] text-xs font-medium">PART NUMBER</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#8B4513] opacity-50" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="py-4 px-3 group-hover:bg-orange-50 transition-colors">
              <div className="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#E97451]" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                </svg>
                <span className="text-lg text-gray-800 font-bold">12345678</span>
              </div>
              <div className="text-xs text-center text-gray-500 mt-1">Serial Number</div>
            </div>
          </div>

          {/* Date and Shift boxes */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 h-[45px] group hover:border-[#8B4513]">
            <div className="h-full flex items-center justify-between px-3">
              <div className="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#E97451]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <span className="text-[#8B4513] text-xs font-medium">DATE</span>
              </div>
              <span className="text-xs text-gray-600 group-hover:text-[#E97451] transition-colors">01-01-2024</span>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 h-[45px] group hover:border-[#8B4513]">
            <div className="h-full flex items-center justify-between px-3">
              <div className="flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#E97451]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span className="text-[#8B4513] text-xs font-medium">SHIFT</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-600 group-hover:text-[#E97451] transition-colors">SHIFT I</span>
                <div className="w-1.5 h-1.5 rounded-full bg-[#E97451] animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* OEE Gauge */}
        <div className="col-span-2">
          <div className="bg-white p-2 h-[164px] border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            <div className="px-2 flex items-center justify-between">
              <span className="text-[#8B4513] text-xs font-medium">OEE</span>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[9px] text-gray-500">Live</span>
              </div>
            </div>
            <div className="py-2 px-2">
              <div className="relative h-[100px] flex items-center justify-center">
                <OEEGauge />
              </div>
            </div>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="col-span-6">
          <div className="grid grid-cols-3 gap-3 h-[138x]">
            <div className="w-full border border-gray-200 rounded-lg shadow-sm">
              <MetricCard 
                title="AVAILABILITY"
                value="95"
                trend="(+10% ▲)"
                prevValue="vs prev 11.6K"
              />
            </div>
            <div className="w-full border border-gray-200 rounded-lg shadow-sm">
              <MetricCard 
                title="PERFORMANCE"
                value="80"
                trend="(+10% ▲)"
                prevValue="vs prev 11.6K"
              />
            </div>
            <div className="w-full border border-gray-200 rounded-lg shadow-sm">
              <MetricCard 
                title="QUALITY"
                value="75"
                trend="(+10% ▲)"
                prevValue="vs prev 11.6K"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FirstRow
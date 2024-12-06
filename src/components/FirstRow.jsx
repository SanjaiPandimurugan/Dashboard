function FirstRow() {
  const OEEGauge = () => {
    const percentage = 65;
    const radius = 35;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    const rotation = (percentage / 100) * 180 - 90;

    const getColor = (value) => {
      return "#22c55e"; // Success green
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
        </svg>

        {/* Center text */}
        <div className="absolute flex flex-col items-center">
          <div className="text-2xl font-bold text-success">
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
    const getColor = (title) => {
      switch(title) {
        case 'AVAILABILITY':
          return '#2563eb';  // Fixed blue
        case 'PERFORMANCE':
          return '#16a34a';  // Fixed green
        case 'QUALITY':
          return '#f97316';  // Fixed orange
        default:
          return '#2563eb';
      }
    };

    const color = getColor(title);
    const isPositive = trend.includes('▲');

    return (
      <div className="bg-white p-2 h-full border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1.5">
            <div className="w-1 h-3 rounded-full" style={{ backgroundColor: color }}></div>
            <span className="text-xs font-medium" style={{ color }}>{title}</span>
          </div>
          <div className="flex items-center gap-1">
            <div className={`w-1.5 h-1.5 rounded-full ${isPositive ? 'animate-pulse' : ''}`} 
                 style={{ backgroundColor: color }}></div>
            <span className="text-[9px] text-gray-500">Live</span>
          </div>
        </div>

        <div className="flex items-baseline justify-between mt-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold" style={{ color }}>{value}%</span>
            <span className="text-xs" style={{ color }}>
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
        {/* Part Info Section - now using full width */}
        <div className="col-span-4 grid grid-cols-2 gap-2">
          <div className="bg-white h-[164px] border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group hover:border-[#2563eb]">
            <div className="border-b border-[#2563eb] py-3 px-3 flex items-center justify-between bg-gradient-to-r from-white to-blue-50">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#2563eb]" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                <span className=" text-[#2563eb] text-xs font-medium">PART NAME</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[#2563eb] animate-pulse"></div>
                <span className="text-[9px] text-[#2563eb]">Active</span>
              </div>
            </div>
            <div className="py-6 px-3 group-hover:bg-blue-50/30 transition-colors">
              <div className="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#2563eb]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                </svg>
                <span className="text-2xl text-gray-800 font-bold">CYLINDER</span>
              </div>
              <div className="text-sm text-center text-[#2563eb]/70 mt-3">Manufacturing Part</div>
            </div>
          </div>

          <div className="bg-white h-[164px] border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group hover:border-[#16a34a]">
            <div className="border-b border-[#16a34a] py-3 px-3 flex items-center justify-between bg-gradient-to-r from-white to-green-50">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#16a34a]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V4zm3 1h6v4H7V5zm6 6H7v2h6v-2z" clipRule="evenodd" />
                </svg>
                <span className="text-[#16a34a] text-xs font-medium">PART NUMBER</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[#16a34a] animate-pulse"></div>
                <span className="text-[9px] text-[#16a34a]">In Production</span>
              </div>
            </div>
            <div className="py-6 px-3 group-hover:bg-green-50/30 transition-colors">
              <div className="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#16a34a]" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                </svg>
                <span className="text-2xl text-gray-800 font-bold">9253010242</span>
              </div>
              <div className="text-sm text-center text-[#16a34a]/70 mt-3">Serial Number</div>
            </div>
          </div>
        </div>

        {/* OEE Gauge */}
        <div className="col-span-2">
          <div className="bg-white p-2 h-[164px] border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            <div className="px-2 flex items-center justify-between border-b border-gray-100 pb-2">
              <div className="flex items-center gap-2">
                <div className="w-1 h-4 bg-gradient-to-b from-[#2563eb] to-blue-400 rounded-full"></div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#2563eb]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span className="text-[#2563eb] text-xs font-semibold tracking-wide">OEE</span>
              </div>
              <div className="flex items-center gap-2 bg-blue-50/50 px-2 py-0.5 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-[#16a34a] animate-pulse"></div>
                <span className="text-[9px] text-[#2563eb]/70 font-medium">Live</span>
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
                value="75"
                trend="(+10% ▲)"
                prevValue="vs prev 11.6K"
              />
            </div>
            <div className="w-full border border-gray-200 rounded-lg shadow-sm">
              <MetricCard 
                title="PERFORMANCE"
                value="70"
                trend="(+10% ▲)"
                prevValue="vs prev 11.6K"
              />
            </div>
            <div className="w-full border border-gray-200 rounded-lg shadow-sm">
              <MetricCard 
                title="QUALITY"
                value="100"
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
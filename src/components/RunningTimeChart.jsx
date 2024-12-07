import { BarChart, Bar, XAxis, YAxis, Tooltip, ReferenceLine, Cell } from 'recharts'

function RunningTimeChart() {
  const data = [
    { hour: '0', value: 85 },
    { hour: '1', value: 140 },
    { hour: '2', value: 95 },
    { hour: '3', value: 130 },
    { hour: '4', value: 90 },
    { hour: '5', value: 120 },
    { hour: '6', value: 98 },
    { hour: '7', value: 125 },
    { hour: '8', value: 88 },
    { hour: '9', value: 135 },
    { hour: '10'}
  ];

  const threshold = 103;

  const getTooltipContent = (props) => {
    const { payload } = props;
    if (payload && payload.length > 0) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 border border-gray-200 rounded-md shadow-sm">
          <p className="text-xs text-gray-600">Hour: {data.hour}</p>
          <p className="text-xs font-medium">
            Value: {data.value}
            <span className="ml-1 text-[10px] text-gray-500">
              {data.value >= threshold ? '(Above Threshold)' : '(Below Threshold)'}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="px-4 py-0">
      <div className="bg-white p-2 h-[190px] border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
        <div className="flex justify-between items-center mb-3 border-b border-gray-100 pb-2">
          <div className="flex items-center gap-2">
            <div className="w-1 h-4 bg-gradient-to-b from-[#2563eb] to-blue-400 rounded-full"></div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#2563eb]" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" clipRule="evenodd" />
            </svg>
            <span className="text-[#2563eb] text-xs font-semibold tracking-wide">RUNNING TIME</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-50/50">
              <div className="w-1.5 h-1.5 rounded-full bg-[#16a34a]"></div>
              <span className="text-xs text-gray-600">Above</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-50/50">
              <div className="w-1.5 h-1.5 rounded-full bg-[#ef4444]"></div>
              <span className="text-xs text-gray-600">Below</span>
            </div>
          </div>
        </div>

        <div className="h-[140px] -mt-1">
          <BarChart 
            width={1200} 
            height={140} 
            data={data}
            margin={{ top: 10, right: 10, left: 30, bottom: 0 }}
            barGap={0}
            barSize={60}
          >
            <defs>
              <linearGradient id="colorAbove" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#16a34a" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#16a34a" stopOpacity={0.5}/>
              </linearGradient>
              <linearGradient id="colorBelow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.5}/>
              </linearGradient>
            </defs>

            <XAxis 
              dataKey="hour" 
              tickSize={0}
              height={25}
              axisLine={{ stroke: '#e5e7eb' }}
              tick={{ fontSize: 11, fill: '#666' }}
              tickLine={false}
              dy={8}
              scale="band"
              padding={{ left: 0, right: 0 }}
            />
            <YAxis 
              domain={[0, 150]}
              ticks={[1, 10, 50, 100, 150]}
              tickSize={0}
              width={30}
              axisLine={{ stroke: '#e5e7eb' }}
              tick={{ fontSize: 11, fill: '#666' }}
              tickLine={false}
              tickFormatter={(value) => value}
            />
            <Tooltip 
              cursor={false}
              content={getTooltipContent}
              wrapperStyle={{ outline: 'none' }}
            />
            <ReferenceLine 
              y={103}
              stroke="#2563eb" 
              strokeDasharray="3 3" 
              strokeWidth={1}
              label={{
                position: 'right',
                value: `Threshold: 103`,
                fontSize: 10,
                fill: '#2563eb',
                fontWeight: 500
              }}
            />
            <Bar 
              dataKey="value" 
              radius={[4, 4, 0, 0]}
              minPointSize={0}
              maxBarSize={60}
              isAnimationActive={true}
              animationDuration={1000}
              animationBegin={0}
            >
              {
                data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`}
                    fill={entry.value >= threshold ? 'url(#colorAbove)' : 'url(#colorBelow)'}
                    className="transition-all duration-300 hover:opacity-90"
                  />
                ))
              }
            </Bar>
          </BarChart>
        </div>
      </div>
    </div>
  )
}

export default RunningTimeChart
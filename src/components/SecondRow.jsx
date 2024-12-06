import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { FaBullseye, FaChartLine } from 'react-icons/fa';

// Professional color constants
const PLAN_COLOR = '#ef4444';  // Red
const ACTUAL_COLOR = '#16a34a'; // Rich green
const REJECT_COLOR = '#ef4444';  // Red for rejects

// Update the line colors and constants
const LINE_COLOR_1 = '#16a34a';  // Green
const LINE_COLOR_2 = '#ef4444';  // Red

function SecondRow() {
  const pieData = [
    { name: 'Plan', value: 60, color: '#E97451' },
    { name: 'Actual', value: 40, color: '#FDB347' }
  ];

  const lineData = [
    { name: '', value1: null, value2: null },
    { name: 'Mon', value1: 280, value2: 220 },
    { name: 'Tue', value1: 300, value2: 250 },
    { name: 'Wed', value1: 180, value2: 220 },
    { name: 'Thu', value1: 320, value2: 340 },
    { name: 'Fri', value1: 350, value2: 330 },
    { name: 'Sat', value1: 260, value2: 280 },
    { name: 'Sun', value1: 290, value2: 310 }
  ];

  const ValueBox = ({ title, value }) => {
    const boxColor = title === 'PLAN' ? '#16a34a' : '#ef4444'; // Green for PLAN, Red for ACTUAL
    
    return (
      <div className="bg-white h-full border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
        <div className={`border-b py-3 px-3 flex items-center justify-between bg-gradient-to-r from-white`}
             style={{ borderColor: boxColor }}>
          <span className="text-xs font-medium flex items-center gap-2" style={{ color: boxColor }}>
            {title === 'PLAN' ? <FaBullseye /> : <FaChartLine />}
            {title}
          </span>
        </div>
        <div className="h-[150px] flex items-center justify-center p-4">
          <div className="text-center w-full">
            <div className="rounded-lg p-4 shadow-inner" 
                 style={{ backgroundColor: `${boxColor}10` }}>
              <span className="text-4xl font-bold block mb-1" style={{ color: boxColor }}>{value}</span>
              <div className="text-xs text-gray-500">Units per hour</div>
            </div>
            <div className="mt-3 flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: boxColor }}></div>
              <span className="text-xs font-medium" style={{ color: boxColor }}>
                {title === 'PLAN' ? 'Target Rate' : 'Current Rate'}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const PieChartSection = () => {
    const data = [
      { name: 'Good Parts', value: 850, color: ACTUAL_COLOR },
      { name: 'Rejected Parts', value: 150, color: REJECT_COLOR }
    ];

    return (
      <div className="col-span-3">
        <div className="bg-white p-2 h-[210px] border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
          <div className="px-2 flex items-center justify-between">
            <span className="text-[#2563eb] text-xs font-medium">PARTS COMPARISON</span>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: ACTUAL_COLOR }}></div>
                <span className="text-xs text-gray-500">Good Parts (850)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: REJECT_COLOR }}></div>
                <span className="text-xs text-gray-500">Rejected Parts (150)</span>
              </div>
            </div>
          </div>

          <div className="flex-grow flex items-center justify-center">
            <PieChart width={200} height={180}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={5}
                dataKey="value"
                label={({
                  cx,
                  cy,
                  midAngle,
                  innerRadius,
                  outerRadius,
                  value,
                  index
                }) => {
                  const RADIAN = Math.PI / 180;
                  const radius = 25 + innerRadius + (outerRadius - innerRadius);
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);

                  return (
                    <text
                      x={x}
                      y={y}
                      className="text-xs font-medium"
                      fill={data[index].color}
                      textAnchor={x > cx ? 'start' : 'end'}
                      dominantBaseline="central"
                    >
                      {`${value}`}
                    </text>
                  );
                }}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color}
                    className="transition-all duration-300 hover:opacity-80"
                  />
                ))}
              </Pie>
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-2 border border-gray-200 rounded-md shadow-sm">
                        <p className="text-xs font-medium" style={{ color: payload[0].payload.color }}>
                          {payload[0].name}: {payload[0].value}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="px-4 py-2">
      <div className="grid grid-cols-12 gap-3">
        {/* Pie Chart */}
        <PieChartSection />

        {/* Plan/Actual */}
        <div className="col-span-3 grid grid-cols-2 gap-2">
          <div className="h-[210px]">
            <ValueBox title="ACTUAL" value="525" />
          </div>
          <div className="h-[210px]">
            <ValueBox title="PLAN" value="650" />
          </div>
        </div>

        {/* Line Chart */}
        <div className="col-span-6">
          <div className="bg-white p-2 h-[287px] border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 -mt-[75px]">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-lg border border-[#2563eb]/20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#2563eb]" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
                <span className="text-[#2563eb] text-xs font-medium">OEE METRICS</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 bg-blue-50 px-3 py-1.5 rounded-lg border border-[#2563eb]/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#2563eb]" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                  </svg>
                  <span className="text-xs text-gray-600 font-medium">Title 1</span>
                  <select className="text-xs text-gray-600 bg-transparent border-b border-gray-300 px-1 hover:border-[#2563eb] focus:outline-none focus:border-[#2563eb] transition-colors">
                    <option>Metric 1</option>
                    <option>Metric 2</option>
                  </select>
                </div>
                <div className="h-4 w-px bg-gray-200"></div>
                <div className="flex items-center gap-1.5 bg-green-50 px-3 py-1.5 rounded-lg border border-[#16a34a]/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#16a34a]" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                  </svg>
                  <span className="text-xs text-gray-600 font-medium">Title 2</span>
                  <select className="text-xs text-gray-600 bg-transparent border-b border-gray-300 px-1 hover:border-[#16a34a] focus:outline-none focus:border-[#16a34a] transition-colors">
                    <option>Metric 1</option>
                    <option>Metric 2</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mb-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#16a34a]"></div>
                <span className="text-xs text-gray-500">Actual</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#ef4444]"></div>
                <span className="text-xs text-gray-500">Plan</span>
              </div>
            </div>

            <div className="h-[200px] mt-4">
              <LineChart
                width={590}
                height={200}
                series={[
                  {
                    data: lineData.map(item => item.value1),
                    area: true,
                    color: LINE_COLOR_1,
                    showMark: true,
                    strokeWidth: 2,
                    valueFormatter: (value) => `${value || 0}`,
                    areaStyle: {
                      fill: LINE_COLOR_1,
                      opacity: 0.1
                    }
                  },
                  {
                    data: lineData.map(item => item.value2),
                    area: true,
                    color: LINE_COLOR_2,
                    showMark: true,
                    strokeWidth: 2,
                    valueFormatter: (value) => `${value || 0}`,
                    areaStyle: {
                      fill: LINE_COLOR_2,
                      opacity: 0.1
                    }
                  }
                ]}
                xAxis={[{
                  data: lineData.map(item => item.name),
                  scaleType: 'point',
                  tickLabelStyle: {
                    fontSize: 11,
                    fill: '#666',
                    fontWeight: 500
                  },
                  valueFormatter: (value) => value,
                  position: 'bottom',
                  axisLine: { 
                    strokeWidth: 1,
                    opacity: 0.2
                  },
                  tickSize: 0,
                  padding: { left: -20, right: -20 }
                }]}
                yAxis={[{
                  min: 0,
                  max: 360,
                  tickValues: [0, 60, 120, 180, 240, 300, 360],
                  tickLabelStyle: {
                    fontSize: 11,
                    fill: '#666'
                  },
                  position: 'left',
                  axisLine: { 
                    strokeWidth: 1,
                    opacity: 0.2
                  },
                  tickSize: 0,
                  valueFormatter: (value) => value,
                  tickInterval: 60
                }]}
                margin={{ left: 35, right: 10, top: 15, bottom: 25 }}
                sx={{
                  '.MuiLineElement-root': {
                    strokeWidth: 2,
                  },
                  '.MuiAreaElement-root': {
                    fillOpacity: 0.3,
                  },
                  '.MuiMarkElement-root': {
                    scale: '0.6',
                  },
                  '.MuiChartsAxis-line': {
                    stroke: '#666',
                    opacity: 0.2
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecondRow;
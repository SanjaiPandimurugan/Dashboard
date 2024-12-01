import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

function SecondRow() {
  const pieData = [
    { name: 'Text A', value: 30, color: '#E97451' },
    { name: 'Text B', value: 25, color: '#FDB347' },
    { name: 'Text C', value: 20, color: '#FFE5B4' },
    { name: 'Text D', value: 20, color: '#FFB347' },
    { name: 'Text E', value: 5, color: '#FFA500' },
  ];

  const lineData = [
    { name: '', value1: null, value2: null },
    { name: 'Jan 22', value1: 38, value2: 25 },
    { name: 'Feb 22', value1: 40, value2: 35 },
    { name: 'Mar 22', value1: 15, value2: 25 },
    { name: 'Apr 22', value1: 40, value2: 50 },
    { name: 'May 22', value1: 55, value2: 45 },
    { name: 'Jun 22', value1: 20, value2: 30 }
  ];

  const ValueBox = ({ title, value }) => (
    <div className="bg-white h-full border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
      <div className="border-b border-[#8B4513] py-3 px-3 flex items-center justify-between bg-gradient-to-r from-white to-orange-50">
        <span className="text-[#8B4513] text-xs font-medium">{title}</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#8B4513] opacity-50" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
        </svg>
      </div>
      <div className="py-8 px-3 flex flex-col items-center justify-center">
        <div className="flex items-center gap-2 mb-2">
          {title === 'PLAN' ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#E97451]" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zm0 16a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#E97451]" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          )}
          <span className="text-3xl text-gray-800 font-bold">{value}</span>
        </div>
        <div className="text-xs text-gray-500">Units per hour</div>
        <div className="mt-4 w-full bg-gray-100 rounded-full h-1.5">
          <div 
            className="bg-[#E97451] h-1.5 rounded-full transition-all duration-500"
            style={{ width: title === 'PLAN' ? '100%' : `${(parseInt(value)/360)*100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="px-4 py-2">
      <div className="grid grid-cols-12 gap-3">
        {/* Pie Chart */}
        <div className="col-span-3">
          <div className="bg-white p-2 h-[210px] border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:border-[#8B4513]">
            <div className="flex items-center justify-between border-b border-orange-100 pb-2 mb-2">
              <div className="flex items-center gap-2">
                <div className="w-1 h-4 bg-[#8B4513] rounded-full"></div>
                <span className="text-[#8B4513] text-xs font-medium">COMPARISON OF PARTS</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[#8B4513] opacity-40"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-[#8B4513] opacity-60"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-[#8B4513]"></div>
              </div>
            </div>
            <div className="flex flex-col h-[165px]">
              <div className="flex-grow flex items-center justify-center">
                <PieChart width={160} height={120}>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={0}
                    outerRadius={45}
                    paddingAngle={2}
                    dataKey="value"
                    labelLine={false}
                    label={({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
                      const RADIAN = Math.PI / 180;
                      const radius = outerRadius * 1.2;
                      const x = cx + radius * Math.cos(-midAngle * RADIAN);
                      const y = cy + radius * Math.sin(-midAngle * RADIAN);
                      
                      return (
                        <text
                          x={x}
                          y={y}
                          fill="#666666"
                          textAnchor={x > cx ? 'start' : 'end'}
                          dominantBaseline="central"
                          fontSize={10}
                        >
                          {`${value}%`}
                        </text>
                      );
                    }}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value}%`, 'Percentage']}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      padding: '4px 8px',
                      fontSize: '12px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                    itemStyle={{ color: '#666666' }}
                    labelStyle={{ color: '#8B4513', fontWeight: 500 }}
                  />
                </PieChart>
              </div>
              <div className="flex justify-center items-center gap-2 px-2 py-1.5 bg-gradient-to-r from-orange-50/30 via-orange-50/50 to-orange-50/30 rounded-lg">
                {pieData.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-1.5 hover:bg-white/80 px-2 py-1 rounded-full transition-all duration-300 cursor-pointer group"
                  >
                    <div 
                      className="w-2.5 h-2.5 rounded-full group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-[10px] text-gray-600 font-medium whitespace-nowrap">
                      {`Part ${item.name.slice(-1)}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Plan/Actual */}
        <div className="col-span-3 grid grid-cols-2 gap-2">
          <div className="bg-white h-[210px] border border-gray-200 rounded-lg shadow-sm">
            <ValueBox title="PLAN" value="360" />
          </div>
          <div className="bg-white h-[210px] border border-gray-200 rounded-lg shadow-sm">
            <ValueBox title="ACTUAL" value="270" />
          </div>
        </div>

        {/* Line Chart */}
        <div className="col-span-6">
          <div className="bg-white p-2 h-[260px] border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 -mt-[50px]">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <div className="w-1 h-4 bg-[#8B4513] rounded-full"></div>
                <span className="text-[#8B4513] text-sm font-medium">OEE METRICS</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-gray-600 font-medium">Title 1</span>
                  <select className="text-xs text-gray-600 border-b border-gray-300 px-2 py-1 bg-white hover:border-[#8B4513] focus:outline-none focus:border-[#8B4513] transition-colors">
                    <option>Metric 1</option>
                    <option>Metric 2</option>
                  </select>
                </div>
                <div className="h-4 w-px bg-gray-300"></div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-gray-600 font-medium">Title 2</span>
                  <select className="text-xs text-gray-600 border-b border-gray-300 px-2 py-1 bg-white hover:border-[#8B4513] focus:outline-none focus:border-[#8B4513] transition-colors">
                  <option>Metric 1</option>
                  <option>Metric 2</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mb-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#ff7b5c]"></div>
                <span className="text-xs text-gray-500">Dataset 1</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#ffb5a0]"></div>
                <span className="text-xs text-gray-500">Dataset 2</span>
              </div>
            </div>

            <div className="h-[200px] mt-4">
              <LineChart
                width={590}
                height={180}
                series={[
                  {
                    data: lineData.map(item => item.value1),
                    area: true,
                    color: '#ff7b5c',
                    showMark: true,
                    strokeWidth: 2,
                    valueFormatter: (value) => `${Math.abs(value)}%`,
                    areaStyle: {
                      fill: '#ff7b5c',
                      opacity: 0.3
                    }
                  },
                  {
                    data: lineData.map(item => item.value2),
                    area: true,
                    color: '#ffb5a0',
                    showMark: true,
                    strokeWidth: 2,
                    valueFormatter: (value) => `${Math.abs(value)}%`,
                    areaStyle: {
                      fill: '#ffb5a0',
                      opacity: 0.3
                    }
                  }
                ]}
                xAxis={[{
                  data: lineData.map(item => item.name),
                  scaleType: 'point',
                  tickLabelStyle: {
                    fontSize: 11,
                    fill: '#666'
                  },
                  valueFormatter: (value) => value.replace('-', ' '),
                  position: 'bottom',
                  axisLine: { 
                    strokeWidth: 1,
                    opacity: 0.2
                  },
                  tickSize: 0,
                  padding: { left: -20, right: -20 }
                }]}
                yAxis={[{
                  min: 10,
                  max: 60,
                  tickValues: [10, 20, 30, 40, 50, 60],
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
                  valueFormatter: (value) => Math.abs(value),
                  tickInterval: 10
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
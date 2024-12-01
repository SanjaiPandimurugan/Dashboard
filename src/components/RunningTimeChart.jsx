import { BarChart, Bar, XAxis, YAxis, Tooltip, ReferenceLine, Cell } from 'recharts'

function RunningTimeChart() {
  const data = [
    { hour: '0', value: 100 },
    { hour: '1', value: 180 },
    { hour: '2', value: 140 },
    { hour: '3', value: 280 },
    { hour: '4', value: 240 },
    { hour: '5', value: 250 },
    { hour: '6', value: 140 },
    { hour: '7', value: 180 },
    { hour: '8', value: 320 },
    { hour: '9', value: 280 },
    { hour: '10', value: 290 },
    { hour: '11', value: 300 }
  ];

  const threshold = 200;

  return (
    <div className="px-4 py-2">
      <div className="bg-white p-2 h-[180px] border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-[#8B4513] text-xs font-medium">RUNNING TIME</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#E97451]"></div>
              <span className="text-xs text-gray-500">Above Threshold</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#ef4444]"></div>
              <span className="text-xs text-gray-500">Below Threshold</span>
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
            barSize={80}
            baseValue={0}
          >
            <XAxis 
              dataKey="hour" 
              tickSize={0}
              height={25}
              axisLine={{ stroke: '#666' }}
              tick={{ fontSize: 11, fill: '#666' }}
              tickLine={false}
              dy={8}
              scale="band"
              padding={{ left: 0, right: 0 }}
            />
            <YAxis 
              domain={[0, 350]} 
              ticks={[0, 50, 100, 150, 200, 250, 300, 350]}
              tickSize={0}
              width={30}
              axisLine={{ stroke: '#666' }}
              tick={{ fontSize: 11, fill: '#666' }}
              tickLine={false}
              tickFormatter={(value) => value}
            />
            <Tooltip 
              cursor={false}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '8px'
              }}
            />
            <ReferenceLine 
              y={threshold} 
              stroke="#8B4513" 
              strokeDasharray="3 3" 
              strokeWidth={1}
            />
            <Bar 
              dataKey="value" 
              radius={[0, 0, 0, 0]}
              minPointSize={0}
              maxBarSize={90}
              isAnimationActive={false}
            >
              {
                data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`}
                    fill={entry.value >= threshold ? '#E97451' : '#ef4444'}
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
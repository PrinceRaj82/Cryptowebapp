
import React from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface ChartCellProps {
  data: number[];
  isPositive: boolean;
}

const ChartCell: React.FC<ChartCellProps> = ({ data, isPositive }) => {
  const chartData = Array.isArray(data) && data.length > 0
    ? data.map((value, index) => ({ value }))
    : Array(24).fill({ value: 0 }); // Default empty chart if no data
  
  return (
    <div className="w-32 h-16">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={isPositive ? '#16a34a' : '#dc2626'}
            strokeWidth={1.5}
            dot={false}
            activeDot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartCell;

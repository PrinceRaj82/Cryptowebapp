
import React from 'react';
import { formatPercent } from '../utils/formatNumber';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface PercentChangeProps {
  value: number;
}

const PercentChange: React.FC<PercentChangeProps> = ({ value }) => {
  const isPositive = value > 0;
  const isZero = value === 0;
  
  return (
    <span className={`flex items-center ${isPositive ? 'text-crypto-positive' : isZero ? 'text-gray-500' : 'text-crypto-negative'}`}>
      {isPositive ? (
        <ChevronUp className="h-4 w-4" />
      ) : isZero ? null : (
        <ChevronDown className="h-4 w-4" />
      )}
      {formatPercent(value)}
    </span>
  );
};

export default PercentChange;

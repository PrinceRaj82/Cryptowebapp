
import React from 'react';
import { Asset } from '../types/crypto';
import { formatCurrency, formatCompact, formatSupply } from '../utils/formatNumber';
import PercentChange from './PercentChange';
import ChartCell from './ChartCell';

interface AssetRowProps {
  asset: Asset;
}

const AssetRow: React.FC<AssetRowProps> = ({ asset }) => {
  const isRecentlyUpdated = asset.updatedAt && Date.now() - asset.updatedAt < 2000;
  
  const animationClass = isRecentlyUpdated 
    ? asset.price > (asset.chart_data[asset.chart_data.length - 2] || 0)
      ? 'animate-price-pulse-positive' 
      : 'animate-price-pulse-negative'
    : '';
    
  // For chart color
  const isPositiveWeek = asset.percent_change_7d > 0;

  return (
    <tr className={`hover:bg-gray-50 ${animationClass}`}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <span className="text-gray-500">{asset.id}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-8 w-8 rounded-full overflow-hidden">
            {asset.logo ? (
              <img src={asset.logo} alt={`${asset.name} logo`} className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full bg-gray-200 flex items-center justify-center text-xs">
                {asset.symbol.substring(0, 2)}
              </div>
            )}
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{asset.name}</div>
            <div className="text-sm text-gray-500">{asset.symbol}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        {formatCurrency(asset.price)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <PercentChange value={asset.percent_change_1h} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <PercentChange value={asset.percent_change_24h} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        <PercentChange value={asset.percent_change_7d} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        ${formatCompact(asset.market_cap)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">${formatCompact(asset.volume_24h)}</div>
        <div className="text-xs text-gray-500">
          {formatCompact(asset.volume_24h / asset.price)} {asset.symbol}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          {formatSupply(asset.circulating_supply, asset.symbol)}
        </div>
        {asset.max_supply && (
          <div className="w-24 h-1 bg-gray-200 rounded-full mt-1">
            <div 
              className="h-full bg-blue-500 rounded-full" 
              style={{ width: `${(asset.circulating_supply / asset.max_supply) * 100}%` }}
            ></div>
          </div>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <ChartCell data={asset.chart_data} isPositive={isPositiveWeek} />
      </td>
    </tr>
  );
};

export default AssetRow;

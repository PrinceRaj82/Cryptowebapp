
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
    ? asset.price > asset.chart_data[asset.chart_data.length - 2]
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
          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
            {asset.symbol === "BTC" && (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bitcoin text-amber-500 h-5 w-5"><path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5 17.729m6.767 1.36 1.215-6.894m-7.982 5.26 9.19-5.227"/><rect x="7" y="4" width="10" height="16" rx="2"/><path d="M12 7v3m0 4v3"/></svg>
            )}
            {asset.symbol === "ETH" && (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500 h-5 w-5"><path d="M12 2l-7 12 7 2 7-2-7-12z"/><path d="M12 22l7-12-7-2-7 2 7 12z"/></svg>
            )}
            {asset.symbol === "USDT" && (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 h-5 w-5"><circle cx="12" cy="12" r="10"/><path d="M9 12h6"/><path d="M12 9v6"/></svg>
            )}
            {asset.symbol === "XRP" && (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 h-5 w-5"><path d="M16.54 7L12 2.46 7.46 7"/><circle cx="12" cy="12" r="10"/><path d="m7.46 17 4.54 4.54L16.54 17"/></svg>
            )}
            {asset.symbol === "BNB" && (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400 h-5 w-5"><circle cx="12" cy="12" r="10"/><path d="M5 12h14"/><path d="M12 5v14"/></svg>
            )}
            {asset.symbol === "SOL" && (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500 h-5 w-5"><circle cx="12" cy="12" r="10"/><path d="M8 14h8"/><path d="M8 10h8"/></svg>
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

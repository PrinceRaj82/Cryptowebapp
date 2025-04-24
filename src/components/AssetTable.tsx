
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Asset, SortColumn } from '../types/crypto';
import { RootState, selectFilteredAssets, selectLoading, selectError, selectLastUpdated } from '../redux/store';
import { setSort } from '../redux/filterSlice';
import AssetRow from './AssetRow';
import InfoTooltip from './InfoTooltip';
import { ArrowUp, ArrowDown } from 'lucide-react';

const AssetTable: React.FC = () => {
  const dispatch = useDispatch();
  const filteredAssets = useSelector(selectFilteredAssets);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const lastUpdated = useSelector(selectLastUpdated);
  const { column: sortColumn, direction: sortDirection } = useSelector(
    (state: RootState) => state.filter.sort
  );

  const handleSort = (column: SortColumn) => {
    dispatch(setSort({ column }));
  };

  const renderSortIcon = (column: SortColumn) => {
    if (sortColumn !== column) return null;
    return sortDirection === 'asc' ? (
      <ArrowUp className="w-4 h-4 ml-1" />
    ) : (
      <ArrowDown className="w-4 h-4 ml-1" />
    );
  };

  const tooltips = {
    market_cap: "The total market value of a cryptocurrency's circulating supply. It is calculated by multiplying the current price by the circulating supply.",
    volume_24h: "A measure of how much of a cryptocurrency was traded in the last 24 hours.",
    circulating_supply: "The number of coins or tokens that have been issued so far and are publicly available."
  };

  const formatLastUpdated = (timestamp: number | null) => {
    if (!timestamp) return 'Never';
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };

  return (
    <div className="flex flex-col mt-6">
      {lastUpdated && (
        <div className="text-right text-sm text-gray-500 mb-2">
          Last updated: {formatLastUpdated(lastUpdated)}
        </div>
      )}
      
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 scrollbar-none">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            {isLoading && filteredAssets && filteredAssets.length === 0 && (
              <div className="text-center p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-2 text-gray-500">Loading cryptocurrency data...</p>
              </div>
            )}
            
            {error && (
              <div className="text-center p-4 text-red-500">
                <p>Error loading data: {error}</p>
                <p className="text-sm mt-2">Please try again later or check your internet connection.</p>
              </div>
            )}
            
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('id')}
                  >
                    <div className="flex items-center">
                      # {renderSortIcon('id')}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center">
                      Name {renderSortIcon('name')}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('price')}
                  >
                    <div className="flex items-center">
                      Price {renderSortIcon('price')}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('percent_change_1h')}
                  >
                    <div className="flex items-center">
                      1h % {renderSortIcon('percent_change_1h')}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('percent_change_24h')}
                  >
                    <div className="flex items-center">
                      24h % {renderSortIcon('percent_change_24h')}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('percent_change_7d')}
                  >
                    <div className="flex items-center">
                      7d % {renderSortIcon('percent_change_7d')}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('market_cap')}
                  >
                    <div className="flex items-center">
                      Market Cap
                      {renderSortIcon('market_cap')}
                      <InfoTooltip content={tooltips.market_cap} />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('volume_24h')}
                  >
                    <div className="flex items-center">
                      Volume(24h)
                      {renderSortIcon('volume_24h')}
                      <InfoTooltip content={tooltips.volume_24h} />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('circulating_supply')}
                  >
                    <div className="flex items-center">
                      Circulating Supply
                      {renderSortIcon('circulating_supply')}
                      <InfoTooltip content={tooltips.circulating_supply} />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    <div className="flex items-center">
                      Last 7 Days
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredAssets && Array.isArray(filteredAssets) && filteredAssets.map((asset: Asset) => (
                  <AssetRow key={asset.id} asset={asset} />
                ))}
                {(!filteredAssets || !Array.isArray(filteredAssets) || filteredAssets.length === 0) && !isLoading && !error && (
                  <tr>
                    <td colSpan={10} className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                      No assets found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetTable;

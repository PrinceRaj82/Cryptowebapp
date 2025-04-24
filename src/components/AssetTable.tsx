
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Asset, SortColumn } from '../types/crypto';
import { RootState, selectFilteredAssets } from '../redux/store';
import { setSort } from '../redux/filterSlice';
import AssetRow from './AssetRow';
import InfoTooltip from './InfoTooltip';
import { ArrowUp, ArrowDown } from 'lucide-react';

const AssetTable: React.FC = () => {
  const dispatch = useDispatch();
  const filteredAssets = useSelector(selectFilteredAssets);
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

  return (
    <div className="flex flex-col mt-6">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('id')}
                  >
                    <div className="flex items-center">
                      # {renderSortIcon('id')}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center">
                      Name {renderSortIcon('name')}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('price')}
                  >
                    <div className="flex items-center">
                      Price {renderSortIcon('price')}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('percent_change_1h')}
                  >
                    <div className="flex items-center">
                      1h % {renderSortIcon('percent_change_1h')}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('percent_change_24h')}
                  >
                    <div className="flex items-center">
                      24h % {renderSortIcon('percent_change_24h')}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('percent_change_7d')}
                  >
                    <div className="flex items-center">
                      7d % {renderSortIcon('percent_change_7d')}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
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
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
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
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
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
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <div className="flex items-center">
                      Last 7 Days
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAssets && Array.isArray(filteredAssets) && filteredAssets.map((asset: Asset) => (
                  <AssetRow key={asset.id} asset={asset} />
                ))}
                {(!filteredAssets || !Array.isArray(filteredAssets) || filteredAssets.length === 0) && (
                  <tr>
                    <td colSpan={10} className="px-6 py-4 text-center text-gray-500">
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

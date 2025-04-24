
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage
import { combineReducers } from 'redux';
import { createSelector } from '@reduxjs/toolkit';

import assetsReducer from './assetsSlice';
import filterReducer from './filterSlice';
import { Asset, FilterType } from '../types/crypto';

// Configure persist for filter state only
const filterPersistConfig = {
  key: 'filter',
  storage,
  whitelist: ['sort', 'filter'] // only persist these keys
};

const rootReducer = combineReducers({
  assets: assetsReducer,
  filter: persistReducer(filterPersistConfig, filterReducer)
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

export const persistor = persistStore(store);

// Selectors
export const selectAssets = (state: RootState) => state.assets.assets;
export const selectFilters = (state: RootState) => state.filter;

// Memoized selector to get filtered & sorted assets
export const selectFilteredAssets = createSelector(
  [selectAssets, selectFilters],
  (assets, filters) => {
    let filteredAssets = [...assets];
    
    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredAssets = filteredAssets.filter(asset => 
        asset.name.toLowerCase().includes(searchLower) || 
        asset.symbol.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply category filter
    switch (filters.filter) {
      case 'gainers_24h':
        filteredAssets = filteredAssets.filter(asset => asset.percent_change_24h > 0);
        break;
      case 'losers_24h':
        filteredAssets = filteredAssets.filter(asset => asset.percent_change_24h < 0);
        break;
      case 'gainers_7d':
        filteredAssets = filteredAssets.filter(asset => asset.percent_change_7d > 0);
        break;
      case 'losers_7d':
        filteredAssets = filteredAssets.filter(asset => asset.percent_change_7d < 0);
        break;
      default:
        // 'all' - no filtering needed
        break;
    }
    
    // Apply sorting
    const { column, direction } = filters.sort;
    
    return filteredAssets.sort((a, b) => {
      const aValue = a[column];
      const bValue = b[column];
      
      // Special handling for name column to sort by name
      if (column === 'name') {
        return direction === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      
      // Default numeric comparison
      if (direction === 'asc') {
        return (aValue || 0) - (bValue || 0);
      } else {
        return (bValue || 0) - (aValue || 0);
      }
    });
  }
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

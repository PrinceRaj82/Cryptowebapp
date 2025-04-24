
import { configureStore, combineReducers, createSelector } from '@reduxjs/toolkit';
import { 
  persistStore, 
  persistReducer, 
  FLUSH, 
  REHYDRATE, 
  PAUSE, 
  PERSIST, 
  PURGE, 
  REGISTER 
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import assetsReducer from './assetsSlice';
import filterReducer from './filterSlice';
import { Asset, FilterType, SortColumn } from '../types/crypto';

// Configuration for redux-persist
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['filter'], // Only persist filter settings
};

const rootReducer = combineReducers({
  assets: assetsReducer,
  filter: filterReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Selectors
export const selectAssets = (state: RootState) => state.assets.assets;
export const selectLoading = (state: RootState) => state.assets.loading;
export const selectError = (state: RootState) => state.assets.error;
export const selectLastUpdated = (state: RootState) => state.assets.lastUpdated;
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
      // Special handling for name column to sort by name
      if (column === 'name') {
        return direction === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      
      // Get the values, ensuring they're treated as numbers
      const aValue = typeof a[column] === 'number' ? a[column] : 0;
      const bValue = typeof b[column] === 'number' ? b[column] : 0;
      
      // Perform numeric comparison
      if (direction === 'asc') {
        return Number(aValue) - Number(bValue);
      } else {
        return Number(bValue) - Number(aValue);
      }
    });
  }
);


import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../redux/store';
import AssetTable from '../components/AssetTable';
import FilterBar from '../components/FilterBar';
import { startLiveUpdates, stopLiveUpdates } from '../utils/cryptoService';
import { toast } from '@/hooks/use-toast';

const CryptoTracker: React.FC = () => {
  useEffect(() => {
    // Start live data updates
    const stopUpdates = startLiveUpdates(5000); // Update every 5 seconds
    
    // Show toast notification
    toast({
      title: "Live Updates Started",
      description: "Cryptocurrency data will refresh every 5 seconds",
    });
    
    // Clean up on component unmount
    return () => {
      stopUpdates();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container px-4 sm:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Crypto Price Tracker</h1>
          <p className="text-gray-600 mt-2">Real-time cryptocurrency price tracker with live updates from CoinGecko API</p>
        </div>
        
        <FilterBar />
        <AssetTable />
        
        <div className="mt-8 text-center text-xs text-gray-500">
          <p>Disclaimer: This app uses free-tier CoinGecko API which may have rate limits.</p>
          <p className="mt-1">Data updates automatically every 5 seconds.</p>
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CryptoTracker />
      </PersistGate>
    </Provider>
  );
};

export default Index;

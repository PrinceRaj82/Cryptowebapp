
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
    const stopUpdates = startLiveUpdates(5000);
    
    toast({
      title: "Live Updates Started",
      description: "Cryptocurrency data will refresh every 5 seconds",
    });
    
    return () => {
      stopUpdates();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 sm:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Crypto Price Tracker</h1>
          <p className="text-muted-foreground mt-2">Real-time cryptocurrency price tracker with live updates</p>
        </div>
        
        <FilterBar />
        <AssetTable />
        
        <div className="mt-8 text-center text-xs text-muted-foreground">
          <p>Data updates automatically every 5 seconds.</p>
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


import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../redux/store';
import AssetTable from '../components/AssetTable';
import FilterBar from '../components/FilterBar';
import { startWebSocketSimulation } from '../utils/simulateWebSocket';

const CryptoTracker: React.FC = () => {
  useEffect(() => {
    // Start simulated WebSocket updates
    const stopWebSocketSimulation = startWebSocketSimulation();
    
    // Clean up on component unmount
    return () => {
      stopWebSocketSimulation();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container px-4 sm:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Crypto Price Tracker</h1>
          <p className="text-gray-600 mt-2">Real-time cryptocurrency price tracker with live updates</p>
        </div>
        
        <FilterBar />
        <AssetTable />
        
        <div className="mt-8 text-center text-xs text-gray-500">
          <p>Disclaimer: This is a demonstration app with simulated price movements.</p>
          <p className="mt-1">Data updates automatically every 1-2 seconds to simulate real-time changes.</p>
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

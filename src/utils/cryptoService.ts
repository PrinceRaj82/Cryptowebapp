
import { store } from '../redux/store';
import { fetchCryptoData } from '../redux/assetsSlice';
import { AppDispatch } from '../redux/store';
import { startWebSocketSimulation } from './simulateWebSocket';

let intervalId: number | null = null;

export const startLiveUpdates = (interval = 5000) => {
  const dispatch = store.dispatch as AppDispatch;
  
  // Initial fetch
  dispatch(fetchCryptoData());
  
  // Start WebSocket simulation
  const stopSimulation = startWebSocketSimulation();
  
  return () => {
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
    stopSimulation();
  };
};

export const stopLiveUpdates = () => {
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }
};

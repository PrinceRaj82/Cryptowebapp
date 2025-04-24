
import { store } from '../redux/store';
import { fetchCryptoData } from '../redux/assetsSlice';
import { AppDispatch } from '../redux/store';

let intervalId: number | null = null;

export const startLiveUpdates = (interval = 5000) => {
  const dispatch = store.dispatch as AppDispatch;
  
  // Initial fetch
  dispatch(fetchCryptoData());
  
  // Set up polling interval
  intervalId = window.setInterval(() => {
    dispatch(fetchCryptoData());
  }, interval);
  
  return () => {
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };
};

export const stopLiveUpdates = () => {
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
  }
};

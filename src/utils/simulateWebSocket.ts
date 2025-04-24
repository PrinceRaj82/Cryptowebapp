
import { store } from '../redux/store';
import { 
  updateAssetPrice,
  updateAssetPercentChange,
  updateAssetVolume,
  updateChartData
} from '../redux/assetsSlice';

// Random float between min and max
const randomFloat = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

// Random percentage change
const randomPercentage = (current: number, volatility: number): number => {
  const change = randomFloat(-volatility, volatility);
  const newValue = current + change;
  return parseFloat(newValue.toFixed(2));
};

// Random price change based on current price
const randomPriceChange = (currentPrice: number): number => {
  const percentChange = randomFloat(-1, 1) / 100; // -0.01% to +0.01%
  const newPrice = currentPrice * (1 + percentChange);
  
  // Handle formatting based on price magnitude
  if (newPrice < 0.1) return parseFloat(newPrice.toFixed(6));
  if (newPrice < 1) return parseFloat(newPrice.toFixed(4));
  if (newPrice < 10) return parseFloat(newPrice.toFixed(3));
  if (newPrice < 100) return parseFloat(newPrice.toFixed(2));
  return parseFloat(newPrice.toFixed(2));
};

// Random volume change
const randomVolumeChange = (currentVolume: number): number => {
  const changePercent = randomFloat(-0.2, 0.2) / 100; // -0.002% to +0.002%
  return Math.round(currentVolume * (1 + changePercent));
};

// Start WebSocket simulation
export const startWebSocketSimulation = (intervalMs = 1500): () => void => {
  const interval = setInterval(() => {
    const state = store.getState();
    const assets = state.assets.assets;
    
    // Randomly select 1-3 assets to update
    const numToUpdate = Math.floor(randomFloat(1, 4));
    const assetIndices = new Set<number>();
    
    while (assetIndices.size < numToUpdate && assetIndices.size < assets.length) {
      const idx = Math.floor(randomFloat(0, assets.length));
      assetIndices.add(idx);
    }
    
    // Update the selected assets
    assetIndices.forEach(idx => {
      const asset = assets[idx];
      
      // Update price
      const newPrice = randomPriceChange(asset.price);
      store.dispatch(updateAssetPrice({ id: asset.id, price: newPrice }));
      
      // Update chart data
      store.dispatch(updateChartData({ id: asset.id, newDataPoint: newPrice }));
      
      // Update percentage changes (occasionally)
      if (Math.random() > 0.7) {
        store.dispatch(updateAssetPercentChange({
          id: asset.id,
          percent_change_1h: randomPercentage(asset.percent_change_1h, 0.05),
          percent_change_24h: randomPercentage(asset.percent_change_24h, 0.03),
          percent_change_7d: randomPercentage(asset.percent_change_7d, 0.02)
        }));
      }
      
      // Update volume (occasionally)
      if (Math.random() > 0.7) {
        store.dispatch(updateAssetVolume({
          id: asset.id,
          volume_24h: randomVolumeChange(asset.volume_24h)
        }));
      }
    });
    
  }, intervalMs);
  
  // Return function to stop simulation
  return () => clearInterval(interval);
};

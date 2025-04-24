
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Asset } from '../types/crypto';
import mockAssets from '../mock/assets.json';

interface AssetsState {
  assets: Asset[];
  loading: boolean;
  error: string | null;
}

const initialState: AssetsState = {
  assets: mockAssets,
  loading: false,
  error: null
};

const assetsSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {
    updateAssetPrice: (state, action: PayloadAction<{ id: number; price: number }>) => {
      const { id, price } = action.payload;
      const asset = state.assets.find(a => a.id === id);
      if (asset) {
        asset.price = price;
        asset.updatedAt = Date.now();
      }
    },
    updateAssetPercentChange: (
      state, 
      action: PayloadAction<{ 
        id: number; 
        percent_change_1h?: number;
        percent_change_24h?: number;
        percent_change_7d?: number;
      }>
    ) => {
      const { id, ...changes } = action.payload;
      const asset = state.assets.find(a => a.id === id);
      if (asset) {
        Object.assign(asset, changes);
        asset.updatedAt = Date.now();
      }
    },
    updateAssetVolume: (state, action: PayloadAction<{ id: number; volume_24h: number }>) => {
      const { id, volume_24h } = action.payload;
      const asset = state.assets.find(a => a.id === id);
      if (asset) {
        asset.volume_24h = volume_24h;
        asset.updatedAt = Date.now();
      }
    },
    updateChartData: (state, action: PayloadAction<{ id: number; newDataPoint: number }>) => {
      const { id, newDataPoint } = action.payload;
      const asset = state.assets.find(a => a.id === id);
      if (asset) {
        // Remove first element and add new data point at the end
        asset.chart_data = [...asset.chart_data.slice(1), newDataPoint];
        asset.updatedAt = Date.now();
      }
    }
  }
});

export const { 
  updateAssetPrice, 
  updateAssetPercentChange, 
  updateAssetVolume,
  updateChartData
} = assetsSlice.actions;

export default assetsSlice.reducer;


import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Asset } from '../types/crypto';

interface AssetsState {
  assets: Asset[];
  loading: boolean;
  error: string | null;
  lastUpdated: number | null;
}

const initialState: AssetsState = {
  assets: [],
  loading: false,
  error: null,
  lastUpdated: null
};

// Fetch crypto data from CoinGecko API
export const fetchCryptoData = createAsyncThunk(
  'assets/fetchCryptoData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,tether,ripple,binancecoin,solana&order=market_cap_desc&per_page=6&page=1&sparkline=true'
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCryptoData.fulfilled, (state, action) => {
        state.loading = false;
        state.lastUpdated = Date.now();
        
        // Map CoinGecko API response to our Asset type
        state.assets = action.payload.map((coin: any) => ({
          id: coin.market_cap_rank,
          name: coin.name,
          symbol: coin.symbol.toUpperCase(),
          price: coin.current_price,
          percent_change_1h: coin.price_change_percentage_1h_in_currency || 0,
          percent_change_24h: coin.price_change_percentage_24h || 0,
          percent_change_7d: coin.price_change_percentage_7d || 0,
          market_cap: coin.market_cap,
          volume_24h: coin.total_volume,
          circulating_supply: coin.circulating_supply,
          max_supply: coin.max_supply,
          chart_data: coin.sparkline_in_7d?.price?.slice(-24) || Array(24).fill(0),
          logo: coin.image,
          updatedAt: Date.now()
        }));
      })
      .addCase(fetchCryptoData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { 
  updateAssetPrice, 
  updateAssetPercentChange, 
  updateAssetVolume,
  updateChartData
} = assetsSlice.actions;

export default assetsSlice.reducer;

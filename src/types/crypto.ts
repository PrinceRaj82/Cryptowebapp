
// Types for our crypto assets
export interface Asset {
  id: number;
  name: string;
  symbol: string;
  price: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  market_cap: number;
  volume_24h: number;
  circulating_supply: number;
  max_supply: number | null;
  chart_data: number[];
  logo: string;
  updatedAt?: number; // Timestamp of last update
}

// For sorting table columns
export type SortColumn = 
  | 'id' 
  | 'name' 
  | 'price' 
  | 'percent_change_1h' 
  | 'percent_change_24h' 
  | 'percent_change_7d'
  | 'market_cap' 
  | 'volume_24h' 
  | 'circulating_supply';

export type SortDirection = 'asc' | 'desc';

// For filtering assets
export type FilterType = 'all' | 'gainers_24h' | 'losers_24h' | 'gainers_7d' | 'losers_7d';

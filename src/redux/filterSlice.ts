
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterType, SortColumn, SortDirection } from '../types/crypto';

interface FilterState {
  sort: {
    column: SortColumn;
    direction: SortDirection;
  };
  filter: FilterType;
  search: string;
}

const initialState: FilterState = {
  sort: {
    column: 'market_cap',
    direction: 'desc'
  },
  filter: 'all',
  search: ''
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSort: (state, action: PayloadAction<{ column: SortColumn; direction?: SortDirection }>) => {
      const { column, direction } = action.payload;
      
      // If clicking the same column, toggle direction unless explicitly specified
      if (state.sort.column === column && direction === undefined) {
        state.sort.direction = state.sort.direction === 'asc' ? 'desc' : 'asc';
      } else {
        state.sort.column = column;
        state.sort.direction = direction || 'desc';
      }
    },
    setFilter: (state, action: PayloadAction<FilterType>) => {
      state.filter = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    }
  }
});

export const { setSort, setFilter, setSearch } = filterSlice.actions;
export default filterSlice.reducer;

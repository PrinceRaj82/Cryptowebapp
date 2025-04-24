
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FilterType } from '../types/crypto';
import { RootState } from '../redux/store';
import { setFilter, setSearch } from '../redux/filterSlice';
import { Input } from '@/components/ui/input';
import { Filter, Search } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const FilterBar: React.FC = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.filter.filter);
  const search = useSelector((state: RootState) => state.filter.search);
  
  const handleFilterChange = (value: string) => {
    dispatch(setFilter(value as FilterType));
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
      <Tabs defaultValue={filter} onValueChange={handleFilterChange} className="w-full md:w-auto">
        <div className="flex items-center mb-2">
          <Filter className="h-4 w-4 mr-2" />
          <span className="font-medium">Filter</span>
        </div>
        <TabsList className="grid grid-cols-3 md:grid-cols-5 w-full">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="gainers_24h">24h Gainers</TabsTrigger>
          <TabsTrigger value="losers_24h">24h Losers</TabsTrigger>
          <TabsTrigger value="gainers_7d">7d Gainers</TabsTrigger>
          <TabsTrigger value="losers_7d">7d Losers</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="relative w-full md:w-64">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search coin or symbol..."
          value={search}
          onChange={handleSearchChange}
          className="pl-8"
        />
      </div>
    </div>
  );
};

export default FilterBar;

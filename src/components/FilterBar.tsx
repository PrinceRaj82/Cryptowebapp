
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FilterType } from '../types/crypto';
import { RootState } from '../redux/store';
import { setFilter, setSearch } from '../redux/filterSlice';
import { Input } from '@/components/ui/input';
import { Filter, Search, ChevronDown } from 'lucide-react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';

const FilterBar: React.FC = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.filter.filter);
  const search = useSelector((state: RootState) => state.filter.search);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const handleFilterChange = (value: string) => {
    dispatch(setFilter(value as FilterType));
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };

  const filterOptions = [
    { value: 'all', label: 'All' },
    { value: 'gainers_24h', label: '24h Gainers' },
    { value: 'losers_24h', label: '24h Losers' },
    { value: 'gainers_7d', label: '7d Gainers' },
    { value: 'losers_7d', label: '7d Losers' },
  ];

  return (
    <div className="space-y-4 mb-6">
      {/* Desktop view */}
      <div className="hidden md:flex md:flex-row md:gap-4 md:items-center md:justify-between">
        <Tabs defaultValue={filter} onValueChange={handleFilterChange} className="w-full md:w-auto">
          <div className="flex items-center mb-2">
            <Filter className="h-4 w-4 mr-2" />
            <span className="font-medium">Filter</span>
          </div>
          <TabsList className="grid grid-cols-5 w-full">
            {filterOptions.map((option) => (
              <TabsTrigger key={option.value} value={option.value}>
                {option.label}
              </TabsTrigger>
            ))}
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
      
      {/* Mobile view */}
      <div className="md:hidden space-y-3">
        <div className="flex items-center justify-between">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-1/2 flex items-center justify-between">
                <Filter className="h-4 w-4 mr-2" />
                <span>
                  {filterOptions.find(opt => opt.value === filter)?.label || 'Filter'}
                </span>
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-background border border-border w-48">
              {filterOptions.map((option) => (
                <DropdownMenuItem 
                  key={option.value} 
                  onClick={() => handleFilterChange(option.value)}
                  className={filter === option.value ? "bg-accent" : ""}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <div className="relative w-1/2 ml-2">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search..."
              value={search}
              onChange={handleSearchChange}
              className="pl-8"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;

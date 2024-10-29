// import React from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Search, X } from 'lucide-react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setGlobalSearchValue } from '@/store/global-search-slice';
// import type { RootState } from '@/store/store';

// interface GlobalSearchProps {
//   isOpen: boolean;
//   onOpenChange: (isOpen: boolean) => void;
//   className?: string;
// }

// export function GlobalSearch({ isOpen, onOpenChange, className = '' }: GlobalSearchProps) {
//   const dispatch = useDispatch();
//   const globalSearchValue = useSelector(
//     (state: RootState) => state.globalSearch.value
//   );

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     dispatch(setGlobalSearchValue(event.target.value));
//   };

//   if (!isOpen) {
//     return (
//       <Button
//         variant="ghost"
//         size="icon"
//         onClick={() => onOpenChange(true)}
//         className={className}
//       >
//         <Search className="h-5 w-5" />
//         <span className="sr-only">Search</span>
//       </Button>
//     );
//   }

//   return (
//     <div className={`relative flex items-center ${className}`}>
//       <Input
//         type="search"
//         placeholder="Search..."
//         className="h-12 w-full py-2 pl-10 pr-4"
//         value={globalSearchValue}
//         onChange={handleSearchChange}
//       />
//       <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
//       <Button
//         variant="ghost"
//         size="icon"
//         className="absolute right-2 top-1/2 -translate-y-1/2 transform"
//         onClick={() => onOpenChange(false)}
//       >
//         <X className="h-4 w-4" />
//       </Button>
//     </div>
//   );
// }
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setGlobalSearchValue } from '@/store/global-search-slice';
import type { RootState } from '@/store/store';
import clsx from 'clsx';

interface GlobalSearchProps {
  className?: string;
}

export function GlobalSearch({ className = '' }: GlobalSearchProps) {
  const dispatch = useDispatch();
  const globalSearchValue = useSelector(
    (state: RootState) => state.globalSearch.value
  );
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setGlobalSearchValue(event.target.value));
  };

  return (
    <div className={clsx('relative', className)}>
      {isSearchOpen ? (
        <div className="relative flex items-center">
          <Input
            type="search"
            placeholder="Search..."
            className="h-12 w-full py-2 pl-10 pr-4 text-foreground"
            value={globalSearchValue}
            onChange={handleSearchChange}
          />
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 transform"
            onClick={() => setIsSearchOpen(false)}
          >
            <X className="h-4 w-4 text-foreground" />
          </Button>
        </div>
      ) : (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSearchOpen(true)}
          className={clsx(
            'flex h-12 w-12 items-center justify-start gap-2 rounded-[--radius] bg-secondary p-4  text-sm font-medium text-foreground hover:bg-accent hover:text-foreground'
          )}
        >
          <Search className="h-6 w-6" />
          <span className="sr-only">Search</span>
        </Button>
      )}
    </div>
  );
}
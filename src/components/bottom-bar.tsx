'use client'

import React from 'react';
import { Button } from '@/components/ui/button';
import { GlobalSearch } from '@/components/global-search';

export function BottomBar() {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-primary text-primary-foreground py-3 px-4">
      <div className="container flex items-center justify-berween gap-4">
          <GlobalSearch
            isOpen={isSearchOpen}
            onOpenChange={setIsSearchOpen}
            className="w-full"
          />
        <div className="flex gap-4 flex-shrink-0">
          <Button variant="secondary">Contact Us</Button>
          <Button variant="secondary">Chat With Us</Button>
        </div>
      </div>
    </div>
  );
}
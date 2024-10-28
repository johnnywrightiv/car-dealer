'use client'

import * as React from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import SearchForm from '@/components/search-form'

export function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)

  return (
    <aside className="fixed inset-y-0 left-0 z-30 mt-16 hidden w-72 border-r bg-background lg:block">
      <nav className="grid gap-2 p-6">
        <SearchForm />
      </nav>
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 lg:hidden"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <nav className="grid gap-2 p-6">
            <SearchForm />
          </nav>
        </SheetContent>
      </Sheet>
    </aside>
  )
}
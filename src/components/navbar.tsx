'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown, Menu, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { ThemeSelect } from '@/components/theme-selector'

const navItems = [
  { title: 'Shop', href: '#' },
  { title: 'Electric Vehicles', href: '#' },
  { title: 'Finance', href: '#' },
  { title: 'Specials', href: '#' },
  { title: 'Programs', href: '#' },
  { title: 'More', href: '#' },
]

export function Navbar() {
  const [isNavbarOpen, setIsNavbarOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <Sheet open={isNavbarOpen} onOpenChange={setIsNavbarOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pl-1 pr-0">
            <div className="px-7">
              <Link href="/" className="flex items-center">
                <Image src="/placeholder.svg" alt="Hyundai Logo" width={40} height={40} className="mr-2" />
                <span className="font-bold">ACME HYUNDAI</span>
              </Link>
            </div>
            <nav className="flex flex-col gap-4 px-2 py-4">
              {navItems.map((item, index) => (
                <Link key={index} href={item.href} className="flex items-center py-2 text-lg font-semibold">
                  {item.title}
                  <ChevronDown className="ml-auto h-4 w-4" />
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Image src="/placeholder.svg" alt="Hyundai Logo" width={40} height={40} />
          <span className="hidden font-bold sm:inline-block">ACME CARS</span>
        </Link>
        <nav className="hidden gap-6 lg:flex">
          {navItems.map((item, index) => (
            <Link key={index} href={item.href} className="flex items-center text-lg font-semibold">
              {item.title}
              <ChevronDown className="ml-1 h-4 w-4" />
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSelect />
          <Button variant="ghost" size="icon" className="hidden lg:flex">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
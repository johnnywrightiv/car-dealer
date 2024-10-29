'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronDown, Menu, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ThemeSelect } from '@/components/theme-selector';
import { Input } from '@/components/ui/input';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { setGlobalSearchValue } from '@/store/global-search-slice';
import type { RootState } from '@/store/store';
import { GlobalSearch } from './global-search';

const navItems = [
	{
		title: 'New',
		href: '/new',
		items: [
			{ title: 'SUVs', href: '/new/suvs' },
			{ title: 'Sedans', href: '/new/sedans' },
			{ title: 'Trucks', href: '/new/trucks' },
		],
	},
	{
		title: 'Used',
		href: '/used',
		items: [
			{ title: 'Certified Pre-Owned', href: '/used/certified' },
			{ title: 'Under $15,000', href: '/used/under-15000' },
			{ title: 'All Used Vehicles', href: '/used/all' },
		],
	},
	{
		title: 'Electric Vehicles',
		href: '/ev',
		items: [
			{ title: 'All-Electric', href: '/ev/all-electric' },
			{ title: 'Plug-In Hybrid', href: '/ev/plug-in-hybrid' },
			{ title: 'EV Resources', href: '/ev/resources' },
		],
	},
	{
		title: 'Specials',
		href: '/specials',
		items: [
			{ title: 'New Vehicle Specials', href: '/specials/new' },
			{ title: 'Used Vehicle Specials', href: '/specials/used' },
			{ title: 'Service Specials', href: '/specials/service' },
		],
	},
	{
		title: 'More',
		href: '/more',
		items: [
			{ title: 'About Us', href: '/about' },
			{ title: 'Contact Us', href: '/contact' },
			{ title: 'Financing', href: '/financing' },
		],
	},
];

export function Navbar() {
	const [isNavbarOpen, setIsNavbarOpen] = React.useState(false);
	const [isSearchOpen, setIsSearchOpen] = React.useState(false);
	const dispatch = useDispatch();
	const globalSearchValue = useSelector(
		(state: RootState) => state.globalSearch.value
	);

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setGlobalSearchValue(event.target.value));
	};

	return (
		<header className="sticky top-0 z-40 w-full border-b bg-secondary">
			<div className="flex h-16 items-center justify-between px-4">
				<div className="flex items-center">
					<Sheet open={isNavbarOpen} onOpenChange={setIsNavbarOpen}>
						<SheetTrigger asChild>
							<Button
								variant="ghost"
								className="mr-2 px-2 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
							>
								<Menu className="h-6 w-6" />
								<span className="sr-only">Toggle Menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent side="left" className="pl-1 pr-0">
							<div className="px-7">
								<Link href="/" className="flex items-center">
									<Image
										src="/logo.svg"
										alt="Logo"
										width={40}
										height={40}
										className="mr-2"
									/>
									<span className="font-bold">ACME CARS</span>
								</Link>
							</div>
							<nav className="flex flex-col gap-4 px-2 py-4">
								{navItems.map((item, index) => (
									<div key={index}>
										<Link
											href={item.href}
											className="flex items-center py-2 text-lg font-semibold"
										>
											{item.title}
										</Link>
										{item.items && (
											<div className="ml-4 mt-2 flex flex-col gap-2">
												{item.items.map((subItem, subIndex) => (
													<Link
														key={subIndex}
														href={subItem.href}
														className="text-sm"
													>
														{subItem.title}
													</Link>
												))}
											</div>
										)}
									</div>
								))}
							</nav>
						</SheetContent>
					</Sheet>
					<Link href="/" className="mr-6 flex items-center space-x-2">
						<Image
							src="/logo.svg"
							alt="Logo"
							width={80}
							height={80}
							className="px-2"
						/>
						<span className="font-bold inline-block">ACME CARS</span>
					</Link>
				</div>
				<div className="px-2 flex items-center space-x-4">
					<NavigationMenu className="hidden lg:flex">
						<NavigationMenuList>
							{navItems.map((item, index) => (
								<NavigationMenuItem key={index}>
									<NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
									<NavigationMenuContent>
										<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
											{item.items?.map((subItem, subIndex) => (
												<li key={subIndex}>
													<NavigationMenuLink asChild>
														<Link
															href={subItem.href}
															className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
														>
															<div className="text-sm font-medium leading-none">
																{subItem.title}
															</div>
														</Link>
													</NavigationMenuLink>
												</li>
											))}
										</ul>
									</NavigationMenuContent>
								</NavigationMenuItem>
							))}
						</NavigationMenuList>
					</NavigationMenu>
					<GlobalSearch />
					{/* {isSearchOpen ? (
						<div className="relative flex items-center">
							<Input
								type="search"
								placeholder="Search..."
								className="h-12 w-full py-2 pl-10 pr-4"
								value={globalSearchValue}
								onChange={handleSearchChange}
							/>
							<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform" />
							<Button
								variant="ghost"
								size="icon"
								className="absolute right-2 top-1/2 -translate-y-1/2 transform"
								onClick={() => setIsSearchOpen(false)}
							>
								<X className="h-4 w-4" />
							</Button>
						</div>
					) : (
						<Button
							variant="ghost"
							size="icon"
							onClick={() => setIsSearchOpen(true)}
						>
							<Search className="h-5 w-5" />
							<span className="sr-only">Search</span>
						</Button>
					)} */}
					<ThemeSelect />
				</div>
			</div>
		</header>
	);
}

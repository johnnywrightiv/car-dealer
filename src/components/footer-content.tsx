import React from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Phone, MapPin, Clock } from 'lucide-react';

export function FooterContent() {
	return (
		<footer className="bg-background py-8">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					<div className="space-y-4">
						<h3 className="text-lg font-semibold">Contact Us</h3>
						<div className="flex items-center space-x-2">
							<Phone className="h-4 w-4" />
							<span>Sales: (123) 456-7890</span>
						</div>
						<div className="flex items-center space-x-2">
							<Phone className="h-4 w-4" />
							<span>Service: (123) 456-7891</span>
						</div>
						<div className="flex items-center space-x-2">
							<Phone className="h-4 w-4" />
							<span>Parts: (123) 456-7892</span>
						</div>
					</div>

					<div className="space-y-4">
						<h3 className="text-lg font-semibold">Location</h3>
						<div className="flex items-center space-x-2">
							<MapPin className="h-4 w-4" />
							<span>123 Main St, Chicago, IL 12345</span>
						</div>
						<div className="flex items-center space-x-2">
							<Clock className="h-4 w-4" />
							<span>Open Today: 9 AM - 8 PM</span>
						</div>
					</div>

					<div className="space-y-4">
						<h3 className="text-lg font-semibold">Quick Links</h3>
						<ul className="space-y-2">
							<li>
								<Link href="/inventory" className="hover:underline">
									Inventory
								</Link>
							</li>
							<li>
								<Link href="/specials" className="hover:underline">
									Specials
								</Link>
							</li>
							<li>
								<Link href="/financing" className="hover:underline">
									Financing
								</Link>
							</li>
							<li>
								<Link href="/service" className="hover:underline">
									Service
								</Link>
							</li>
						</ul>
					</div>

					<div className="space-y-4">
						<h3 className="text-lg font-semibold">Search</h3>
						<div className="flex space-x-2">
							<div className="relative flex-grow">
								<Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
								<Input
									type="search"
									placeholder="Search"
									className="pl-8 pr-4"
								/>
							</div>
							<Button type="submit" variant="secondary">
								Go
							</Button>
						</div>
						<div className="space-y-2">
							<Button variant="outline" className="w-full">
								Contact Us
							</Button>
							<Button variant="default" className="w-full">
								Chat With Us
							</Button>
						</div>
					</div>
				</div>

				<div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground mb-12">
					© {new Date().getFullYear()} ACME Auto Dealership. All rights
					reserved.
				</div>
			</div>
		</footer>
	);
}

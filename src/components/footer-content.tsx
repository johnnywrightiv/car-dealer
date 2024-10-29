import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, Clock } from 'lucide-react';
import { SocialLinks } from './social-links';

export function FooterContent() {
  return (
    <footer className="bg-secondary">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
					<SocialLinks />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-2">
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
            <h3 className="text-lg font-semibold">Location</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>123 Main St, Chicago, IL 12345</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Open Today: 9 AM - 8 PM</span>
              </div>
              <div className="bg-gray-400 w-full h-48 rounded-lg">
                <p>placeholder map</p>
								{/* Placeholder for Google Maps */}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border mb-10">
          <Image src="/logo.svg" alt="Schaumburg Toyota" width={100} height={40} />
          <div className="mt-4 md:mt-0 text-sm text-muted-foreground">
            © {new Date().getFullYear()} ACME Auto Dealership. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
import React from 'react';
import Link from 'next/link';
import {
	FaFacebookF,
	FaTwitter,
	FaInstagram,
	FaGoogle,
	FaStar,
} from 'react-icons/fa'; // Import the relevant icons

interface SocialLinksProps {
	className?: string;
	showHeading?: boolean;
}

export function SocialLinks({
	className = '',
	showHeading = true,
}: SocialLinksProps) {
	const socialLinks = [
		{ href: '#', icon: <FaFacebookF size={24} />, alt: 'Facebook' },
		{ href: '#', icon: <FaTwitter size={24} />, alt: 'Twitter' },
		{ href: '#', icon: <FaInstagram size={24} />, alt: 'Instagram' },
		{ href: '#', icon: <FaGoogle size={24} />, alt: 'Google' },
		{ href: '#', icon: <FaStar size={24} />, alt: 'DealerRater' }, // Replace with actual DealerRater icon if available
	];

	return (
		<div className={`flex items-center justify-between gap-4 ${className}`}>
			{showHeading && (
				<h2 className="text-2xl font-bold whitespace-nowrap">
					Connect with us.
				</h2>
			)}
			<div className="flex gap-4">
				{socialLinks.map((link) => (
					<Link
						key={link.alt}
						href={link.href}
						className="rounded-full p-2 bg-accent hover:bg-primary hover:text-secondary transition-colors flex items-center justify-center"
						aria-label={link.alt}
					>
						{link.icon}
					</Link>
				))}
			</div>
		</div>
	);
}

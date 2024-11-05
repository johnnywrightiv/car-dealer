import '@/styles/globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { auth } from '@/server/auth';
import { ReduxProvider } from '@/store/provider';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/navbar';
// import { Sidebar } from '@/components/sidebar';
// import { FooterContent } from '@/components/footer-content';
// import { BottomBar } from '@/components/bottom-bar';

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
});

const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
});

export const metadata: Metadata = {
	title: 'Auto Dealer',
	description: 'Find your next vehicle today!',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();
	return (
		<SessionProvider session={session}>
			<html suppressHydrationWarning lang="en">
				<body
					className={`${geistSans.variable} ${geistMono.variable} mx-auto max-w-screen-lg antialiased min-h-screen flex flex-col`}
				>
					<ReduxProvider>
						<ThemeProvider
							attribute="class"
							defaultTheme="system"
							enableSystem
							disableTransitionOnChange
						>
							<Navbar />
							<div className="flex-grow flex">
								<div className="hidden lg:block">{/* <Sidebar /> */}</div>
								<main className="flex-grow flex justify-center ">
									{children}
								</main>
							</div>
							<footer>{/* <FooterContent /> */}</footer>
							{/* <BottomBar /> */}
						</ThemeProvider>
					</ReduxProvider>
				</body>
			</html>
		</SessionProvider>
	);
}

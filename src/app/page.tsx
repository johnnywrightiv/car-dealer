import { FilterButton } from '@/components/filter-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ArrowUpDown, LayoutGrid, List } from 'lucide-react';

export default function Home() {
	return (
		<div className="container p-6">
			<div className="mx-auto w-full min-w-0">
				<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8">
					Find your vehicle at ACME today!
				</h1>
				<div className="space-y-4">
					<div className="relative">
						<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
						<Input
							type="search"
							placeholder="Search Inventory"
							className="pl-10 pr-4 py-6 text-lg"
						/>
					</div>
					<div className="flex items-center justify-between">
						<h2 className="text-2xl font-bold">
							123 MATCHING VEHICLES FOR SALE IN YOUR AREA
						</h2>
						<div className="flex gap-2">
							<Button variant="outline" size="icon">
								<LayoutGrid className="h-4 w-4" />
							</Button>
							<Button variant="outline" size="icon">
								<List className="h-4 w-4" />
							</Button>
							<div className="hidden lg:flex justify-end gap-4">
								<Button variant="outline" className="flex items-center gap-2">
									<ArrowUpDown className="h-4 w-4" />
									Sort
								</Button>
							</div>
						</div>
					</div>
					<div className="lg:hidden grid grid-cols-2 gap-4">
						<FilterButton />
						<Button
							variant="outline"
							size="lg"
							className="w-full flex items-center justify-center gap-2"
						>
							<ArrowUpDown className="h-4 w-4" />
							Sort
						</Button>
					</div>
					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
						{Array.from({ length: 11 }).map((_, index) => (
							<div
								key={index}
								className="rounded-lg border bg-card text-card-foreground shadow-sm"
							>
								<div className="p-6 flex flex-col space-y-4">
									<div className="aspect-video bg-muted rounded-md"></div>
									<h3 className="text-lg font-semibold">
										Car Model {index + 1}
									</h3>
									<p className="text-sm text-muted-foreground">Year: 2024</p>
									<p className="text-sm font-medium">Price: $25,000</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

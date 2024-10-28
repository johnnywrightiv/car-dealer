export default function Home() {
  return (
    <div className="lg:pl-72"> {/* Add left padding to account for sidebar */}
      <main className="container py-6">
        <div className="mx-auto w-full min-w-0">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8">
            Find your vehicle at ACME today!
          </h1>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="rounded-lg border bg-card text-card-foreground shadow-sm"
              >
                <div className="p-6 flex flex-col space-y-4">
                  <div className="aspect-video bg-muted rounded-md"></div>
                  <h3 className="text-lg font-semibold">Car Model {index + 1}</h3>
                  <p className="text-sm text-muted-foreground">Year: 2024</p>
                  <p className="text-sm font-medium">Price: $25,000</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
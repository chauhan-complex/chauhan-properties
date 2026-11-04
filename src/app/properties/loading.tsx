export default function Loading() {
  return (
    <div aria-busy="true" aria-label="Loading properties">
      <div className="border-b border-line bg-ink py-14 text-cream md:py-16">
        <div className="mx-auto max-w-[86rem] px-5 md:px-6">
          <div className="h-3 w-40 animate-pulse rounded-full bg-cream/15" />
          <div className="mt-6 h-10 w-2/3 max-w-xl animate-pulse rounded-full bg-cream/15" />
          <div className="mt-4 h-4 w-1/2 max-w-md animate-pulse rounded-full bg-cream/10" />
        </div>
      </div>

      <div className="mx-auto max-w-[86rem] px-5 py-8 md:px-6 md:py-10">
        <div className="h-12 w-full animate-pulse rounded-full bg-paper-deep" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-[3px] border border-line bg-cream"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <div className="aspect-4/3 w-full animate-pulse bg-paper-deep" />
              <div className="space-y-3 p-5">
                <div className="h-6 w-1/3 animate-pulse rounded-full bg-paper-deep" />
                <div className="h-4 w-4/5 animate-pulse rounded-full bg-paper-deep" />
                <div className="h-3 w-2/3 animate-pulse rounded-full bg-paper-deep" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

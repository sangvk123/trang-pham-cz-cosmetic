export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Hero skeleton */}
      <div className="h-[400px] bg-sage-lightest rounded-xl animate-pulse mb-8" />

      {/* Products grid skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-square bg-sage-lightest rounded-lg mb-3" />
            <div className="h-3 bg-sage-lightest rounded w-1/3 mb-2" />
            <div className="h-4 bg-sage-lightest rounded w-3/4 mb-2" />
            <div className="h-4 bg-sage-lightest rounded w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}

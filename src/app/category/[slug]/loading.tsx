export default function CategoryLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="h-4 bg-sage-lightest rounded w-48 mb-6 animate-pulse" />
      <div className="h-8 bg-sage-lightest rounded w-64 mb-8 animate-pulse" />
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

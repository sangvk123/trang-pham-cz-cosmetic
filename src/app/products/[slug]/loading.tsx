export default function ProductLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="h-4 bg-sage-lightest rounded w-48 mb-6 animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="aspect-square bg-sage-lightest rounded-lg animate-pulse" />
        <div className="animate-pulse space-y-4">
          <div className="h-3 bg-sage-lightest rounded w-24" />
          <div className="h-7 bg-sage-lightest rounded w-3/4" />
          <div className="h-14 bg-sage-lightest rounded-lg" />
          <div className="h-20 bg-sage-lightest rounded" />
          <div className="h-12 bg-sage-lightest rounded-full" />
        </div>
      </div>
    </div>
  );
}

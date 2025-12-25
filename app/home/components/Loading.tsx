export default function Loading() {
  return (
    <div className="p-6 animate-pulse">
      <h1 className="text-xl font-semibold mb-4">Loading posts...</h1>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded" />
      </div>
    </div>
  );
}

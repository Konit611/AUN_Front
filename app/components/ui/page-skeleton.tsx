export default function PageSkeleton() {
  return (
    <div className="px-6 md:px-8 pt-12 md:pt-16 pb-24 max-w-[1280px] mx-auto animate-pulse">
      <div className="flex flex-col gap-3 mb-12">
        <div className="h-3 w-32 bg-surface-raised rounded" />
        <div className="h-10 w-64 bg-surface-raised rounded" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-surface border border-border rounded-[48px] p-6 flex flex-col gap-4"
          >
            <div className="aspect-[4/3] bg-surface-raised rounded-[32px]" />
            <div className="h-4 bg-surface-raised rounded w-3/4" />
            <div className="h-3 bg-surface-raised rounded w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}

// components/ProjectSkeleton.tsx
export default function ProjectSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="bg-[#0A0D14] border border-slate-800/40 rounded-xl p-5 h-[200px] animate-pulse"
        >
          <div className="flex justify-between mb-4">
            <div className="h-4 w-16 bg-slate-800 rounded"></div>
            <div className="h-4 w-16 bg-slate-800 rounded"></div>
          </div>
          <div className="h-5 w-3/4 bg-slate-800 rounded mb-3"></div>
          <div className="space-y-2">
            <div className="h-3 w-full bg-slate-800 rounded"></div>
            <div className="h-3 w-5/6 bg-slate-800 rounded"></div>
          </div>
          <div className="mt-6 flex gap-2">
            <div className="h-4 w-12 bg-slate-800 rounded"></div>
            <div className="h-4 w-12 bg-slate-800 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

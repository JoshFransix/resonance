import { useProductStore } from "@/store/useProductStore";

export function Loader() {
  const isLoading = useProductStore((state) => state.isLoading);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 rounded-full border-2 border-accent"></div>
          <div className="absolute inset-0 rounded-full border-2 border-t-text-primary animate-spin"></div>
        </div>
        <div className="text-center">
          <h3 className="text-text-primary font-medium text-lg mb-2">
            Loading Experience
          </h3>
          <p className="text-text-secondary text-sm">Preparing your journey</p>
        </div>
      </div>
    </div>
  );
}

import { ProductScene } from "@/components/3d/ProductScene";
import { AdvancedOverlay } from "@/components/ui/AdvancedOverlay";
import { Loader } from "@/components/ui/Loader";

export function Home() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Loader />

      <div className="fixed inset-0 z-0">
        <ProductScene />
      </div>

      <AdvancedOverlay />
    </div>
  );
}

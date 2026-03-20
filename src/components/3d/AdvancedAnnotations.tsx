import { Html } from "@react-three/drei";
import { useProductStore } from "@/store/useProductStore";
import { MODEL_PARTS } from "@/utils/advancedConstants";

export function AdvancedAnnotations() {
  const showAnnotations = useProductStore((state) => state.showAnnotations);
  const selectedPart = useProductStore((state) => state.selectedPart);

  if (!showAnnotations) return null;

  return (
    <group>
      {MODEL_PARTS.map((part) => (
        <Html
          key={part.id}
          position={part.position}
          center
          distanceFactor={6}
          style={{
            pointerEvents: "none",
            transition: "all 0.3s",
            opacity: selectedPart === part.id || !selectedPart ? 1 : 0.3,
          }}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-text-primary animate-pulse" />
            <div className="bg-surface/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-accent whitespace-nowrap">
              <span className="text-text-primary text-xs font-medium">
                {part.name}
              </span>
            </div>
          </div>
        </Html>
      ))}
    </group>
  );
}

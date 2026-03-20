import { OrbitControls, PresentationControls } from "@react-three/drei";
import { useProductStore } from "@/store/useProductStore";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { OrbitControls as OrbitControlsType } from "three-stdlib";

export function InteractiveControls() {
  const interactionMode = useProductStore((state) => state.interactionMode);
  const autoRotate = useProductStore((state) => state.autoRotate);
  const controlsRef = useRef<OrbitControlsType>(null);

  useFrame(() => {
    if (controlsRef.current && autoRotate) {
      controlsRef.current.autoRotate = true;
    }
  });

  if (interactionMode === "orbit") {
    return (
      <OrbitControls
        ref={controlsRef}
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.5}
        minDistance={2}
        maxDistance={10}
        autoRotate={autoRotate}
        autoRotateSpeed={0.5}
        dampingFactor={0.05}
        enableDamping={true}
      />
    );
  }

  if (interactionMode === "inspect") {
    return (
      <PresentationControls
        global
        config={{ mass: 2, tension: 500 }}
        snap={{ mass: 4, tension: 1500 }}
        rotation={[0, 0, 0]}
        polar={[-Math.PI / 3, Math.PI / 3]}
        azimuth={[-Math.PI / 1.4, Math.PI / 2]}
      >
        {null}
      </PresentationControls>
    );
  }

  return null;
}

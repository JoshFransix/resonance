import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import { AdvancedProductModel } from "./AdvancedProductModel";
import { AdvancedLighting } from "./AdvancedLighting";
import { InteractiveControls } from "./InteractiveControls";
import { AdvancedAnnotations } from "./AdvancedAnnotations";
import { PostProcessing } from "./PostProcessing";
import { SceneHelpers } from "./SceneHelpers";

export function ProductScene() {
  return (
    <Canvas
      shadows
      camera={{ position: [4, 2, 5], fov: 45, near: 0.1, far: 100 }}
      gl={{
        antialias: true,
        alpha: true,
        toneMapping: 2,
        toneMappingExposure: 1.2,
        powerPreference: "high-performance",
      }}
      dpr={[1, 2]}
    >
      <color attach="background" args={["#0B0B0D"]} />

      <AdvancedLighting />
      <InteractiveControls />
      <SceneHelpers />

      <Suspense fallback={null}>
        <Environment files="/hdr/studio.hdr" background={false} blur={0.6} />

        <AdvancedProductModel />
        <AdvancedAnnotations />

        <ContactShadows
          position={[0, -0.8, 0]}
          opacity={0.5}
          scale={12}
          blur={2.5}
          far={5}
          resolution={1024}
        />
      </Suspense>

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.8, 0]}
        receiveShadow
      >
        <planeGeometry args={[100, 100]} />
        <shadowMaterial transparent opacity={0.15} />
      </mesh>

      <PostProcessing />
    </Canvas>
  );
}

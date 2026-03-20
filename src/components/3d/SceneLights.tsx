import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function SceneLights() {
  const keyLightRef = useRef<THREE.DirectionalLight>(null);
  const rimLightRef = useRef<THREE.DirectionalLight>(null);

  useFrame(({ clock }) => {
    if (keyLightRef.current) {
      const t = clock.getElapsedTime() * 0.2;
      keyLightRef.current.position.x = Math.sin(t) * 3;
      keyLightRef.current.position.z = Math.cos(t) * 3;
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />

      <directionalLight
        ref={keyLightRef}
        position={[5, 5, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.1}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.0001}
      />

      <directionalLight
        ref={rimLightRef}
        position={[-5, 3, -5]}
        intensity={0.8}
        color="#4A90E2"
      />

      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        castShadow
      />

      <hemisphereLight color="#ffffff" groundColor="#444444" intensity={0.4} />
    </>
  );
}

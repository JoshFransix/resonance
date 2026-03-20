import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useProductStore } from '@/store/useProductStore';
import * as THREE from 'three';

export function AdvancedLighting() {
  const keyLightRef = useRef<THREE.DirectionalLight>(null);
  const rimLightRef = useRef<THREE.SpotLight>(null);
  const fillLightRef = useRef<THREE.DirectionalLight>(null);
  const lightingIntensity = useProductStore((state) => state.lightingIntensity);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.1;
    
    if (keyLightRef.current) {
      keyLightRef.current.position.x = Math.sin(t) * 4;
      keyLightRef.current.position.z = Math.cos(t) * 4;
    }
    
    if (rimLightRef.current) {
      rimLightRef.current.intensity = (Math.sin(t * 2) * 0.2 + 1.3) * lightingIntensity;
    }
  });

  useEffect(() => {
    if (keyLightRef.current) {
      keyLightRef.current.intensity = 2 * lightingIntensity;
    }
    if (fillLightRef.current) {
      fillLightRef.current.intensity = 0.8 * lightingIntensity;
    }
  }, [lightingIntensity]);

  return (
    <>
      <ambientLight intensity={0.4 * lightingIntensity} />
      
      <directionalLight
        ref={keyLightRef}
        position={[5, 6, 5]}
        intensity={2 * lightingIntensity}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-near={0.1}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.0001}
      />
      
      <directionalLight
        ref={fillLightRef}
        position={[-4, 2, -4]}
        intensity={0.8 * lightingIntensity}
        color="#ffffff"
      />
      
      <spotLight
        ref={rimLightRef}
        position={[-6, 4, -6]}
        angle={0.4}
        penumbra={1}
        intensity={1.5 * lightingIntensity}
        color="#6699ff"
        castShadow
      />
      
      <spotLight
        position={[6, 3, 3]}
        angle={0.3}
        penumbra={1}
        intensity={1 * lightingIntensity}
        color="#ff9944"
      />
      
      <hemisphereLight
        color="#ffffff"
        groundColor="#0a0a0f"
        intensity={0.6 * lightingIntensity}
      />
      
      <pointLight
        position={[0, 5, 0]}
        intensity={0.5 * lightingIntensity}
        color="#ffffff"
        distance={10}
        decay={2}
      />
    </>
  );
}

import { Grid, Stats, useHelper } from '@react-three/drei';
import { useProductStore } from '@/store/useProductStore';
import { useRef } from 'react';
import * as THREE from 'three';

export function SceneHelpers() {
  const showGrid = useProductStore((state) => state.showGrid);
  const showStats = useProductStore((state) => state.showStats);
  const lightRef = useRef<THREE.DirectionalLight>(null);

  return (
    <>
      {showGrid && (
        <Grid
          position={[0, -0.8, 0]}
          args={[20, 20]}
          cellSize={0.5}
          cellThickness={0.5}
          cellColor="#1F1F2A"
          sectionSize={2}
          sectionThickness={1}
          sectionColor="#2A2A3A"
          fadeDistance={25}
          fadeStrength={1}
          infiniteGrid
        />
      )}
      {showStats && <Stats />}
    </>
  );
}

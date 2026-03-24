import {
  EffectComposer,
  Bloom,
  DepthOfField,
  ChromaticAberration,
  Vignette,
  SSAO,
  ToneMapping,
} from "@react-three/postprocessing";
import { BlendFunction, ToneMappingMode } from "postprocessing";
import { useProductStore } from "@/store/useProductStore";
import * as THREE from "three";
import { useMemo } from "react";

export function PostProcessing() {
  const isPostProcessingEnabled = useProductStore(
    (state) => state.isPostProcessingEnabled,
  );

  const ssaoColor = useMemo(() => new THREE.Color("black"), []);
  const chromaticOffset = useMemo(() => new THREE.Vector2(0.0005, 0.0005), []);

  if (!isPostProcessingEnabled) return null;

  return (
    <EffectComposer multisampling={8}>
      <Bloom
        intensity={0.4}
        luminanceThreshold={0.9}
        luminanceSmoothing={0.9}
        blendFunction={BlendFunction.ADD}
      />
      <SSAO
        intensity={30}
        radius={0.5}
        luminanceInfluence={0.5}
        color={ssaoColor}
        worldDistanceThreshold={0.1}
        worldDistanceFalloff={0.1}
        worldProximityThreshold={0.1}
        worldProximityFalloff={0.1}
      />
      <DepthOfField
        focusDistance={0.01}
        focalLength={0.05}
        bokehScale={3}
        height={480}
      />
      <ChromaticAberration
        offset={chromaticOffset}
        radialModulation={false}
        modulationOffset={0}
        blendFunction={BlendFunction.NORMAL}
      />
      <Vignette
        offset={0.3}
        darkness={0.5}
        blendFunction={BlendFunction.NORMAL}
      />
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
    </EffectComposer>
  );
}

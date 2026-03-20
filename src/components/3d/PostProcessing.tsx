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

export function PostProcessing() {
  const isPostProcessingEnabled = useProductStore(
    (state) => state.isPostProcessingEnabled,
  );

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
        color="black"
      />
      <DepthOfField
        focusDistance={0.01}
        focalLength={0.05}
        bokehScale={3}
        height={480}
      />
      <ChromaticAberration
        offset={[0.0005, 0.0005]}
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

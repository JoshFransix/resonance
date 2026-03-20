import { create } from 'zustand';

export type ProductVariant = 'midnight-black' | 'silver-mist' | 'deep-navy';
export type CameraState = 'hero' | 'side-profile' | 'material-closeup' | 'detail';
export type Section = 'hero' | 'design' | 'comfort' | 'features';
export type ViewMode = 'standard' | 'exploded' | 'wireframe' | 'xray';
export type InteractionMode = 'orbit' | 'showcase' | 'inspect';

interface ProductStore {
  activeVariant: ProductVariant;
  currentSection: Section;
  cameraState: CameraState;
  isLoading: boolean;
  viewMode: ViewMode;
  interactionMode: InteractionMode;
  selectedPart: string | null;
  isExploded: boolean;
  isAnimating: boolean;
  showAnnotations: boolean;
  isPostProcessingEnabled: boolean;
  materialRoughness: number;
  materialMetalness: number;
  autoRotate: boolean;
  wireframeMode: boolean;
  showGrid: boolean;
  showStats: boolean;
  lightingIntensity: number;
  bloomIntensity: number;
  
  setActiveVariant: (variant: ProductVariant) => void;
  setCurrentSection: (section: Section) => void;
  setCameraState: (state: CameraState) => void;
  setIsLoading: (loading: boolean) => void;
  setViewMode: (mode: ViewMode) => void;
  setInteractionMode: (mode: InteractionMode) => void;
  setSelectedPart: (partId: string | null) => void;
  toggleExploded: () => void;
  setIsAnimating: (animating: boolean) => void;
  toggleAnnotations: () => void;
  togglePostProcessing: () => void;
  setMaterialRoughness: (value: number) => void;
  setMaterialMetalness: (value: number) => void;
  toggleAutoRotate: () => void;
  toggleWireframe: () => void;
  toggleGrid: () => void;
  toggleStats: () => void;
  setLightingIntensity: (value: number) => void;
  setBloomIntensity: (value: number) => void;
  resetSettings: () => void;
}

export const useProductStore = create<ProductStore>((set) => ({
  activeVariant: 'midnight-black',
  currentSection: 'hero',
  cameraState: 'hero',
  isLoading: true,
  viewMode: 'standard',
  interactionMode: 'orbit',
  selectedPart: null,
  isExploded: false,
  isAnimating: false,
  showAnnotations: false,
  isPostProcessingEnabled: true,
  materialRoughness: 0.4,
  materialMetalness: 0.0,
  autoRotate: false,
  wireframeMode: false,
  showGrid: false,
  showStats: false,
  lightingIntensity: 1.0,
  bloomIntensity: 0.4,
  
  setActiveVariant: (variant) => set({ activeVariant: variant }),
  setCurrentSection: (section) => set({ currentSection: section }),
  setCameraState: (state) => set({ cameraState: state }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setViewMode: (mode) => set({ viewMode: mode }),
  setInteractionMode: (mode) => set({ interactionMode: mode }),
  setSelectedPart: (partId) => set({ selectedPart: partId }),
  toggleExploded: () => set((state) => ({ isExploded: !state.isExploded })),
  setIsAnimating: (animating) => set({ isAnimating: animating }),
  toggleAnnotations: () => set((state) => ({ showAnnotations: !state.showAnnotations })),
  togglePostProcessing: () => set((state) => ({ isPostProcessingEnabled: !state.isPostProcessingEnabled })),
  setMaterialRoughness: (value) => set({ materialRoughness: value }),
  setMaterialMetalness: (value) => set({ materialMetalness: value }),
  toggleAutoRotate: () => set((state) => ({ autoRotate: !state.autoRotate })),
  toggleWireframe: () => set((state) => ({ wireframeMode: !state.wireframeMode })),
  toggleGrid: () => set((state) => ({ showGrid: !state.showGrid })),
  toggleStats: () => set((state) => ({ showStats: !state.showStats })),
  setLightingIntensity: (value) => set({ lightingIntensity: value }),
  setBloomIntensity: (value) => set({ bloomIntensity: value }),
  resetSettings: () => set({
    viewMode: 'standard',
    isExploded: false,
    showAnnotations: false,
    materialRoughness: 0.4,
    materialMetalness: 0.0,
    autoRotate: false,
    wireframeMode: false,
    lightingIntensity: 1.0,
    bloomIntensity: 0.4,
  }),
}));

export type ViewMode = 'standard' | 'exploded' | 'wireframe' | 'xray';
export type InteractionMode = 'orbit' | 'showcase' | 'inspect';

export interface ModelPart {
  id: string;
  name: string;
  position: [number, number, number];
  description: string;
  material: string;
}

export const MODEL_PARTS: ModelPart[] = [
  { id: 'left-cup', name: 'Left Ear Cup', position: [-0.8, 0, 0], description: '40mm dynamic driver with enhanced bass response', material: 'plastic' },
  { id: 'right-cup', name: 'Right Ear Cup', position: [0.8, 0, 0], description: '40mm dynamic driver with enhanced bass response', material: 'plastic' },
  { id: 'left-cushion', name: 'Left Cushion', position: [-0.8, 0, 0], description: 'Memory foam with protein leather', material: 'fabric' },
  { id: 'right-cushion', name: 'Right Cushion', position: [0.8, 0, 0], description: 'Memory foam with protein leather', material: 'fabric' },
  { id: 'headband', name: 'Headband', position: [0, 1.2, 0], description: 'Adjustable stainless steel frame', material: 'metal' },
  { id: 'headband-pad', name: 'Headband Padding', position: [0, 1.2, 0], description: 'Soft foam padding for comfort', material: 'fabric' },
  { id: 'left-hinge', name: 'Left Hinge', position: [-0.5, 0.5, 0], description: 'Precision-engineered rotating hinge', material: 'metal' },
  { id: 'right-hinge', name: 'Right Hinge', position: [0.5, 0.5, 0], description: 'Precision-engineered rotating hinge', material: 'metal' },
];

export const EXPLODE_DISTANCE = 0.8;

export interface MaterialSettings {
  roughness: number;
  metalness: number;
  clearcoat: number;
  clearcoatRoughness: number;
  envMapIntensity: number;
  emissive: string;
  emissiveIntensity: number;
}

export const MATERIAL_PRESETS: Record<string, MaterialSettings> = {
  plastic: {
    roughness: 0.4,
    metalness: 0.0,
    clearcoat: 0.3,
    clearcoatRoughness: 0.4,
    envMapIntensity: 1.0,
    emissive: '#000000',
    emissiveIntensity: 0,
  },
  metal: {
    roughness: 0.2,
    metalness: 0.95,
    clearcoat: 0.0,
    clearcoatRoughness: 0.0,
    envMapIntensity: 1.5,
    emissive: '#000000',
    emissiveIntensity: 0,
  },
  fabric: {
    roughness: 0.85,
    metalness: 0.0,
    clearcoat: 0.0,
    clearcoatRoughness: 0.0,
    envMapIntensity: 0.6,
    emissive: '#000000',
    emissiveIntensity: 0,
  },
};

export const ANIMATION_PRESETS = [
  { id: 'rotate-360', name: 'Full Rotation', duration: 8 },
  { id: 'showcase', name: 'Showcase', duration: 12 },
  { id: 'explode-assemble', name: 'Explode & Assemble', duration: 6 },
  { id: 'material-transition', name: 'Material Morph', duration: 10 },
];

export const LIGHTING_PRESETS = [
  { id: 'studio', name: 'Studio', intensity: 1.0, color: '#ffffff' },
  { id: 'sunset', name: 'Golden Hour', intensity: 1.2, color: '#ffaa44' },
  { id: 'dramatic', name: 'Dramatic', intensity: 1.5, color: '#4488ff' },
  { id: 'soft', name: 'Soft Light', intensity: 0.8, color: '#ffffff' },
];

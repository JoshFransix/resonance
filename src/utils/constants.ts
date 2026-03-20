import type { ProductVariant, CameraState } from '../store/useProductStore';


export const VARIANT_COLORS: Record<ProductVariant, { primary: string; secondary: string; accent: string }> = {
  'midnight-black': {
    primary: '#0A0A0F',
    secondary: '#1A1A25',
    accent: '#2C2C38',
  },
  'silver-mist': {
    primary: '#C8C9CE',
    secondary: '#E8E9ED',
    accent: '#A8A9AE',
  },
  'deep-navy': {
    primary: '#0F1B2E',
    secondary: '#1A2942',
    accent: '#243A5A',
  },
};

export const VARIANT_DISPLAY_NAMES: Record<ProductVariant, string> = {
  'midnight-black': 'Midnight Black',
  'silver-mist': 'Silver Mist',
  'deep-navy': 'Deep Navy',
};

export const CAMERA_POSITIONS: Record<CameraState, { position: [number, number, number]; target: [number, number, number] }> = {
  hero: {
    position: [3.5, 2, 4],
    target: [0, 0, 0],
  },
  'side-profile': {
    position: [5, 0.5, 0],
    target: [0, 0, 0],
  },
  'material-closeup': {
    position: [1.5, 1.2, 1.5],
    target: [0, 0.8, 0],
  },
  detail: {
    position: [2, 0.5, 2.5],
    target: [0, -0.3, 0],
  },
};

export const SECTION_CONTENT = {
  hero: {
    title: 'Sonic Precision',
    subtitle: 'Engineering Excellence in Every Detail',
    description: 'Experience sound crafted through advanced acoustic engineering and premium materials.',
  },
  design: {
    title: 'Minimal Form',
    subtitle: 'Where Function Meets Aesthetic',
    description: 'Clean lines and premium materials define a timeless silhouette.',
  },
  comfort: {
    title: 'Designed for Hours',
    subtitle: 'Memory Foam Excellence',
    description: 'Adaptive cushions and breathable fabric provide all-day comfort.',
  },
  features: {
    title: 'Technical Mastery',
    subtitle: 'Innovation You Can Hear',
    description: '40mm drivers, active noise cancellation, and 30-hour battery life.',
  },
};

export const HOTSPOTS = [
  {
    id: 'cushion',
    position: [0.8, 0.6, 0] as [number, number, number],
    title: 'Premium Cushions',
    description: 'Memory foam wrapped in breathable fabric',
  },
  {
    id: 'hinge',
    position: [0.5, 0, 0.3] as [number, number, number],
    title: 'Precision Hinge',
    description: 'Engineered for durability and smooth adjustment',
  },
  {
    id: 'headband',
    position: [0, 1.2, 0] as [number, number, number],
    title: 'Adjustable Headband',
    description: 'Lightweight aluminum frame with soft padding',
  },
];

export const SCROLL_SECTIONS = [
  { section: 'hero' as const, camera: 'hero' as const, progress: 0 },
  { section: 'design' as const, camera: 'side-profile' as const, progress: 0.25 },
  { section: 'comfort' as const, camera: 'material-closeup' as const, progress: 0.5 },
  { section: 'features' as const, camera: 'detail' as const, progress: 0.75 },
];

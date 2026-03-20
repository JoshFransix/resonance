import { useProductStore } from '@/store/useProductStore';
import { VariantSelector } from './VariantSelector';
import { ControlPanel } from './ControlPanel';
import { PartsExplorer } from './PartsExplorer';

export function AdvancedOverlay() {
  const selectedPart = useProductStore((state) => state.selectedPart);
  const viewMode = useProductStore((state) => state.viewMode);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-8 py-6 bg-gradient-to-b from-background/80 to-transparent backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-text-primary font-bold text-3xl tracking-tight mb-1">Resonance</h1>
            <p className="text-text-secondary text-sm">Premium Audio Experience</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-text-primary font-medium text-sm">
                {viewMode === 'standard' && 'Standard View'}
                {viewMode === 'exploded' && 'Exploded View'}
                {viewMode === 'wireframe' && 'Wireframe Mode'}
                {viewMode === 'xray' && 'X-Ray Vision'}
              </p>
              <p className="text-text-secondary text-xs">
                {selectedPart ? 'Part Selected' : 'Interactive Mode'}
              </p>
            </div>
          </div>
        </div>
      </header>

      <ControlPanel />
      <PartsExplorer />
      <VariantSelector />

      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
        <div className="bg-surface/80 backdrop-blur-md rounded-full px-6 py-3 border border-accent flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-text-secondary text-sm">Interactive</span>
          </div>
          <div className="w-px h-4 bg-accent" />
          <span className="text-text-primary text-sm font-medium">
            Drag to rotate • Scroll to zoom • Click parts to inspect
          </span>
        </div>
      </div>

      <footer className="fixed bottom-2 right-6 z-40 text-text-secondary text-xs">
        <p>© 2026 Resonance by Joshua Fransix</p>
      </footer>
    </>
  );
}

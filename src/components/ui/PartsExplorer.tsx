import { useProductStore } from '@/store/useProductStore';
import { MODEL_PARTS } from '@/utils/advancedConstants';
import { useState } from 'react';

export function PartsExplorer() {
  const [isOpen, setIsOpen] = useState(false);
  const selectedPart = useProductStore((state) => state.selectedPart);
  const setSelectedPart = useProductStore((state) => state.setSelectedPart);
  const isExploded = useProductStore((state) => state.isExploded);
  const toggleExploded = useProductStore((state) => state.toggleExploded);

  return (
    <div className={`fixed left-6 top-24 z-40 transition-transform duration-300 ${!isOpen ? '-translate-x-[calc(100%+2rem)]' : ''}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-12 top-4 bg-surface/90 backdrop-blur-md p-3 rounded-r-xl border border-l-0 border-accent hover:bg-accent transition-colors"
      >
        <svg className={`w-5 h-5 text-text-primary transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div className="bg-surface/90 backdrop-blur-md rounded-2xl border border-accent shadow-2xl p-6 w-80 max-h-[calc(100vh-8rem)] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-text-primary font-bold text-xl">Parts Explorer</h2>
          <button
            onClick={toggleExploded}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              isExploded
                ? 'bg-text-primary text-background'
                : 'bg-accent text-text-secondary hover:bg-accent/60'
            }`}
          >
            {isExploded ? 'Assembled' : 'Exploded'}
          </button>
        </div>

        <div className="space-y-2">
          {MODEL_PARTS.map((part) => (
            <button
              key={part.id}
              onClick={() => setSelectedPart(selectedPart === part.id ? null : part.id)}
              className={`w-full text-left p-4 rounded-xl border transition-all ${
                selectedPart === part.id
                  ? 'bg-accent border-text-primary'
                  : 'bg-background/50 border-accent hover:border-text-secondary'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className={`font-medium ${selectedPart === part.id ? 'text-text-primary' : 'text-text-secondary'}`}>
                  {part.name}
                </h3>
                <span className={`text-xs px-2 py-0.5 rounded ${
                  part.material === 'metal' ? 'bg-blue-500/20 text-blue-300' :
                  part.material === 'fabric' ? 'bg-purple-500/20 text-purple-300' :
                  'bg-gray-500/20 text-gray-300'
                }`}>
                  {part.material}
                </span>
              </div>
              <p className="text-text-secondary text-xs leading-relaxed">
                {part.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

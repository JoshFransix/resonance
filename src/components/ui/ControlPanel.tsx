import { useProductStore } from "@/store/useProductStore";

import { useState } from "react";

export function ControlPanel() {
  const [isOpen, setIsOpen] = useState(true);
  const store = useProductStore();

  return (
    <div
      className={`fixed right-6 top-24 z-40 transition-transform duration-300 ${!isOpen ? "translate-x-[calc(100%+2rem)]" : ""}`}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -left-12 top-4 bg-surface/90 backdrop-blur-md p-3 rounded-l-xl border border-r-0 border-accent hover:bg-accent transition-colors"
      >
        <svg
          className={`w-5 h-5 text-text-primary transition-transform ${!isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      <div className="bg-surface/90 backdrop-blur-md rounded-2xl border border-accent shadow-2xl p-6 w-80 max-h-[calc(100vh-8rem)] overflow-y-auto">
        <h2 className="text-text-primary font-bold text-xl mb-6">Controls</h2>

        {/* View Modes */}
        <div className="mb-6">
          <h3 className="text-text-secondary text-sm font-medium mb-3 uppercase tracking-wide">
            View Mode
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {(["standard", "exploded", "wireframe", "xray"] as const).map(
              (mode) => (
                <button
                  key={mode}
                  onClick={() => store.setViewMode(mode)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    store.viewMode === mode
                      ? "bg-text-primary text-background"
                      : "bg-accent text-text-secondary hover:bg-accent/60"
                  }`}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ),
            )}
          </div>
        </div>

        {/* Display Options */}
        <div className="mb-6">
          <h3 className="text-text-secondary text-sm font-medium mb-3 uppercase tracking-wide">
            Display
          </h3>
          <div className="space-y-2">
            <ToggleButton
              label="Exploded View"
              checked={store.isExploded}
              onChange={store.toggleExploded}
            />
            <ToggleButton
              label="Auto Rotate"
              checked={store.autoRotate}
              onChange={store.toggleAutoRotate}
            />
            <ToggleButton
              label="Wireframe"
              checked={store.wireframeMode}
              onChange={store.toggleWireframe}
            />
            <ToggleButton
              label="Annotations"
              checked={store.showAnnotations}
              onChange={store.toggleAnnotations}
            />
            <ToggleButton
              label="Post Processing"
              checked={store.isPostProcessingEnabled}
              onChange={store.togglePostProcessing}
            />
            <ToggleButton
              label="Grid"
              checked={store.showGrid}
              onChange={store.toggleGrid}
            />
            <ToggleButton
              label="Stats"
              checked={store.showStats}
              onChange={store.toggleStats}
            />
          </div>
        </div>

        {/* Material Settings */}
        <div className="mb-6">
          <h3 className="text-text-secondary text-sm font-medium mb-3 uppercase tracking-wide">
            Material
          </h3>
          <div className="space-y-4">
            <Slider
              label="Roughness"
              value={store.materialRoughness}
              onChange={store.setMaterialRoughness}
              min={0}
              max={1}
              step={0.01}
            />
            <Slider
              label="Metalness"
              value={store.materialMetalness}
              onChange={store.setMaterialMetalness}
              min={0}
              max={1}
              step={0.01}
            />
          </div>
        </div>

        {/* Lighting */}
        <div className="mb-6">
          <h3 className="text-text-secondary text-sm font-medium mb-3 uppercase tracking-wide">
            Lighting
          </h3>
          <Slider
            label="Intensity"
            value={store.lightingIntensity}
            onChange={store.setLightingIntensity}
            min={0.1}
            max={3}
            step={0.1}
          />
          <Slider
            label="Bloom"
            value={store.bloomIntensity}
            onChange={store.setBloomIntensity}
            min={0}
            max={2}
            step={0.1}
          />
        </div>

        {/* Interaction Mode */}
        <div className="mb-6">
          <h3 className="text-text-secondary text-sm font-medium mb-3 uppercase tracking-wide">
            Interaction
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {(["orbit", "showcase", "inspect"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => store.setInteractionMode(mode)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  store.interactionMode === mode
                    ? "bg-text-primary text-background"
                    : "bg-accent text-text-secondary hover:bg-accent/60"
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={store.resetSettings}
          className="w-full px-4 py-2 bg-accent hover:bg-accent/60 text-text-primary rounded-lg text-sm font-medium transition-colors"
        >
          Reset All Settings
        </button>
      </div>
    </div>
  );
}

function ToggleButton({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center justify-between cursor-pointer group">
      <span className="text-text-secondary text-sm group-hover:text-text-primary transition-colors">
        {label}
      </span>
      <button
        onClick={onChange}
        className={`relative w-11 h-6 rounded-full transition-colors ${
          checked ? "bg-text-primary" : "bg-accent"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-background rounded-full transition-transform ${
            checked ? "translate-x-5" : ""
          }`}
        />
      </button>
    </label>
  );
}

function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-text-secondary text-sm">{label}</span>
        <span className="text-text-primary text-sm font-mono">
          {value.toFixed(2)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-accent rounded-lg appearance-none cursor-pointer slider"
      />
    </div>
  );
}

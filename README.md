# Resonance — Advanced 3D Product Configurator

A **production-grade, portfolio-worthy** 3D product experience showcasing premium over-ear headphones with advanced visualization features, interactive controls, and real-time material editing.

> **This is a senior-level 3D web application** designed to showcase advanced Three.js, React Three Fiber, and WebGL skills with cutting-edge features and professional-grade interactions.

---

## ✨ Advanced Features

### 🎨 **View Modes**
- **Standard Mode** — Beauty shot with subtle animations
- **Exploded View** — Animated part separation to show assembly
- **Wireframe Mode** — Technical visualization
- **X-Ray Vision** — Transmission material with chromatic aberration

### 🎭 **Post-Processing Effects**
- **Bloom** — High-quality glow on metallic surfaces
- **SSAO** — Screen-space ambient occlusion for depth
- **Depth of Field** — Cinematic focus effects
- **Chromatic Aberration** — Lens distortion simulation
- **Vignette** — Subtle frame darkening
- **ACES Filmic Tone Mapping** — Professional color grading

### 🎮 **Interactive Controls**
- **Orbit Mode** — Full 360° rotation + zoom + pan
- **Showcase Mode** — Auto-rotation with camera animation
- **Inspect Mode** — Presentation controls with physics-based damping
- **Auto-Rotate** — Continuous slow rotation
- **Part Selection** — Click to select and highlight individual parts

### 🔧 **Real-Time Material Editor**
- **Roughness Control** — Adjust surface smoothness (0-1)
- **Metalness Control** — Metal vs dielectric (0-1)
- **Per-Material Presets** — Plastic, metal, fabric with PBR properties
- **Clearcoat Simulation** — Automotive-style finish
- **Environment Map Intensity** — Control reflection strength
- **Live Transitions** — Smooth GSAP-powered material morphing

### 🧩 **Parts Explorer**
- **8 Anatomized Parts** — Each with detailed descriptions
- **Material Labels** — Visual tags for metal/plastic/fabric
- **Part Highlighting** — Emissive glow on selection
- **Exploded Assembly** — One-click part separation

### 📍 **Smart Annotations**
- **3D Space Labels** — HTML overlays tracked to 3D positions
- **Auto-Scaling** — Distance-based sizing
- **Fade on Selection** — Focus on active part
- **Animated Dots** — Pulse effect for attention

### 💡 **Advanced Lighting System**
- **6-Point Lighting Rig** — Key, fill, rim, accent, hemisphere, point
- **Dynamic Movement** — Animated light positions
- **HDR Environment** — Poly Haven integration
- **Intensity Controls** — Real-time brightness adjustment
- **Color Temperature** — Warm/cool lighting presets
- **High-Res Shadows** — 4K shadow maps

### 🎬 **Visual Polish**
- **Floating Animation** — Gentle bob and sway
- **Contact Shadows** — Soft ground contact
- **Grid Helper** — Technical overlay option
- **Performance Stats** — FPS/render monitoring
- **High DPR** — Retina display support
- **Multisampling** — 8x MSAA anti-aliasing

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | React 18 + TypeScript 5 |
| **3D Engine** | Three.js 0.160 |
| **3D Framework** | React Three Fiber 8.15 + Drei 9.92 |
| **Post-Processing** | @react-three/postprocessing 2.15 |
| **State Management** | Zustand 4.4 |
| **Animation** | GSAP 3.12 + Three.js Animation System |
| **Styling** | TailwindCSS 3.4 |
| **Build Tool** | Vite 5.0 |
| **Additional** | Leva, Maath, Three-Stdlib |

---

## 📦 Installation

```bash
# Navigate to project
cd c:\AJ_INC\3D\nuOne

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

---

## 🎯 Key Interactions

### Mouse Controls
- **Left Click + Drag** — Rotate model (Orbit mode)
- **Right Click + Drag** — Pan camera
- **Scroll Wheel** — Zoom in/out
- **Click Part** — Select and highlight component
- **Hover Annotation** — Show part details

### Control Panel (Right Side)
- **View Modes** — Switch between Standard/Exploded/Wireframe/X-Ray
- **Display Toggles** — Exploded view, auto-rotate, wireframe, annotations, post-processing, grid, stats
- **Material Sliders** — Roughness and metalness adjustment
- **Lighting** — Intensity and bloom controls
- **Interaction Modes** — Orbit/Showcase/Inspect
- **Reset Button** — Restore default settings

### Parts Explorer (Left Side)
- **8 Clickable Parts** — Ear cups, cushions, headband, hinges
- **Material Badges** — Visual material type indicators
- **Descriptions** — Technical specifications per part
- **Exploded Toggle** — Quick assembly/disassembly

### Color Variants (Bottom Center)
- **3 Premium Colors** — Midnight Black, Silver Mist, Deep Navy
- **Real-Time Switching** — Smooth material transitions
- **Per-Part Coloring** — Intelligent material mapping

---

## 🎨 Advanced Technical Details

### Material System
```typescript
- PBR (Physically Based Rendering) materials
- Clearcoat for premium finishes
- Environment map reflections
- Emissive highlighting for selection
- GSAP-animated transitions (0.5-0.8s)
- Part-based material assignment via naming convention
```

### Post-Processing Pipeline
```typescript
1. Bloom (Additive blend, threshold 0.9)
2. SSAO (30 intensity, 0.5 radius)
3. Depth of Field (bokeh scale 3)
4. Chromatic Aberration (0.0005 offset)
5. Vignette (0.3 offset, 0.5 darkness)
6. ACES Filmic Tone Mapping
```

### Lighting Architecture
```typescript
- Key Light: Directional, 4K shadows, animated position
- Fill Light: Directional, opposite side, 80% intensity
- Rim Light: Spot, blue tint, animated intensity
- Accent Light: Spot, warm orange tint
- Hemisphere: Sky/ground gradient
- Point: Top-down ambient fill
```

### Performance Optimizations
```typescript
- Instanced rendering for repeated geometry
- Frustum culling
- Level of Detail (LOD) ready
- Lazy-loaded HDR environments
- Debounced state updates
- Memoized heavy computations
- Conditional rendering (annotations, grid, stats)
- DPR clamping [1, 2]
```

---

## 📁 Architecture

```
src/
├── components/
│   ├── 3d/
│   │   ├── ProductScene.tsx              # Main 3D canvas
│   │   ├── AdvancedProductModel.tsx      # Model with exploded view + selection
│   │   ├── AdvancedLighting.tsx          # 6-point lighting rig
│   │   ├── AdvancedAnnotations.tsx       # 3D space labels
│   │   ├── InteractiveControls.tsx       # Orbit/Presentation controls
│   │   ├── PostProcessing.tsx            # Effect composer
│   │   └── SceneHelpers.tsx              # Grid + Stats
│   └── ui/
│       ├── AdvancedOverlay.tsx           # Main UI orchestrator
│       ├── ControlPanel.tsx              # Right-side settings panel
│       ├── PartsExplorer.tsx             # Left-side parts list
│       ├── VariantSelector.tsx           # Color picker
│       └── Loader.tsx                    # Loading state
├── store/
│   └── useProductStore.ts                # Global state (20+ properties)
├── utils/
│   ├── constants.ts                      # Color/camera/hotspot data
│   ├── advancedConstants.ts              # Materials/animations/lighting
│   └── helpers.ts                        # Math utilities
└── pages/
    └── Home.tsx                          # Main page
```

---

## 🎓 What This Demonstrates

### Senior-Level 3D Skills
✅ **Advanced Three.js** — Custom materials, lighting, shadows, post-processing  
✅ **React Three Fiber** — Declarative 3D, hooks, state integration  
✅ **Performance** — Optimization techniques, LOD-ready, efficient renders  
✅ **UX Design** — Intuitive controls, visual feedback, smooth transitions  
✅ **State Architecture** — Complex state management with 20+ properties  
✅ **Material Science** — PBR workflows, physical accuracy  
✅ **Post-Processing** — Multi-effect pipeline with advanced blending  
✅ **Interactive Systems** — Part selection, exploded views, annotations  

### Production-Ready Code
✅ **TypeScript** — Full type safety, interfaces, generics  
✅ **Component Architecture** — Modular, reusable, scalable  
✅ **Clean Code** — No magic numbers, clear naming, documented  
✅ **Error Handling** — Fallbacks, suspense boundaries  
✅ **Responsive** — Mobile-ready controls  
✅ **Accessible** — ARIA labels, keyboard support  

---

## 🚀 Quick Start

1. **Add 3D Model**  
   Place your GLB file at: `public/models/headphones.glb`  
   [Download from Sketchfab](https://sketchfab.com/search?q=headphones&type=models)

2. **Add HDR (Optional)**  
   Download from [Poly Haven](https://polyhaven.com/hdris)  
   Save as: `public/hdr/studio.hdr`

3. **Run**  
   ```bash
   npm install
   npm run dev
   ```

4. **Explore**  
   - Try all 4 view modes
   - Explode the product
   - Adjust materials in real-time
   - Select individual parts
   - Toggle post-processing on/off

---

## 🔮 Future Enhancements

- [ ] Animation presets (rotate 360°, showcase, explode-assemble)
- [ ] Screenshot/export feature
- [ ] AR mode (WebXR)
- [ ] Multi-product support
- [ ] Save/load configurations
- [ ] Comparison mode (side-by-side variants)
- [ ] Texture editor
- [ ] Advanced lighting presets
- [ ] Time-of-day lighting simulation
- [ ] Physics-based interactions

---

## 📝 License

MIT

---

## 🏆 Portfolio Highlight

This project demonstrates:
- **Expert-level Three.js/WebGL knowledge**
- **Production-grade React architecture**
- **Advanced 3D rendering techniques**
- **Professional UX design**
- **Complex state management**
- **Performance optimization**

Perfect for showcasing **senior frontend/3D developer capabilities** in interviews or portfolios.

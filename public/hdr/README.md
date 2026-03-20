# HDR Environment Maps

## Required Asset: Studio HDR

Place your environment map here as `studio.hdr`.

### Recommended HDRIs from Poly Haven

**Best for Product Photography:**
- [studio_small_03](https://polyhaven.com/a/studio_small_03) — Clean studio with soft lighting
- [photo_studio_01](https://polyhaven.com/a/photo_studio_01) — Professional photo studio
- [empty_warehouse_01](https://polyhaven.com/a/empty_warehouse_01) — Industrial minimal look

**Alternative Styles:**
- [industrial_sunset_02](https://polyhaven.com/a/industrial_sunset_02) — Warm sunset tones
- [kiara_1_dawn](https://polyhaven.com/a/kiara_1_dawn) — Soft natural dawn light
- [quattro_canti](https://polyhaven.com/a/quattro_canti) — Architectural lighting

### Download Instructions

1. Visit [polyhaven.com/hdris](https://polyhaven.com/hdris)
2. Choose an HDRI
3. Click "Download"
4. Select resolution:
   - **2K** (recommended) — Good quality, smaller file size
   - **4K** — Higher quality, larger file size
   - **8K+** — Only if needed, may impact performance
5. Download **HDR** format (not JPG or EXR)
6. Rename to `studio.hdr`
7. Place in this folder

### File Specifications

**Format:** HDR (High Dynamic Range)
**Resolution:** 2K-4K recommended
**File Size:** 5-20MB typical

### Multiple Environment Maps

You can add multiple HDR files and switch between them:

```tsx
// In ProductScene.tsx
<Environment
  files="/hdr/studio.hdr"
  // or
  files="/hdr/sunset.hdr"
  background={false}
  blur={0.8}
/>
```

### Fallback

If no HDR is provided, the app will fall back to a built-in preset. To revert:

```tsx
<Environment preset="studio" background={false} blur={0.8} />
```

### Adjust Lighting Intensity

Control environment intensity in ProductScene.tsx:

```tsx
<Environment
  files="/hdr/studio.hdr"
  background={false}
  blur={0.8}
  intensity={1.5}  // Adjust brightness (default: 1)
/>
```

---

Once you add `studio.hdr`, the lighting will automatically update!

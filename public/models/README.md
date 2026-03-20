# 3D Assets Directory

## Required Asset: Headphones Model

Place your premium headphones GLB model here as `headphones.glb`.

### Model Specifications

**File Format:** GLB (Binary glTF)

**Recommended Specifications:**
- Triangles: 50k - 100k
- Texture Resolution: 2048x2048 or 4096x4096
- File Size: Under 10MB

**Part Naming Convention:**

For automatic material assignment, name your model parts:

- `cushion_left` / `cushion_right` — Ear cushions (fabric material)
- `pad_left` / `pad_right` — Ear pads
- `headband` — Main headband structure
- `headband_pad` — Headband cushion
- `hinge_left` / `hinge_right` — Adjustment hinges (metallic)
- `metal_slider_left` / `metal_slider_right` — Metal components
- `body_left` / `body_right` — Main ear cup bodies (matte plastic)
- `speaker_grill_left` / `speaker_grill_right` — Speaker grills

### Where to Get Models

**Free Sources:**
- [Sketchfab](https://sketchfab.com/search?q=headphones&type=models) — Filter by "Downloadable"
- [Poly Pizza](https://poly.pizza/) — Open source 3D models
- [Clara.io](https://clara.io/) — Free tier available

**Create Your Own:**
- Blender (Free, open-source)
- Cinema 4D
- Maya

**Commission:**
- Fiverr
- Upwork
- CGTrader Studios

### Optimization Tips

Before exporting:
1. Apply transforms
2. Merge duplicate vertices
3. Remove internal faces
4. Bake high-poly details to normal maps
5. Compress textures
6. Use Draco compression in glTF export

### Example Export Settings (Blender)

```
Format: glTF Binary (.glb)
Include: Selected Objects
Transform: +Y Up
Geometry:
  ✓ Apply Modifiers
  ✓ UVs
  ✓ Normals
  ✓ Vertex Colors
Compression: Draco
Materials: Export
```

---

Once you add `headphones.glb`, the app will automatically load and render it.

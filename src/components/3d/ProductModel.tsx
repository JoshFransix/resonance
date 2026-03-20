import { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useProductStore } from "@/store/useProductStore";
import { VARIANT_COLORS } from "@/utils/constants";
import * as THREE from "three";
import type { Group } from "three";
import { gsap } from "gsap";

interface ProductModelProps {
  modelPath?: string;
}

export function ProductModel({
  modelPath = "/models/headphones.glb",
}: ProductModelProps) {
  const groupRef = useRef<Group>(null);
  const activeVariant = useProductStore((state) => state.activeVariant);
  const setIsLoading = useProductStore((state) => state.setIsLoading);

  const { scene } = useGLTF(modelPath);

  useEffect(() => {
    if (scene) {
      setIsLoading(false);
    }
  }, [scene, setIsLoading]);

  useEffect(() => {
    if (!scene) return;

    const colors = VARIANT_COLORS[activeVariant];

    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const material = child.material as THREE.MeshStandardMaterial;

        if (material) {
          const materialClone = material.clone();

          if (
            child.name.toLowerCase().includes("cushion") ||
            child.name.toLowerCase().includes("pad")
          ) {
            gsap.to(materialClone.color, {
              r: parseInt(colors.accent.slice(1, 3), 16) / 255,
              g: parseInt(colors.accent.slice(3, 5), 16) / 255,
              b: parseInt(colors.accent.slice(5, 7), 16) / 255,
              duration: 0.5,
            });
            materialClone.roughness = 0.8;
          } else if (
            child.name.toLowerCase().includes("metal") ||
            child.name.toLowerCase().includes("hinge")
          ) {
            gsap.to(materialClone.color, {
              r: parseInt(colors.secondary.slice(1, 3), 16) / 255,
              g: parseInt(colors.secondary.slice(3, 5), 16) / 255,
              b: parseInt(colors.secondary.slice(5, 7), 16) / 255,
              duration: 0.5,
            });
            materialClone.roughness = 0.3;
            materialClone.metalness = 0.9;
          } else {
            gsap.to(materialClone.color, {
              r: parseInt(colors.primary.slice(1, 3), 16) / 255,
              g: parseInt(colors.primary.slice(3, 5), 16) / 255,
              b: parseInt(colors.primary.slice(5, 7), 16) / 255,
              duration: 0.5,
            });
            materialClone.roughness = 0.6;
          }

          child.material = materialClone;
          child.castShadow = true;
          child.receiveShadow = true;
        }
      }
    });
  }, [activeVariant, scene]);

  useEffect(() => {
    if (!groupRef.current) return;

    gsap.to(groupRef.current.rotation, {
      y: Math.PI * 2,
      duration: 20,
      repeat: -1,
      ease: "none",
    });
  }, []);

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={1.5} position={[0, -0.5, 0]} />
    </group>
  );
}

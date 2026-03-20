import { useRef, useEffect, useState } from 'react';
import { useGLTF, MeshTransmissionMaterial, Float } from '@react-three/drei';
import { useProductStore } from '@/store/useProductStore';
import { VARIANT_COLORS } from '@/utils/constants';
import { MATERIAL_PRESETS, EXPLODE_DISTANCE } from '@/utils/advancedConstants';
import * as THREE from 'three';
import type { Group, Mesh as ThreeMesh } from 'three';
import { gsap } from 'gsap';
import { useFrame } from '@react-three/fiber';

interface ProductModelProps {
  modelPath?: string;
}

export function AdvancedProductModel({ modelPath = '/models/headphones.glb' }: ProductModelProps) {
  const groupRef = useRef<Group>(null);
  const activeVariant = useProductStore((state) => state.activeVariant);
  const setIsLoading = useProductStore((state) => state.setIsLoading);
  const isExploded = useProductStore((state) => state.isExploded);
  const selectedPart = useProductStore((state) => state.selectedPart);
  const wireframeMode = useProductStore((state) => state.wireframeMode);
  const materialRoughness = useProductStore((state) => state.materialRoughness);
  const materialMetalness = useProductStore((state) => state.materialMetalness);
  const viewMode = useProductStore((state) => state.viewMode);
  const setSelectedPart = useProductStore((state) => state.setSelectedPart);
  
  const [parts, setParts] = useState<Map<string, { mesh: ThreeMesh; originalPosition: THREE.Vector3 }>>(new Map());
  const { scene } = useGLTF(modelPath);

  useEffect(() => {
    if (scene) {
      setIsLoading(false);
      const partMap = new Map();
      
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const originalPos = child.position.clone();
          partMap.set(child.name || child.uuid, { mesh: child, originalPosition: originalPos });
        }
      });
      
      setParts(partMap);
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
          let presetType = 'plastic';
          
          if (child.name.toLowerCase().includes('cushion') || child.name.toLowerCase().includes('pad')) {
            presetType = 'fabric';
            const hexColor = colors.accent;
            materialClone.color.setHex(parseInt(hexColor.replace('#', ''), 16));
          } else if (child.name.toLowerCase().includes('metal') || child.name.toLowerCase().includes('hinge')) {
            presetType = 'metal';
            const hexColor = colors.secondary;
            materialClone.color.setHex(parseInt(hexColor.replace('#', ''), 16));
          } else {
            const hexColor = colors.primary;
            materialClone.color.setHex(parseInt(hexColor.replace('#', ''), 16));
          }
          
          const preset = MATERIAL_PRESETS[presetType];
          gsap.to(materialClone, {
            roughness: materialRoughness,
            metalness: presetType === 'metal' ? materialMetalness : 0,
            clearcoat: preset.clearcoat,
            clearcoatRoughness: preset.clearcoatRoughness,
            envMapIntensity: preset.envMapIntensity,
            duration: 0.8,
          });
          
          materialClone.wireframe = wireframeMode;
          child.material = materialClone;
          child.castShadow = true;
          child.receiveShadow = true;
        }
      }
    });
  }, [activeVariant, scene, materialRoughness, materialMetalness, wireframeMode]);

  useEffect(() => {
    if (!parts.size || !scene) return;

    parts.forEach(({ mesh, originalPosition }) => {
      const distance = isExploded ? EXPLODE_DISTANCE : 0;
      const direction = originalPosition.clone().normalize();
      const targetPos = originalPosition.clone().add(direction.multiplyScalar(distance));
      
      gsap.to(mesh.position, {
        x: targetPos.x,
        y: targetPos.y,
        z: targetPos.z,
        duration: 1.2,
        ease: 'power2.inOut',
      });
    });
  }, [isExploded, parts, scene]);

  useEffect(() => {
    if (!scene) return;
    
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const material = child.material as THREE.MeshStandardMaterial;
        if (material) {
          if (child.name === selectedPart || child.uuid === selectedPart) {
            gsap.to(material, {
              emissiveIntensity: 0.3,
              duration: 0.3,
            });
            material.emissive.setHex(0x3388ff);
          } else {
            gsap.to(material, {
              emissiveIntensity: 0,
              duration: 0.3,
            });
          }
        }
      }
    });
  }, [selectedPart, scene]);

  useFrame(({ clock }) => {
    if (groupRef.current && viewMode === 'standard') {
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.1) * 0.05;
    }
  });

  const handlePartClick = (event: any) => {
    event.stopPropagation();
    const objectName = event.object.name || event.object.uuid;
    setSelectedPart(selectedPart === objectName ? null : objectName);
  };

  if (viewMode === 'xray') {
    return (
      <group ref={groupRef} position={[0, -0.5, 0]}>
        <primitive object={scene} scale={1.5}>
          {scene.children.map((child, index) => {
            if (child instanceof THREE.Mesh) {
              return (
                <mesh key={index} geometry={child.geometry} position={child.position}>
                  <MeshTransmissionMaterial
                    backside
                    samples={16}
                    thickness={0.5}
                    chromaticAberration={0.5}
                    anisotropy={1}
                    distortion={0.5}
                    distortionScale={0.5}
                    temporalDistortion={0.2}
                    iridescence={1}
                    iridescenceIOR={1}
                    iridescenceThicknessRange={[0, 1400]}
                  />
                </mesh>
              );
            }
            return null;
          })}
        </primitive>
      </group>
    );
  }

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={groupRef} onClick={handlePartClick}>
        <primitive object={scene} scale={1.5} position={[0, -0.5, 0]} />
      </group>
    </Float>
  );
}

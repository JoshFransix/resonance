import { useState, useCallback, useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface InteractionState {
  isHovered: boolean;
  hoveredObject: string | null;
  clickedObject: string | null;
}

export function useInteractions() {
  const { raycaster, camera, scene } = useThree();
  const [interactionState, setInteractionState] = useState<InteractionState>({
    isHovered: false,
    hoveredObject: null,
    clickedObject: null,
  });
  
  const mouseRef = useRef(new THREE.Vector2());

  const handlePointerMove = useCallback((event: PointerEvent) => {
    mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouseRef.current, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      const firstIntersect = intersects[0];
      setInteractionState((prev) => ({
        ...prev,
        isHovered: true,
        hoveredObject: firstIntersect.object.name || null,
      }));
    } else {
      setInteractionState((prev) => ({
        ...prev,
        isHovered: false,
        hoveredObject: null,
      }));
    }
  }, [raycaster, camera, scene]);

  const handleClick = useCallback(() => {
    setInteractionState((prev) => ({
      ...prev,
      clickedObject: prev.hoveredObject,
    }));
  }, []);

  const clearClickedObject = useCallback(() => {
    setInteractionState((prev) => ({
      ...prev,
      clickedObject: null,
    }));
  }, []);

  useEffect(() => {
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('click', handleClick);
    };
  }, [handlePointerMove, handleClick]);

  return {
    ...interactionState,
    clearClickedObject,
  };
}

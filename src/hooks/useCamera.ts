import { useEffect, useRef } from 'react';
import { useProductStore } from '@/store/useProductStore';
import type { CameraState } from '@/store/useProductStore';
import { gsap } from 'gsap';

// interface CameraConfig {
//   position: [number, number, number];
//   target: [number, number, number];
//   duration?: number;
//   ease?: string;
// }s

export function useCamera() {
  const cameraState = useProductStore((state) => state.cameraState);
  const setCameraState = useProductStore((state) => state.setCameraState);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const transitionToState = (state: CameraState) => {
    setCameraState(state);
    
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    timelineRef.current = gsap.timeline();
  };

  const resetCamera = () => {
    transitionToState('hero');
  };

  useEffect(() => {
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);

  return {
    currentState: cameraState,
    transitionToState,
    resetCamera,
  };
}

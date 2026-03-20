import { useEffect, useState, useCallback } from 'react';
import { useProductStore } from '@/store/useProductStore';
import { SCROLL_SECTIONS } from '@/utils/constants';
import { clamp } from '@/utils/helpers';
import { debounce } from '@/utils/helpers';

export function useScrollSync() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const setCurrentSection = useProductStore((state) => state.setCurrentSection);
  const setCameraState = useProductStore((state) => state.setCameraState);

  const handleScroll = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const currentScroll = window.scrollY;
    const progress = clamp(currentScroll / scrollHeight, 0, 1);
    
    setScrollProgress(progress);

    let activeSection = SCROLL_SECTIONS[0];
    
    for (let i = SCROLL_SECTIONS.length - 1; i >= 0; i--) {
      if (progress >= SCROLL_SECTIONS[i].progress) {
        activeSection = SCROLL_SECTIONS[i];
        break;
      }
    }

    setCurrentSection(activeSection.section);
    setCameraState(activeSection.camera);
  }, [setCurrentSection, setCameraState]);

  const debouncedScroll = useCallback(
    debounce(handleScroll, 10),
    [handleScroll]
  );

  useEffect(() => {
    const scrollContainer = document.createElement('div');
    scrollContainer.style.height = '400vh';
    scrollContainer.style.position = 'absolute';
    scrollContainer.style.top = '0';
    scrollContainer.style.left = '0';
    scrollContainer.style.width = '1px';
    scrollContainer.style.pointerEvents = 'none';
    scrollContainer.style.opacity = '0';
    document.body.appendChild(scrollContainer);

    window.addEventListener('scroll', debouncedScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', debouncedScroll);
      if (scrollContainer.parentNode) {
        scrollContainer.parentNode.removeChild(scrollContainer);
      }
    };
  }, [debouncedScroll, handleScroll]);

  return {
    scrollProgress,
  };
}

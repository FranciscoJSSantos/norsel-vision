import { useEffect, useRef, useState } from 'react';

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
}

// Shared IntersectionObserver instance for better performance
// Instead of creating 6+ observers, we use one observer for all elements
let sharedObserver: IntersectionObserver | null = null;
const observedElements = new Map<Element, (isIntersecting: boolean) => void>();

const getSharedObserver = (threshold: number, rootMargin: string) => {
  // Only create one observer for the entire app
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const callback = observedElements.get(entry.target);
          if (callback) {
            callback(entry.isIntersecting);
          }
        });
      },
      { threshold, rootMargin }
    );
  }
  return sharedObserver;
};

export const useScrollReveal = (options: ScrollRevealOptions = {}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const hasBeenVisible = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || hasBeenVisible.current) return;

    const threshold = options.threshold || 0.1;
    const rootMargin = options.rootMargin || '0px 0px -100px 0px';
    const observer = getSharedObserver(threshold, rootMargin);

    const callback = (isIntersecting: boolean) => {
      if (isIntersecting && !hasBeenVisible.current) {
        setIsVisible(true);
        hasBeenVisible.current = true;
        // Unobserve after becoming visible to save resources
        observer.unobserve(element);
        observedElements.delete(element);
      }
    };

    observedElements.set(element, callback);
    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observedElements.delete(element);
    };
  }, [options.threshold, options.rootMargin]);

  return { elementRef, isVisible };
};

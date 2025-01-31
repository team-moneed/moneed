import { useEffect, useRef, useState } from "react";

const useScrollSpy = (options: IntersectionObserverInit) => {
  const elementRef = useRef<HTMLElement | null>(null);
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          setIsIntersecting(entry.isIntersecting);
        });
      },
      options
    );

    // 요소를 관찰
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    // 클린업
    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [options]);

  return { elementRef, isIntersecting };
};

export default useScrollSpy;

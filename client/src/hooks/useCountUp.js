import { useEffect, useRef, useState } from "react";

/**
 * Animates a number counting from 0 to `end` when the element enters the viewport.
 *
 * @param {number} end - Target number to count up to
 * @param {number} duration - Animation duration in milliseconds
 * @returns {{ ref: React.Ref, count: number }}
 */
const useCountUp = (end, duration = 2000) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            const startTime = performance.now();

            const animate = (currentTime) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);

              // Ease out cubic
              const eased = 1 - Math.pow(1 - progress, 3);
              setCount(Math.floor(eased * end));

              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };

            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(node);
    return () => observer.unobserve(node);
  }, [end, duration]);

  return { ref, count };
};

export default useCountUp;

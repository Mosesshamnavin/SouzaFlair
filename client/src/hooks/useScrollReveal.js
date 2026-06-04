import { useEffect, useRef } from "react";

/**
 * Custom hook that adds scroll-reveal animations using Intersection Observer.
 * Adds a 'revealed' class to observed elements when they enter the viewport.
 * Uses a MutationObserver to ensure dynamically added/rendered child elements
 * are also captured and observed.
 *
 * @param {Object} options
 * @param {number} options.threshold - Visibility threshold (0-1) to trigger reveal
 * @param {string} options.rootMargin - Margin around root for early/late triggering
 * @param {boolean} options.once - If true, animation triggers only once
 */
const useScrollReveal = (options = {}) => {
  const { threshold = 0.1, rootMargin = "0px 0px -40px 0px", once = true } =
    options;
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observedElements = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            if (once) {
              observer.unobserve(entry.target);
              observedElements.delete(entry.target);
            }
          } else if (!once) {
            entry.target.classList.remove("revealed");
          }
        });
      },
      { threshold, rootMargin }
    );

    const updateObservations = () => {
      // Find all target elements currently in DOM under this node
      const elements = node.querySelectorAll("[data-reveal]");
      const currentTargets = elements.length > 0 ? Array.from(elements) : [node];

      // Unobserve elements that are no longer targets
      observedElements.forEach((el) => {
        if (!currentTargets.includes(el)) {
          observer.unobserve(el);
          observedElements.delete(el);
        }
      });

      // Observe new targets
      currentTargets.forEach((el) => {
        if (!observedElements.has(el)) {
          observer.observe(el);
          observedElements.add(el);
        }
      });
    };

    // Initial run
    updateObservations();

    // Monitor DOM changes to handle dynamic items
    const mutationObserver = new MutationObserver(() => {
      updateObservations();
    });

    mutationObserver.observe(node, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [threshold, rootMargin, once]);

  return ref;
};

export default useScrollReveal;

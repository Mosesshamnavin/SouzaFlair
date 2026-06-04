import { useEffect } from "react";

/**
 * Custom hook that updates a --scroll-y CSS custom property on the document root.
 * Elements can reference this variable for parallax effects:
 *   transform: translateY(calc(var(--scroll-y) * 0.3));
 */
const useParallax = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      document.documentElement.style.setProperty("--scroll-y", `${scrollY}px`);
    };

    // Set initial value
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
};

export default useParallax;

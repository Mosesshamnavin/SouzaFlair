import React from "react";
import { assets } from "../assets/assets";
import useScrollReveal from "../hooks/useScrollReveal";

const ParallaxBanner = () => {
  const revealRef = useScrollReveal({ once: true });

  return (
    <section
      ref={revealRef}
      className="h-[60vh] w-full relative overflow-hidden flex items-center justify-center bg-primary"
    >
      {/* Parallax Background Image */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center parallax-bg"
          style={{
            backgroundImage: `url(${assets.about_img})`,
            transform: `translateY(calc((var(--scroll-y, 0) * 0.18px) - 80px)) scale(1.25)`,
            filter: "brightness(0.65)",
            transition: "transform 0.1s ease-out",
          }}
        />
        {/* Luxury dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-primary/30" />
      </div>

      {/* Floating Glassmorphic Text Card */}
      <div
        data-reveal
        className="reveal reveal-scale z-10 text-center px-6 sm:px-10 py-10 sm:py-12 max-w-lg mx-4 glass-panel shadow-2xl rounded-sm border border-[#f5f0eb]/25"
      >
        <span className="font-sans text-[10px] tracking-[0.3em] text-secondary font-bold uppercase mb-2 block">
          Signature Craft
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-primary font-semibold tracking-wide mb-4">
          Curated for Every Occasion
        </h2>
        <p className="text-xs sm:text-sm tracking-wider text-text-muted max-w-sm mx-auto leading-relaxed font-sans">
          Indulge in garments designed to transcend seasons, combining architectural tailoring with comfort.
        </p>
      </div>
    </section>
  );
};

export default ParallaxBanner;

import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Hero = () => {
  const brandName = "SOUZA FLAIR";
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      const currentScroll = window.scrollY;
      // Calculate scroll progress percentage (0 to 1)
      const pct = Math.min(currentScroll / heroHeight, 1);
      setScrollPercent(pct);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Run immediately to set initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollDown = () => {
    const nextSection = document.getElementById("brand-marquee");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Compute scroll-linked values
  const containerPadding = scrollPercent * 24; // Up to 24px padding on sides/top
  const containerRadius = scrollPercent * 24; // Up to 24px border-radius
  const containerScale = 1 - scrollPercent * 0.06; // Scales down to 94%
  const imageScale = 1.12 + scrollPercent * 0.16; // Zoom background image
  const imageBrightness = 0.48 - scrollPercent * 0.22; // Darken on scroll
  const imageBlur = scrollPercent * 6; // Blur background image
  
  const contentOpacity = 1 - scrollPercent * 1.6; // Fade out text quickly
  const contentTranslateY = -scrollPercent * 110; // Parallax lift for text
  const indicatorOpacity = 1 - scrollPercent * 3.5; // Hide scroll prompt quickly

  return (
    <div className="h-screen w-full relative flex items-center justify-center overflow-hidden bg-primary select-none">
      {/* Self-contained CSS for high-performance animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes letterFadeUp {
          from {
            opacity: 0;
            transform: translateY(60px);
            filter: blur(5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }
        .letter-animate {
          display: inline-block;
          opacity: 0;
          animation: letterFadeUp 1.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes slideLeftReveal {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .tagline-animate {
          opacity: 0;
          animation: slideLeftReveal 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards 1s;
        }
        @keyframes fadeInUpBtn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .btn-animate {
          opacity: 0;
          animation: fadeInUpBtn 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards 1.4s;
        }
        @keyframes bounceDown {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-12px);
          }
          60% {
            transform: translateY(-6px);
          }
        }
        .chevron-animate {
          animation: bounceDown 2s infinite;
        }
      `}} />

      {/* Dynamic Shrinking Background Image Wrapper */}
      <div
        className="absolute inset-0 z-0 overflow-hidden"
        style={{
          padding: `${containerPadding}px`,
          transition: "padding 0.05s ease-out",
        }}
      >
        <div
          className="w-full h-full relative overflow-hidden"
          style={{
            borderRadius: `${containerRadius}px`,
            transform: `scale(${containerScale})`,
            transition: "transform 0.05s ease-out, border-radius 0.05s ease-out",
          }}
        >
          {/* Zooming background model image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${assets.hero_img})`,
              transform: `scale(${imageScale})`,
              filter: `brightness(${imageBrightness}) blur(${imageBlur}px)`,
              transition: "transform 0.05s ease-out, filter 0.05s ease-out",
            }}
          />
          {/* Subtle Luxury Dark Vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-primary/45 z-10" />
        </div>
      </div>

      {/* Hero Content (Fades & Translates on Scroll) */}
      <div
        className="z-20 text-center px-4 max-w-4xl flex flex-col items-center"
        style={{
          opacity: contentOpacity,
          transform: `translateY(${contentTranslateY}px)`,
          transition: "transform 0.05s ease-out, opacity 0.05s ease-out",
          pointerEvents: contentOpacity <= 0 ? "none" : "auto",
        }}
      >
        {/* Sub-tagline / Category */}
        <div className="flex items-center gap-3 mb-4 tagline-animate">
          <span className="w-8 sm:w-12 h-[1px] bg-secondary/70"></span>
          <p className="font-sans text-[10px] sm:text-xs tracking-[0.4em] text-accent uppercase font-medium">
            Luxury Haute Couture
          </p>
          <span className="w-8 sm:w-12 h-[1px] bg-secondary/70"></span>
        </div>

        {/* Title: Letter-by-letter stagger reveal */}
        <h1 className="font-serif text-5xl sm:text-7xl md:text-[5.5rem] tracking-[0.25em] text-white font-bold leading-tight drop-shadow-2xl">
          {brandName.split("").map((char, index) => (
            <span
              key={index}
              className="letter-animate"
              style={{
                animationDelay: `${index * 75}ms`,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        {/* Tagline */}
        <p className="tagline-animate mt-6 text-sm sm:text-base md:text-lg tracking-[0.3em] font-light text-surface/90 max-w-2xl font-serif italic">
          Where Elegance Meets Expression
        </p>

        {/* Call to Action Button */}
        <div className="btn-animate mt-10">
          <Link
            to="/collection"
            className="shimmer-btn-gold inline-block px-10 py-4 text-xs font-semibold tracking-[0.35em] uppercase rounded-sm border border-secondary/30 transition-all duration-300 shadow-xl"
          >
            Explore Collection
          </Link>
        </div>
      </div>

      {/* Bouncing Scroll Indicator (Fades out quickly on scroll) */}
      <div
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 cursor-pointer flex flex-col items-center text-white/60 hover:text-white transition-all duration-300"
        style={{
          opacity: indicatorOpacity,
          pointerEvents: indicatorOpacity <= 0 ? "none" : "auto",
        }}
      >
        <span className="text-[9px] tracking-[0.4em] uppercase mb-2">Scroll</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 chevron-animate text-secondary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </div>
  );
};

export default Hero;

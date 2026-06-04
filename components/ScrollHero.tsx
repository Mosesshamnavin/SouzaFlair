"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

// Register ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

export interface TextOverlay {
  frameIndex: number; // The frame index (0-indexed) at which this text displays
  title: string;
  subtitle: string;
}

interface ScrollHeroProps {
  frames: string[]; // Array of image URLs/paths
  overlays?: TextOverlay[]; // Optional text overlays at specific frames
  scrollSensitivity?: number; // Adjust length of scroll per frame (default 1)
}

const ScrollHero: React.FC<ScrollHeroProps> = ({
  frames,
  overlays = [] as TextOverlay[],
  scrollSensitivity = 1,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [currentFrame, setCurrentFrame] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  // Cache for preloaded HTMLImageElements
  const preloadedImagesRef = useRef<HTMLImageElement[]>([]);

  // 1. Preload Images on Mount
  useEffect(() => {
    let loadedCount = 0;
    const totalImages = frames.length;
    const imagesCache: HTMLImageElement[] = [];

    frames.forEach((src: string, index: number) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        setLoadingProgress(Math.round((loadedCount / totalImages) * 100));
        
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };
      imagesCache[index] = img;
    });

    preloadedImagesRef.current = imagesCache;
  }, [frames]);

  // 2. Render Loop & Scroll Trigger Setup
  useEffect(() => {
    if (!imagesLoaded || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Helper: Draw image with cover behavior (like background-size: cover)
    const drawImageToCanvas = (frameIdx: number) => {
      const img = preloadedImagesRef.current[frameIdx];
      if (!img) return;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgWidth = img.naturalWidth;
      const imgHeight = img.naturalHeight;

      // Calculate ratios to fit cover
      const ratio = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
      const newWidth = imgWidth * ratio;
      const newHeight = imgHeight * ratio;

      // Center the image
      const x = (canvasWidth - newWidth) / 2;
      const y = (canvasHeight - newHeight) / 2;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(img, x, y, newWidth, newHeight);
    };

    // Set canvas viewport dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      drawImageToCanvas(currentFrame);
    };

    // Initial sizing
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // GSAP ScrollTrigger timeline configuration
    const frameObj = { frame: 0 };
    const gsapContext = gsap.context(() => {
      gsap.to(frameObj, {
        frame: frames.length - 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3, // Adds momentum scrub to the scroll swapping
          onUpdate: () => {
            const frameIdx = Math.round(frameObj.frame);
            setCurrentFrame(frameIdx);
            drawImageToCanvas(frameIdx);
          },
        },
      });
    }, containerRef);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      gsapContext.revert(); // Safely kill ScrollTrigger on unmount
    };
  }, [imagesLoaded, frames.length, currentFrame]);

  // Find active text overlay matching current frame index (+/- 1 frame tolerance)
  const activeOverlay = overlays.find(
    (o) => Math.abs(o.frameIndex - currentFrame) <= 1
  );

  // Height multiplier for scroll container depth
  const containerHeight = `${frames.length * 100 * scrollSensitivity}vh`;

  return (
    <div 
      ref={containerRef} 
      className="relative w-full bg-black" 
      style={{ height: containerHeight }}
    >
      {/* Preloader Loading Screen */}
      {!imagesLoaded && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center text-white">
          <p className="text-xs uppercase tracking-[0.25em] mb-4">Loading Experience...</p>
          <div className="w-48 h-[1px] bg-neutral-800 relative rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-white transition-all duration-300"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <span className="text-[10px] text-neutral-400 mt-2">{loadingProgress}%</span>
        </div>
      )}

      {/* Sticky Frame Viewport (100vh) */}
      <div 
        ref={stickyRef} 
        className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center"
      >
        {/* Render Canvas */}
        <canvas 
          ref={canvasRef} 
          className="w-full h-full object-cover block"
          style={{ width: "100vw", height: "100vh" }}
        />

        {/* Floating Text Overlays (Framer Motion) */}
        <AnimatePresence mode="wait">
          {activeOverlay && (
            <motion.div
              key={activeOverlay.frameIndex}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-10 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none select-none text-white"
            >
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight font-sans drop-shadow-lg max-w-4xl leading-tight">
                {activeOverlay.title}
              </h2>
              <p className="text-lg md:text-2xl font-light text-neutral-200 mt-4 tracking-wider max-w-2xl drop-shadow-md">
                {activeOverlay.subtitle}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Frame Progress Indicator */}
        <div className="absolute bottom-6 right-8 text-[10px] tracking-[0.2em] text-white/40 uppercase">
          Frame {currentFrame + 1} / {frames.length}
        </div>
      </div>
    </div>
  );
};

export default ScrollHero;

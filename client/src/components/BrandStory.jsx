import React from "react";
import { assets } from "../assets/assets";
import useScrollReveal from "../hooks/useScrollReveal";
import useCountUp from "../hooks/useCountUp";

const StatItem = ({ end, suffix, label, duration }) => {
  const { ref, count } = useCountUp(end, duration);
  return (
    <div ref={ref} className="flex flex-col items-center p-4">
      <span className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-secondary">
        {count}
        {suffix}
      </span>
      <span className="font-sans text-[10px] tracking-[0.25em] text-text-muted uppercase mt-2 text-center font-medium">
        {label}
      </span>
    </div>
  );
};

const BrandStory = () => {
  const revealRef = useScrollReveal({ once: true });

  return (
    <section
      ref={revealRef}
      className="py-16 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-white border-t border-secondary/5"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Side: Parallax Image Showcase */}
        <div
          data-reveal
          className="reveal reveal-left lg:col-span-6 relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-square w-full rounded-sm overflow-hidden"
        >
          {/* Decorative floating gold border */}
          <div className="absolute inset-4 border border-secondary/35 z-10 pointer-events-none rounded-xs transform translate-x-2 translate-y-2 hover:translate-x-0 hover:translate-y-0 transition-transform duration-500" />
          <img
            src={assets.about_img}
            className="w-full h-full object-cover filter brightness-[0.9] hover:scale-105 transition-transform duration-700"
            alt="Brand legacy"
          />
        </div>

        {/* Right Side: Copy & Stats */}
        <div data-reveal className="reveal reveal-right lg:col-span-6 flex flex-col justify-center">
          <span className="font-sans text-[10px] tracking-[0.3em] text-secondary font-bold uppercase mb-2">
            Our Legacy
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-primary tracking-wide font-semibold mb-6">
            Architects of Style
          </h2>
          <p className="font-serif italic text-text-muted tracking-wide leading-relaxed mb-6 text-sm sm:text-base">
            "We do not merely create clothes; we compose visual expressions of identity, weaving premium threads with untamed elegance."
          </p>
          <p className="font-sans text-xs sm:text-sm text-text-muted/80 leading-relaxed mb-10 tracking-wider">
            Founded with a passion for quality and design, Souza Flair brings you high-end garments tailored to perfection. Each fabric is carefully sourced, and every cut is executed with meticulous precision, resulting in pieces that reflect luxury and demand attention.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 border-t border-b border-secondary/15 py-8">
            <StatItem end={500} suffix="+" label="Luxury Items" duration={2000} />
            <StatItem end={10} suffix="k+" label="Global Clients" duration={2500} />
            <StatItem end={99} suffix="%" label="Approval Rate" duration={1800} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;

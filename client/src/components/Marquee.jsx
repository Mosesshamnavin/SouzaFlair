import React from "react";

const Marquee = () => {
  const words = [
    "NEW ARRIVALS",
    "SUMMER COLLECTION",
    "FREE SHIPPING WORLDWIDE",
    "PREMIUM QUALITY",
    "HAUTE COUTURE",
    "SOUZA FLAIR ELEGANCE",
  ];

  // Repeat items to fill width and ensure seamless scrolling
  const marqueeText = Array(4)
    .fill(words)
    .flat()
    .map((word, idx) => (
      <span key={idx} className="mx-6 sm:mx-10 flex items-center gap-4 sm:gap-6">
        <span className="font-serif text-xs sm:text-sm tracking-[0.3em] font-semibold text-secondary">
          {word}
        </span>
        <span className="w-1.5 h-1.5 bg-accent/40 rounded-full"></span>
      </span>
    ));

  return (
    <div
      id="brand-marquee"
      className="bg-primary py-4 border-y border-secondary/15 overflow-hidden w-full relative z-10 flex select-none"
    >
      <div className="flex whitespace-nowrap animate-marquee">
        {marqueeText}
      </div>
      <div className="flex whitespace-nowrap animate-marquee" aria-hidden="true">
        {marqueeText}
      </div>
    </div>
  );
};

export default Marquee;

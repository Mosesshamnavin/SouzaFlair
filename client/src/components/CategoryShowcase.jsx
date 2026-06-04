import React from "react";
import { Link } from "react-router-dom";
import useScrollReveal from "../hooks/useScrollReveal";

// Premium Unsplash representative category images
const womenImg = "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80";
const menImg = "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80";
const kidsImg = "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=800&q=80";

const CategoryShowcase = () => {
  const revealRef = useScrollReveal({ once: true });

  const categories = [
    {
      name: "Women",
      image: womenImg,
      subtitle: "Timeless Grace",
      link: "/collection?category=Women",
    },
    {
      name: "Men",
      image: menImg,
      subtitle: "Bold & Refined",
      link: "/collection?category=Men",
    },
    {
      name: "Kids",
      image: kidsImg,
      subtitle: "Playful Comfort",
      link: "/collection?category=Kids",
    },
  ];

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    // Max rotation 12 degrees
    const rotateX = ((yc - y) / yc) * 12;
    const rotateY = ((x - xc) / xc) * 12;
    
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <section
      ref={revealRef}
      className="py-16 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-surface/30"
    >
      {/* Section Title */}
      <div className="text-center mb-16 select-none reveal reveal-up" data-reveal>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-wide text-primary">
          Curated Showcase
        </h2>
        <p className="text-xs sm:text-sm tracking-[0.25em] text-text-muted mt-3 uppercase font-medium">
          Discover your signature aesthetic
        </p>
        <div className="w-16 h-[2px] bg-secondary mx-auto mt-6"></div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 perspective-container">
        {categories.map((cat, idx) => (
          <div
            key={cat.name}
            data-reveal
            className={`reveal reveal-up delay-${(idx + 1) * 200}`}
          >
            <Link
              to={cat.link}
              className="block relative aspect-[3/4] w-full rounded-sm overflow-hidden bg-primary tilt-card shadow-lg"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Background Image with Zoom on hover */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-110"
                style={{
                  backgroundImage: `url(${cat.image})`,
                }}
              />
              
              {/* Elegant Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/30 to-transparent opacity-90 transition-opacity duration-500 hover:opacity-95" />

              {/* Card Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 tilt-card-inner">
                {/* Decorative gold bracket */}
                <div className="border-l border-b border-secondary/30 absolute bottom-6 left-6 right-6 top-1/2 -z-10 transition-all duration-500 hover:border-secondary"></div>

                <p className="font-sans text-[10px] tracking-[0.3em] text-accent uppercase font-semibold mb-2">
                  {cat.subtitle}
                </p>
                <h3 className="font-serif text-2xl sm:text-3xl text-white tracking-wider font-semibold mb-4">
                  {cat.name}
                </h3>
                
                {/* Elegant Button Link */}
                <div className="flex items-center gap-2 group/btn">
                  <span className="font-sans text-xs tracking-[0.25em] text-secondary font-bold group-hover/btn:text-white transition-colors duration-300">
                    SHOP NOW
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 text-secondary group-hover/btn:text-white group-hover/btn:translate-x-1.5 transition-all duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryShowcase;

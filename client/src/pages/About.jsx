import React from "react";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import OurPolicy from "../components/OurPolicy";
import NewsLetterBox from "../components/NewsLetterBox";
import useScrollReveal from "../hooks/useScrollReveal";

const About = () => {
  const revealRef = useScrollReveal({ once: true });

  return (
    <div ref={revealRef} className="select-none">
      {/* 1. Lookbook Parallax Header */}
      <section className="h-[45vh] w-full relative overflow-hidden flex items-center justify-center bg-primary">
        <div
          className="absolute inset-0 bg-cover bg-center parallax-bg"
          style={{
            backgroundImage: `url(${assets.about_img})`,
            transform: `translateY(calc((var(--scroll-y, 0) * 0.15px) - 60px)) scale(1.15)`,
            filter: "brightness(0.5)",
            transition: "transform 0.1s ease-out",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
        <div className="z-10 text-center px-4 reveal reveal-up" data-reveal>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white tracking-[0.2em] font-bold">
            OUR STORY
          </h1>
          <span className="font-sans text-[10px] tracking-[0.4em] text-accent mt-3 block uppercase font-medium">
            Where Elegance Meets Expression
          </span>
        </div>
      </section>

      {/* 2. Story Section */}
      <section className="py-16 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Copy (Left) */}
          <div data-reveal className="reveal reveal-left lg:col-span-7 space-y-6">
            <Title text1={"SOUZA FLAIR"} text2={"LEGACY"} />
            <p className="font-serif italic text-text-muted leading-relaxed text-sm sm:text-base">
              "We believe garments are not just fabric; they are a visual canvas of identity."
            </p>
            <p className="font-sans text-xs sm:text-sm text-text-muted/80 leading-relaxed tracking-wider">
              Souza Flair was born out of a desire to establish a luxury fashion atelier that caters to those who look beyond trends. Our designs seek to fuse structured tailoring with fluid, comfortable silhouettes, creating capsule wardrobes that remain relevant across seasons.
            </p>
            <p className="font-sans text-xs sm:text-sm text-text-muted/80 leading-relaxed tracking-wider">
              Every creation is meticulously engineered. From our carefully curated Italian wools to Egyptian cottons, we make no compromises. Our craftspeople pay close attention to internal linings, seam lines, and drape, constructing high-end garments that look and feel exceptional.
            </p>
          </div>

          {/* Picture (Right) */}
          <div
            data-reveal
            className="reveal reveal-right lg:col-span-5 relative aspect-[3/4] w-full rounded-sm overflow-hidden"
          >
            <div className="absolute inset-4 border border-secondary/35 z-10 pointer-events-none rounded-xs transform -translate-x-2 -translate-y-2 hover:translate-x-0 hover:translate-y-0 transition-transform duration-500" />
            <img
              src={assets.contact_img}
              className="w-full h-full object-cover filter brightness-[0.9] hover:scale-105 transition-transform duration-700"
              alt="Tailoring"
            />
          </div>
        </div>
      </section>

      {/* 3. Core Values */}
      <section className="py-16 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-surface/20 border-t border-b border-secondary/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal reveal-up" data-reveal>
            <Title text1={"OUR"} text2={"PILLARS"} />
            <p className="text-xs sm:text-sm tracking-[0.2em] text-text-muted mt-2 uppercase font-medium">
              The principles behind every stitch
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Architectural Tailoring",
                desc: "We focus on proportions and lines that complement and enhance the wearer's natural silhouette.",
              },
              {
                title: "Eco-Conscious Luxury",
                desc: "We prioritize small-batch production and trace our supply chains to ensure sustainable materials.",
              },
              {
                title: "Personalized Service",
                desc: "From size guides to dedicated styling advice, we strive to make your shopping experience seamless.",
              },
            ].map((pillar, idx) => (
              <div
                key={pillar.title}
                data-reveal
                className="reveal reveal-up bg-white border border-secondary/10 rounded-sm p-8 shadow-sm hover:shadow-lg transition-all duration-350"
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <span className="font-sans text-[10px] tracking-[0.3em] text-secondary font-bold uppercase mb-4 block">
                  0{idx + 1}
                </span>
                <h3 className="font-serif text-lg font-semibold text-primary tracking-wide mb-3">
                  {pillar.title}
                </h3>
                <p className="font-sans text-xs tracking-wider text-text-muted leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Policy and Newsletter */}
      <OurPolicy />
      <NewsLetterBox />
    </div>
  );
};

export default About;

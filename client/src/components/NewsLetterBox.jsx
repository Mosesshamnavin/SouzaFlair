import React from "react";
import useScrollReveal from "../hooks/useScrollReveal";

const NewsLetterBox = () => {
  const revealRef = useScrollReveal({ once: true });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // Simulate signup
  };

  return (
    <section
      ref={revealRef}
      className="pt-16 pb-12 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-primary border-t border-secondary/15 select-none"
    >
      <div
        data-reveal
        className="reveal reveal-scale max-w-4xl mx-auto text-center bg-surface-alt/45 border border-secondary/15 rounded-sm p-10 sm:p-16 relative overflow-hidden"
      >
        {/* Subtle glowing gold background circle */}
        <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-secondary/5 blur-[80px]" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-secondary/5 blur-[80px]" />

        <span className="font-sans text-[10px] tracking-[0.35em] text-secondary font-bold uppercase mb-4 block">
          Exclusive Invitation
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-semibold tracking-wide mb-4">
          Join the Inner Circle
        </h2>
        <p className="font-serif italic text-accent/80 tracking-wide text-xs sm:text-sm max-w-lg mx-auto mb-10 leading-relaxed">
          Subscribe to receive early access to new collections, private runway previews, and bespoke styling recommendations.
        </p>

        <form
          onSubmit={onSubmitHandler}
          className="w-full max-w-md flex flex-col sm:flex-row items-stretch gap-3 mx-auto relative z-10"
        >
          <div className="flex-grow relative">
            <input
              type="email"
              className="w-full bg-primary/80 border border-secondary/20 rounded-xs px-5 py-4 text-sm text-white placeholder-accent/40 outline-none focus:border-secondary transition-all duration-300"
              placeholder="Enter your email address"
              required
            />
          </div>
          <button
            type="submit"
            className="shimmer-btn-gold px-8 py-4 text-xs font-semibold tracking-[0.25em] uppercase rounded-xs border border-secondary/30 transition-all duration-300 shadow-md cursor-pointer whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsLetterBox;

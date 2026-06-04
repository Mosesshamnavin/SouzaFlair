import React from "react";
import { assets } from "../assets/assets";
import useScrollReveal from "../hooks/useScrollReveal";

const PolicyItem = ({ icon, title, desc, index }) => {
  return (
    <div
      className="reveal reveal-up flex flex-col items-center p-8 bg-white border border-secondary/10 rounded-sm shadow-sm hover:shadow-xl hover:border-secondary/30 transition-all duration-500 group"
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Icon Wrapper with animation */}
      <div className="w-20 h-20 rounded-full bg-surface flex items-center justify-center mb-6 group-hover:bg-secondary/10 transition-colors duration-500">
        <img
          src={icon}
          alt={title}
          className="w-8 h-8 object-contain transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 filter brightness-0 group-hover:brightness-100 group-hover:sepia group-hover:saturate-[1000%] group-hover:hue-rotate-[15deg]"
        />
      </div>
      <h3 className="font-serif text-lg font-semibold text-primary tracking-wide mb-2">
        {title}
      </h3>
      <p className="font-sans text-xs tracking-wider text-text-muted text-center max-w-[200px] leading-relaxed">
        {desc}
      </p>
    </div>
  );
};

const OurPolicy = () => {
  const revealRef = useScrollReveal({ once: true });

  const policies = [
    {
      icon: assets.exchange_icon,
      title: "Seamless Exchange",
      desc: "Enjoy complimentary size swaps and exchanges within 14 days.",
    },
    {
      icon: assets.quality_icon,
      title: "Meticulous Quality",
      desc: "Every item undergoes rigorous quality assurance inspections.",
    },
    {
      icon: assets.support_img,
      title: "At Your Service",
      desc: "Our personal shopping concierges are available 24/7.",
    },
  ];

  return (
    <section
      ref={revealRef}
      className="py-16 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-surface/10 border-t border-secondary/5"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
        {policies.map((policy, idx) => (
          <PolicyItem
            key={policy.title}
            icon={policy.icon}
            title={policy.title}
            desc={policy.desc}
            index={idx}
          />
        ))}
      </div>
    </section>
  );
};

export default OurPolicy;

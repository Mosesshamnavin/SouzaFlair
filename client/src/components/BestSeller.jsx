import React, { useContext, useEffect, useState, useRef } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import useScrollReveal from "../hooks/useScrollReveal";
import { Link } from "react-router-dom";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);
  const revealRef = useScrollReveal({ once: true });
  const btnRef = useRef(null);

  useEffect(() => {
    // Take first 6 bestseller products
    const bestSellerProducts = products.filter((item) => item.bestseller);
    setBestSeller(bestSellerProducts.slice(0, 6));
  }, [products]);

  const handleMagneticMove = (e) => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    // Compute distance from center of the button
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Smooth translation (35% magnetic force)
    btn.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;
  };

  const handleMagneticLeave = () => {
    const btn = btnRef.current;
    if (btn) {
      btn.style.transform = "translate(0px, 0px)";
    }
  };

  return (
    <section
      ref={revealRef}
      className="py-16 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-surface/10 border-t border-secondary/5"
    >
      {/* Title Header */}
      <div className="text-center mb-16 select-none reveal reveal-up" data-reveal>
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p className="text-xs sm:text-sm tracking-[0.25em] text-text-muted mt-2 uppercase font-medium">
          The ultimate icons of style, voted by you
        </p>
        <div className="w-16 h-[2px] bg-secondary mx-auto mt-6"></div>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {bestSeller.map((item, index) => (
          <div
            key={item._id}
            data-reveal
            className={`reveal reveal-up delay-${(index % 3) * 150}`}
          >
            <ProductItem
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
              index={index}
            />
          </div>
        ))}
      </div>

      {/* View All Magnetic Button */}
      <div className="flex justify-center mt-20 reveal reveal-up delay-300" data-reveal>
        <div
          className="inline-block p-4"
          onMouseMove={handleMagneticMove}
          onMouseLeave={handleMagneticLeave}
        >
          <Link
            ref={btnRef}
            to="/collection"
            className="shimmer-btn inline-block px-10 py-4 text-xs font-semibold tracking-[0.3em] uppercase rounded-sm border border-secondary/40 shadow-lg transition-transform duration-300"
          >
            View All Best Sellers
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestSeller;

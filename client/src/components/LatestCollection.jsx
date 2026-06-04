import React, { useContext, useEffect, useState, useRef } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import useScrollReveal from "../hooks/useScrollReveal";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);
  const revealRef = useScrollReveal({ once: true });

  useEffect(() => {
    // Take first 10 products
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;
    const maxScroll = container.scrollWidth - container.clientWidth;
    if (maxScroll <= 0) return;
    const progress = (container.scrollLeft / maxScroll) * 100;
    setScrollProgress(progress);
  };

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={revealRef}
      className="py-16 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-white relative overflow-hidden"
    >
      {/* Title & Slogan */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 select-none">
        <div data-reveal className="reveal reveal-left">
          <Title text1={"LATEST"} text2={"ARRIVALS"} />
          <p className="text-xs sm:text-sm tracking-[0.2em] text-text-muted mt-2 uppercase font-medium">
            Curated pieces from our latest runway collection
          </p>
        </div>

        {/* Gallery Controls (Desktop) */}
        <div
          data-reveal
          className="reveal reveal-right flex items-center gap-3 mt-6 md:mt-0"
        >
          <button
            onClick={scrollLeft}
            className="w-11 h-11 rounded-full border border-secondary/20 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 focus:outline-none cursor-pointer"
            aria-label="Previous products"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={scrollRight}
            className="w-11 h-11 rounded-full border border-secondary/20 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 focus:outline-none cursor-pointer"
            aria-label="Next products"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Gallery */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="horizontal-scroll-container flex gap-6 sm:gap-8 pb-10 cursor-grab active:cursor-grabbing"
        style={{
          scrollBehavior: "smooth",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {latestProducts.map((item, index) => (
          <div
            key={item._id}
            className={`horizontal-scroll-item w-[260px] sm:w-[300px] reveal reveal-scale delay-${(index % 4) * 100}`}
            data-reveal
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

      {/* Scroll Progress Bar */}
      <div
        data-reveal
        className="reveal reveal-up mt-4 max-w-md mx-auto h-[2px] bg-secondary/15 rounded-full overflow-hidden relative"
      >
        <div
          className="h-full bg-secondary transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </section>
  );
};

export default LatestCollection;

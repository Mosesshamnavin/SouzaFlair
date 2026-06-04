import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price, index = 0 }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link
      to={`/product/${id}`}
      className="group block text-primary cursor-pointer transition-all duration-500 reveal reveal-up"
      style={{ transitionDelay: `${(index % 5) * 100}ms` }}
    >
      <div className="bg-white border border-secondary/10 rounded-sm overflow-hidden flex flex-col h-full shadow-sm hover:shadow-xl hover:border-secondary/35 transition-all duration-500">
        {/* Image Container with Shine & Zoom */}
        <div className="relative aspect-[3/4] overflow-hidden bg-surface shine-hover">
          <img
            src={image[0]}
            className="w-full h-full object-cover transition-transform duration-[800ms] cubic-bezier(0.25, 1, 0.5, 1) group-hover:scale-108"
            loading="lazy"
            alt={name}
          />
          
          {/* Quick View Hover Overlay */}
          <div className="absolute inset-0 bg-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
            <span className="bg-[#fdfbf7] text-primary text-[10px] tracking-[0.3em] font-semibold py-3 px-6 uppercase shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 rounded-sm">
              View Product
            </span>
          </div>

          {/* New Tag (Conditional Mock) */}
          {price > 250 && (
            <span className="absolute top-3 left-3 bg-secondary text-primary font-serif font-bold text-[9px] tracking-widest px-2.5 py-1 rounded-xs uppercase z-20 shadow-md">
              New
            </span>
          )}
        </div>

        {/* Text & Price Info */}
        <div className="p-4 flex flex-col flex-grow select-none bg-[#fdfbf7]/50 border-t border-secondary/5">
          {/* Category / Brand indicator */}
          <span className="text-[9px] tracking-[0.25em] text-text-muted uppercase font-semibold mb-1">
            Souza Flair
          </span>
          
          <h4 className="font-serif text-sm text-primary tracking-wide line-clamp-1 group-hover:text-secondary transition-colors duration-300 font-semibold mb-2">
            {name}
          </h4>
          
          <p className="mt-auto font-sans text-sm font-bold text-secondary flex items-center gap-0.5">
            <span className="text-xs">{currency}</span>
            <span>{price.toLocaleString()}</span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;

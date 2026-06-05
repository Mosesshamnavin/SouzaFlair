import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import ProductItem from "../components/ProductItem";
import Title from "../components/Title";
import useScrollReveal from "../hooks/useScrollReveal";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("description");
  
  const revealRef = useScrollReveal({ once: true });

  const fetchProductData = () => {
    const item = products.find((p) => p._id === productId);
    if (item) {
      setProductData(item);
      setImage(item.image[0]);
      
      // Fetch related items (same category, excluding current product)
      const related = products.filter(
        (p) => p.category === item.category && p._id !== item._id
      );
      setRelatedProducts(related.slice(0, 4));
    }
  };

  useEffect(() => {
    fetchProductData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [productId, products]);

  const handleMouseMove = (e) => {
    const img = e.currentTarget.querySelector("img");
    if (!img) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    img.style.transformOrigin = `${x}% ${y}%`;
    img.style.transform = "scale(1.5)";
  };

  const handleMouseLeave = (e) => {
    const img = e.currentTarget.querySelector("img");
    if (!img) return;
    img.style.transform = "scale(1)";
    img.style.transformOrigin = "center center";
  };

  if (!productData) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center pt-28 select-none">
        <div className="w-8 h-8 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div
      ref={revealRef}
      className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] pt-28 pb-20 max-w-7xl mx-auto border-t border-secondary/5 select-none"
    >
      {/* Breadcrumbs */}
      <div className="text-xs sm:text-sm tracking-widest text-text-muted mb-8 uppercase flex items-center gap-2">
        <Link to="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link to="/collection" className="hover:text-primary transition-colors">
          Collection
        </Link>
        <span>/</span>
        <span className="text-primary font-medium">{productData.name}</span>
      </div>

      {/* Main product display */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Left Column: Image Gallery */}
        <div className="md:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto gap-3 sm:w-[100px] w-full justify-start scrollbar-thin">
            {productData.image.map((img, idx) => (
              <img
                key={idx}
                src={img}
                onClick={() => setImage(img)}
                onMouseEnter={() => setImage(img)}
                className={`w-18 sm:w-full aspect-[3/4] object-cover rounded-xs cursor-pointer border hover:border-secondary/60 transition-colors duration-300 flex-shrink-0 ${
                  image === img ? "border-secondary scale-[1.02]" : "border-secondary/10"
                }`}
                alt="thumbnail"
              />
            ))}
          </div>

          {/* Main Display Image */}
          <div 
            className="flex-1 bg-surface rounded-sm overflow-hidden aspect-[3/4] border border-secondary/5 relative group cursor-zoom-in"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={image}
              className="w-full h-full object-cover transition-transform duration-350 ease-out"
              alt={productData.name}
            />
          </div>
        </div>

        {/* Right Column: Info details */}
        <div className="md:col-span-5 flex flex-col justify-start">
          <span className="text-[10px] tracking-[0.35em] text-secondary font-bold uppercase mb-2">
            {productData.category} • {productData.subCategory}
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-wide text-primary mb-3">
            {productData.name}
          </h1>

          {/* Rating */}
          <div className="mb-6 flex items-center gap-1.5 border-b border-secondary/15 pb-4">
            <img src={assets.star_icon} alt="star" className="w-3.5" />
            <img src={assets.star_icon} alt="star" className="w-3.5" />
            <img src={assets.star_icon} alt="star" className="w-3.5" />
            <img src={assets.star_icon} alt="star" className="w-3.5" />
            <img src={assets.star_dull_icon} alt="star" className="w-3.5" />
            <span className="text-xs text-text-muted ml-2 font-medium">(148 Customer Reviews)</span>
          </div>

          {/* Price */}
          <p className="font-sans text-3xl font-bold text-secondary mb-6">
            {currency} {productData.price.toLocaleString()}
          </p>

          {/* Description summary */}
          <p className="font-sans text-xs sm:text-sm text-text-muted leading-relaxed mb-8 tracking-wider">
            {productData.description}
          </p>

          {/* Size selection */}
          <div className="mb-8">
            <h4 className="font-serif text-sm font-semibold tracking-wider text-primary mb-3 uppercase">
              Select Size
            </h4>
            <div className="flex gap-3">
              {productData.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`w-11 h-11 text-xs font-semibold tracking-widest rounded-sm border cursor-pointer flex items-center justify-center transition-all duration-300 focus:outline-none ${
                    size === s
                      ? "border-secondary bg-primary text-white shadow-md scale-105"
                      : "border-secondary/20 hover:border-secondary/50 text-primary"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart button */}
          <button
            onClick={() => addToCart(productData._id, size)}
            className="shimmer-btn-gold w-full py-4 text-xs font-semibold tracking-[0.3em] uppercase rounded-sm border border-secondary/30 transition-all duration-300 shadow-xl cursor-pointer mb-8"
          >
            Add to shopping cart
          </button>

          {/* Policy Badges */}
          <div className="grid grid-cols-2 gap-4 border-t border-secondary/15 pt-6 text-xs text-text-muted/80 tracking-wider">
            <div className="flex items-center gap-2.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>100% Genuine product.</span>
            </div>
            <div className="flex items-center gap-2.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Quality inspected.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs section: Description & Reviews */}
      <div className="mt-20 border border-secondary/10 rounded-sm overflow-hidden bg-white shadow-sm">
        {/* Tab Headers */}
        <div className="flex border-b border-secondary/10 font-serif text-sm tracking-wider font-semibold">
          <button
            onClick={() => setActiveTab("description")}
            className={`px-8 py-5 focus:outline-none cursor-pointer border-r border-secondary/10 transition-colors duration-300 ${
              activeTab === "description" ? "bg-primary text-white" : "text-text-muted hover:text-primary"
            }`}
          >
            DESCRIPTION
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-8 py-5 focus:outline-none cursor-pointer border-r border-secondary/10 transition-colors duration-300 ${
              activeTab === "reviews" ? "bg-primary text-white" : "text-text-muted hover:text-primary"
            }`}
          >
            REVIEWS (148)
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-8 font-sans text-xs sm:text-sm text-text-muted leading-relaxed tracking-wider">
          {activeTab === "description" ? (
            <div className="space-y-4">
              <p>
                This luxury piece is structured using premium fabrics designed to offer comfort and hold their shape. The tailoring represents a flawless balance between traditional craftsmanship and modern design, ensuring you look effortlessly sophisticated.
              </p>
              <p>
                Excellent for layering or making a standalone statement, this item features exquisite detail stitches, a tailored silhouette, and durable closures. Style with other Souza Flair garments to construct your ultimate capsule wardrobe.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {[
                { author: "Evelyn R.", rating: 5, date: "May 24, 2026", text: "Absolutely stunning fit and texture. The packaging felt like opening a high-end luxury parcel. Will definitely order from Souza Flair again." },
                { author: "Marcus K.", rating: 5, date: "May 18, 2026", text: "The fabric weight is perfect. Feels substantial and tailor-made. Received multiple compliments on my first wear." }
              ].map((rev, idx) => (
                <div key={idx} className="border-b border-secondary/10 pb-6 last:border-0 last:pb-0">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-serif font-bold text-primary">{rev.author}</span>
                    <span className="text-[10px] text-text-muted">{rev.date}</span>
                  </div>
                  <div className="flex gap-1 mb-3">
                    {Array(rev.rating).fill().map((_, i) => (
                      <img key={i} src={assets.star_icon} alt="star" className="w-3" />
                    ))}
                  </div>
                  <p>{rev.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Related Products Showcase */}
      {relatedProducts.length > 0 && (
        <div className="mt-24">
          <div className="text-center mb-12 select-none reveal reveal-up" data-reveal>
            <Title text1={"RELATED"} text2={"PIECES"} />
            <p className="text-xs sm:text-sm tracking-[0.2em] text-text-muted mt-2 uppercase font-medium">
              Pairs flawlessly with your selection
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((item, index) => (
              <ProductItem
                key={item._id}
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
                index={index}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;

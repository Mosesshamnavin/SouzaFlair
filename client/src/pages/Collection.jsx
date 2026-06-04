import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useSearchParams } from "react-router-dom";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import useScrollReveal from "../hooks/useScrollReveal";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [searchParams] = useSearchParams();
  const [showFilter, setShowFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  
  const revealRef = useScrollReveal({ once: true });

  // Read URL search parameters on mount to pre-populate filters
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setCategory([categoryParam]);
    }
  }, [searchParams]);

  const toggleCategory = (e) => {
    const val = e.target.value;
    if (category.includes(val)) {
      setCategory((prev) => prev.filter((item) => item !== val));
    } else {
      setCategory((prev) => [...prev, val]);
    }
  };

  const toggleSubCategory = (e) => {
    const val = e.target.value;
    if (subCategory.includes(val)) {
      setSubCategory((prev) => prev.filter((item) => item !== val));
    } else {
      setSubCategory((prev) => [...prev, val]);
    }
  };

  const applyFilters = () => {
    let productsCopy = products.slice();

    // Text search query filter
    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category filter
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    // Subcategory filter
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    setFilteredProducts(productsCopy);
  };

  const sortProducts = () => {
    let copy = filteredProducts.slice();

    switch (sortType) {
      case "low_high":
        setFilteredProducts(copy.sort((a, b) => a.price - b.price));
        break;
      case "high_low":
        setFilteredProducts(copy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilters();
        break;
    }
  };

  useEffect(() => {
    applyFilters();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  return (
    <div
      ref={revealRef}
      className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] pt-28 pb-20 max-w-7xl mx-auto flex flex-col md:flex-row gap-8 sm:gap-10 border-t border-secondary/5 select-none"
    >
      {/* FILTER OPTIONS (Left panel) */}
      <div className="min-w-[240px] flex flex-col">
        {/* Toggle Title */}
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-lg font-serif font-bold tracking-wider flex items-center justify-between md:justify-start cursor-pointer gap-2.5 text-primary border-b border-secondary/15 pb-2 focus:outline-none"
        >
          <span>FILTERS</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-4 h-4 md:hidden transition-transform duration-300 ${
              showFilter ? "rotate-90" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Filters Container */}
        <div className={`md:block ${showFilter ? "block" : "hidden"}`}>
          {/* CATEGORY FILTER */}
          <div className="bg-white border border-secondary/10 rounded-sm p-5 mt-6 shadow-sm">
            <h4 className="font-serif text-sm font-semibold tracking-wider text-primary mb-4">
              CATEGORIES
            </h4>
            <div className="flex flex-col gap-3 font-sans text-xs tracking-wider text-text-muted">
              {["Men", "Women", "Kids"].map((cat) => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer hover:text-primary transition-colors">
                  <input
                    type="checkbox"
                    className="accent-secondary w-3.5 h-3.5 cursor-pointer rounded-xs"
                    value={cat}
                    checked={category.includes(cat)}
                    onChange={toggleCategory}
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* SUBCATEGORY FILTER */}
          <div className="bg-white border border-secondary/10 rounded-sm p-5 mt-6 shadow-sm">
            <h4 className="font-serif text-sm font-semibold tracking-wider text-primary mb-4">
              CLOTHING TYPES
            </h4>
            <div className="flex flex-col gap-3 font-sans text-xs tracking-wider text-text-muted">
              {["Topwear", "Bottomwear", "Winterwear"].map((sub) => (
                <label key={sub} className="flex items-center gap-3 cursor-pointer hover:text-primary transition-colors">
                  <input
                    type="checkbox"
                    className="accent-secondary w-3.5 h-3.5 cursor-pointer rounded-xs"
                    value={sub}
                    checked={subCategory.includes(sub)}
                    onChange={toggleSubCategory}
                  />
                  <span>{sub}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* PRODUCTS DISPLAY PANEL (Right side) */}
      <div className="flex-grow flex flex-col">
        {/* Header Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-base sm:text-2xl mb-8 border-b border-secondary/10 pb-4">
          <div data-reveal className="reveal reveal-left">
            <Title text1={"ALL"} text2={"COLLECTIONS"} />
          </div>

          {/* Product Sort Dropdown */}
          <div className="relative reveal reveal-right" data-reveal>
            <select
              onChange={(e) => setSortType(e.target.value)}
              className="bg-white border border-secondary/20 rounded-sm text-xs tracking-wider px-4 py-3 outline-none focus:border-secondary cursor-pointer shadow-sm text-text"
              value={sortType}
            >
              <option value="relevant">Sort by: Relevant</option>
              <option value="low_high">Price: Low to High</option>
              <option value="high_low">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-8">
            {filteredProducts.map((item, index) => (
              <ProductItem
                key={item._id}
                name={item.name}
                id={item._id}
                image={item.image}
                price={item.price}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center select-none reveal reveal-up" data-reveal>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-16 h-16 text-secondary/40 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h4 className="font-serif text-lg text-primary font-semibold tracking-wide">
              No Pieces Found
            </h4>
            <p className="font-sans text-xs text-text-muted mt-2 tracking-wider max-w-xs">
              Try adjusting your selections or clear search keywords to discover items.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;

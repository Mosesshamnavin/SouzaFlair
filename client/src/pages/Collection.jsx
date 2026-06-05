import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useSearchParams } from "react-router-dom";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import useScrollReveal from "../hooks/useScrollReveal";

const Collection = () => {
  const { products, search, showSearch, setSearch } = useContext(ShopContext);
  const [searchParams] = useSearchParams();
  const [showFilter, setShowFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const [isFiltering, setIsFiltering] = useState(false);
  
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

  const selectGender = (gender) => {
    if (category.includes(gender) && category.length === 1) {
      setCategory([]); // toggle off
    } else {
      setCategory([gender]); // set exactly this gender
    }
  };

  const selectType = (type) => {
    if (subCategory.includes(type) && subCategory.length === 1) {
      setSubCategory([]); // toggle off
    } else {
      setSubCategory([type]); // set exactly this type
    }
  };

  const applyFiltersAndSort = () => {
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

    // Apply sorting
    if (sortType === "low_high") {
      productsCopy.sort((a, b) => a.price - b.price);
    } else if (sortType === "high_low") {
      productsCopy.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(productsCopy);
  };

  useEffect(() => {
    setIsFiltering(true);
    const timer = setTimeout(() => {
      applyFiltersAndSort();
      setIsFiltering(false);
    }, 250);
    return () => clearTimeout(timer);
  }, [category, subCategory, search, showSearch, products, sortType]);

  const clearAllFilters = () => {
    setCategory([]);
    setSubCategory([]);
    if (setSearch) {
      setSearch("");
    }
  };

  const activeFiltersCount = category.length + subCategory.length + (showSearch && search ? 1 : 0);

  // Generate grid items with editorial cards interspersed
  const renderGridItems = () => {
    const elements = [];
    filteredProducts.forEach((item, index) => {
      elements.push(
        <ProductItem
          key={item._id}
          name={item.name}
          id={item._id}
          image={item.image}
          price={item.price}
          index={index}
        />
      );

      // Insert first lookbook card after 4th product item (starts at new row)
      if (index === 3 && filteredProducts.length > 4) {
        elements.push(
          <div 
            key="editorial-card-1" 
            className="col-span-2 md:col-span-3 lg:col-span-4 aspect-[2/1] sm:aspect-[3/1] lg:aspect-[4/1] bg-primary text-white p-6 sm:p-8 rounded-sm border border-secondary/15 flex flex-col justify-center items-center text-center shadow-md select-none relative overflow-hidden"
          >
            {/* Fine design details */}
            <div className="absolute inset-2 border border-secondary/20 z-0 pointer-events-none" />
            <div className="z-10 space-y-2.5">
              <span className="text-[8px] tracking-[0.4em] text-secondary uppercase font-bold block">
                ATELIER PHILOSOPHY
              </span>
              <h3 className="font-serif text-base sm:text-xl text-accent italic leading-relaxed max-w-sm">
                "Tailoring is the architecture of movement."
              </h3>
              <div className="w-8 h-[1px] bg-secondary/35 mx-auto" />
              <p className="font-sans text-[8px] sm:text-[9px] text-surface/60 tracking-[0.25em] uppercase font-semibold">
                Souza Flair Design House
              </p>
            </div>
          </div>
        );
      }

      // Insert second lookbook card after 8th product item (starts at new row)
      if (index === 7 && filteredProducts.length > 8) {
        elements.push(
          <div 
            key="editorial-card-2" 
            className="col-span-2 md:col-span-3 lg:col-span-4 aspect-[2/1] sm:aspect-[3/1] lg:aspect-[4/1] bg-gradient-to-br from-primary via-primary to-secondary/15 border border-secondary/20 p-6 sm:p-8 rounded-sm flex flex-col justify-center items-start shadow-md select-none relative overflow-hidden"
          >
            <div className="absolute inset-2 border border-white/5 z-0 pointer-events-none" />
            <div className="z-10 space-y-2 sm:space-y-3">
              <span className="text-[8px] tracking-[0.4em] text-secondary uppercase font-bold block">
                INTERACTIVE STYLING
              </span>
              <h3 className="font-serif text-base sm:text-xl text-white font-medium">
                The Wardrobe Studio
              </h3>
              <p className="font-sans text-[10px] sm:text-xs text-white/70 max-w-xs leading-relaxed">
                Mix and match tops, bottoms, and outerwear on our bespoke styling canvas to compose cohesive luxury looks.
              </p>
              <a 
                href="/wardrobe" 
                className="inline-block px-5 py-2 text-[9px] tracking-widest font-semibold bg-secondary text-primary uppercase rounded-xs hover:bg-white transition-all duration-300 shadow-sm"
              >
                Enter Studio
              </a>
            </div>
          </div>
        );
      }
    });
    return elements;
  };

  return (
    <div className="w-full bg-[#fdfbf7] min-h-screen">
      {/* Editorial Luxury Header Banner */}
      <div className="w-full pt-28 bg-primary relative overflow-hidden select-none border-b border-secondary/15">
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(201,169,110,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(201,169,110,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/95 to-transparent z-0" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-16 text-center space-y-6 relative z-10">
          <span className="text-[9px] sm:text-[10px] font-semibold tracking-[0.4em] text-secondary uppercase block">
            SOUZA FLAIR / ARCHIVE
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-white tracking-[0.15em] font-light uppercase leading-tight">
            The Atelier Collection
          </h1>
          <p className="text-[11px] sm:text-xs text-accent/70 font-light tracking-[0.2em] max-w-xl mx-auto leading-relaxed uppercase">
            A study in architectural silhouettes, precision tailored textiles, and bespoke outerwear.
          </p>
          <div className="w-16 h-[1px] bg-secondary/30 mx-auto"></div>
        </div>
      </div>

      {/* Main Layout Container */}
      <div
        ref={revealRef}
        className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-12 max-w-7xl mx-auto select-none flex flex-col"
      >
        {/* FLOATING HORIZONTAL CONTROLS */}
        <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-5 p-4 mb-8 bg-white border border-secondary/15 rounded-md shadow-sm">
          
          {/* Quick-Filter Pills */}
          <div className="flex flex-wrap items-center gap-4">
            
            {/* Gender Quick-Select */}
            <div className="flex items-center gap-1.5 bg-surface/50 p-1 rounded border border-secondary/10 overflow-x-auto">
              <button
                onClick={() => setCategory([])}
                className={`px-3 py-1.5 text-[9px] sm:text-[10px] tracking-widest uppercase font-semibold transition-all duration-300 rounded cursor-pointer ${
                  category.length === 0 ? "bg-primary text-white shadow-sm" : "text-text-muted hover:text-primary"
                }`}
              >
                All Genders
              </button>
              {["Men", "Women", "Kids"].map((gender) => (
                <button
                  key={gender}
                  onClick={() => selectGender(gender)}
                  className={`px-3 py-1.5 text-[9px] sm:text-[10px] tracking-widest uppercase font-semibold transition-all duration-300 rounded cursor-pointer ${
                    category.includes(gender) && category.length === 1
                      ? "bg-secondary text-primary font-bold shadow-xs"
                      : "text-text-muted hover:text-primary"
                  }`}
                >
                  {gender}
                </button>
              ))}
            </div>

            {/* Silhouette Type Quick-Select */}
            <div className="flex items-center gap-1.5 bg-surface/50 p-1 rounded border border-secondary/10 overflow-x-auto">
              <button
                onClick={() => setSubCategory([])}
                className={`px-3 py-1.5 text-[9px] sm:text-[10px] tracking-widest uppercase font-semibold transition-all duration-300 rounded cursor-pointer ${
                  subCategory.length === 0 ? "bg-primary text-white shadow-sm" : "text-text-muted hover:text-primary"
                }`}
              >
                All Pieces
              </button>
              {["Topwear", "Bottomwear", "Winterwear"].map((sub) => (
                <button
                  key={sub}
                  onClick={() => selectType(sub)}
                  className={`px-3 py-1.5 text-[9px] sm:text-[10px] tracking-widest uppercase font-semibold transition-all duration-300 rounded cursor-pointer ${
                    subCategory.includes(sub) && subCategory.length === 1
                      ? "bg-secondary text-primary font-bold shadow-xs"
                      : "text-text-muted hover:text-primary"
                  }`}
                >
                  {sub === "Winterwear" ? "Jackets" : sub.replace("wear", "")}
                </button>
              ))}
            </div>
          </div>

          {/* Action Tools: Refine Drawer Toggle & Sort */}
          <div className="flex items-center gap-3 justify-between lg:justify-end">
            <button
              onClick={() => setShowFilter(!showFilter)}
              className={`flex items-center gap-2 border px-4 py-2.5 rounded text-[10px] tracking-widest uppercase font-bold cursor-pointer transition-all duration-300 ${
                showFilter
                  ? "border-secondary bg-secondary text-primary shadow-xs"
                  : "border-secondary/20 hover:border-secondary text-primary bg-white"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              <span>Refine Search</span>
              {activeFiltersCount > 0 && (
                <span className="bg-secondary text-primary text-[8px] font-sans font-bold px-2 py-0.5 rounded-full ml-1">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            <select
              onChange={(e) => setSortType(e.target.value)}
              className="bg-white border border-secondary/20 rounded text-[10px] tracking-widest px-3 py-2.5 outline-none focus:border-secondary cursor-pointer shadow-xs text-text uppercase font-semibold transition-colors duration-300"
              value={sortType}
            >
              <option value="relevant">Relevant</option>
              <option value="low_high">Price: Low to High</option>
              <option value="high_low">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* ADVANCED REFINE DRAWER */}
        {showFilter && (
          <div className="w-full bg-white border border-secondary/15 rounded-md p-6 mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 shadow-md transition-all duration-500 glass-panel">
            
            {/* Category Selector (Multi-check) */}
            <div className="flex flex-col">
              <h5 className="font-serif text-xs font-semibold tracking-wider text-primary border-b border-secondary/15 pb-2 mb-3 uppercase">
                Categories (Multi)
              </h5>
              <div className="flex flex-col gap-2.5 font-sans text-xs tracking-wider text-text-muted">
                {["Men", "Women", "Kids"].map((cat) => (
                  <label key={cat} className="flex items-center gap-2.5 cursor-pointer hover:text-primary transition-colors">
                    <input
                      type="checkbox"
                      className="accent-secondary w-3.5 h-3.5 cursor-pointer rounded-xs border-secondary/35"
                      value={cat}
                      checked={category.includes(cat)}
                      onChange={toggleCategory}
                    />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Silhouette Selector (Multi-check) */}
            <div className="flex flex-col">
              <h5 className="font-serif text-xs font-semibold tracking-wider text-primary border-b border-secondary/15 pb-2 mb-3 uppercase">
                Clothing Pieces
              </h5>
              <div className="flex flex-col gap-2.5 font-sans text-xs tracking-wider text-text-muted">
                {["Topwear", "Bottomwear", "Winterwear"].map((sub) => (
                  <label key={sub} className="flex items-center gap-2.5 cursor-pointer hover:text-primary transition-colors">
                    <input
                      type="checkbox"
                      className="accent-secondary w-3.5 h-3.5 cursor-pointer rounded-xs border-secondary/35"
                      value={sub}
                      checked={subCategory.includes(sub)}
                      onChange={toggleSubCategory}
                    />
                    <span>{sub}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Actions Panel */}
            <div className="flex flex-col justify-end gap-3">
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="w-full text-center text-[9px] tracking-[0.2em] font-semibold py-2.5 px-4 uppercase bg-transparent text-secondary border border-secondary/35 hover:bg-secondary hover:text-primary hover:border-secondary transition-all duration-300 rounded cursor-pointer"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        )}

        {/* ACTIVE FILTER BADGES */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2 items-center mb-8 bg-secondary/5 border border-secondary/10 p-3.5 rounded-sm">
            <span className="text-[9px] tracking-[0.2em] text-text-muted uppercase font-bold mr-1">
              Active Filters:
            </span>
            
            {category.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory((prev) => prev.filter((item) => item !== cat))}
                className="text-[9px] tracking-widest text-primary border border-secondary/25 hover:border-secondary px-3 py-1 rounded-full bg-white flex items-center gap-1.5 transition-all duration-300 shadow-xs cursor-pointer font-semibold uppercase"
              >
                <span>{cat}</span>
                <span className="text-secondary text-[11px] font-normal">&times;</span>
              </button>
            ))}
            
            {subCategory.map((sub) => (
              <button
                key={sub}
                onClick={() => setSubCategory((prev) => prev.filter((item) => item !== sub))}
                className="text-[9px] tracking-widest text-primary border border-secondary/25 hover:border-secondary px-3 py-1 rounded-full bg-white flex items-center gap-1.5 transition-all duration-300 shadow-xs cursor-pointer font-semibold uppercase"
              >
                <span>{sub === "Winterwear" ? "Jackets" : sub.replace("wear", "")}</span>
                <span className="text-secondary text-[11px] font-normal">&times;</span>
              </button>
            ))}

            {showSearch && search && (
              <button
                onClick={() => setSearch("")}
                className="text-[9px] tracking-widest text-primary border border-secondary/25 hover:border-secondary px-3 py-1 rounded-full bg-white flex items-center gap-1.5 transition-all duration-300 shadow-xs cursor-pointer font-semibold uppercase"
              >
                <span>Search: "{search}"</span>
                <span className="text-secondary text-[11px] font-normal">&times;</span>
              </button>
            )}

            <button
              onClick={clearAllFilters}
              className="text-[9px] tracking-[0.2em] text-secondary hover:text-primary underline font-bold transition-colors uppercase cursor-pointer ml-auto"
            >
              Clear All
            </button>
          </div>
        )}

        {/* PRODUCTS GRID (Asymmetrical & Editorial) */}
        <div className={`transition-all duration-300 ${isFiltering ? "opacity-30 translate-y-2 pointer-events-none" : "opacity-100 translate-y-0"}`}>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-10">
              {renderGridItems()}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center select-none bg-white border border-secondary/15 rounded-sm p-12">
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
              <h4 className="font-serif text-lg text-primary font-semibold tracking-wide uppercase">
                No Pieces Found
              </h4>
              <p className="font-sans text-xs text-text-muted mt-2 tracking-wider max-w-xs leading-relaxed">
                Try adjusting your selections or clear search keywords to discover items.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;

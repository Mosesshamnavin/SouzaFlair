import React, { useState, useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { toast } from "react-toastify";
import useScrollReveal from "../hooks/useScrollReveal";

const Wardrobe = () => {
  const { products, addToCart, currency } = useContext(ShopContext);
  const revealRef = useScrollReveal({ once: true });

  // Filter states
  const [genderFilter, setGenderFilter] = useState("Women"); // "Men" | "Women" | "Kids"
  const [activeTab, setActiveTab] = useState("Topwear"); // "Topwear" | "Bottomwear" | "Winterwear"

  // Wardrobe slot states
  const [slots, setSlots] = useState({
    winterwear: null,
    topwear: null,
    bottomwear: null,
  });

  // Size states for selected slots
  const [sizes, setSizes] = useState({
    winterwear: "",
    topwear: "",
    bottomwear: "",
  });

  // Styling advice state
  const [styleAdvice, setStyleAdvice] = useState("");

  // Update dynamic styling advice based on selected slots
  useEffect(() => {
    const { winterwear, topwear, bottomwear } = slots;

    if (!winterwear && !topwear && !bottomwear) {
      setStyleAdvice(
        "Welcome to the Atelier Wardrobe Studio. Select clothing items from the catalog on the right to compose your bespoke outfit combo. Tap 'Shuffle Outfit' for automated styling inspiration."
      );
      return;
    }

    if (winterwear && topwear && bottomwear) {
      setStyleAdvice(
        `Superb! A fully composed luxury ensemble. The ${winterwear.name} balances the structured drape of the ${topwear.name} and complements the clean profile of the ${bottomwear.name}. A perfect layered outfit for smart-casual and cooler climates.`
      );
      return;
    }

    if (topwear && bottomwear) {
      setStyleAdvice(
        `A classic, minimalist two-piece look. Combining the ${topwear.name} with the ${bottomwear.name} creates an effortless, refined daily silhouette. Tip: You can layer this look with a structured jacket/winterwear for added architectural depth.`
      );
      return;
    }

    if (winterwear && topwear) {
      setStyleAdvice(
        `Great upper-body coordination. The ${winterwear.name} over the ${topwear.name} creates a cozy and modern statement. Complete the ensemble by choosing an elegant pair of bottoms.`
      );
      return;
    }

    if (winterwear && bottomwear) {
      setStyleAdvice(
        `A high-contrast layering base. Pairing the ${winterwear.name} directly with the ${bottomwear.name} works best when worn over a fitted topwear item. Select a topwear slot item to tie this look together.`
      );
      return;
    }

    if (topwear) {
      setStyleAdvice(
        `Focusing on the top layer. The ${topwear.name} offers pure cotton comfort and style. Try pairing it with dark-wash jeans or tapered trousers from our Bottomwear section to balance the drape.`
      );
      return;
    }

    if (bottomwear) {
      setStyleAdvice(
        `Solid foundation. The ${bottomwear.name} features an excellent tailored fit. Explore our Topwear collections to find a matching cotton tee or knitwear to style.`
      );
      return;
    }

    if (winterwear) {
      setStyleAdvice(
        `Statement outerwear. The structural build of the ${winterwear.name} is designed to be the highlight of your look. Select a topwear base layer and trousers to complete your winter outfit.`
      );
    }
  }, [slots]);

  // Set an item to its designated slot
  const selectItem = (item) => {
    const sub = item.subCategory.toLowerCase(); // "topwear" | "bottomwear" | "winterwear"
    
    setSlots((prev) => ({
      ...prev,
      [sub]: item,
    }));

    // Auto-select first available size
    setSizes((prev) => ({
      ...prev,
      [sub]: item.sizes && item.sizes.length > 0 ? item.sizes[0] : "",
    }));

    toast.info(`Styled ${item.name} into your Outfit!`, {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: true,
    });
  };

  // Remove item from slot
  const removeItem = (slotKey) => {
    setSlots((prev) => ({
      ...prev,
      [slotKey]: null,
    }));
    setSizes((prev) => ({
      ...prev,
      [slotKey]: "",
    }));
  };

  // Shuffle Outfit Generator
  const shuffleOutfit = () => {
    // Filter products by gender
    const genderProducts = products.filter(
      (p) => p.category.toLowerCase() === genderFilter.toLowerCase()
    );

    if (genderProducts.length === 0) {
      toast.warning("No items found for current category.");
      return;
    }

    const tops = genderProducts.filter((p) => p.subCategory === "Topwear");
    const bottoms = genderProducts.filter((p) => p.subCategory === "Bottomwear");
    const winters = genderProducts.filter((p) => p.subCategory === "Winterwear");

    const newSlots = { winterwear: null, topwear: null, bottomwear: null };
    const newSizes = { winterwear: "", topwear: "", bottomwear: "" };

    if (tops.length > 0) {
      const randomTop = tops[Math.floor(Math.random() * tops.length)];
      newSlots.topwear = randomTop;
      newSizes.topwear = randomTop.sizes?.[0] || "";
    }
    if (bottoms.length > 0) {
      const randomBottom = bottoms[Math.floor(Math.random() * bottoms.length)];
      newSlots.bottomwear = randomBottom;
      newSizes.bottomwear = randomBottom.sizes?.[0] || "";
    }
    if (winters.length > 0 && Math.random() > 0.3) {
      // 70% chance to include a jacket in shuffle
      const randomWinter = winters[Math.floor(Math.random() * winters.length)];
      newSlots.winterwear = randomWinter;
      newSizes.winterwear = randomWinter.sizes?.[0] || "";
    }

    setSlots(newSlots);
    setSizes(newSizes);

    toast.success("Shuffled! Styled a new custom look.", {
      position: "bottom-right",
      autoClose: 1200,
    });
  };

  // Reset the Wardrobe
  const resetWardrobe = () => {
    setSlots({ winterwear: null, topwear: null, bottomwear: null });
    setSizes({ winterwear: "", topwear: "", bottomwear: "" });
    toast.info("Wardrobe reset.");
  };

  // Add all selected wardrobe slots to shopping cart
  const addOutfitToCart = () => {
    const activeSlots = Object.entries(slots).filter(([_, item]) => item !== null);

    if (activeSlots.length === 0) {
      toast.error("Please add at least one item to your outfit first.");
      return;
    }

    // Validation: check if all active slots have sizes selected
    for (const [key, item] of activeSlots) {
      if (!sizes[key]) {
        toast.error(`Please select a size for ${item.name}`);
        return;
      }
    }

    // Add items sequentially
    activeSlots.forEach(([key, item]) => {
      addToCart(item._id, sizes[key]);
    });

    toast.success("Bespoke outfit combination added to your cart!");
  };

  // Calculate total outfit price
  const calculateTotal = () => {
    return Object.values(slots).reduce((sum, item) => {
      return sum + (item ? item.price : 0);
    }, 0);
  };

  // Filter catalog list by selected category (gender) and subcategory (active tab)
  const filteredProducts = products.filter(
    (p) =>
      p.category.toLowerCase() === genderFilter.toLowerCase() &&
      p.subCategory === activeTab
  );

  return (
    <div ref={revealRef} className="pt-28 pb-16 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] select-none min-h-screen flex flex-col justify-start">
      
      {/* Page Title */}
      <div className="text-center mb-10 reveal reveal-up" data-reveal>
        <Title text1="WARDROBE" text2="STUDIO" />
        <p className="text-xs sm:text-sm tracking-[0.2em] text-text-muted mt-2 uppercase font-medium">
          Mix & match garments to craft your bespoke visual identity
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-7xl mx-auto w-full">
        
        {/* Left Column: Visual Outfit Canvas / Mannequin */}
        <div className="lg:col-span-5 flex flex-col gap-6 reveal reveal-left w-full" data-reveal>
          <div className="glass-panel border border-secondary/20 rounded-md p-6 relative shadow-lg flex flex-col items-center">
            
            {/* Elegant Hanger Icon / Line */}
            <div className="w-16 h-3 bg-secondary/35 rounded-full mb-6 relative flex items-center justify-center">
              <div className="absolute -top-3 w-6 h-6 border-2 border-secondary/40 border-b-0 rounded-t-full" />
            </div>

            <h3 className="font-serif text-sm tracking-[0.15em] text-primary uppercase font-bold mb-4">
              Your Active Layering
            </h3>

            {/* Mannequin Slots Stack */}
            <div className="w-full flex flex-col gap-4 mb-6 relative">
              
              {/* SLOT 1: WINTERWEAR */}
              <div 
                className={`w-full min-h-[110px] rounded border transition-all duration-300 flex items-center p-3 gap-4 relative overflow-hidden ${
                  slots.winterwear 
                    ? "bg-white border-secondary/30 shadow-sm" 
                    : "border-dashed border-secondary/35 bg-surface/30 hover:bg-surface/50"
                }`}
              >
                {slots.winterwear ? (
                  <>
                    <img 
                      src={slots.winterwear.image[0]} 
                      alt="Winterwear" 
                      className="w-16 h-20 object-cover rounded shadow-sm"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] tracking-widest text-secondary uppercase font-bold">Winterwear</span>
                      <h4 className="font-serif text-xs font-semibold text-primary truncate mt-0.5">{slots.winterwear.name}</h4>
                      <p className="font-sans text-xs text-text-muted mt-1 font-medium">{currency}{slots.winterwear.price}</p>
                      
                      {/* Size Selector */}
                      <div className="mt-2 flex items-center gap-2">
                        <label className="text-[10px] text-text-muted font-sans font-medium">Size:</label>
                        <select 
                          id="size-select-winterwear"
                          value={sizes.winterwear}
                          onChange={(e) => setSizes(prev => ({ ...prev, winterwear: e.target.value }))}
                          className="bg-surface/50 text-[11px] font-sans px-2 py-0.5 border border-secondary/15 rounded focus:outline-none focus:border-secondary"
                        >
                          <option value="">Select</option>
                          {slots.winterwear.sizes.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeItem("winterwear")} 
                      className="absolute top-2 right-2 text-text-muted hover:text-red-500 transition-colors p-1"
                      aria-label="Remove Winterwear"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </>
                ) : (
                  <div className="w-full flex flex-col items-center justify-center text-center py-2 text-text-muted/60">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-secondary/30 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <p className="text-[10px] uppercase tracking-widest font-semibold font-sans">Layer 1: Winterwear Slot</p>
                    <span className="text-[9px] font-sans mt-0.5 opacity-80">Add a jacket or overlay layer</span>
                  </div>
                )}
              </div>

              {/* SLOT 2: TOPWEAR */}
              <div 
                className={`w-full min-h-[110px] rounded border transition-all duration-300 flex items-center p-3 gap-4 relative overflow-hidden ${
                  slots.topwear 
                    ? "bg-white border-secondary/30 shadow-sm" 
                    : "border-dashed border-secondary/35 bg-surface/30 hover:bg-surface/50"
                }`}
              >
                {slots.topwear ? (
                  <>
                    <img 
                      src={slots.topwear.image[0]} 
                      alt="Topwear" 
                      className="w-16 h-20 object-cover rounded shadow-sm"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] tracking-widest text-secondary uppercase font-bold">Topwear</span>
                      <h4 className="font-serif text-xs font-semibold text-primary truncate mt-0.5">{slots.topwear.name}</h4>
                      <p className="font-sans text-xs text-text-muted mt-1 font-medium">{currency}{slots.topwear.price}</p>
                      
                      {/* Size Selector */}
                      <div className="mt-2 flex items-center gap-2">
                        <label className="text-[10px] text-text-muted font-sans font-medium">Size:</label>
                        <select 
                          id="size-select-topwear"
                          value={sizes.topwear}
                          onChange={(e) => setSizes(prev => ({ ...prev, topwear: e.target.value }))}
                          className="bg-surface/50 text-[11px] font-sans px-2 py-0.5 border border-secondary/15 rounded focus:outline-none focus:border-secondary"
                        >
                          <option value="">Select</option>
                          {slots.topwear.sizes.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeItem("topwear")} 
                      className="absolute top-2 right-2 text-text-muted hover:text-red-500 transition-colors p-1"
                      aria-label="Remove Topwear"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </>
                ) : (
                  <div className="w-full flex flex-col items-center justify-center text-center py-2 text-text-muted/60">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-secondary/30 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21m0 0l-1.813-5.096m1.813 5.096V14.5M17 10a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <p className="text-[10px] uppercase tracking-widest font-semibold font-sans">Layer 2: Topwear Slot</p>
                    <span className="text-[9px] font-sans mt-0.5 opacity-80">Select a T-Shirt, Shirt, or Top</span>
                  </div>
                )}
              </div>

              {/* SLOT 3: BOTTOMWEAR */}
              <div 
                className={`w-full min-h-[110px] rounded border transition-all duration-300 flex items-center p-3 gap-4 relative overflow-hidden ${
                  slots.bottomwear 
                    ? "bg-white border-secondary/30 shadow-sm" 
                    : "border-dashed border-secondary/35 bg-surface/30 hover:bg-surface/50"
                }`}
              >
                {slots.bottomwear ? (
                  <>
                    <img 
                      src={slots.bottomwear.image[0]} 
                      alt="Bottomwear" 
                      className="w-16 h-20 object-cover rounded shadow-sm"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] tracking-widest text-secondary uppercase font-bold">Bottomwear</span>
                      <h4 className="font-serif text-xs font-semibold text-primary truncate mt-0.5">{slots.bottomwear.name}</h4>
                      <p className="font-sans text-xs text-text-muted mt-1 font-medium">{currency}{slots.bottomwear.price}</p>
                      
                      {/* Size Selector */}
                      <div className="mt-2 flex items-center gap-2">
                        <label className="text-[10px] text-text-muted font-sans font-medium">Size:</label>
                        <select 
                          id="size-select-bottomwear"
                          value={sizes.bottomwear}
                          onChange={(e) => setSizes(prev => ({ ...prev, bottomwear: e.target.value }))}
                          className="bg-surface/50 text-[11px] font-sans px-2 py-0.5 border border-secondary/15 rounded focus:outline-none focus:border-secondary"
                        >
                          <option value="">Select</option>
                          {slots.bottomwear.sizes.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeItem("bottomwear")} 
                      className="absolute top-2 right-2 text-text-muted hover:text-red-500 transition-colors p-1"
                      aria-label="Remove Bottomwear"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </>
                ) : (
                  <div className="w-full flex flex-col items-center justify-center text-center py-2 text-text-muted/60">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-secondary/30 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <p className="text-[10px] uppercase tracking-widest font-semibold font-sans">Layer 3: Bottomwear Slot</p>
                    <span className="text-[9px] font-sans mt-0.5 opacity-80">Select trousers, pants, or shorts</span>
                  </div>
                )}
              </div>

            </div>

            {/* Total Pricing Summary */}
            <div className="w-full border-t border-secondary/15 pt-4 flex items-center justify-between font-serif text-sm font-bold text-primary mb-5">
              <span>OUTfit total value:</span>
              <span className="text-secondary">{currency}{calculateTotal()}</span>
            </div>

            {/* Main Action Buttons */}
            <div className="w-full flex flex-col gap-3">
              <button
                id="wardrobe-add-btn"
                onClick={addOutfitToCart}
                className="w-full py-3 text-xs uppercase tracking-[0.2em] font-semibold shimmer-btn-gold rounded transition-all shadow-md focus:outline-none"
              >
                Add Outfit to Cart
              </button>
              
              <div className="grid grid-cols-2 gap-2">
                <button
                  id="wardrobe-shuffle-btn"
                  onClick={shuffleOutfit}
                  className="py-2.5 text-[10px] uppercase tracking-[0.15em] font-semibold border border-secondary text-secondary bg-transparent hover:bg-secondary hover:text-primary transition-all duration-300 rounded focus:outline-none flex items-center justify-center gap-1.5"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H17" />
                  </svg>
                  Shuffle Look
                </button>
                <button
                  id="wardrobe-reset-btn"
                  onClick={resetWardrobe}
                  className="py-2.5 text-[10px] uppercase tracking-[0.15em] font-semibold border border-text-muted/30 text-text-muted hover:border-red-500 hover:text-red-500 transition-all duration-300 rounded focus:outline-none"
                >
                  Reset Studio
                </button>
              </div>
            </div>

          </div>

          {/* Dynamic Style Advice Card */}
          <div className="glass-panel-dark text-white rounded-md p-5 border border-secondary/10 relative shadow-md">
            <h4 className="font-serif text-xs tracking-[0.15em] text-secondary uppercase font-bold mb-2 flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Atelier Styling Advice
            </h4>
            <p className="font-sans text-[11px] leading-relaxed text-surface/85 tracking-wider italic">
              "{styleAdvice}"
            </p>
          </div>
        </div>

        {/* Right Column: Catalog Browser */}
        <div className="lg:col-span-7 flex flex-col gap-6 reveal reveal-right w-full" data-reveal>
          <div className="bg-white border border-secondary/10 rounded-md p-6 shadow-sm">
            
            {/* Gender Category Filter Pills */}
            <div className="flex justify-center sm:justify-start gap-3 border-b border-surface pb-5 mb-5 overflow-x-auto">
              {["Men", "Women", "Kids"].map((gender) => (
                <button
                  key={gender}
                  onClick={() => {
                    setGenderFilter(gender);
                    // Clear the slots of other genders if desired, or keep them. Let's keep slots but update catalog
                  }}
                  className={`px-5 py-2 text-xs font-semibold tracking-widest uppercase transition-all duration-300 rounded-sm cursor-pointer ${
                    genderFilter === gender
                      ? "bg-primary text-white shadow-md scale-102"
                      : "bg-surface text-text-muted hover:bg-secondary/10 hover:text-primary"
                  }`}
                >
                  {gender}
                </button>
              ))}
            </div>

            {/* Subcategory Tab Headers */}
            <div className="flex gap-6 border-b border-surface pb-3 mb-6">
              {["Topwear", "Bottomwear", "Winterwear"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 text-xs tracking-[0.2em] font-semibold uppercase relative cursor-pointer focus:outline-none transition-colors duration-300 ${
                    activeTab === tab ? "text-secondary font-bold" : "text-text-muted hover:text-primary"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-secondary" />
                  )}
                </button>
              ))}
            </div>

            {/* Catalog Grid */}
            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center text-text-muted/60 font-sans text-xs">
                No items available in {genderFilter} - {activeTab} at this time.
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 max-h-[600px] overflow-y-auto pr-1">
                {filteredProducts.map((item) => {
                  const isAlreadyActive = Object.values(slots).some(
                    (slotItem) => slotItem && slotItem._id === item._id
                  );
                  return (
                    <div 
                      key={item._id}
                      className="border border-secondary/5 rounded p-3 flex flex-col justify-between hover:shadow-md transition-shadow group relative bg-white"
                    >
                      {/* Image with Shine Hover */}
                      <div className="aspect-[3/4] w-full bg-surface overflow-hidden rounded shine-hover relative mb-3">
                        <img 
                          src={item.image[0]} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                          alt={item.name} 
                        />
                        {isAlreadyActive && (
                          <div className="absolute inset-0 bg-primary/45 backdrop-blur-[1.5px] flex items-center justify-center">
                            <span className="bg-secondary text-primary font-bold text-[9px] tracking-widest uppercase px-2 py-1 rounded shadow-md">
                              Styled
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Product details */}
                      <div>
                        <h4 className="font-serif text-xs font-semibold text-primary line-clamp-1 mb-1">
                          {item.name}
                        </h4>
                        <p className="font-sans text-xs font-bold text-secondary mb-3">
                          {currency}{item.price}
                        </p>
                      </div>

                      {/* Action Button */}
                      <button
                        onClick={() => selectItem(item)}
                        className={`w-full py-2 text-[10px] uppercase tracking-wider font-semibold rounded transition-all duration-300 focus:outline-none ${
                          isAlreadyActive 
                            ? "bg-secondary text-primary font-bold shadow-sm"
                            : "bg-surface hover:bg-primary hover:text-white text-text-muted hover:shadow"
                        }`}
                      >
                        {isAlreadyActive ? "Slot Added" : "Style Card"}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

          </div>
        </div>

      </div>

    </div>
  );
};

export default Wardrobe;

import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import Collection from "./pages/Collection";
import PlaceOrder from "./pages/PlaceOrder";
import Order from "./pages/Order";
import Product from "./pages/Product";
import Wardrobe from "./pages/Wardrobe";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { assets } from "./assets/assets";

// Import custom hooks
import useSmoothScroll from "./hooks/useSmoothScroll";
import useParallax from "./hooks/useParallax";

const App = () => {
  const [loading, setLoading] = useState(true);

  // Initialize premium smooth scroll and parallax tracking
  useSmoothScroll();
  useParallax();

  useEffect(() => {
    // 1.8 second delay for luxury preloader animation
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-99999 bg-primary flex flex-col items-center justify-center select-none">
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes scaleLogo {
            0% { transform: scale(0.9); opacity: 0; filter: blur(3px); }
            50% { transform: scale(1.04); opacity: 1; filter: blur(0); }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes fillBar {
            0% { width: 0%; }
            100% { width: 100%; }
          }
          .preloader-logo {
            animation: scaleLogo 1.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          }
          .preloader-bar {
            animation: fillBar 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          }
        `}} />
        <div className="flex flex-col items-center">
          <img src={assets.SF_logo} className="h-16 w-auto mb-6 preloader-logo" alt="logo" />
          <div className="w-32 h-[1px] bg-secondary/15 relative overflow-hidden rounded-full">
            <div className="absolute top-0 left-0 h-full bg-secondary preloader-bar" />
          </div>
          <p className="text-[9px] tracking-[0.4em] text-accent uppercase mt-4 preloader-logo font-sans">
            SOUZA FLAIR
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdfbf7] font-sans antialiased text-[#2d2d2d] flex flex-col">
      {/* Toast notifications */}
      <ToastContainer />
      
      {/* Sticky Glassmorphic Navbar */}
      <Navbar />
      
      {/* Search overlay */}
      <SearchBar />
      
      {/* Main content wrapper */}
      <main className="w-full flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/wardrobe" element={<Wardrobe />} />
          <Route path="/login" element={<Login />} />
          <Route path="/order" element={<Order />} />
          <Route path="/placeOrder" element={<PlaceOrder />} />
          <Route path="/product/:productId" element={<Product />} />
        </Routes>
      </main>
      
      {/* Premium dark footer */}
      <Footer />
    </div>
  );
};

export default App;

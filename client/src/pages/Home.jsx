import React from "react";
import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import CategoryShowcase from "../components/CategoryShowcase";
import LatestCollection from "../components/LatestCollection";
import ParallaxBanner from "../components/ParallaxBanner";
import BestSeller from "../components/BestSeller";
import BrandStory from "../components/BrandStory";
import OurPolicy from "../components/OurPolicy";
import NewsLetterBox from "../components/NewsLetterBox";

const Home = () => {
  return (
    <div className="w-full overflow-hidden">
      {/* 1. Cinematic Hero Section */}
      <Hero />

      {/* 2. Brand Marquee Slogan Strip */}
      <Marquee />

      {/* 3. Category Showcase with 3D Tilt */}
      <CategoryShowcase />

      {/* 4. Latest Arrivals Horizontal Slider */}
      <LatestCollection />

      {/* 5. Parallax Lookbook Banner */}
      <ParallaxBanner />

      {/* 6. Best Sellers Grid & Magnetic Callout */}
      <BestSeller />

      {/* 7. Brand Heritage & Animated Stats */}
      <BrandStory />

      {/* 8. Policy & Newsletter Trust builders */}
      <OurPolicy />
      <NewsLetterBox />
    </div>
  );
};

export default Home;

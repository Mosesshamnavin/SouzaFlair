import ScrollHero, { TextOverlay } from "@/components/ScrollHero";

export default function Home() {
  // 1. Generate sequence of frame paths/links (e.g. 20 frames)
  // For production, render local files from your /public/images/frames/ folder
  const frameImages = Array.from({ length: 20 }, (_, i) => {
    // Premium fashion/product shots from Unsplash for testing
    const ids = [
      "1515886657613-9f3515b0c78f", // fashion model 1
      "1490481651871-ab68de25d43d", // fashion model 2
      "1483985988355-763728e1935b", // model 3
      "1496181130204-755241c24e35", // tech layout
      "1441986300917-64674bd600d8", // showroom display
    ];
    const unsplashId = ids[i % ids.length];
    return `https://images.unsplash.com/photo-${unsplashId}?auto=format&fit=crop&w=1200&q=80&sig=${i}`;
  });

  // 2. Define text overlays at target frame indices
  const textOverlays: TextOverlay[] = [
    {
      frameIndex: 0,
      title: "Sculpted for Elegance",
      subtitle: "The all-new Atelier collection captures the art of movement.",
    },
    {
      frameIndex: 5,
      title: "Precision in Every Stitch",
      subtitle: "Handcrafted from double-faced Italian wool for perfect weight.",
    },
    {
      frameIndex: 10,
      title: "Sustainable Heritage",
      subtitle: "Composed entirely of trace-inspected organic yarns.",
    },
    {
      frameIndex: 15,
      title: "Engineered to Transcend",
      subtitle: "Bespoke outerwear suited for every seasonal occasion.",
    },
  ];

  return (
    <main className="w-full bg-black min-h-screen">
      {/* Sticky Scroll flipbook component */}
      <ScrollHero 
        frames={frameImages} 
        overlays={textOverlays} 
        scrollSensitivity={0.8} // Adjust depth of scroll scrub (lower = faster)
      />

      {/* Page continues into standard scrollable content */}
      <div className="bg-[#fdfbf7] text-[#2d2d2d] py-32 px-6 border-t border-white/10 relative z-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <span className="text-xs font-semibold tracking-[0.3em] text-[#c9a96e] uppercase">
            Signature Design
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0a0a0a]">
            Where Craft Meets Identity
          </h2>
          <p className="text-sm md:text-base text-neutral-500 leading-relaxed max-w-2xl mx-auto font-light">
            We partner with historical mills across Biella, Italy to refine raw, trace-certified fibers into architectural textiles, establishing a new visual canvas for haute couture.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] border-t border-neutral-900 py-16 text-center text-[10px] tracking-[0.25em] text-neutral-500 uppercase relative z-20">
        © 2026 Souza Flair. All Rights Reserved.
      </footer>
    </main>
  );
}

import React, { useState } from "react";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import OurPolicy from "../components/OurPolicy";
import NewsLetterBox from "../components/NewsLetterBox";
import { toast } from "react-toastify";
import useScrollReveal from "../hooks/useScrollReveal";

const Contact = () => {
  const revealRef = useScrollReveal({ once: true });
  const [formData, setFormData] = useState({ name: "", email: "", msg: "" });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    toast.success("Consultation Booking Received! We will contact you shortly.");
    setFormData({ name: "", email: "", msg: "" });
  };

  return (
    <div ref={revealRef} className="select-none">
      {/* 1. Header Banner */}
      <section className="h-[45vh] w-full relative overflow-hidden flex items-center justify-center bg-primary">
        <div
          className="absolute inset-0 bg-cover bg-center parallax-bg"
          style={{
            backgroundImage: `url(${assets.contact_img})`,
            transform: `translateY(calc((var(--scroll-y, 0) * 0.15px) - 60px)) scale(1.15)`,
            filter: "brightness(0.5)",
            transition: "transform 0.1s ease-out",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
        <div className="z-10 text-center px-4 reveal reveal-up" data-reveal>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-white tracking-[0.2em] font-bold">
            CONTACT US
          </h1>
          <span className="font-sans text-[10px] tracking-[0.4em] text-accent mt-3 block uppercase font-medium">
            Atelier Consultations & Concierge Services
          </span>
        </div>
      </section>

      {/* 2. Form & Details Grid */}
      <section className="py-16 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Details (Left) */}
          <div data-reveal className="reveal reveal-left lg:col-span-5 space-y-8">
            <div>
              <Title text1={"OUR"} text2={"ATELIER"} />
              <p className="text-xs sm:text-sm tracking-[0.2em] text-text-muted mt-2 uppercase font-medium">
                Visit our physical showrooms
              </p>
            </div>

            <div className="space-y-6 text-xs sm:text-sm tracking-wider text-text-muted leading-relaxed">
              <div className="flex gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-secondary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <h4 className="font-serif font-bold text-primary mb-1">Showroom Address</h4>
                  <p>Souza Flair Mansion, 4th Floor</p>
                  <p>Colaba Causeway, Mumbai, India</p>
                </div>
              </div>

              <div className="flex gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-secondary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 00.099.281L9.05 7.7a10 10 0 002.25 2.25l1.5-1.51a1 1 0 01.28-.1l2.2.55a1 1 0 01.73.94V19a2 2 0 01-2 2h-1C7.82 21 3 16.18 3 10V5z" />
                </svg>
                <div>
                  <h4 className="font-serif font-bold text-primary mb-1">Telephone & Concierge</h4>
                  <p>+91 994-488-3319</p>
                  <p>Direct styling chat line: +91 994-488-3300</p>
                </div>
              </div>

              <div className="flex gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-secondary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <h4 className="font-serif font-bold text-primary mb-1">Email Correspondence</h4>
                  <p>concierge@souzaflair.com</p>
                  <p>careers@souzaflair.com</p>
                </div>
              </div>

              <div className="flex gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-secondary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h4 className="font-serif font-bold text-primary mb-1">Boutique Hours</h4>
                  <p>Monday - Saturday: 10:00 AM to 08:00 PM IST</p>
                  <p>Sunday: Closed (Appointments only)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form (Right) */}
          <div
            data-reveal
            className="reveal reveal-right lg:col-span-7 bg-white border border-secondary/15 rounded-sm p-8 sm:p-10 shadow-lg"
          >
            <h3 className="font-serif text-xl font-semibold tracking-wider text-primary mb-6 pb-2 border-b border-secondary/15">
              Book a Private Styling Consultation
            </h3>

            <form onSubmit={onSubmitHandler} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full bg-surface/40 border border-secondary/20 rounded-xs px-4 py-3 text-xs sm:text-sm text-primary placeholder-text-muted/65 outline-none focus:border-secondary transition-colors"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full bg-surface/40 border border-secondary/20 rounded-xs px-4 py-3 text-xs sm:text-sm text-primary placeholder-text-muted/65 outline-none focus:border-secondary transition-colors"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <textarea
                  rows={5}
                  placeholder="Describe your design requests (e.g. measurements, fabric selections, event styling)..."
                  className="w-full bg-surface/40 border border-secondary/20 rounded-xs px-4 py-3.5 text-xs sm:text-sm text-primary placeholder-text-muted/65 outline-none focus:border-secondary transition-colors resize-none"
                  value={formData.msg}
                  onChange={(e) => setFormData({ ...formData, msg: e.target.value })}
                  required
                />
              </div>

              <button
                type="submit"
                className="shimmer-btn-gold px-10 py-4 text-xs font-semibold tracking-[0.35em] uppercase rounded-xs border border-secondary/30 transition-all duration-300 shadow-md cursor-pointer w-full sm:w-auto"
              >
                Send Request
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* 3. Policies & Newsletter */}
      <OurPolicy />
      <NewsLetterBox />
    </div>
  );
};

export default Contact;

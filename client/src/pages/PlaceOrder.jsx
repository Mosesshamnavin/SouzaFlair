import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useScrollReveal from "../hooks/useScrollReveal";

const PlaceOrder = () => {
  const { currency, deliveryFee, getCartAmount, setCartItems } = useContext(ShopContext);
  const [method, setMethod] = useState("cod");
  const navigate = useNavigate();
  const revealRef = useScrollReveal({ once: true });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    
    // Simulate order placement
    toast.success("Order Placed Successfully! Thank you.");
    
    // Clear cart context and localstorage
    setCartItems({});
    localStorage.removeItem("sf_cart");
    
    // Redirect to orders
    navigate("/order");
  };

  const subtotal = getCartAmount();
  const total = subtotal > 0 ? subtotal + deliveryFee : 0;

  return (
    <div
      ref={revealRef}
      className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] pt-28 pb-20 max-w-7xl mx-auto border-t border-secondary/5 select-none"
    >
      <form
        onSubmit={onSubmitHandler}
        className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
      >
        {/* Left Column: Delivery Info Form */}
        <div data-reveal className="reveal reveal-left lg:col-span-7 space-y-6">
          <div className="mb-6">
            <Title text1={"DELIVERY"} text2={"INFORMATION"} />
            <p className="text-xs sm:text-sm tracking-[0.2em] text-text-muted mt-2 uppercase font-medium">
              Enter your shipping destination
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="bg-white border border-secondary/20 rounded-xs px-4 py-3 text-xs sm:text-sm text-primary placeholder-text-muted/65 outline-none focus:border-secondary transition-colors"
              value={formData.firstName}
              onChange={onChangeHandler}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="bg-white border border-secondary/20 rounded-xs px-4 py-3 text-xs sm:text-sm text-primary placeholder-text-muted/65 outline-none focus:border-secondary transition-colors"
              value={formData.lastName}
              onChange={onChangeHandler}
              required
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full bg-white border border-secondary/20 rounded-xs px-4 py-3 text-xs sm:text-sm text-primary placeholder-text-muted/65 outline-none focus:border-secondary transition-colors"
            value={formData.email}
            onChange={onChangeHandler}
            required
          />

          <input
            type="text"
            name="street"
            placeholder="Street Address"
            className="w-full bg-white border border-secondary/20 rounded-xs px-4 py-3 text-xs sm:text-sm text-primary placeholder-text-muted/65 outline-none focus:border-secondary transition-colors"
            value={formData.street}
            onChange={onChangeHandler}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="city"
              placeholder="City"
              className="bg-white border border-secondary/20 rounded-xs px-4 py-3 text-xs sm:text-sm text-primary placeholder-text-muted/65 outline-none focus:border-secondary transition-colors"
              value={formData.city}
              onChange={onChangeHandler}
              required
            />
            <input
              type="text"
              name="state"
              placeholder="State"
              className="bg-white border border-secondary/20 rounded-xs px-4 py-3 text-xs sm:text-sm text-primary placeholder-text-muted/65 outline-none focus:border-secondary transition-colors"
              value={formData.state}
              onChange={onChangeHandler}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="zipcode"
              placeholder="Zip / Postal Code"
              className="bg-white border border-secondary/20 rounded-xs px-4 py-3 text-xs sm:text-sm text-primary placeholder-text-muted/65 outline-none focus:border-secondary transition-colors"
              value={formData.zipcode}
              onChange={onChangeHandler}
              required
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              className="bg-white border border-secondary/20 rounded-xs px-4 py-3 text-xs sm:text-sm text-primary placeholder-text-muted/65 outline-none focus:border-secondary transition-colors"
              value={formData.country}
              onChange={onChangeHandler}
              required
            />
          </div>

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            className="w-full bg-white border border-secondary/20 rounded-xs px-4 py-3 text-xs sm:text-sm text-primary placeholder-text-muted/65 outline-none focus:border-secondary transition-colors"
            value={formData.phone}
            onChange={onChangeHandler}
            required
          />
        </div>

        {/* Right Column: Order Totals & Payment Method */}
        <div data-reveal className="reveal reveal-right lg:col-span-5 space-y-8">
          
          {/* Order Totals Summary */}
          <div className="bg-white border border-secondary/15 rounded-sm p-6 sm:p-8 shadow-sm">
            <h3 className="font-serif text-lg font-semibold tracking-wider text-primary mb-6 pb-2 border-b border-secondary/15">
              Cart Totals
            </h3>
            <div className="space-y-4 text-xs tracking-wider text-text mb-2">
              <div className="flex justify-between">
                <span className="text-text-muted">Subtotal</span>
                <span className="font-semibold text-primary">{currency} {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Shipping Fee</span>
                <span className="font-semibold text-primary">{currency} {deliveryFee.toLocaleString()}</span>
              </div>
              <div className="border-t border-secondary/10 pt-4 flex justify-between text-sm">
                <span className="font-serif font-bold text-primary">Total</span>
                <span className="font-sans font-bold text-secondary">{currency} {total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="bg-white border border-secondary/15 rounded-sm p-6 sm:p-8 shadow-sm">
            <h3 className="font-serif text-lg font-semibold tracking-wider text-primary mb-6 pb-2 border-b border-secondary/15">
              Payment Method
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Stripe */}
              <div
                onClick={() => setMethod("stripe")}
                className={`flex items-center justify-center border rounded-sm p-3 cursor-pointer transition-all duration-300 ${
                  method === "stripe"
                    ? "border-secondary bg-surface/30 scale-102"
                    : "border-secondary/20 hover:border-secondary/40"
                }`}
              >
                <img src={assets.stripe_logo} className="h-4 object-contain" alt="Stripe" />
              </div>

              {/* Razorpay */}
              <div
                onClick={() => setMethod("razorpay")}
                className={`flex items-center justify-center border rounded-sm p-3 cursor-pointer transition-all duration-300 ${
                  method === "razorpay"
                    ? "border-secondary bg-surface/30 scale-102"
                    : "border-secondary/20 hover:border-secondary/40"
                }`}
              >
                <img src={assets.razorpay_logo} className="h-4 object-contain" alt="Razorpay" />
              </div>

              {/* COD */}
              <div
                onClick={() => setMethod("cod")}
                className={`flex items-center justify-center border rounded-sm p-3 cursor-pointer transition-all duration-300 ${
                  method === "cod"
                    ? "border-secondary bg-surface/30 scale-102"
                    : "border-secondary/20 hover:border-secondary/40"
                }`}
              >
                <span className="font-sans text-[10px] tracking-[0.2em] font-semibold text-primary uppercase">
                  Cash on Delivery
                </span>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              type="submit"
              disabled={total === 0}
              className="shimmer-btn-gold w-full mt-8 py-4 text-xs font-semibold tracking-[0.35em] uppercase rounded-sm border border-secondary/30 transition-all duration-300 shadow-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Place Order
            </button>
          </div>

        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;

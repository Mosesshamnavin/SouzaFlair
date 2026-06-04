import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import useScrollReveal from "../hooks/useScrollReveal";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, deliveryFee, getCartAmount } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const revealRef = useScrollReveal({ once: true });

  useEffect(() => {
    const tempData = [];
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          tempData.push({
            _id: itemId,
            size: size,
            quantity: cartItems[itemId][size],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  const subtotal = getCartAmount();
  const total = subtotal > 0 ? subtotal + deliveryFee : 0;

  return (
    <div
      ref={revealRef}
      className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] pt-28 pb-20 max-w-7xl mx-auto border-t border-secondary/5 select-none"
    >
      {/* Title */}
      <div className="mb-12 reveal reveal-left" data-reveal>
        <Title text1={"YOUR"} text2={"CART"} />
        <p className="text-xs sm:text-sm tracking-[0.2em] text-text-muted mt-2 uppercase font-medium">
          Review your selected runway pieces
        </p>
      </div>

      {cartData.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-6">
            {cartData.map((item, index) => {
              const product = products.find((p) => p._id === item._id);
              if (!product) return null;

              return (
                <div
                  key={`${item._id}-${item.size}`}
                  data-reveal
                  className="reveal reveal-up bg-white border border-secondary/10 rounded-sm p-4 sm:p-6 flex items-center justify-between gap-4 shadow-sm hover:shadow-md transition-all duration-300"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    {/* Image */}
                    <Link to={`/product/${item._id}`} className="w-16 sm:w-20 aspect-[3/4] overflow-hidden bg-surface rounded-xs border border-secondary/5 flex-shrink-0">
                      <img
                        src={product.image[0]}
                        className="w-full h-full object-cover"
                        alt={product.name}
                      />
                    </Link>

                    {/* Meta */}
                    <div>
                      <h4 className="font-serif text-sm sm:text-base font-semibold text-primary tracking-wide hover:text-secondary transition-colors duration-300">
                        <Link to={`/product/${item._id}`}>{product.name}</Link>
                      </h4>
                      <div className="flex items-center gap-4 mt-2 text-xs tracking-wider text-text-muted">
                        <p className="flex items-center gap-1.5">
                          <span>Price:</span>
                          <span className="font-bold text-secondary">{currency}{product.price}</span>
                        </p>
                        <p className="flex items-center gap-1.5 bg-surface px-2 py-0.5 rounded-xs border border-secondary/5">
                          <span>Size:</span>
                          <span className="font-bold text-primary">{item.size}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Quantity and Delete */}
                  <div className="flex items-center gap-6 sm:gap-10">
                    {/* Custom Counter Box */}
                    <div className="flex items-center border border-secondary/20 rounded-xs bg-surface overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item._id, item.size, item.quantity - 1)}
                        className="px-3 py-1.5 text-xs text-text-muted hover:text-primary transition-colors cursor-pointer focus:outline-none"
                      >
                        -
                      </button>
                      <span className="px-3 text-xs font-semibold text-primary">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                        className="px-3 py-1.5 text-xs text-text-muted hover:text-primary transition-colors cursor-pointer focus:outline-none"
                      >
                        +
                      </button>
                    </div>

                    {/* Remove Action */}
                    <button
                      onClick={() => updateQuantity(item._id, item.size, 0)}
                      className="p-2 text-text-muted hover:text-red-600 transition-colors cursor-pointer focus:outline-none"
                      aria-label="Remove item"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Checkout Summary totals */}
          <div
            data-reveal
            className="reveal reveal-right lg:col-span-4 bg-white border border-secondary/15 rounded-sm p-6 sm:p-8 shadow-sm flex flex-col"
          >
            <h3 className="font-serif text-lg font-semibold tracking-wider text-primary mb-6 pb-2 border-b border-secondary/15">
              Order Summary
            </h3>
            
            <div className="space-y-4 text-xs tracking-wider text-text mb-8">
              <div className="flex justify-between">
                <span className="text-text-muted">Subtotal</span>
                <span className="font-semibold text-primary">{currency} {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Shipping Fee</span>
                <span className="font-semibold text-primary">{currency} {deliveryFee.toLocaleString()}</span>
              </div>
              <div className="border-t border-secondary/10 pt-4 flex justify-between text-sm">
                <span className="font-serif font-bold text-primary">Total Amount</span>
                <span className="font-sans font-bold text-secondary">{currency} {total.toLocaleString()}</span>
              </div>
            </div>

            <Link
              to="/placeOrder"
              className="shimmer-btn-gold text-center py-4 text-xs font-semibold tracking-[0.35em] uppercase rounded-sm border border-secondary/30 transition-all duration-300 shadow-lg"
            >
              Proceed to Checkout
            </Link>
            
            <Link
              to="/collection"
              className="text-center text-[10px] tracking-[0.25em] text-text-muted hover:text-primary transition-colors uppercase mt-4 block font-medium"
            >
              Continue Shopping
            </Link>
          </div>

        </div>
      ) : (
        /* Empty State */
        <div
          data-reveal
          className="reveal reveal-up py-20 flex flex-col items-center justify-center text-center select-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-20 h-20 text-secondary/35 mb-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          <h3 className="font-serif text-xl sm:text-2xl text-primary font-semibold tracking-wide">
            Your Cart is Empty
          </h3>
          <p className="font-sans text-xs sm:text-sm text-text-muted mt-2 tracking-wider max-w-sm mx-auto leading-relaxed">
            Discover exquisite tailoring and elevate your personal aesthetic. Explore our latest couture collections.
          </p>
          <Link
            to="/collection"
            className="shimmer-btn mt-8 px-10 py-4 text-xs font-semibold tracking-[0.3em] uppercase rounded-sm border border-secondary/30 transition-all duration-300 shadow-md"
          >
            Shop Collection
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;

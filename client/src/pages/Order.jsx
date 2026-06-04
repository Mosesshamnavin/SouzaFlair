import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useScrollReveal from "../hooks/useScrollReveal";

const Order = () => {
  const { products, currency } = useContext(ShopContext);
  const [orderList, setOrderList] = useState([]);
  const revealRef = useScrollReveal({ once: true });

  useEffect(() => {
    // Generate some mock order data from products array
    if (products.length > 0) {
      const mockOrders = [
        {
          product: products[0],
          size: "M",
          quantity: 1,
          price: products[0].price,
          payment: "Stripe",
          date: "Jun 02, 2026",
          status: "Shipped",
        },
        {
          product: products[1] || products[0],
          size: "L",
          quantity: 2,
          price: (products[1] || products[0]).price,
          payment: "COD",
          date: "May 28, 2026",
          status: "Delivered",
        },
      ];
      setOrderList(mockOrders);
    }
  }, [products]);

  const handleTrackOrder = (status) => {
    toast.info(`Status update: Your package is currently [${status}].`);
  };

  return (
    <div
      ref={revealRef}
      className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] pt-28 pb-20 max-w-7xl mx-auto border-t border-secondary/5 select-none"
    >
      {/* Title */}
      <div className="mb-12 reveal reveal-left" data-reveal>
        <Title text1={"MY"} text2={"ORDERS"} />
        <p className="text-xs sm:text-sm tracking-[0.2em] text-text-muted mt-2 uppercase font-medium">
          Monitor your private transactions and couture deliveries
        </p>
      </div>

      {orderList.length > 0 ? (
        <div className="space-y-6">
          {orderList.map((item, idx) => (
            <div
              key={idx}
              data-reveal
              className="reveal reveal-up bg-white border border-secondary/10 rounded-sm p-5 sm:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6 shadow-sm hover:shadow-md transition-all duration-300"
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              {/* Product Info */}
              <div className="flex items-center gap-4 sm:gap-6">
                <Link to={`/product/${item.product._id}`} className="w-16 sm:w-20 aspect-[3/4] overflow-hidden bg-surface rounded-xs border border-secondary/5 flex-shrink-0">
                  <img
                    src={item.product.image[0]}
                    className="w-full h-full object-cover"
                    alt={item.product.name}
                  />
                </Link>

                <div>
                  <h4 className="font-serif text-sm sm:text-base font-semibold text-primary tracking-wide hover:text-secondary transition-colors duration-300">
                    <Link to={`/product/${item.product._id}`}>{item.product.name}</Link>
                  </h4>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2 text-xs tracking-wider text-text-muted">
                    <p className="flex items-center gap-1">
                      <span>Price:</span>
                      <span className="font-bold text-secondary">{currency} {item.price}</span>
                    </p>
                    <p>Qty: <span className="font-bold text-primary">{item.quantity}</span></p>
                    <p>Size: <span className="font-bold text-primary">{item.size}</span></p>
                  </div>
                  <p className="text-[10px] tracking-wider text-text-muted mt-2">
                    Order Date: <span className="text-primary font-medium">{item.date}</span> | Payment: <span className="text-primary font-medium">{item.payment}</span>
                  </p>
                </div>
              </div>

              {/* Status and Actions */}
              <div className="flex flex-row md:flex-col lg:flex-row items-center justify-between md:justify-end gap-6 sm:gap-10 border-t md:border-t-0 border-secondary/10 pt-4 md:pt-0">
                {/* Status indicator */}
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full relative flex`}>
                    {item.status !== "Delivered" && (
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    )}
                    <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${item.status === "Delivered" ? "bg-secondary" : "bg-emerald-500"}`}></span>
                  </span>
                  <span className="font-sans text-xs tracking-wider font-semibold text-primary uppercase">
                    {item.status}
                  </span>
                </div>

                {/* Track Button */}
                <button
                  onClick={() => handleTrackOrder(item.status)}
                  className="shimmer-btn-gold px-6 py-2.5 text-[10px] font-bold tracking-[0.2em] uppercase rounded-xs border border-secondary/35 transition-all duration-300 cursor-pointer focus:outline-none"
                >
                  Track Order
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div data-reveal className="reveal reveal-up py-20 text-center select-none">
          <p className="font-serif text-lg text-text-muted">No orders found.</p>
        </div>
      )}
    </div>
  );
};

export default Order;

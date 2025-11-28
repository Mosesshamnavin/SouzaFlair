import { createContext } from "react";
import { products } from "../assets/assets";

 const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₹";
  const deliveryFee = 30;

  const value = {
    products,
    currency,
    deliveryFee,
  };
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContext;
export { ShopContextProvider, ShopContext };
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (sweet, qty) => {
    setCart((prev) => {
      const existing = prev.find((i) => i._id === sweet._id);
      if (existing) {
        return prev.map((i) =>
          i._id === sweet._id
            ? { ...i, qty: i.qty + qty }
            : i
        );
      }
      return [...prev, { ...sweet, qty }];
    });
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((i) => i._id !== id));
  };

const updateQty = (id, qty) => {
  if (qty <= 0) {
    setCart((prev) => prev.filter((item) => item._id !== id));
  } else {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, qty } : item
      )
    );
  }
};


  const clearCart = () => setCart([]);

  const totalAmount = cart.reduce(
    (sum, i) => sum + i.price * i.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

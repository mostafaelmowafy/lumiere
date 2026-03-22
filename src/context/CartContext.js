import { createContext, useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add to cart or Increase quantity
  const addToCart = (product) => {
    setCartItems((prev) => {
      const isExist = prev.find((item) => item.id === product.id);

      if (isExist) {
        // Case: Item already exists, increase quantity
        toast.success(`${product.name} quantity increased!`, {
          icon: "➕",
          id: `inc-${product.id}`,
          style: { background: "#333", color: "#fff" },
        });
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      // Case: Adding item for the first time
      toast.success(`${product.name} added to cart!`, {
        icon: "🛒",
        id: `add-${product.id}`,
        style: { background: "#333", color: "#fff" },
      });
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Decrease quantity or remove if reaches 1
  const decreaseQuantity = (product) => {
    setCartItems((prev) => {
      const item = prev.find((i) => i.id === product.id);

      if (item && item.quantity === 1) {
        // Case: Last item, remove it completely
        toast.error(`${product.name} removed from cart!`, {
          icon: "🗑️",
          id: `rem-${product.id}`,
          style: { background: "#333", color: "#fff" },
        });
        return prev.filter((i) => i.id !== product.id);
      }

      // Case: Decrease quantity only
      toast.success(`${product.name} quantity decreased!`, {
        icon: "➖",
        id: `dec-${product.id}`,
        style: { background: "#333", color: "#fff" },
      });
      return prev.map((i) =>
        i.id === product.id ? { ...i, quantity: i.quantity - 1 } : i,
      );
    });
  };

  // Completely remove item from cart
  const removeFromCart = (id) => {
    const itemToRemove = cartItems.find((item) => item.id === id);
    setCartItems((prev) => prev.filter((item) => item.id !== id));

    toast.error(`${itemToRemove?.name || "Item"} removed!`, {
      icon: "🗑️",
      style: { background: "#333", color: "#fff" },
    });
  };

  const clearCart = () => {
    setCartItems([]);
    toast.success("Cart cleared successfully!", {
      style: { background: "#333", color: "#fff" },
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

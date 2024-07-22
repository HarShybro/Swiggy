import { createContext, useState } from "react";
import { Food } from "../components/MenuComponent";

export const CartContext = createContext<{
  cart: Food[];
  addToCart: (props: Food) => void;
  removeFromCart: (props: Food) => void;
  incrementQuantity: (props: Food) => void;
  decrementQuantity: (props: Food) => void;
  clearCart: () => void;
}>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  incrementQuantity: () => {},
  decrementQuantity: () => {},
  clearCart: () => {},
});

// interface ICartMenu {
//   id: string;
//   quantity: number;
// }

export function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  let [cart, setCart] = useState<Food[]>([]);

  function addToCart(props: Food) {
    const itemPresent = cart.find((item) => item.id === props.id);
    if (itemPresent) {
      setCart(
        cart.map((item) =>
          item.id === props.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
      console.log("Input", cart);
    } else {
      setCart([...cart, props]);
    }
  }

  function removeFromCart(props: Food) {
    setCart(cart.filter((item) => item.id !== props.id));
  }

  function incrementQuantity(props: Food) {
    setCart(
      cart.map((item) =>
        item.id === props.id
          ? { ...item, quantity: (item.quantity || 0) + 1 }
          : item
      )
    );
  }

  function decrementQuantity(props: Food) {
    setCart(
      cart.map((item) =>
        item.id === props.id
          ? {
              ...item,
              quantity: (item.quantity || 0) > 1 ? (item.quantity || 0) - 1 : 0,
            }
          : item
      )
    );
  }

  function clearCart() {
    setCart([]);
  }
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

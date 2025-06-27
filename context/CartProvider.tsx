import { Product } from "@/types/product";
import { createContext, PropsWithChildren, useState, useMemo, useContext } from "react";

interface CardItem {
  product: Product;
  quantity: number;
}

interface CardContextType {
  items: CardItem[];
  subTotal: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (product: Product, quantity?: number) => void;
}

const CardContext = createContext({} as CardContextType);

export const useCart = () => useContext(CardContext);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CardItem[]>([]);

  const subTotal = useMemo(() => {
    return Number(
      items.reduce((acc, item) => acc + item.product.currentPrice * item.quantity, 0)
      .toFixed(2)
    );
  }, [items]);

  const addItem = (product: Product, quantity: number = 1) => {
    const item = items.find((item) => product.id === item.product.id);

    if (item) {
      setItems((items) => {
        return items.map((item) => {
          if (item.product.id === product.id) {
            return {
              ...item,
              quantity: item.quantity + quantity,
            };
          }
          return item;
        });
      });
    } else {
      setItems((prev) => [...prev, { product, quantity: quantity }]);
    }
  };

  const removeItem = (product: Product, quantity: number = 1) => {
    const item = items.find((item) => product.id === item.product.id);

    if (!item) return;

    if (item.quantity > quantity) {
      setItems((items) => {
        return items.map((item) => {
          if (item.product.id === product.id) {
            return {
              ...item,
              quantity: item.quantity - quantity,
            };
          }
          return item;
        });
      });
    } else {
      setItems((prev) => prev.filter((item) => item.product.id !== product.id));
    }
  };

  return (
    <CardContext.Provider
      value={{
        items,
        subTotal,
        addItem,
        removeItem,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};

import { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [tableNumber, setTableNumber] = useState(1);
  const [restaurantId, setRestaurantId] = useState('sakura-sushi');

  const addItem = (item) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        // If an item with the exact same ID exists, we just increase qty
        // To allow different notes on same items, we would need unique instance IDs, but we will stick to basic qty grouping for now alongside updateNote
        return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, qty: 1, note: item.note || '' }];
    });
  };

  const removeItem = (itemId) => {
    setItems(prev => prev.filter(i => i.id !== itemId));
  };

  const updateQty = (itemId, qty) => {
    if (qty <= 0) {
      removeItem(itemId);
      return;
    }
    setItems(prev => prev.map(i => i.id === itemId ? { ...i, qty } : i));
  };

  const updateNote = (itemId, note) => {
    setItems(prev => prev.map(i => i.id === itemId ? { ...i, note } : i));
  };

  const clearCart = () => {
    setItems([]);
  };

  const setTable = (num) => {
    setTableNumber(Number(num) || 1);
  };

  const totalItems = items.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{
      items, tableNumber, restaurantId,
      addItem, removeItem, updateQty, updateNote, clearCart,
      setTable, setRestaurantId,
      totalItems, totalPrice,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

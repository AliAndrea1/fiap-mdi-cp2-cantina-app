import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    async function loadCart() {
      try {
        const saved = await AsyncStorage.getItem('@cantina:cart');
        if (saved) setCart(JSON.parse(saved));
      } catch (e) {
        console.error('Erro ao carregar carrinho', e);
      }
    }
    loadCart();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('@cantina:cart', JSON.stringify(cart));
  }, [cart]);

  function addToCart(item) {
    setCart(prev => [...prev, { ...item, cartId: Date.now().toString() }]);
  }

  function removeFromCart(cartId) {
    setCart(prev => prev.filter(i => i.cartId !== cartId));
  }

  function clearCart() {
    setCart([]);
  }

  const total = cart.reduce((sum, i) => sum + i.price, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
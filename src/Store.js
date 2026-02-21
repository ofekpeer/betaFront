import axios from 'axios';
import { createContext, useReducer } from 'react';

export const Store = createContext();

const cheackLocalStorage = async (key, defaultValue) => {
  const storedValue = localStorage.getItem(key);
  if (storedValue) {
    try {
      const checkCart = await axios.post('https://betabackend-17nq.onrender.com/api/orders/checkCart', {
        cartItems: JSON.parse(storedValue),
      });
      if (checkCart.data) {
        return JSON.parse(storedValue);
      } else return [];
    } catch (error) {
      console.error(`Error parsing localStorage key "${key}":`, error);
      return defaultValue;
    }
  }
  return defaultValue;
};

const initialState = {
  cart: {
    items: await cheackLocalStorage('order', []),
  },
};

const clampQty = (n) => Math.max(1, Math.min(99, n));

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD TO CART': {
      let newItem = action.payload;
      const existItem = state.cart.items.find(
        (item) =>
          item.id === newItem.id &&
          item.name === newItem.name &&
          item.size === newItem.size &&
          item.style === newItem.style,
      );
      const cartItems = existItem
        ? state.cart.items.map((item) =>
            item.id === existItem.id &&
            item.name === existItem.name &&
            item.size === existItem.size &&
            item.style === existItem.style
              ? {
                  ...newItem,
                  quantity: clampQty(
                    existItem.quantity + (newItem.quantity || 1),
                  ),
                }
              : item,
          )
        : [
            ...state.cart.items,
            { ...newItem, quantity: newItem.quantity || 1 },
          ];
      localStorage.setItem('order', JSON.stringify(cartItems));
      return {
        ...state,
        cart: {
          ...state.cart,
          items: cartItems,
        },
      };
    }
    case 'CLEAR THE CART': {
      return { ...state, cart: { ...state.cart, items: [] } };
    }
    case 'REMOVE FROM CART': {
      const cartItems = state.cart.items.filter(
        (item) =>
          item.id !== action.payload.id ||
          item.size !== action.payload.size ||
          item.style !== action.payload.style ||
          item.name !== action.payload.name,
      );
      localStorage.setItem('order', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, items: cartItems } };
    }
    default:
      return state;
  }
};

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}> {props.children}</Store.Provider>;
}

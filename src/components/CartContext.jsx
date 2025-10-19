import React, { createContext, useContext, useReducer, useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

function cartReducer(state, action) {
  switch(action.type) {
    case 'ADD': {
      const exists = state.items.find(i => i.id === action.item.id);
      if (exists) {
        return {
          ...state,
          items: state.items.map(i =>
            i.id === action.item.id ? { ...i, qty: i.qty + (action.qty || 1) } : i
          )
        };
      }
      return { ...state, items: [...state.items, { ...action.item, qty: action.qty || 1 }] };
    }
    case 'REMOVE':
      return { ...state, items: state.items.filter(i => i.id !== action.id) };
    case 'CLEAR':
      return { ...state, items: [] };
    case 'SET_QTY':
      return {
        ...state,
        items: state.items.map(i => i.id === action.id ? { ...i, qty: Math.max(1, action.qty) } : i)
      };
    default:
      throw new Error('Unknown action: ' + action.type);
  }
}
export function CartProvider({ children }) {
  // lazy initializer from localStorage
  const [state, dispatch] = useReducer(cartReducer, undefined, () => {
    try {
      const raw = localStorage.getItem('cart');
      return raw ? { items: JSON.parse(raw) } : { items: [] };
    } catch (e) {
      return { items: [] };
    }
  });

  // persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(state.items));
    } catch (e) {
      // ignore
    }
  }, [state.items]);

  // action helpers that show toasts
  const actions = useMemo(() => ({
    add(item, qty = 1) {
      dispatch({ type: 'ADD', item, qty });
      toast.success(`${item.name} agregado al carrito`);
    },
    remove(id) {
      dispatch({ type: 'REMOVE', id });
      toast(`${'Producto eliminado'}`);
    },
    setQty(id, qty) {
      dispatch({ type: 'SET_QTY', id, qty });
    },
    clear() {
      dispatch({ type: 'CLEAR' });
      toast('Carrito vaciado');
    }
  }), [dispatch]);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {/* expose actions via a separate context through value prop on dispatch context? */}
        <CartActionsProvider actions={actions}>{children}</CartActionsProvider>
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
}

// small actions context to expose helpers
const CartActionsContext = createContext(null);
function CartActionsProvider({ actions, children }) {
  return (
    <CartActionsContext.Provider value={actions}>
      {children}
    </CartActionsContext.Provider>
  );
}

export function useCart() {
  return useContext(CartStateContext);
}
export function useCartDispatch() {
  return useContext(CartDispatchContext);
}

export function useCartActions() {
  return useContext(CartActionsContext);
}
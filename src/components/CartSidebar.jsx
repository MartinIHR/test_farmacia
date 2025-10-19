import React from 'react';
import { useCart, useCartDispatch } from './CartContext';
import { useCartActions } from './CartContext';

export default function CartSidebar({ open, onClose }) {
  const state = useCart();
  const actions = useCartActions();

  const total = state.items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div className={`fixed top-0 right-0 h-full w-full sm:w-96 transform ${open ? 'translate-x-0' : 'translate-x-full'} transition-transform z-50`}>
      <div className="p-4 border-b flex items-center justify-between card">
        <h2 className="text-lg font-semibold">Tu carrito</h2>
        <button onClick={onClose} className="text-slate-400 hover:text-white">Cerrar</button>
      </div>
      <div className="p-4 overflow-auto" style={{height: 'calc(100% - 120px)'}}>
        {state.items.length === 0 && <p className="text-slate-400">El carrito está vacío.</p>}
        <ul className="space-y-4">
          {state.items.map(item => (
            <li key={item.id} className="flex items-center gap-3">
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
              <div className="flex-1">
                <div className="font-medium">{item.name}</div>
                <div className="text-sm text-slate-400">${item.price.toFixed(2)}</div>
                <div className="mt-2 flex items-center gap-2">
                  <button onClick={() => actions.setQty(item.id, item.qty - 1)} className="px-2 bg-slate-700 rounded">-</button>
                  <div className="px-2">{item.qty}</div>
                  <button onClick={() => actions.setQty(item.id, item.qty + 1)} className="px-2 bg-slate-700 rounded">+</button>
                  <button onClick={() => actions.remove(item.id)} className="ml-auto text-sm text-red-400">Eliminar</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 border-t">
        <div className="flex items-center justify-between mb-3">
          <div className="text-slate-400">Total</div>
          <div className="text-lg font-semibold">${total.toFixed(2)}</div>
        </div>
        <button className="w-full btn-brand">Pagar</button>
      </div>
    </div>
  );
}
import React from 'react';
import { useCart, useCartActions } from '../components/CartContext';

export default function Cart(){
  const state = useCart();
  const actions = useCartActions();
  const total = state.items.reduce((s, i) => s + Number(i.price) * i.qty, 0);

  return (
    <main className="container py-8">
      <h1 className="text-2xl font-semibold">Tu carrito</h1>
      {state.items.length === 0 ? (
        <p className="mt-4 text-slate-600">Tu carrito está vacío.</p>
      ) : (
        <div className="mt-4 bg-white p-4 rounded shadow-sm">
          <ul className="space-y-4">
            {state.items.map(i=> (
              <li key={i.id} className="flex items-center gap-4">
                <img src={i.image} alt={i.name} className="w-20 h-20 object-cover rounded" />
                <div className="flex-1">
                  <div className="font-semibold">{i.name}</div>
                  <div className="text-sm text-slate-600">${Number(i.price).toFixed(2)}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={()=>actions.setQty(i.id, i.qty-1)} className="px-2 bg-neutral-100 rounded">-</button>
                  <div>{i.qty}</div>
                  <button onClick={()=>actions.setQty(i.id, i.qty+1)} className="px-2 bg-neutral-100 rounded">+</button>
                  <button onClick={()=>actions.remove(i.id)} className="text-red-500 ml-4">Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-center justify-between">
            <div className="font-semibold">Total: ${Number(total).toFixed(2)}</div>
            <button className="px-4 py-2 btn-brand">Finalizar compra</button>
          </div>
        </div>
      )}
    </main>
  );
}

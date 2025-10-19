import React from 'react';
import StoreStockIndicator from './StoreStockIndicator';

export default function ProductCard({ product, onAdd }) {
  return (
    <article className="card overflow-hidden">
      <img src={product.image} alt={product.name} className="w-full h-44 object-cover" />
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-slate-800">{product.name}</h3>
          {product.requiresPrescription && <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded">Requiere receta</span>}
        </div>
        <p className="text-sm text-slate-600 mt-1">{product.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <div>
            <div className="text-lg font-bold text-slate-800">${product.price.toFixed(2)}</div>
            <StoreStockIndicator product={product} />
          </div>
          <button onClick={() => onAdd(product)} className="btn-brand">
            Agregar
          </button>
        </div>
      </div>
    </article>
  );
}
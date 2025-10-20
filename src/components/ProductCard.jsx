import React from 'react';
import StoreStockIndicator from './StoreStockIndicator';

export default function ProductCard({ product, onAdd }) {
  const image = product.image || product.imageUrl || '/placeholder.png';
  const desc = product.description || product.shortDescription || '';
  return (
    <article className="card overflow-hidden" role="article" aria-labelledby={`product-${product.id}`}>
      <img loading="lazy" src={image} alt={product.name} className="w-full h-44 object-cover" />
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 id={`product-${product.id}`} className="font-semibold text-slate-800">{product.name}</h3>
          {product.requiresPrescription && <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded">Requiere receta</span>}
        </div>
        <p className="text-sm text-slate-600 mt-1 line-clamp-3">{desc}</p>
        <div className="mt-3 flex items-center justify-between">
          <div>
            <div className="text-lg font-bold text-slate-800">${Number(product.price).toFixed(2)}</div>
            <StoreStockIndicator product={product} />
          </div>
          <button onClick={() => onAdd(product)} className="btn-brand" aria-label={`Agregar ${product.name} al carrito`}>
            Agregar
          </button>
        </div>
      </div>
    </article>
  );
}
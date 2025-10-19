import React from 'react';
import { useLocation } from './LocationContext';

export default function StoreStockIndicator({ product }){
  const { location } = useLocation();
  const loc = location?.name || 'Santiago';
  const stock = product.stockByLocation?.[loc] ?? null;
  if(stock === null) return <div className="text-sm text-slate-400">Stock: N/D</div>;
  return (
    <div className="text-sm">
      {stock > 0 ? <span className="text-green-600">Stock: {stock}</span> : <span className="text-red-500">Sin stock</span>}
    </div>
  );
}

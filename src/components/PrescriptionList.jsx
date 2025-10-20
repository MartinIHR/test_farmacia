import React, { useEffect, useState } from 'react';
import { usePrescription } from './PrescriptionContext';
import PrescriptionStatusBadge from './PrescriptionStatusBadge';
import productsData from '../data/products';

function mapNames(products, ids){
  const map = new Map(products.map(p=>[p.id,p.name]));
  return ids.map(id => map.get(id) || id);
}

export default function PrescriptionList(){
  const { state } = usePrescription();
  const [products, setProducts] = useState([]);

  useEffect(()=>{
    let cancelled = false;
    (async ()=>{
      try{
        const res = await fetch('http://localhost:4000/api/products');
        if(!res.ok) throw new Error('api');
        const data = await res.json();
        if(!cancelled) setProducts(data);
      }catch(e){
        setProducts(productsData);
      }
    })();
    return ()=> cancelled = true;
  },[]);
  return (
    <div className="space-y-3">
      {state.items.length === 0 && <p className="text-slate-400">No hay recetas subidas.</p>}
      <ul className="space-y-2">
        {state.items.map(p => (
          <li key={p.id} className="p-3 border rounded">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{p.patientName} - {p.doctorName}</div>
                <div className="text-sm text-slate-400">{p.date} • {p.file?.name}</div>
              </div>
              <div><PrescriptionStatusBadge status={p.status} /></div>
            </div>
            {p.products && p.products.length > 0 && (
              <div className="mt-2 text-sm text-slate-600">Productos asociados: {mapNames(products, p.products).join(', ')}</div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

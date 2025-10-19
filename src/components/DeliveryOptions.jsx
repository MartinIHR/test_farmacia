import React, { useState } from 'react';
import { useLocation } from './LocationContext';

export default function DeliveryOptions({ onSelect }){
  const { location } = useLocation();
  const [mode, setMode] = useState('delivery');

  const estimate = ()=>{
    if(mode === 'pickup') return location?.name ? 'Disponible hoy en tienda' : 'Selecciona comuna';
    return 'Entrega 24-48 hrs (según zona)';
  };

  return (
    <div className="card p-3">
      <div className="font-medium">Opciones de entrega</div>
      <div className="mt-2 space-y-2">
        <label className="flex items-center gap-2"><input type="radio" checked={mode==='delivery'} onChange={()=>setMode('delivery')} /> Envío a domicilio</label>
        <label className="flex items-center gap-2"><input type="radio" checked={mode==='pickup'} onChange={()=>setMode('pickup')} /> Retiro en tienda</label>
        <div className="text-sm text-slate-500">{estimate()}</div>
        <div className="mt-2"><button onClick={()=>onSelect(mode)} className="btn-brand">Continuar</button></div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useLocation } from './LocationContext';

const COMMUNAS = ['Santiago','Providencia','Las Condes','Maipú'];

export default function LocationSelector(){
  const { location, setLocation } = useLocation();
  const [manual, setManual] = useState(false);

  const pick = (name)=> setLocation({ name });

  const detect = ()=>{
    if(!navigator.geolocation) return alert('Geolocalización no disponible');
    navigator.geolocation.getCurrentPosition(pos=>{
      // mock mapping: lat> -33.45 => Santiago
      setLocation({ name: 'Santiago' });
    }, ()=> alert('No se pudo detectar ubicación'));
  };

  return (
    <div className="card p-3">
      <div className="flex items-center justify-between">
        <div className="font-medium">Ubicación</div>
        <button onClick={()=>setManual(m=>!m)} className="text-sm text-slate-500">{manual? 'Detectar':'Seleccionar'}</button>
      </div>
      <div className="mt-3">
        {!manual && (
          <div className="flex gap-2">
            <button onClick={detect} className="btn-brand">Detectar mi comuna</button>
            <button onClick={()=>pick('Santiago')} className="px-3 py-2 border rounded">Santiago</button>
          </div>
        )}
        {manual && (
          <div className="space-y-2">
            <select value={location?.name || ''} onChange={e=>pick(e.target.value)} className="w-full p-2 border rounded">
              <option value="">Selecciona comuna</option>
              {COMMUNAS.map(c=> <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        )}
      </div>
    </div>
  );
}

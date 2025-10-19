import React, { useState } from 'react';

export default function SubscriptionCard({ product }){
  const [enabled, setEnabled] = useState(false);
  const [cadence, setCadence] = useState('30');

  return (
    <div className="card p-3">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-medium">Auto-refill</div>
          <div className="text-sm text-slate-500">Recibe {product?.name} automáticamente</div>
        </div>
        <div>
          <label className="flex items-center gap-2"><input type="checkbox" checked={enabled} onChange={e=>setEnabled(e.target.checked)} /> Activar</label>
        </div>
      </div>
      {enabled && (
        <div className="mt-2">
          <select value={cadence} onChange={e=>setCadence(e.target.value)} className="w-full p-2 border rounded">
            <option value="30">Cada 30 días</option>
            <option value="60">Cada 60 días</option>
            <option value="90">Cada 90 días</option>
          </select>
          <div className="mt-2"><button className="btn-brand">Guardar suscripción</button></div>
        </div>
      )}
    </div>
  );
}

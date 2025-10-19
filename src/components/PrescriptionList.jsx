import React from 'react';
import { usePrescription } from './PrescriptionContext';
import PrescriptionStatusBadge from './PrescriptionStatusBadge';

export default function PrescriptionList(){
  const { state } = usePrescription();
  return (
    <div className="space-y-3">
      {state.items.length === 0 && <p className="text-slate-400">No hay recetas subidas.</p>}
      <ul className="space-y-2">
        {state.items.map(p => (
          <li key={p.id} className="p-3 border rounded flex items-center justify-between">
            <div>
              <div className="font-medium">{p.patientName} - {p.doctorName}</div>
              <div className="text-sm text-slate-400">{p.date} • {p.file?.name}</div>
            </div>
            <div><PrescriptionStatusBadge status={p.status} /></div>
          </li>
        ))}
      </ul>
    </div>
  );
}

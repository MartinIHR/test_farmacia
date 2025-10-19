import React from 'react';

export default function PrescriptionStatusBadge({ status }){
  const map = {
    uploaded: { label: 'Subida', color: 'bg-yellow-200 text-yellow-800' },
    in_review: { label: 'En revisión', color: 'bg-blue-100 text-blue-800' },
    approved: { label: 'Aprobada', color: 'bg-green-100 text-green-800' },
    rejected: { label: 'Rechazada', color: 'bg-red-100 text-red-800' }
  };
  const meta = map[status] || { label: status, color: 'bg-slate-100 text-slate-800' };
  return <span className={`px-3 py-1 rounded-full text-sm ${meta.color}`}>{meta.label}</span>;
}

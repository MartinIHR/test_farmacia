import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-neutral-100 text-slate-700 mt-12">
      <div className="container py-8">
        <div className="flex flex-col sm:flex-row justify-between gap-6">
          <div>
            <div className="text-lg font-semibold">Farmacia</div>
            <div className="text-sm text-slate-500">Tu salud en buenas manos</div>
          </div>
          <div className="text-sm text-slate-600">Dirección: Calle Falsa 123, Ciudad</div>
          <div className="text-sm text-slate-600">Síguenos: @farmacia</div>
        </div>
      </div>
    </footer>
  );
}

import React from 'react';

const benefits = [
  {title: 'Envío rápido', desc: 'Llegamos a tu domicilio en 24-48 horas'},
  {title: 'Atención profesional', desc: 'Farmacéuticos disponibles para asesorarte'},
  {title: 'Descuentos frecuentes', desc: 'Ofertas y programas de fidelidad'}
];

export default function Benefits(){
  return (
    <section className="py-12">
      <div className="container">
        <h2 className="text-2xl font-semibold mb-6">Beneficios</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {benefits.map(b => (
            <div key={b.title} className="p-4 card">
              <h3 className="font-semibold">{b.title}</h3>
              <p className="text-sm text-slate-600 mt-2">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

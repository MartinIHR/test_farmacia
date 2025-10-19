import React from 'react';

const items = [
  {name: 'Ana', text: 'Excelente atención y entrega rápida.'},
  {name: 'Carlos', text: 'Productos originales y buen precio.'}
];

export default function Testimonials(){
  return (
    <section className="py-12 bg-neutral-100">
      <div className="container">
        <h2 className="text-2xl font-semibold mb-6">Testimonios</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map(i => (
            <div key={i.name} className="p-4 card">
              <p className="text-slate-600">“{i.text}”</p>
              <div className="mt-3 font-semibold">{i.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

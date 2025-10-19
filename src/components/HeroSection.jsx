import React from 'react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-white to-neutral-100 py-12">
      <div className="container flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-slate-800">Tu salud en buenas manos</h1>
          <p className="mt-4 text-slate-600">Encuentra medicamentos, suplementos y productos de cuidado personal con envío rápido y atención profesional.</p>
          <Link to="/products" className="inline-block mt-6 btn-brand">Ver productos</Link>
        </div>
        <div className="flex-1">
          <img src="https://picsum.photos/seed/pharmacy/800/500" alt="Farmacia" className="w-full rounded card" />
        </div>
      </div>
    </section>
  );
}

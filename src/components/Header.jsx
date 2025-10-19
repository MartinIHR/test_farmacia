import React from 'react';

export default function Header({ onOpenCart, cartCount = 0 }) {
  return (
    <header className="bg-slate-800 text-white">
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center space-x-3">
          <div className="text-brand-500 font-bold text-xl">MiEcommerce</div>
          <nav className="hidden sm:block space-x-4 text-sm text-slate-200">
            <a href="#" className="hover:text-white">Inicio</a>
            <a href="#" className="hover:text-white">Productos</a>
            <a href="#" className="hover:text-white">Contacto</a>
          </nav>
        </div>
        <div>
          <button
            onClick={onOpenCart}
            className="relative inline-flex items-center gap-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 7m13-7l2 7M10 21a1 1 0 11-2 0 1 1 0 012 0zm8 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
            <span>Carrito</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 text-xs bg-red-500 text-white rounded-full px-2">{cartCount}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import { useLocation } from './LocationContext';

export default function Navbar({ onOpenCart }) {
  const cart = useCart();
  const { location } = useLocation();
  return (
    <nav className="bg-white shadow-sm">
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-2xl font-semibold text-brand">Farmacia</Link>
          <div className="hidden sm:flex gap-4 text-sm text-slate-600">
            <Link to="/products" className="hover:text-brand">Productos</Link>
            <Link to="/prescriptions" className="hover:text-brand">Recetas</Link>
            <Link to="/about" className="hover:text-brand">Nosotros</Link>
            <Link to="/contact" className="hover:text-brand">Contacto</Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {location?.name && <div className="text-sm text-slate-500 hidden sm:inline">{location.name}</div>}
          <Link to="/login" className="text-sm text-slate-600 hidden sm:inline">Iniciar sesión</Link>
          <button onClick={onOpenCart} className="relative inline-flex items-center gap-2 btn-brand">
            Carrito
            {cart.items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs">{cart.items.length}</span>
            )}
          </button>
        </div>
      </div>
    </nav>

  );
}

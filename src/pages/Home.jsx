import React from 'react';
import products from '../data/products';
import ProductList from '../components/ProductList';
import { useCart, useCartActions } from '../components/CartContext';
import HeroSection from '../components/HeroSection';
import Benefits from '../components/Benefits';
import Testimonials from '../components/Testimonials';

export default function Home() {
  const cart = useCart();
  const actions = useCartActions();

  function handleAdd(product) {
    actions.add(product, 1);
  }

  return (
    <>
      <HeroSection />
      <main className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Productos destacados</h1>
        <ProductList products={products} onAdd={handleAdd} />
      </main>
      <Benefits />
      <Testimonials />
    </>
  );
}
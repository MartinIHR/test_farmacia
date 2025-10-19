import React, {useState} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './components/CartContext';
import Navbar from './components/Navbar';
import { LocationProvider } from './components/LocationContext';
import { PrescriptionProvider } from './components/PrescriptionContext';
import CartSidebar from './components/CartSidebar';
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import Prescriptions from './pages/Prescriptions';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Login from './pages/Login';
import './index.css';

function App(){
  const [open, setOpen] = useState(false);
    return (  
      <LocationProvider>
      <PrescriptionProvider>
    <CartProvider>
      <BrowserRouter>
        <Navbar onOpenCart={()=>setOpen(true)} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
            <Route path="/prescriptions" element={<Prescriptions />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
        <CartSidebar open={open} onClose={()=>setOpen(false)} />
        <Toaster position="top-right" />
      </BrowserRouter>
    </CartProvider>
        </PrescriptionProvider>
        </LocationProvider>
  );
}

export default App;
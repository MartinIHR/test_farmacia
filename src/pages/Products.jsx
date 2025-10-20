import React, {useState, useMemo, useEffect} from 'react';
import productsData from '../data/products';
import ProductList from '../components/ProductList';
import LocationSelector from '../components/LocationSelector';
import { useCartActions } from '../components/CartContext';
import { usePrescription } from '../components/PrescriptionContext';
import toast from 'react-hot-toast';

export default function Products(){
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('all');
  const [maxPrice, setMaxPrice] = useState(9999);
  const [products, setProducts] = useState(productsData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const actions = useCartActions();
  const prescriptionCtx = usePrescription();

  useEffect(()=>{
    let mounted = true;
    setLoading(true);
    setError(null);
    fetch('http://localhost:4000/api/products')
      .then(r=> {
        if(!r.ok) throw new Error('Network response was not ok');
        return r.json();
      })
      .then(apiProducts => {
        if(!mounted) return;
        const mapLocal = Object.fromEntries(productsData.map(p=>[p.id, p]));
        const merged = apiProducts.map(ap => ({ ...mapLocal[ap.id], ...ap }));
        setProducts(merged);
        setLoading(false);
      })
      .catch((err)=>{
        console.warn('Products API failed, falling back to local data', err);
        if(!mounted) return;
        setProducts(productsData);
        setError('No se pudo cargar catálogo desde el servidor. Mostrando versión local.');
        setLoading(false);
      });
    return ()=> mounted = false;
  },[]);

  const categories = useMemo(()=>['all', ...new Set(products.map(p=>p.category || 'General'))], [products]);

  const filtered = products.filter(p=>{
    const matchesQ = p.name.toLowerCase().includes(q.toLowerCase()) || (p.description || '').toLowerCase().includes(q.toLowerCase());
    const matchesCat = category === 'all' ? true : (p.category === category);
    const matchesPrice = p.price <= maxPrice;
    return matchesQ && matchesCat && matchesPrice;
  });

  function handleAdd(p){
    // if product requires prescription, check for approved prescription containing it
    if(p.requiresPrescription){
      const approved = (prescriptionCtx.state.items || []).some(r=> r.status === 'approved' && r.products && r.products.includes(p.id));
      if(!approved){
        toast.error('Este producto requiere receta. Sube una receta o selecciona otro producto.');
        return;
      }
    }
    actions.add(p, 1);
  }

  return (
    <main className="container py-8">
      <div className="bg-brand text-white p-4 rounded">Test brand</div>
      <div className="flex flex-col md:flex-row gap-6">
        <aside className="w-full md:w-64 p-4 bg-white rounded shadow-sm space-y-4">
          <LocationSelector />
          <div className="mb-4 card">
            <label className="block text-sm text-slate-600">Buscar</label>
            <input value={q} onChange={e=>setQ(e.target.value)} className="mt-1 w-full border rounded px-2 py-1" />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-slate-600">Categoría</label>
            <select value={category} onChange={e=>setCategory(e.target.value)} className="mt-1 w-full border rounded px-2 py-1">
              {categories.map(c=> <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-slate-600">Precio máximo</label>
            <input type="number" value={maxPrice} onChange={e=>setMaxPrice(Number(e.target.value))} className="mt-1 w-full border rounded px-2 py-1" />
          </div>
        </aside>

        <section className="flex-1">
          <h1 className="text-2xl font-semibold mb-4">Catálogo</h1>
            {loading ? (
              <div className="p-6 flex items-center justify-center">
                <div role="status" aria-live="polite">
                  <svg className="animate-spin h-8 w-8 text-brand" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                </div>
              </div>
            ) : (
              <>
                {error && <div className="mb-4 p-3 bg-yellow-50 border-l-4 border-yellow-300 text-yellow-700">{error}</div>}
                <ProductList products={filtered} onAdd={handleAdd} className="btn-brand" />
              </>
            )}
        </section>
      </div>
    </main>
  );
}

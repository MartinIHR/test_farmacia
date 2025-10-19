import React, {useState, useMemo} from 'react';
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
  const actions = useCartActions();
  const prescriptionCtx = usePrescription();

  const categories = useMemo(()=>['all', ...new Set(productsData.map(p=>p.category || 'General'))],[]);

  const filtered = productsData.filter(p=>{
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
            <ProductList products={filtered} onAdd={handleAdd} className="btn-brand" />
        </section>
      </div>
    </main>
  );
}

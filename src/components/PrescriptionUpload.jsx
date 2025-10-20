import React, { useState, useEffect } from 'react';
import { usePrescription } from './PrescriptionContext';
import productsData from '../data/products';

export default function PrescriptionUpload(){
  const { add } = usePrescription();
  const [patient, setPatient] = useState('');
  const [doctor, setDoctor] = useState('');
  const [date, setDate] = useState('');
  const [file, setFile] = useState(null);
  const [available, setAvailable] = useState([]);
  const [selected, setSelected] = useState([]);

  useEffect(()=>{
    let cancelled = false;
    (async ()=>{
      try{
        const res = await fetch('http://localhost:4000/api/products');
        if(!res.ok) throw new Error('api');
        const data = await res.json();
        if(!cancelled) setAvailable(data);
      }catch(e){
        // fallback to local dataset
        setAvailable(productsData);
      }
    })();
    return ()=> cancelled = true;
  },[]);

  const toggle = (id) => {
    setSelected(s => s.includes(id) ? s.filter(x=>x!==id) : [...s, id]);
  };

  const onSubmit = (e)=>{
    e.preventDefault();
    if(!file) return alert('Selecciona un archivo');
    // store selected product IDs to associate with this prescription
    add({ patientName: patient, doctorName: doctor, date, file: { name: file.name, type: file.type }, products: selected });
    setPatient(''); setDoctor(''); setDate(''); setFile(null); setSelected([]);
    alert('Receta subida — estará en la cola de revisión (mock).');
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3 card p-4">
      <h3 className="text-lg font-semibold">Subir receta médica</h3>
      <div>
        <label className="block text-sm">Paciente</label>
        <input value={patient} onChange={e=>setPatient(e.target.value)} className="w-full p-2 border rounded" />
      </div>
      <div>
        <label className="block text-sm">Médico</label>
        <input value={doctor} onChange={e=>setDoctor(e.target.value)} className="w-full p-2 border rounded" />
      </div>
      <div>
        <label className="block text-sm">Fecha</label>
        <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="w-full p-2 border rounded" />
      </div>
      <div>
        <label className="block text-sm">Archivo (foto o PDF)</label>
        <input type="file" accept="image/*,.pdf" onChange={e=>setFile(e.target.files[0])} />
      </div>
      <div>
        <label className="block text-sm">Asociar productos (marca los que autoriza esta receta)</label>
        <div className="max-h-48 overflow-auto p-2 border rounded">
          {available.filter(p=>p.requiresPrescription).length === 0 && <div className="text-sm text-slate-400">No hay productos que requieran receta.</div>}
          {available.filter(p=>p.requiresPrescription).map(p => (
            <label key={p.id} className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={selected.includes(p.id)} onChange={()=>toggle(p.id)} />
              <span>{p.name}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="flex gap-2">
        <button type="submit" className="btn-brand">Subir receta</button>
      </div>
    </form>
  );
}

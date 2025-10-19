import React, {useState} from 'react';

export default function Contact(){
  const [form, setForm] = useState({name:'', email:'', message:''});
  function submit(e){
    e.preventDefault();
    alert('Mensaje enviado (simulado)');
    setForm({name:'', email:'', message:''});
  }
  return (
    <main className="container py-8">
      <h1 className="text-2xl font-semibold">Contacto</h1>
      <form onSubmit={submit} className="mt-4 max-w-lg">
        <label className="block text-sm">Nombre</label>
        <input className="w-full border rounded px-2 py-1 mt-1" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
        <label className="block text-sm mt-3">Email</label>
        <input className="w-full border rounded px-2 py-1 mt-1" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
        <label className="block text-sm mt-3">Mensaje</label>
        <textarea className="w-full border rounded px-2 py-1 mt-1" value={form.message} onChange={e=>setForm({...form, message:e.target.value})} />
  <button className="mt-4 btn-brand">Enviar</button>
      </form>
    </main>
  );
}

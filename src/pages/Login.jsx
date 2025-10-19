import React, {useState} from 'react';

export default function Login(){
  const [form, setForm] = useState({email:'', password:''});
  function submit(e){ e.preventDefault(); alert('Sesión simulada'); }
  return (
    <main className="container py-8">
      <h1 className="text-2xl font-semibold">Iniciar sesión</h1>
      <form onSubmit={submit} className="mt-4 max-w-md">
        <label className="block text-sm">Email</label>
        <input className="w-full border rounded px-2 py-1 mt-1" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
        <label className="block text-sm mt-3">Contraseña</label>
        <input type="password" className="w-full border rounded px-2 py-1 mt-1" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} />
  <button className="mt-4 btn-brand">Entrar</button>
      </form>
    </main>
  );
}

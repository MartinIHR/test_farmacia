import React, { useState } from 'react';
import { usePrescription } from './PrescriptionContext';

export default function PrescriptionUpload(){
  const { add } = usePrescription();
  const [patient, setPatient] = useState('');
  const [doctor, setDoctor] = useState('');
  const [date, setDate] = useState('');
  const [file, setFile] = useState(null);

  const onSubmit = (e)=>{
    e.preventDefault();
    if(!file) return alert('Selecciona un archivo');
    add({ patientName: patient, doctorName: doctor, date, file: { name: file.name, type: file.type }, products: [] });
    setPatient(''); setDoctor(''); setDate(''); setFile(null);
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
      <div className="flex gap-2">
        <button type="submit" className="btn-brand">Subir receta</button>
      </div>
    </form>
  );
}

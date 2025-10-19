import React from 'react';
import PrescriptionUpload from '../components/PrescriptionUpload';
import PrescriptionList from '../components/PrescriptionList';

export default function Prescriptions(){
  return (
    <div className="container py-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div><PrescriptionUpload /></div>
        <div className="card p-4"><h3 className="font-semibold mb-3">Mis recetas</h3><PrescriptionList /></div>
      </div>
    </div>
  );
}

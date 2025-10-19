import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const PrescriptionContext = createContext();

const initial = { items: [] };

function reducer(state, action){
  switch(action.type){
    case 'ADD':
      return { ...state, items: [ ...state.items, action.payload ] };
    case 'UPDATE':
      return { ...state, items: state.items.map(i => i.id === action.payload.id ? { ...i, ...action.payload } : i) };
    default: return state;
  }
}

export function PrescriptionProvider({ children }){
  const [state, dispatch] = useReducer(reducer, initial, () => {
    try{ const raw = localStorage.getItem('prescriptions'); return raw ? JSON.parse(raw) : initial }catch(e){return initial}
  });

  useEffect(()=>{
    localStorage.setItem('prescriptions', JSON.stringify(state));
  },[state]);

  // mock review processor: after adding, mark as 'in_review' then 'approved' after timeout
  useEffect(()=>{
    const timers = [];
    state.items.forEach(item=>{
      if(item.status === 'uploaded'){
        const id = item.id;
        const t1 = setTimeout(()=> dispatch({ type: 'UPDATE', payload: { id, status: 'in_review' } }), 1500);
        const t2 = setTimeout(()=> dispatch({ type: 'UPDATE', payload: { id, status: 'approved' } }), 6000);
        timers.push(t1, t2);
      }
    });
    return ()=> timers.forEach(t=>clearTimeout(t));
  },[state.items]);

  const add = ({ patientName, doctorName, date, file, products=[] }) => {
    const obj = { id: uuidv4(), patientName, doctorName, date, file, products, status: 'uploaded', createdAt: Date.now() };
    dispatch({ type: 'ADD', payload: obj });
    return obj;
  };

  const update = (payload) => dispatch({ type: 'UPDATE', payload });

  return (
    <PrescriptionContext.Provider value={{ state, add, update }}>
      {children}
    </PrescriptionContext.Provider>
  );
}

export function usePrescription(){
  return useContext(PrescriptionContext);
}

export default PrescriptionProvider;

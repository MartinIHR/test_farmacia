import React, { createContext, useContext, useReducer, useEffect, useRef } from 'react';
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

  // timersRef keeps timeouts per-prescription so we don't accidentally clear the approve timer
  // when the state updates (previous implementation cleared timers on every state change).
  const timersRef = useRef(new Map());

  useEffect(()=>{
    return ()=>{
      // cleanup any remaining timers on unmount
      timersRef.current.forEach((arr) => arr.forEach(t => clearTimeout(t)));
      timersRef.current.clear();
    };
  },[]);

  // If there are prescriptions persisted from before the change, they might be
  // stuck in 'uploaded' or 'in_review'. Ensure we schedule missing timers for
  // those items when the provider mounts or when state.items updates.
  useEffect(()=>{
    const now = Date.now();
    state.items.forEach(item => {
      if(!item || !item.id) return;
      // don't schedule if we already have timers for this id
      if(timersRef.current.has(item.id)) return;

      const createdAt = typeof item.createdAt === 'number' ? item.createdAt : now;
      const elapsed = now - createdAt;
      const toInReview = Math.max(0, 1500 - elapsed);
      const toApproved = Math.max(0, 6000 - elapsed);

      if(item.status === 'uploaded'){
        const t1 = setTimeout(()=> dispatch({ type: 'UPDATE', payload: { id: item.id, status: 'in_review' } }), toInReview);
        const t2 = setTimeout(()=> dispatch({ type: 'UPDATE', payload: { id: item.id, status: 'approved' } }), toApproved);
        timersRef.current.set(item.id, [t1, t2]);
      }else if(item.status === 'in_review'){
        // schedule only approval
        const t2 = setTimeout(()=> dispatch({ type: 'UPDATE', payload: { id: item.id, status: 'approved' } }), toApproved);
        timersRef.current.set(item.id, [t2]);
      }
    });
  },[state.items]);

  const add = ({ patientName, doctorName, date, file, products=[] }) => {
    const obj = { id: uuidv4(), patientName, doctorName, date, file, products, status: 'uploaded', createdAt: Date.now() };
    dispatch({ type: 'ADD', payload: obj });

    // schedule transitions: uploaded -> in_review -> approved
    const t1 = setTimeout(()=> dispatch({ type: 'UPDATE', payload: { id: obj.id, status: 'in_review' } }), 1500);
    const t2 = setTimeout(()=> dispatch({ type: 'UPDATE', payload: { id: obj.id, status: 'approved' } }), 6000);
    timersRef.current.set(obj.id, [t1, t2]);

    return obj;
  };

  const update = (payload) => {
    // if marking approved, clear timers for this id
    if(payload.status === 'approved' && payload.id){
      const arr = timersRef.current.get(payload.id);
      if(arr){ arr.forEach(t=>clearTimeout(t)); timersRef.current.delete(payload.id); }
    }
    dispatch({ type: 'UPDATE', payload });
  };

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

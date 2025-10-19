import React, { createContext, useContext, useState, useEffect } from 'react';

const LocationContext = createContext();

export function LocationProvider({ children }){
  const [location, setLocation] = useState(() => {
    try{ const v = localStorage.getItem('location'); return v ? JSON.parse(v) : null }catch(e){return null}
  });

  useEffect(()=>{
    if(location) localStorage.setItem('location', JSON.stringify(location));
  },[location]);

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation(){
  return useContext(LocationContext);
}

export default LocationProvider;

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { CuentasScreen } from '../components/CuentasScreen';
import { GolpeApp } from '../components/limites/GolpeApp';
import { Navbar } from '../components/NavBar';
// import { LimitesApp } from '../limites/LimitesApp';

export const DashboardRoutes = () => {
  return <>
    <Navbar />
    <div className='container'>
      <Routes>
        <Route path="/" element={<CuentasScreen />} />
        <Route path="/clasificacion" element={<CuentasScreen />} />
        <Route path="/limites" element={<GolpeApp />} />
      </Routes>
    </div>
  </>;
};

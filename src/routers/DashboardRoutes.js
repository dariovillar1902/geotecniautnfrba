import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { CuentasScreen } from '../CuentasScreen';
import { GolpeApp } from '../limites/GolpeApp';
// import { LimitesApp } from '../limites/LimitesApp';
import { LimitesScreen } from '../LimitesScreen';

export const DashboardRoutes = () => {
  return <>
    {
      //<Navbar />
    }
    <div className='container'>
      <Routes>
        <Route path="/" element={<CuentasScreen />} />
        <Route path="/limites" element={<GolpeApp />} />
      </Routes>
    </div>
  </>;
};

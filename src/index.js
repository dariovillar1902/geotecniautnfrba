import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CuentasScreen } from './components/CuentasScreen';
import { DashboardRoutes } from './routers/DashboardRoutes';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <BrowserRouter>
    <DashboardRoutes />
  </BrowserRouter>
);

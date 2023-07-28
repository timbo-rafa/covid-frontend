import React from 'react';
import './App.css';
import { SideMenu } from './SideMenu';
import { BrowserRouter, RouterProvider, createBrowserRouter } from 'react-router-dom';
import createAppBrowserRouter from './AppRoutes';
import './mui'
import { CssBaseline } from '@mui/material';

const router = createAppBrowserRouter()

function App() {
  return (<>
      <CssBaseline />
      <SideMenu />
      <main>
    <RouterProvider router={router} />
      </main>
  </>
  );
}

export default App;

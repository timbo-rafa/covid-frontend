import React from 'react';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import createAppBrowserRouter from './AppRoutes';
import './mui'
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const router = createAppBrowserRouter()
const defaultTheme = createTheme();

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <main>
        <CssBaseline />
        {/* <SideMenu /> */}
        <RouterProvider router={router} />
      </main>
    </ThemeProvider>

  );
}

export default App;

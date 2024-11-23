import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import createAppBrowserRouter from './AppRoutes';
import './mui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const router = createAppBrowserRouter();
const defaultTheme = createTheme();

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

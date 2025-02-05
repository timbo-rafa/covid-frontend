import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import createAppBrowserRouter from './AppRoutes';
import './mui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserFilterContext } from './user-filter/user-filter.context';
import { useUserFilterContextValue } from './user-filter/user-filter.hook';

const router = createAppBrowserRouter();
const defaultTheme = createTheme();

const queryClient = new QueryClient();

function App() {
  const userFilterContextValue = useUserFilterContextValue();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={defaultTheme}>
        <UserFilterContext.Provider value={userFilterContextValue}>
          <CssBaseline />
          <RouterProvider router={router} />
        </UserFilterContext.Provider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

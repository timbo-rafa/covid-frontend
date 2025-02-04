import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import createAppBrowserRouter from './AppRoutes';
import './mui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserFilterContext, userFilterDefaults } from './user-filter/user-filter.context';
import React from 'react';

const router = createAppBrowserRouter();
const defaultTheme = createTheme();

const queryClient = new QueryClient();

function App() {
  const [selectedColumnNames, setSelectedColumnNames] = React.useState(userFilterDefaults.selectedColumnNames);
  const [selectedCountryIsoCodes, setSelectedCountryIsoCodes] = React.useState(userFilterDefaults.selectedCountryIsoCodes);

  const userFilterContextValue = React.useMemo(
    () => ({ selectedColumnNames, setSelectedColumnNames, selectedCountryIsoCodes, setSelectedCountryIsoCodes }),
    [selectedColumnNames, setSelectedColumnNames, selectedCountryIsoCodes, setSelectedCountryIsoCodes],
  );

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

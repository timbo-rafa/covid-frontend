import { Navigate, createBrowserRouter } from 'react-router-dom';
import { SideMenu } from './SideMenu/SideMenu';
import { WorldMapPage } from './pages/WorldMap';
import { TimelinePage } from './pages/Timeline';
import { DataTablePage } from './pages/DataTable/DataTablePage';

export default function createAppBrowserRouter() {
  return createBrowserRouter([
    {
      path: '/',
      element: <SideMenu />,
      children: [
        {
          path: '/world/:selectedColumnName',
          element: <WorldMapPage />,
        },
        {
          path: '/timeline',
          element: <TimelinePage />,
        },
        {
          path: '/table',
          element: <DataTablePage />
        },
        {
          path: '/',
          element: <Navigate to="/world" />,
        },
      ],
    },
    {},
  ]);
}

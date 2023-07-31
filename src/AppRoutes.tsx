import { Navigate, createBrowserRouter } from "react-router-dom";
import { SideMenu } from './SideMenu/SideMenu';
import { WorldMapPage } from './pages/WorldMap/WorldMapPage';
//import { useCountriesQuery } from "./covid-api/use-countries-covid-data-query";

export default function createAppBrowserRouter() {
  return createBrowserRouter([{
    path: '/',
    element: <SideMenu />,
    children: [
      {
        path: '/world',
        element: <WorldMapPage />
      },
      {
        path: '/',
        element: <Navigate to='/world' />
      }
    ]
  }, {
  }
  ])
}
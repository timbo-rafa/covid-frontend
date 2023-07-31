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
        loader: async (args) => {
          const resp = await fetch('http://localhost:3000/api/countries/covid-data?countryIds=38&newCases=true', {mode: 'no-cors'})

          //const aaa = useCountriesQuery();

          const data = await resp.body;
          console.log(data)
          return data
        },
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
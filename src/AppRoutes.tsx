import React from 'react';
import {createBrowserRouter } from "react-router-dom";
import { WorldMapPage } from './pages/WorldMap/WorldMapPage';
import { SideMenu } from './SideMenu/SideMenu';

export default function createAppBrowserRouter() {
  return createBrowserRouter([{
    path: '/',
    element: <SideMenu />,
    children: [
      {
        path: '/world',
        element: <WorldMapPage />
      }
    ]
  }, {
  }
  ])
}
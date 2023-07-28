import React from 'react';
import {createBrowserRouter } from "react-router-dom";
import { WorldPage } from './pages/WorldPage';
import { SideMenu } from './SideMenu/SideMenu';

export default function createAppBrowserRouter() {
  return createBrowserRouter([{
    path: '/',
    element: <SideMenu />,
    children: [
      {
        path: '/world',
        element: <WorldPage />
      }
    ]
  }, {
  }
  ])
}
import React from 'react';
import {createBrowserRouter, redirect } from "react-router-dom";
import { WorldPage } from './pages/WorldPage';
import Dashboard from './Dashboard';

// import Dashboard from "./dashboard/Dashboard";
// import SimplePageContainer from "./simple/SimplePageContainer";

export default function createAppBrowserRouter() {
  return createBrowserRouter([{
    path: '/',
    element: <Dashboard />,
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
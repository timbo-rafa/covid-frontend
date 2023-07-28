import React from 'react';
import {createBrowserRouter, redirect } from "react-router-dom";
import { WorldPage } from './pages/WorldPage';

// import Dashboard from "./dashboard/Dashboard";
// import SimplePageContainer from "./simple/SimplePageContainer";

export default function createAppBrowserRouter() {
  return createBrowserRouter([{
    path: '/',
    action: () => redirect('/world')
  }, {
    path: 'world',
    element: <WorldPage />
  }
  ])
}
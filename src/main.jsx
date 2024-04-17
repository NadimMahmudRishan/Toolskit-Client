import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";

import { HelmetProvider } from 'react-helmet-async';
import AuthProvider from './Provider/AuthProvider.jsx';


import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import router from './router/router.jsx';

// Create a client
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>,
)

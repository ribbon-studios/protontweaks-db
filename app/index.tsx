import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const container = document.getElementById('root');
const root = createRoot(container!);

const router = createHashRouter([
  {
    path: '/',
    lazy: () => import('./App'),
    children: [
      {
        path: '/',
        lazy: () => import('./pages/Dashboard'),
      },
      {
        path: '/tweaks/:id',
        lazy: () => import('./pages/Tweak'),
      },
    ],
  },
]);

const client = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);

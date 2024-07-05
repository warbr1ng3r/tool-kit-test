import { createBrowserRouter, Navigate } from 'react-router-dom';
import { MainPage } from '@/pages/main';
import { RepoPage } from '@/pages/repo';

export const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        index: true,
        element: <MainPage />
      },
      {
        path: '/repo/:login/:name',
        element: <RepoPage />
      }
    ]
  },
  { path: '*', element: <Navigate to="/" /> }
]);

import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { router } from '@/app/router';
import { RouterProvider } from 'react-router-dom';
import { appStarted } from '@/shared/config/app';

const App = () => {
  useEffect(() => {
    appStarted();
  }, []);
  return <RouterProvider router={router} />;
};

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);

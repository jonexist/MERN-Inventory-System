import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { RecordList } from './components/record/RecordList.tsx';
import { Form } from './components/form/Form.tsx';
import { Error404 } from './components/Error404.tsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [{ path: '/', element: <RecordList /> }],
  },
  {
    path: '/edit/:id',
    element: <App />,
    children: [{ path: '/edit/:id', element: <Form /> }],
  },
  {
    path: '/create',
    element: <App />,
    children: [
      {
        path: '/create',
        element: <Form />,
      },
    ],
  },
  { path: '*', element: <Error404 /> },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, RouterProvider } from "react-router-dom";

import router from "./router/router";
import { StrictMode } from 'react';
import { Toaster } from 'react-hot-toast';


createRoot(document.getElementById('root')).render(

  <StrictMode >
      <RouterProvider router={router} />
      <Toaster />
  </StrictMode>,
)

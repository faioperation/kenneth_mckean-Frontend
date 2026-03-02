import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, RouterProvider } from "react-router-dom";

import router from "./router/router";
import { StrictMode } from 'react';


createRoot(document.getElementById('root')).render(

  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
)

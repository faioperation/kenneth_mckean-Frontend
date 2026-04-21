import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, RouterProvider } from "react-router-dom";

import router from "./router/router";
import { StrictMode } from 'react';
import { Toaster } from 'react-hot-toast';
import { TaskProvider } from './context/TaskContext';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const  queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, 
      cacheTime: 1000 * 60 * 10, 
    },
  },
});
createRoot(document.getElementById('root')).render(

  <StrictMode >
    <QueryClientProvider client={queryClient}>
      <TaskProvider>
        <RouterProvider router={router} />
        <Toaster />
      </TaskProvider>
    </QueryClientProvider>
  </StrictMode>,
)

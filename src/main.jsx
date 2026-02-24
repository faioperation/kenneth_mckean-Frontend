import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from "react-router-dom";
import router from "./router/router";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
  
//   </React.StrictMode>
// );
createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
)

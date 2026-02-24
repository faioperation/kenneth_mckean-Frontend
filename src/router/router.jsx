import { createBrowserRouter } from "react-router-dom";

import AdminLayout from "../Admin/layout/AdminLayout";
import Overview from "../Admin/Pages/Overview/Overview";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <AdminLayout></AdminLayout>,
    children: [
      {
        index:true,
        element: <Overview></Overview>,
      }
    ],
  },
]);

export default router;
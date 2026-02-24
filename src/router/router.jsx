import { createBrowserRouter } from "react-router-dom";

import AdminLayout from "../Admin/layout/AdminLayout";
import Overview from "../Admin/Pages/Overview/Overview";
import Workflow from "../Admin/Pages/Workflow/Workflow";
import Usage from "../Admin/Pages/Usage&Billing/Usage";
import Security from "../Admin/Pages/Security&Access/Security";
import Configuration from "../Admin/Pages/SystemConfiguration/Configuration";
import Data from "../Admin/Pages/Data&Files/Data";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <AdminLayout></AdminLayout>,
    children: [
      {
        path : "overview",
        element: <Overview></Overview>,
      },
      // {
      //   path:"workflow",
      //   element: <Workflow></Workflow>
      // },
      {
        path:"usage",
        element: <Usage></Usage>
      },
      // {
      //   path:"security",
      //   element: <Security></Security>
      // },
      {
        path:"configuration",
        element: <Configuration></Configuration>
      },
    //   {
    //     path:"data",
    //     element: <Data></Data>
    //   }
    ],
  },
]);

export default router;
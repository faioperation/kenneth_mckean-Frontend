import { createBrowserRouter } from "react-router-dom";

import AdminLayout from "../Admin/layout/AdminLayout";
import Overview from "../Admin/Pages/Overview/Overview";
import Workflow from "../Admin/Pages/Workflow/Workflow";
import Usage from "../Admin/Pages/Usage&Billing/Usage";
import Security from "../Admin/Pages/Security&Access/Security";
import Configuration from "../Admin/Pages/SystemConfiguration/Configuration";
import Data from "../Admin/Pages/Data&Files/Data";
import User from "../Admin/Pages/User/User";
import AdminProfile from "../Admin/Pages/AdminProfile";
import APIrequests from "../Admin/Pages/Usage&Billing/Componants/APIrequests";
import Plans from "../Admin/Pages/Usage&Billing/Componants/Plans";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <AdminLayout></AdminLayout>,
    children: [
      {
        path: "overview",
        element: <Overview></Overview>,
      },
      {
        path: "user",
        element: <User></User>,
      },
      // {
      //   path:"workflow",
      //   element: <Workflow></Workflow>
      // },
      {
        path: "usage",
        element: <Usage></Usage>,
        children: [
          {
            index: true,
            element: <APIrequests></APIrequests>,
          },
          {
            path: "plans",
            element: <Plans></Plans>,
          },
        ],
      },
      // {
      //   path:"security",
      //   element: <Security></Security>
      // },
      {
        path: "configuration",
        element: <Configuration></Configuration>,
      },
      {
        path: "adminprofile",
        element: <AdminProfile></AdminProfile>,
      },
      //   {
      //     path:"data",
      //     element: <Data></Data>
      //   }
    ],
  },
]);

export default router;

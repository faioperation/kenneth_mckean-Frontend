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
import Api from "../Admin/Pages/SystemConfiguration/Componants/Api";
import Key from "../Admin/Pages/SystemConfiguration/Componants/Key";
import CommonLayout from "../user/components/CommonLayout";
import AboutPage from "../user/pages/AboutPage";
import PricingPage from "../user/pages/PricingPage";
import FeaturesPage from "../user/pages/FeaturesPage";
import HomePage from "../user/pages/HomePage";
import Authlayout from "../user/components/Authlayout";
import SignupPage from "../user/authPages/SignupPage";
import ForgotPassword from "../user/authPages/ForgotPassword";
import VerifyComponet from "../user/authPages/VerifyComponet";
import PasswordUpdated from "../user/authPages/PasswordUpdated";
import SignInPage from "../user/authPages/SignInPage";
import AccountSuccessfully from "../user/authPages/AccountSuccessfully";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CommonLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/features",
        element: <FeaturesPage />,
      },
      {
        path: "/pricing",
        element: <PricingPage />,
      },
    ],
  },

  {
    path: "/auth",
    element: <Authlayout />,
    children: [
      {
        path: "/auth/signup",
        element: <SignupPage />,
      },
      {
        path: "/auth/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/auth/verify",
        element: <VerifyComponet />,
      },
      {
        path: "/auth/password-updated",
        element: <PasswordUpdated />,
      },
      {
        path: "/auth/signin",
        element: <SignInPage />,
      },
      {
        path: "/auth/signIn-successful",
        element: <AccountSuccessfully />,
      },
    ],
  },

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
        children: [
          {
            index: true,
            element: <Api></Api>,
          },
          {
            path: "key",
            element: <Key></Key>,
          },
        ],
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

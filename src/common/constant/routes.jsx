/* LIBRARIES */
import React, { Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

/* ABSOLUTE IMPORTS */
const Dashboard = React.lazy(() => import("../../Components/Dashboard/index"));
const Login = React.lazy(() => import("../../Components/Login"));
const SignUp = React.lazy(() => import("../../Components/SignUp"));
// routes variables
export const LOGIN = "/login";
export const SIGNUP = "/signup";
export const DASHBOARD = "/build";
export const WILDCARD = "*";

/**
 * route for login
 */
export const router = createBrowserRouter([
  {
    path: LOGIN,
    element: <Login />,
  },
  {
    path: SIGNUP,
    element: <SignUp />,
  },
  {
    path: WILDCARD,
    element: <Navigate to={LOGIN} replace={true} />,
    errorElement: <></>,
  },
]);

/**
 * route for builderRouter
 */
export const builderRouter = createBrowserRouter([
  {
    path: DASHBOARD,
    element: <Dashboard />,
    errorElement: <></>,
  },
  {
    path: WILDCARD,
    element: <Navigate to={DASHBOARD} replace={true} />,
    errorElement: <></>,
  },
]);

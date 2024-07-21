import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout"
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import AddExpenses from "./pages/Expenses/AddExpenses"
import ListOfExpenses from "./pages/Expenses/ListOfExpenses"
import AddIncome from "./pages/Income/AddIncome"
import ListOfIncome from "./pages/Income/ListOfIncome"

import Layout2 from "./pages/Users/Layout2"
import SignUp from "./pages/Users/Register/SignUp"
import SignIn from "./pages/Users/Login/SignIn";
import Profile from "./pages/Users/Profile/Profile";

const route = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "add-expense",
        element: <AddExpenses />,
      },
      {
        path: "list-expenses",
        element: <ListOfExpenses />,
      },
      {
        path: "add-income",
        element: <AddIncome />,
      },
      {
        path: "list-incomes",
        element: <ListOfIncome />,
      },
    ],
  },
  {
    path: "/",
    element: <Layout2/>,
    children: [
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
    ]
  }
]);

const App = () => {
  return (
    <>
      <RouterProvider router={route} />
    </>
  );
};

export default App;

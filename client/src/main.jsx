import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UpdateUser from "./UpdateUser.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/user/:userID",
    element: <UpdateUser />,
    loader: async ({ params }) => {
      const userData = await fetch(
        `http://localhost:3000/user/${params.userID}`,
      );
      const result = userData.json();
      return result;
    },
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

import React from "react";
import {
  BrowserRouter as Router,
  useLocation,
  useRoutes,
} from "react-router-dom";
import Home from "./views/home";
import { Toaster } from "react-hot-toast";
import "./assets/scss/index.scss";
import Errorhandling from "./components/errorhandling/errorhandling";

const App = () => {
  const { pathname } = useLocation();
  const mapId = pathname?.split("/")?.pop();

  let routes = useRoutes([
    { path: "/", element: <Home mapId={mapId} /> },
    { path: "/maps/:id", element: <Home mapId={mapId} /> },
    {
      path: `/v2/:id`,
      element: <Home mapId={mapId} />,
    },
    {
      path: `*`,
      element: <Errorhandling />,
    },
  ]);
  return routes;
};

const AppWrapper = () => {
  return (
    <>
      <div className="toaster-area">
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <Router>
        <App />
      </Router>
    </>
  );
};

export default AppWrapper;

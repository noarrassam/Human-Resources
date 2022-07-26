import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Home from "./components/nav";
import RoutesInfo from "./components/routesInfo";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Home />
        <RoutesInfo />
      </BrowserRouter>
    </div>
  );
}

export default App;

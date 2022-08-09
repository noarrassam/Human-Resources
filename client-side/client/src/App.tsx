import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Login from "./components/nav";
import RoutesInfo from "./components/routesInfo";
import GlobalContext, {
  IStateType,
  defaultContextValue,
} from "./components/store/appStore";

function App() {
  let [state, setState] = useState<IStateType>(defaultContextValue);

  useEffect(() => {
    setState({ ...state, setState: setGlobalState });
  }, []);

  const setGlobalState = (item: any) => {
    console.log("item ----" + item);
    if (item) {
      setState({ ...state, ...item });
    }
  };

  return (
    <GlobalContext.Provider value={state}>
      <div>
        <BrowserRouter>
          <Login />
          <RoutesInfo />
        </BrowserRouter>
      </div>
    </GlobalContext.Provider>
  );
}

export default App;

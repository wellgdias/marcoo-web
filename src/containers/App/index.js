import React, { useEffect } from "react";
import { HashRouter  } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Topbar from "../Topbar";
import SlideDrawer from "../SlideDrawer";
import Backdrop from "../../components/Backdrop";

import { loadCatalog } from "../../actions";
import Routes from "../../routes/index";

import "./style.css";

export default function App() {
  const { drawer, cep } = useSelector((state) => state);
  const dispatch = useDispatch();   

  useEffect(() => {
    if (cep) {
      dispatch(loadCatalog(cep));
    }    
  }, [cep, dispatch]);

  return (
    <div data-testid="app">
      <HashRouter>
        {drawer.open && (
          <>
            <SlideDrawer />
            <Backdrop />
          </>
        )}
        <Topbar />
        <Routes />
      </HashRouter>
    </div>
  );
}

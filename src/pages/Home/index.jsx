import React from "react";
import { useSelector } from "react-redux";

import Catalog from "../../containers/Catalog";
import Modal from "../../containers/Modal";

export default function Home() {
  const { catalog } = useSelector((state) => state);
  console.log("passou aqui!!!");
  return (    
    <div data-testid="home">
      { catalog.modal ? (
        <Modal /> ) : (
        <Catalog /> )
      }      
    </div>
  );
}

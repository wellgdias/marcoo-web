import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FiSearch } from "react-icons/fi";

import Container from "../../components/Container";
import Image from "../../components/Image";
import Button from "../../components/Button"

import { setCepValue } from "../../actions";
import {  onlynumber } from "../../utils"

import mapImage from "../../assets/mapImage.png"

import "./style.css";

export default function Modal() {
  const [cep, setCep] = useState(false);
  const dispatch = useDispatch();

 function handleCepChange(value){
   setCep(value)
 }

 function handleCepOnClick(cep){   
   dispatch(setCepValue(cep));
}
  return (    
    <section className="modal" data-testid="modal">  
      <Container >
        <div className="modal__form">
          <div className="image__modal">
            <Image image={mapImage} />         
          </div>    
          <span className="modal__text">Por favor digite o CEP do seu endereço</span>
          <div className="modal__filter">
            <input
              type="text"              
              className="modal__input"  
              maxLength="8"
              pattern="[0-9]+$"
              onKeyPress={onlynumber}
              onChange={(event) => handleCepChange(event.target.value)}   
            />
            <div className="filter__button">
              <Button
                className="button__icon cep--search"
                onClick={() => handleCepOnClick(cep)}
              >
                <FiSearch/>
              </Button>              
            </div>
          </div>   
        </div>    
      </Container>     
    </section>   
  );
}

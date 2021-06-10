import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Spinner  from 'react-spinner-material';
import { FiRotateCw } from "react-icons/fi";

import Container from "../../components/Container";

import Button from "../../components/Button"

import { loadCheckout } from "../../actions";

import "./style.css";

export default function Checkout() {
  const { checkout, cart, cep } = useSelector((state) => state);
  const dispatch = useDispatch();  
  const history = useHistory();      

  const { supermarkets, loading, error } = checkout;

  function handleRefreshOnClick(){
    dispatch(loadCheckout(cep, cart));     
  }
  
  return (
    <section className="checkout" data-testid="checkout">
      { loading ? (
        <Container >
          <div className="catalog__info">            
            <Spinner radius={100} color={"#68b5e2"} stroke={4} visible={true} />
            <span className="info__text">O Marcoo está realizando a comparação dos preços</span>
          </div>
        </Container>
      ) : !error ? (
        <>
          { supermarkets.length === 0 ? (
            history.push("/")
          ) : (
          <Container>
            <h1>{supermarkets[0].name}</h1>        
          </Container>)}
        </>
      ) :
      (  
        <Container > 
          <div className="catalog__info"> 
            <Button 
              className="button__icon icon--error"               
              onClick={() => handleRefreshOnClick()}
            >
              <FiRotateCw />
            </Button> 
            <span className="info__text">Ops... tivemos um erro ao carregar os produtos, tente novamente...</span>                            
          </div>         
        </Container> 
       )
      }     
    </section>
  );
}

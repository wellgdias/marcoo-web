import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Spinner  from 'react-spinner-material';
import { FiRotateCw, FiArrowLeft } from "react-icons/fi";


import Supermarkets from "../../containers/Supermarkets";

import Container from "../../components/Container";
import Button from "../../components/Button"

import { loadCheckout } from "../../actions";
import { currency } from "../../utils"

import "./style.css";

export default function Checkout() {
  const { checkout, cart, cep, productsName } = useSelector((state) => state);
  const dispatch = useDispatch();  
  const history = useHistory();      

  const { supermarkets, loading, error, subTotal, deliveryFee, Total } = checkout;

  function handleRefreshOnClick(){
    dispatch(loadCheckout(cep, cart));     
  }

  function handleOnClickArrowLeft(){
    history.push("/")
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
            <div className="product__navigation">
              <Button
                className="button__icon icon--return"
                onClick={() => handleOnClickArrowLeft()}
              >
                <FiArrowLeft />                
              </Button>
            </div>
            <div className="checkout__details">
              <div className="checkout__products">
                <span className="checkout__info product--name">Produtos</span>
                { productsName.map((productName) => (
                  <div className="checkout__info product--info">
                    <span className="checkout__info product--amount">{productName.amount} - </span>
                    <span className="checkout__info product--name">{productName.name}</span>
                    
                  </div> 
                ))} 
                <span className="checkout__info product--total">Total</span>
              </div>
              
              <div className="checkout__supermarkets">                          
                { supermarkets.map((supermarket) => (
                  <Supermarkets key={supermarket.name} supermarket={supermarket}/>                
                ))}  
              </div>
            </div>
            <div className="checkout__summary"> 
                <span className="summary__info">Resumo do pedido:</span>     
                <div className="summary">                        
                      
                  <span className="checkout__info product--checkout">Subtotal: { currency.format(subTotal) }</span>
                  <span className="checkout__info product--checkout">Taxa de entrega: { currency.format(deliveryFee) }</span>
                  <span className="checkout__info product--checkout">Total: { currency.format(Total) }</span>

                  <div className="summary__buttons">
                    <Button 
                      className="checkout__button continue"
                      onClick={() => handleOnClickArrowLeft()}>
                        CONTINUAR COMPRANDO
                    </Button>
                    <Button className="checkout__button finish">
                        CONCLUIR PEDIDO
                    </Button>
                  </div>                  
                </div>   
            </div>               
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

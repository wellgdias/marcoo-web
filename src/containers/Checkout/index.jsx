import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";

import Spinner  from 'react-spinner-material';
import { FiRotateCw, FiArrowLeft } from "react-icons/fi";


import Supermarkets from "../../containers/Supermarkets";

import Container from "../../components/Container";
import Button from "../../components/Button"

import { loadCheckout, setClient, deleteCartValue } from "../../actions";
import { currency } from "../../utils"

import "./style.css";

export default function Checkout() {
  const { checkout, cart, cep, productsName, client } = useSelector((state) => state);
  const dispatch = useDispatch();  
  const history = useHistory();
  const [name, setName] = useState(false);
  const [email, setEmail] = useState(false);

  const { supermarkets, loading, error, subTotal, deliveryFee, total } = checkout;

  function handleRefreshOnClick(){
    dispatch(loadCheckout(cep, cart));     
  }

  function handleOnClickArrowLeft(){
    history.push("/")
  }

  function handleNameChange(event) {
    setName(event);
  }

  function handleEmailChange(event) {
    setEmail(event);
  }

  function handleOnClickFinish() {
    dispatch(setClient(name, email));
    dispatch(deleteCartValue()); 
  }

  useEffect(() => {
    if (client) {
      setName(client.name);
      setEmail(client.email);
    }    
  }, [client]);
  
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
              <span className="summary__info">informações do cliente:</span> 
              <div className="client__info">                       
              <div className="cliente__input">
                <span className="checkout__info client--info">Nome:</span>
                <div className="modal__filter">  
                  <input
                    type="text"              
                    className="modal__input" 
                    value={name}
                    onChange={(event) => handleNameChange(event.target.value)} 
                  />
                </div>
              </div>
              <div className="cliente__input">
                <span className="checkout__info client--info">Email:</span>
                <div className="modal__filter">  
                  <input
                    type="text"              
                    className="modal__input"
                    value={email}
                    onChange={(event) => handleEmailChange(event.target.value)}  
                  />
                </div>
              </div>
              
              </div>
              <span className="summary__info">Resumo do pedido:</span>     
              <div className="summary"> 
                <span className="checkout__info product--checkout">Subtotal: { currency.format(subTotal) }</span>
                <span className="checkout__info product--checkout">Taxa de entrega: { currency.format(deliveryFee) }</span>
                <span className="checkout__info product--checkout">Total: { currency.format(total) }</span>

                <div className="summary__buttons">
                  <Button 
                    className="checkout__button continue"
                    onClick={() => handleOnClickArrowLeft()}>
                      CONTINUAR COMPRANDO
                  </Button>
                  <Link to={'/payment'}>
                    <Button 
                      className="checkout__button finish"
                      onClick={() => handleOnClickFinish()}>                      
                        CONCLUIR PEDIDO
                    </Button>
                  </Link>
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

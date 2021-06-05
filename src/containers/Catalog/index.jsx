import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Spinner  from 'react-spinner-material';
import { FiRotateCw, FiFrown, FiMap } from "react-icons/fi";

import Product from "../ProductCatalog";
import Container from "../../components/Container";

import Button from "../../components/Button"

import { setCepValue, setModalValue } from "../../actions";

import "./style.css";

export default function Catalog() {
  const { catalog } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const { products, loading, error } = catalog; 


  function handleRefreshOnClick() {
    dispatch(setModalValue())
    dispatch(setCepValue());
    history.push("/")
  };

  return ( 
    <section className="catalog" data-testid="catalog">    
      { loading ? (
        <Container >
          <div className="catalog__info">            
            <Spinner radius={100} color={"#68b5e2"} stroke={4} visible={true} />
            <span className="info__text">O Marcoo está procurando pelos melhores preços</span>
          </div>
        </Container>
      ) : !error ? (
        <Container>
          <p className="catalog__count">{products.length} itens</p>
          <div className="catalog__list">
            {products?.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </Container>
      ) : (
        <Container > 
          <div className="catalog__info"> 
            { error === 400 
              ? (                
                <>
                  <Button 
                    className="button__icon icon--error"               
                    onClick={() => handleRefreshOnClick()}
                  >
                    <FiFrown />
                  </Button> 
                  <span className="info__text">Infelizmente este endereço está fora da nossa área da cobertuta</span>                              
                </>
                )
              : error === 404
                ? (
                  <>
                    <Button 
                      className="button__icon icon--error"               
                      onClick={() => handleRefreshOnClick()}
                    >
                      <FiMap />
                    </Button> 
                    <span className="info__text">Ops... o CEP informado não foi encontrado</span>                    
                  </>
                  )
                : (
                  <>
                    <Button 
                      className="button__icon icon--error"               
                      onClick={() => handleRefreshOnClick()}
                    >
                      <FiRotateCw />
                    </Button> 
                    <span className="info__text">Ops... tivemos um erro ao carregar os produtos, tente novamente...</span>
                  </>
                  )
            }            
          </div>         
        </Container>
      )}   
    </section>     
  );
}

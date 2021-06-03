import React from "react";
import { useSelector } from "react-redux";
import Spinner from 'react-spinner-material';

import Product from "../ProductCatalog";
import Container from "../../components/Container";

import "./style.css";

export default function Catalog() {
  const { catalog } = useSelector((state) => state);
  const { products, loading, error } = catalog;

  return (    
    <section className="catalog" data-testid="catalog">    
      {loading ? (
        <Container >
          <div className="catalog__loading">            
            <Spinner radius={100} color={"#68b5e2"} stroke={4} visible={true} />
            <span className="loading__text">Aguarde um momento enquanto procuramos pelos melhores preços...</span>
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
        <Container>
         <h1>Erro ao carregar os produtos, tente novamente...</h1>
        </Container>
      )}     
    </section>
   
  );
}

import React from "react";
import { useSelector } from "react-redux";

import Product from "../ProductCatalog";
import Container from "../../components/Container";

import "./style.css";

export default function Catalog() {
  const { catalog } = useSelector((state) => state);
  const { products, loading, error } = catalog;

  return (    
    <section className="catalog" data-testid="catalog">    
      {loading ? (
        <Container>
          <h1>Aguarde um momento enquanto procuramos pelos melhores preços...</h1>
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

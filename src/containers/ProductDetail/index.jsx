import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Image from "../../components/Image";
import Price from "../../components/Price";
import ProductName from "../../components/Name";
import Button from "../../components/Button";
import Container from "../../components/Container";

import { setProductCart } from "../../actions";

import "./style.css";

export default function Product() {
  
  const { productDetail } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    _id,
    image,
    name,
    prices,    
    installments,  
  } = productDetail;

  

  

  function handleClickAddCart(id) {    
    dispatch(setProductCart(id));    
  }

  return (
    <section className="product" data-testid="product">
      {productDetail.length === 0 ? (
        history.push("/")
      ) : (
        <Container>
          <div className="product__detail">
            <div className="image__content">
              <Image image={image} name={name} />
            </div>

            <div className="product__content">
              <ProductName>{name}</ProductName>
              <Price
                regular={prices[0].price}
                atual={prices[0].price}
                installments={installments}
              />
              

              <div className="product__add">
                <Button
                  className="product__cart"
                  onClick={() => handleClickAddCart(_id)}
                >
                  Adicionar ao carrinho
                </Button>
              </div>
            </div>
          </div>
        </Container>
      )}
    </section>
  );
}

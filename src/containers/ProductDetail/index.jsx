import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import Image from "../../components/Image";
import Price from "../../components/Price";
import ProductName from "../../components/Name";
import Button from "../../components/Button";
import Container from "../../components/Container";

import { setProductCart } from "../../actions";
import { currency } from "../../utils"

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
  } = productDetail;

  
  function handleClickAddCart(id) {    
    dispatch(setProductCart(id));    
  }

  function handleOnClickArrowLeft(){
    history.push("/")
  }

  return (
    <section className="product" data-testid="product">
      {productDetail.length === 0 ? (
        history.push("/")
      ) : (
        <Container>
          <div className="product__detail">
            <div className="product__navigation">
              <Button
                className="button__icon icon--return"
                onClick={() => handleOnClickArrowLeft()}
              >
                <FiArrowLeft />                
              </Button>    
              <div className="image__content">              
                <Image image={image} name={name} />
              </div>
            </div>

            <div className="product__content">
              <ProductName>{name}</ProductName>
              <div className="product__infos">
                <div className="product__price">
                  <span className="supermarket__name">{prices[0].name}</span>
                  <Price atual={currency.format(prices[0].price)} />
                </div>

                <div className="product__add">
                  <Button
                    className="product__cart"
                    onClick={() => handleClickAddCart(_id)}
                  >
                    Comprar
                  </Button>
                </div>
              </div>

              

              <div className="supermarket__prices">
                <span className="supermarket__text">Preço do produto em outros supermercados:</span>                      
                { prices
                  .filter((price) => price._id !== prices[0]._id)
                  .map((price) => (
                  <span className="supermarket__info">{price.name + ' - ' + currency.format(price.price)}</span>
                  ))
                }
              </div>
            </div>
          </div>
        </Container>
      )}
    </section>
  );
}

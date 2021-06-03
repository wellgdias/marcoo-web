import React from "react";
import { useDispatch } from "react-redux";
import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";

import Image from "../../components/Image";
import Button from "../../components/Button";

import { setAmountProduct, deleteProductcart } from "../../actions";
import { currency } from "../../utils";


import "./style.css";

export default function ProductFilter(props) {
  const product =
    props.drawer === "filter" ? props.product : props.product.info;
  const { name, image, prices } = product;
  const dispatch = useDispatch();

  function handleOnClickAmount(id, operation) {
    dispatch(setAmountProduct(id, operation));
  }

  function handleOnClickDelete(id) {
    dispatch(deleteProductcart(id));
  }

  function isMinimumAmount(amount) {
    return amount === 1
      ? "button__icon icon--minimum"
      : "button__icon icon--minus";
  }

  return (
    <div className="drawer__product" data-testid="product">
      <div className="drawer__image">
        <Image image={image} name={name} />
      </div>

      <div className="drawer__details">
        <span className="details__name">{name}</span>
        {props.product.info && (          
          <div className="details__button">
            <div className="details__amount">
              <Button
                className={isMinimumAmount(props.product.amount)}
                onClick={() => handleOnClickAmount(props.product._id, "minus")}
              >
                <FiMinus />
              </Button>
              <span className="amount">{props.product.amount}</span>
              <Button
                className="button__icon icon--plus"
                onClick={() => handleOnClickAmount(props.product._id, "plus")}
              >
                <FiPlus />
              </Button>
            </div>
            <div className="details__delete">
              <Button
                className="button__icon icon--delete"
                onClick={() => handleOnClickDelete(props.product._id)}
              >
                <FiTrash2 />
              </Button>
              <p className="delete">Remover</p>
            </div>
          </div>          
        )}
      </div>

      <div className="drawer__price">   
      <span className="price__atual">{currency.format(prices[0].price)}</span>
      {props.product.info && (  
        <span className="supermarket__name">{prices[0].name}</span> 
      )}       
      </div>
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import Image from "../../components/Image";
import Price from "../../components/Price";
import ProductName from "../../components/Name";

import { setProductInfo } from "../../actions";
import { createPath } from "../../utils";

import "./style.css";

export default function ProductCatalog({ product }) {
  const {
    _id,    
    image,
    name,    
    prices,    
  } = product;

  const dispatch = useDispatch();
  const path = createPath(name);

  function handleSetProductId(id) {
    dispatch(setProductInfo(id));
  }

  return (
    <div className="product__info" data-testid="product">
      <Link to={`/produto/${path}`} onClick={() => handleSetProductId(_id)}>
        <Image image={image} name={name}/>
      </Link>
      <ProductName>{name}</ProductName>
      <Price regular={prices[0].price} atual={prices[0].price} />
    </div>
  );
}

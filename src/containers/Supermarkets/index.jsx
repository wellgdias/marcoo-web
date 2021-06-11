import React from "react";

import { currency } from "../../utils";

import "./style.css";

export default function Supermarket({ supermarket }) {  
  const {
    name,
    total,
    products   
  } = supermarket;

  return (
    <div className="supermarket__checkoutinfo" data-testid="supermarket">     
      <span className="checkout__info supermarket--name">{name}</span>
      {products.map((product) => (                
        <span className="checkout__info supermarket--price">{currency.format(product.total)}</span>  
                      
      ))}       
      <span className="checkout__info supermarket--total">{currency.format(total)}</span>      
    </div>
  );
}

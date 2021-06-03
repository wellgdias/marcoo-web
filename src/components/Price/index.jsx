import React from "react";

import "./style.css";

export default function Price({ atual}) {
  const pathname = window.location.pathname;

  const product__pricing =
    pathname === "/" ? "product__pricing--home" : "product__pricing--product";

  const product__price =
    pathname === "/" ? "product__price--home" : "product__price--product";

  const price__from =
    pathname === "/" ? "price__from--home" : "price__frome--product";

  return (
    <div className={product__pricing} data-testid="price">
      <span className={`${product__price} product__price--to`}>
        {atual}
      </span>
    </div>
  );
}

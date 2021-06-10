import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiX } from "react-icons/fi";

import Button from "../../components/Button";
import DrawerFilter from "../DrawerFilter";
import DrawerCart from "../DrawerCart";

import { setOpenDrawer, setValueFilter, loadCheckout } from "../../actions";
import { currency } from "../../utils";

import "./style.css";

export default function SlideDrawer() {
  const { cart, drawer, cep } = useSelector((state) => state);
  const dispatch = useDispatch();

  function handleOnClickCloseDrawer() {
    dispatch(setOpenDrawer());
    dispatch(setValueFilter(""));
  }

  function handleOnClickCheckout(cep, cart) {
    dispatch(loadCheckout(cep, cart));
    dispatch(setOpenDrawer());
  }

  const drawerClasses = drawer.open ? "drawer is-open" : "drawer";

  return (
    <div className={drawerClasses} data-testid="slide">
      <div className="drawer__container">
        <header className="drawer__header">
          <Button
            className="button__icon"
            onClick={() => handleOnClickCloseDrawer()}
          >
            <FiX />
          </Button>

          {drawer.receiver === "cart" ? (
            <h3 className="drawer__name">{`Carrinho (${cart.amount})`}</h3>
          ) : (
            <h3 className="drawer__name">Buscar Produtos</h3>
          )}
        </header>
        <div className="drawer__content">
          {drawer.receiver === "cart" ? (
            <>
              <DrawerCart />

              <div className="drawer__checkout">
                {cart.amount > 0 && 
                  <Link to={'/checkout'} onClick={() => handleOnClickCheckout(cep, cart)}>
                    <Button className="cart__checkout">
                      FINALIZAR COMPRA
                    </Button>
                  </Link>
                }
              </div>
              <footer className="drawer__footer">              
                <span className="footer__total">Total: {currency.format(cart.total)}</span>                
              </footer>
            </>
          ) : (
            <DrawerFilter />
          )}
        </div>
      </div>
    </div>
  );
}

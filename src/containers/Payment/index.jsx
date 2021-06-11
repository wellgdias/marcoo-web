import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiSmile } from "react-icons/fi";

import Image from "../../components/Image";
import Button from "../../components/Button";
import Container from "../../components/Container";
import { ReactComponent as Marcoo } from "../../assets/logo.svg";

import { currency } from "../../utils"

import qrCodePix from "../../assets/qrCodePix.png"

import "./style.css";

export default function Payment() {
  const { checkout } = useSelector((state) => state);  
  const { total } = checkout;

  return (
    <section className="payment" data-testid="payment">     
      <Container>
        <div className="payment__detail">
          <div className="payment__navigation">
            <Link to={'/checkout'}>
              <Button className="button__icon icon--return">
                <FiArrowLeft />                
              </Button>
            </Link>   
            <div className="image__content">              
              <Image image={qrCodePix} name={"QrCodePix"} />
            </div>
          </div> 
          <span className="payment__info"> Realize um pagamento PIX no valor de { currency.format(total) } utilizando o QrCode</span>     
          <span className="payment__info"> Assim que o pagamento for identificado entraremos em contato para realizar a entrega dos produtos</span>           
          
          <span className="payment__info smile"> Obrigado, quando precisar comparar preços novamente é só lembrar do Marcoo</span>    
          <div className="payment__logo">
            <Marcoo />     
          </div>           
         
        </div>
      </Container>     
    </section>
  );
}

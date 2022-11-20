import styled from "styled-components";
import { Container, Row, Col } from "react-grid-system";
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { NotificationContainer, NotificationManager } from "react-notifications";
import Scrollbars from "react-scrollbars-custom";
import RowOfTable from "./RowOfTable";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import React, { useState, useEffect } from "react";
import "react-notifications/lib/notifications.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import CartItem from "./CartItem";

const Cart = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const createNotification = (type) => {
    switch (type) {
      case "info":
        NotificationManager.info("Info message");
        break;
      case "success":
        NotificationManager.success("Success message", "Title here");
        break;
      case "warning":
        NotificationManager.warning("Warning message", "Close after 3000ms", 3000);
        break;
      case "errorName":
        NotificationManager.warning("Name only contains 3 - 14 characters", "Error Name!", 3000);
        break;
      case "errorPhone":
        NotificationManager.error("Phone only contains the numbers", "Error Phone!", 3000);
        break;
      case "errorAddress":
        NotificationManager.warning("Address only contains 3 - 30 characters", "Error Address!", 3000);
        break;
      case "noItems":
        NotificationManager.warning("There is no item in cart", "Empty cart !!!", 2000);
        break;
      default:
        break;
    }
  };
  const removeItem = async (e, id) => {
    e.preventDefault();
    const res = await axios.delete(`http://localhost:8082/api/cart/${id}`, { withCredentials: true });
    setCart(cart.filter((item) => item.id !== res.data));
  };
  useEffect(() => {
    const fetchCart = async () => {
      const res = await axios.get("http://localhost:8082/api/cart", { withCredentials: true });
      console.log(res.data);
      setCart(res.data);
    };
    fetchCart();
  }, []);
  const ContainerNotification = (name, phone, address) => {
    if (cart.length === 0) {
      createNotification("noItems");
      return;
    }
    if (name.length < 3 || name.length > 14) {
      createNotification("errorName");
      return;
    }
    if (!Number(phone)) {
      createNotification("errorPhone");
      return;
    }
    if (address.length < 3 || address.length > 30) {
      createNotification("errorAddress");
      return;
    }
  };
  return (
    <div>
      <Header />
      <ContainerStyled fluid>
        <Row>
          <Col xl={7.5}>
            <Title>Shopping cart</Title>
            <ListItem>
              {cart?.map((item) => {
                return <CartItem item={item} removeItem={removeItem} />;
              })}
            </ListItem>
          </Col>
          <Col xl={4} style={ContainerSummary}>
            <Title>Summary</Title>
            <ContainerInput>
              <NameInput>Name</NameInput>
              <Input type="text" onChange={(e) => setName(e.target.value)} />
            </ContainerInput>
            <ContainerInput>
              <NameInput>Phone Number</NameInput>
              <Input type="text" onChange={(e) => setPhone(e.target.value)} />
            </ContainerInput>
            <ContainerInput>
              <NameInput>Address</NameInput>
              <Input type="text" onChange={(e) => setAddress(e.target.value)} />
            </ContainerInput>
            <Line />
            <Row>
              <Col sm={8.5} xs={8.5}>
                <Ship>Shipping</Ship>
              </Col>
              <Col sm={2.5} xs={2.5}>
                <ValueShip>${(20).toLocaleString()}</ValueShip>
                {/* <ValueShip>{document.getElementById("name").value}</ValueShip> */}
              </Col>
            </Row>
            <br />
            <Row>
              <Col sm={8.5} xs={8.5}>
                <Ship>Order Total</Ship>
              </Col>
              <Col sm={2.5} xs={2.5}>
                <ValueShip>${total}</ValueShip>
              </Col>
            </Row>
            <br />
            <Link
              to="/checkout"
              style={LinkStyle}
              state={{
                name: name,
                address: address,
                phone: phone,
              }}
            >
              {name.length >= 3 && name.length <= 14 && address.length >= 3 && address.length <= 30 && cart.length !== 0 && !/\D/.test(phone) && <ButtonCheckout>Proceed to Checkout</ButtonCheckout>}
            </Link>
            {!(name.length >= 3 && name.length <= 14 && address.length >= 3 && address.length <= 30 && cart.length !== 0 && !/\D/.test(phone)) && (
              <ButtonFill
                // disabled
                onClick={() => ContainerNotification(name, phone, address)}
              >
                Please fill all fields
              </ButtonFill>
            )}
            <NotificationContainer />
            {name.length >= 3 && name.length <= 14 && address.length >= 3 && address.length <= 30 && !/\D/.test(phone) && <ButtonMultiple>Checkout with Multiple Address</ButtonMultiple>}
          </Col>
        </Row>
      </ContainerStyled>
      <Footer />
    </div>
  );
};
const Title = styled.div`
  font-size: 30px;
  font-weight: 600;
  letter-spacing: 1px;
  margin-bottom: 15px;
`;
const ListItem = styled.ul`
  overflow-y: scroll;
  max-height: 500px;
  overflow-x: hidden;
`;
const Line = styled.hr`
  /* margin-top: 10px; */
  margin-bottom: 10px;
  width: 100%;
  height: 1px;
  background-color: #cacdd8;
  border-radius: 10%;
`;
const ContainerInput = styled.div`
  background-color: #c5d0ff;
  margin-bottom: 10px;
`;
const NameInput = styled.div`
  font-weight: 600;
  margin-bottom: 10px;
`;
const Input = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 5px;
  border: solid #cccccc 1px;
  padding-left: 2%;
`;

const ContainerSummary = {
  backgroundColor: "#C5D0FF",
  // backgroundColor: "red",
  borderRadius: "10px",
  // boxShadow: "-5px 5px #444444",
};
const Ship = styled.span`
  font-weight: 600;
  margin-bottom: 10px;
  padding-right: 20px;
`;
const ValueShip = styled.span`
  font-weight: 600;
`;
const ButtonCheckout = styled.button`
  border-radius: 20px;
  background-color: #0156ff;
  color: #ffffff;
  font-weight: 600;
  display: block;
  height: 40px;
  width: 100%;
  border: none;
  transition: all 0.5s;
  :hover,
  :active {
    background-color: #0043c8;
  }
  margin-bottom: 20px;
  cursor: pointer;
  :disabled {
    background-color: #444444;
  }
`;
const ButtonMultiple = styled.button`
  border-radius: 20px;
  background-color: #ffb800;
  color: #ffffff;
  font-weight: 600;
  display: block;
  height: 40px;
  width: 100%;
  border: none;
  transition: all 0.5s;
  :hover,
  :active {
    background-color: #c0ac7b;
  }
  margin-bottom: 10px;
  cursor: pointer;
`;
const ButtonFill = styled.button`
  border-radius: 20px;
  background-color: #aaaaaa;
  /* color: #FFFFFF; */
  font-weight: 600;
  display: block;
  height: 40px;
  width: 100%;
  border: none;
  transition: all 0.5s;
  :hover,
  :active {
    background-color: #666666;
  }
  margin-bottom: 10px;
  cursor: pointer;
`;
const LinkStyle = {
  textDecoration: "none",
};
const ContainerStyled = styled(Container)`
  margin-top: 40px;
`;
const CloseResponesive = styled(Col)`
  @media (max-width: 480px) {
    display: none;
  }
`;
const NoItemInCart = styled.h2`
  font-style: italic;
  font-size: 30px;
  text-align: center;
  margin-top: 30px;
`;
export default Cart;

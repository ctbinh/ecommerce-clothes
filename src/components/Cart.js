import styled from "styled-components";
import { Container, Row, Col } from "react-grid-system";
import { NotificationManager } from "react-notifications";
import { redirect } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import React, { useState, useEffect } from "react";
import "react-notifications/lib/notifications.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-confirm-alert/src/react-confirm-alert.css";
import CartItem from "./CartItem";
import InputAddress from "./InputAddress";
import { useContext } from "react";
import CartContext from "./CartContext";
import dateFormat from "dateformat";
import CryptoJS from "crypto-js";
import {Buffer} from 'buffer';

const token = "9891ae72-415a-11ed-8636-7617f3863de9";
const shopId = "3307734";
const Cart = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState({});
  const [couponCode, setCouponCode] = useState("");

  // const [cart, setCart] = useState([]);
  const cart = useContext(CartContext);
  const { items, setItems } = cart;
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
      case "orderSuccess":
        NotificationManager.success("Order successfully", "Success", 2000);
        break;
      default:
        break;
    }
  };

  const removeItem = async (e, id) => {
    e.preventDefault();
    const res = await axios.delete(`${process.env.REACT_APP_URL_SERVER}/api/cart/${id}`, { withCredentials: true });
    setItems(items.filter((item) => item.id !== res.data));
  };
  const clearInfo = () => {
    setName("");
    setPhone("");
    setAddress({});
    setCouponCode("");
    cart.setItems([]);
    cart.setTargetService("");
  };
  const updateItem = async (item, body) => {
    const { quantity } = body;
    if (quantity > 0) {
      const data = { itemId: item.id, quantity };
      const res = await axios.put(`${process.env.REACT_APP_URL_SERVER}/api/cart`, data, { withCredentials: true });
      setItems(
        items.map((item) => {
          if (item.id !== res.data) {
            return item;
          } else {
            item.quantity = quantity;
            return item;
          }
        })
      );
    }
  };
  const payment_vnpay = () => {
    var ipAddr = 1;

    var tmnCode = process.env.REACT_APP_TMN_CODE;
    var secretKey = process.env.REACT_APP_HASH_SECRET;
    var vnpUrl = process.env.REACT_APP_URL;
    var returnUrl = process.env.REACT_APP_RETURN_URL;

    var date = new Date();

    var createDate = dateFormat(date, "yyyymmddHHmmss");
    var orderId = dateFormat(date, "HHmmss");
    var amount = 100000;
    var bankCode = "";

    var orderInfo = "Thanh toan don hang thoi gian: " + dateFormat(date, "yyyy-mm-dd HH:mm:ss");
    // var orderType = "topup";
    var locale = "vn";
    if (locale === null || locale === "") {
      locale = "vn";
    }
    var currCode = "VND";
    var vnp_Params = {};
    vnp_Params["vnp_Version"] = "2.1.0";
    vnp_Params["vnp_Command"] = "pay";
    vnp_Params["vnp_TmnCode"] = tmnCode;
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params["vnp_Locale"] = locale;
    vnp_Params["vnp_CurrCode"] = currCode;
    vnp_Params["vnp_TxnRef"] = orderId;
    vnp_Params["vnp_OrderInfo"] = orderInfo;
    // vnp_Params["vnp_OrderType"] = orderType;
    vnp_Params["vnp_Amount"] = amount * 100;
    vnp_Params["vnp_ReturnUrl"] = returnUrl;
    vnp_Params["vnp_IpAddr"] = ipAddr;
    vnp_Params["vnp_CreateDate"] = createDate;
    // vnp_Params["vnp_SecureHashType"] = "HmacSHA512";
    if (bankCode !== null && bankCode !== "") {
      vnp_Params["vnp_BankCode"] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    var querystring = require("qs");
    var signData = querystring.stringify(vnp_Params, { encode: false });
    // var crypto = require("crypto");
    // var hmac = createHmac("sha512", secretKey);
    // var signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");

    var signed = CryptoJS.HmacSHA512(Buffer.from(signData, 'utf-8').toString(), secretKey).toString();

    // const hashDigest = signData;
    // const hmacDigest = Base64.stringify(hmacSHA512(hashDigest, secretKey));
    vnp_Params["vnp_SecureHash"] = signed;
    vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });
    console.log(vnpUrl);
    window.open(vnpUrl);
  };

  const sortObject = (obj) => {
    var sorted = {};
    var str = [];
    var key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        str.push(encodeURIComponent(key));
      }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
      sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
  };
  const order = async () => {
    const _address = address.street + ", " + address.ward + ", " + address.district + ", " + address.province;
    // const paymentMethod = cart.targetService.short_name
    const dataGHN = await axios({
      method: "POST",
      url: "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/create",
      headers: {
        Token: token,
        ShopId: shopId,
      },
      data: {
        payment_type_id: 2,
        required_note: "KHONGCHOXEMHANG",
        return_phone: null,
        return_address: "",
        return_district_id: null,
        return_ward_code: null,
        client_order_code: null,
        to_name: `${name}`,
        to_phone: `${phone}`,
        to_address: `${cart.targetWard.WardName}, ${cart.targetDistrict.DistrictName}, ${cart.targetProvince.ProvinceName}`,
        to_ward_code: `${cart.targetWard.WardCode}`,
        to_district_id: cart.targetDistrict.DistrictID,
        cod_amount: cart.items.reduce((total, item) => Math.round(total + item.price * item.quantity), 0),
        content: "Shop MU",
        weight: 1,
        length: 1,
        width: 1,
        height: 1,
        pick_station_id: cart.targetDistrict.DistrictID,
        deliver_station_id: null,
        insurance_value: cart.items.reduce((total, item) => Math.round(total + item.price * item.quantity), 0),
        service_id: cart.targetService.service_id,
        service_type_id: cart.targetService.service_type_id,
        coupon: null,
        pick_shift: [2],
        items: cart.items,
      },
    });
    const data = {
      address: _address,
      phone,
      paymentMethod: "DIRECTLY",
      favourCode: couponCode,
      order_code_ghn: dataGHN.data.data.order_code,
      ship_cost: dataGHN.data.data.total_fee,
    };
    const res = await axios.post(`${process.env.REACT_APP_URL_SERVER}/api/orders`, data, { withCredentials: true });
    if (res.status === 200 && dataGHN.data.code === 200) {
      createNotification("orderSuccess");
      clearInfo();
      navigate("/");
    }
  };
  useEffect(() => {
    const fetchCart = async () => {
      const res = await axios.get(`${process.env.REACT_APP_URL_SERVER}/api/cart`, { withCredentials: true });
      setItems(res.data);
    };
    fetchCart();
  }, [setItems]);
  const ContainerNotification = (name, phone, address) => {
    if (items.length === 0) {
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
              {items?.map((item) => {
                return <CartItem item={item} removeItem={removeItem} updateItem={updateItem} />;
              })}
            </ListItem>
          </Col>
          <Col xl={4} style={ContainerSummary}>
            <Title>Summary</Title>
            <ContainerInput>
              <NameInput>Name</NameInput>
              <Input type="text" placeholder="Your name" onChange={(e) => setName(e.target.value)} />
            </ContainerInput>
            <ContainerInput>
              <NameInput>Phone Number</NameInput>
              <Input type="text" placeholder="Your phone number" onChange={(e) => setPhone(e.target.value)} />
            </ContainerInput>
            <InputAddress address={address} setAddress={setAddress} setCouponCode={setCouponCode} />
            <br />
            <div
              style={LinkStyle}
              state={{
                name: name,
                address: address,
                phone: phone,
              }}
            >
              {name?.length >= 3 &&
                name?.length <= 14 &&
                address.hasOwnProperty("province") &&
                address.hasOwnProperty("district") &&
                address.hasOwnProperty("ward") &&
                address.hasOwnProperty("street") &&
                cart.items?.length !== 0 &&
                cart.targetService?.short_name?.length > 0 &&
                !/\D/.test(phone) && <ButtonCheckout onClick={order}>Order now</ButtonCheckout>}
            </div>
            {!(
              name?.length >= 3 &&
              name?.length <= 14 &&
              address.hasOwnProperty("province") &&
              address.hasOwnProperty("district") &&
              address.hasOwnProperty("ward") &&
              address.hasOwnProperty("street") &&
              cart.items?.length !== 0 &&
              cart.targetService?.short_name?.length > 0 &&
              !/\D/.test(phone)
            ) && (
              <ButtonFill
                // disabled
                onClick={() => ContainerNotification(name, phone, address)}
              >
                Please fill all fields
              </ButtonFill>
            )}
          </Col>
        </Row>
        <button onClick={payment_vnpay}>test</button>
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

const ContainerInput = styled.div`
  margin-bottom: 10px;
`;
const NameInput = styled.div`
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 14px;
`;
const Input = styled.input`
  width: 100%;
  height: 30px;
  border-radius: 5px;
  border: solid #cccccc 1px;
  padding-left: 2%;
`;

const ContainerSummary = {
  borderRadius: "5px",
  border: "1px solid #b4b4b4",
  height: "fit-content",
};
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

export default Cart;

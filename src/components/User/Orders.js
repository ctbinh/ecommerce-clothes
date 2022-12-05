import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import swal from "sweetalert";

const token = "9891ae72-415a-11ed-8636-7617f3863de9";
const shopId = "3307734";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [targetTypeOrders, setTargetTypeOrders] = useState("PENDING");
  const filterOrders = (status) => {
    setTargetTypeOrders(status);
    fetchOrders(status)
  };
  const cancelOrders = async (order) => {
    const data = {
      orderId: order.id,
    };
    const res = await axios.put(`${process.env.REACT_APP_URL_SERVER}/api/orders/cancel`, data, { withCredentials: true });
    const dataGHN = await axios({
      method: "POST",
      url: "https://online-gateway.ghn.vn/shiip/public-api/v2/switch-status/cancel",
      headers: {
        Token: token,
        ShopId: shopId,
      },
      data: {
        order_codes: [order.order_code_ghn],
      },
    });
    if (res.statusText === "OK" && dataGHN.data.code === 200) {
      swal("Completely!", "Cancel orders success", "success");
      setTargetTypeOrders('CANCELED')
    } else {
      alert("ko ok");
    }
  };
  const fetchOrders = async (status) => {
    const res = await axios.get(`${process.env.REACT_APP_URL_SERVER}/api/orders`, { params: { status }, withCredentials: true });
    setOrders(res.data);
  };
  const IsSure = (order) => {
    confirmAlert({
      title: "Are you sure !!!",
      // message: 'Are you sure to delete !!!',
      buttons: [
        {
          label: "Yes",
          onClick: () => cancelOrders(order),
        },
        {
          label: "No",
          onClick: () => console.log("Ignore delete all product"),
        },
      ],
    });
  };
  useEffect(() => {
    fetchOrders(targetTypeOrders);
  }, [targetTypeOrders]);

  return (
    <Container>
      <NavOrders>
        <TypeOrders className={targetTypeOrders === "" ? "active" : ""} onClick={() => filterOrders("")}>
          All
        </TypeOrders>
        <TypeOrders className={targetTypeOrders === "PENDING" ? "active" : ""} onClick={() => filterOrders("PENDING")}>
          Pending
        </TypeOrders>
        <TypeOrders className={targetTypeOrders === "ACCEPTED" ? "active" : ""} onClick={() => filterOrders("ACCEPTED")}>
          Accepted
        </TypeOrders>
        <TypeOrders className={targetTypeOrders === "DELIVERING" ? "active" : ""} onClick={() => filterOrders("DELIVERING")}>
          Delivering
        </TypeOrders>
        <TypeOrders className={targetTypeOrders === "DELIVERED" ? "active" : ""} onClick={() => filterOrders("DELIVERED")}>
          Delivered
        </TypeOrders>
        <TypeOrders className={targetTypeOrders === "CANCELED" ? "active" : ""} onClick={() => filterOrders("CANCELED")}>
          Cancelled
        </TypeOrders>
      </NavOrders>
      <Hr color="#b8b8b8" />
        {orders?.map((ord, idx) => {
          return (
            <Order key={idx}>
              {ord.items.map((item, idx) => {
                return (
                  <Item key={idx}>
                    <Image>
                      <img src={item.coverImageUrl} alt="item" style={{ width: "auto", height: "100%" }} />
                    </Image>
                    <Detail>
                      <Name>{item.name}</Name>
                      <Desc>{item.description}</Desc>
                      <Price>${item.price}</Price>
                      <Qty>x{item.quantity}</Qty>
                      <Price fw="bold">${item.price * item.quantity}</Price>
                    </Detail>
                  </Item>
                );
              })}
              <Text style={{ textAlign: "right" }}>Delivery cost: ${ord.ship_cost ?? 2}</Text>
              <Hr />
              <Total>
                <Text className="time">Date: {new Date(ord.date).toLocaleString()}</Text>
                <Text className="total">Total: ${Math.round((ord.price + (ord.ship_cost ?? 2)) * 100) / 100}</Text>
              </Total>
              {targetTypeOrders === "PENDING" && (
                <div style={{ textAlign: "right" }} onClick={() => IsSure(ord)}>
                  <CancelBtn>Cancel</CancelBtn>
                </div>
              )}
            </Order>
          );
        })}
    </Container>
  );
};

const CancelBtn = styled.button`
  width: 100px;
  background-color: white;
  border-color: gray;
  color: gray;
  border-width: 1px;
  border-radius: 5px;
`;
const Text = styled.p`
  margin: 0px;
  font-size: 14px;
`;
const Name = styled.div`
  width: 100%;
  font-weight: bold;
  font-size: 14px;
  @media (max-width: 480px) {
    font-size: 16px;
    font-weight: 400;
  }
`;
const Detail = styled.div`
  width: 85%;
  box-sizing: border-box;
  padding-left: 10px;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
`;
const Total = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .time {
    color: gray;
  }
  .total {
    font-weight: bold;
    font-size: 18px;
    @media (max-width: 480px) {
      font-size: 16px;
    }
  }
`;
const Qty = styled.div`
  width: 50px;
  text-align: center;
  background-color: #f5f7ff;
  height: fit-content;
  margin: 0 auto;
  padding: 10px 0;
  border-radius: 5px;
  color: gray;
  font-size: 13px;
`;
const Price = styled.span`
  font-weight: ${(props) => (props.fw ? props.fw : "")};
  flex: 1;
  padding-top: 10px;
  font-size: 14px;
  text-align: ${(props) => (props.fw ? "right" : "center")};
  color: gray;
  @media (max-width: 480px) {
    text-align: ${(props) => (props.fw ? "right" : "left")};
  }
`;
const Desc = styled.span`
  width: 35%;
  height: 80%;
  overflow: hidden;
  padding-top: 10px;
  font-size: 13px;
  @media (max-width: 480px) {
    display: none;
  }
`;
const Image = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 15%;
`;
const Item = styled.div`
  display: flex;
  flex-direction: row;
  height: 120px;
  width: 100%;
  margin-bottom: 5px;

  @media (max-width: 768px) {
    height: 100px;
  }
  @media (max-width: 480px) {
    height: 80px;
  }
`;
const Order = styled.div`
  margin-top: 10px;
  padding: 10px;
  width: 100%;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;
const TypeOrders = styled.div`
  color: gray;
  text-align: center;
  padding: 5px 10px;
  width: 150px;
  cursor: pointer;
  &.active {
    border-bottom: 4px solid #0156ff;
  }
`;
const NavOrders = styled.div`
  display: flex;
  flex-direction: row;
  overflow: scroll;
  width: 100%;
  &::-webkit-scrollbar {
    height: 5px;
    display: none;
  }
  /* Track */
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: gray;
    border-radius: 3px;
  }
  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #757575;
  }
`;
const Hr = styled.hr`
  border: 0;
  height: 0.2px;
  margin: 0px;
  background-image: -webkit-linear-gradient(gray, gray, gray);
`;
const Container = styled.div`
  padding: 0;
  width: 100%;
`;

export default Orders;

import { Rating } from "@mui/material";
import React from "react";
import styled from "styled-components";
import Button from "../Button";
import { grey } from "@mui/material/colors";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import { useNavigate } from "react-router-dom";

const Product = (props) => {
  let navigate = useNavigate();
  const addToWishlist = (e) => {
    alert("Đã thêm vào wish list của bạn");
  };

  const product = props.product;
  return (
    <Container
      key={props.idx}
      display={props.display}
      onClick={() => navigate("/stores/" + product.id)}
    >
      <Image display={props.display}>
        <img
          src={product.brandUrl}
          style={{ height: "100%", width: "100%", objectFit: "contain" }}
          alt="laptop"
        />
      </Image>

      <div className="detail">
        <Name display={props.display}>{product.name}</Name>
      </div>
    </Container>
  );
};


const Name = styled.div`
  font-size: 20px;
  font-weight: 500;
  /* height: ${(props) => (props.display ? "30px" : "40px")}; */
  overflow: hidden;
`;
const Image = styled.div`
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  max-height: 300px;
  border-radius: 10px;
  margin-bottom: 20px;
  border: 1px solid rgba(0, 0, 0, 0.09);
  transition: all ease-in-out 0.3s;
  :hover {
    cursor: pointer;
    transform: scale(1.05);
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }
  .detail {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;
export default Product;

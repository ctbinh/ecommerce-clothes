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
      {/* {product.amount > 0 ?
        <Status display={props.display}>
          <i className="fa fa-check-circle" aria-hidden="true"></i> in stock
        </Status> : <Status display={props.display} color="#cf2115">
          <i className="fa fa-check-circle" aria-hidden="true"></i> out of stock
        </Status>} */}
      <Image display={props.display}>
        <img
          src={product.brandUrl}
          style={{ height: "100%", width: "100%" }}
          alt="laptop"
        />
      </Image>

      <div className="detail">
        <Name display={props.display}>{product.name}</Name>
      </div>
    </Container>
  );
};

const Text = styled.span`
  margin: 0;
  padding: 0;
`;

const ComboBtn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const Desc = styled.span`
  width: 100%;
  font-size: 13px;
  max-height: 100px;
  overflow: hidden;
`;
// const Box = styled.div`
//   display: flex;
//   flex-direction: ${(props) => (props.display === 0 ? "column" : "row")};
//   .detail {
//     display: flex;
//     flex-direction: column;
//     justify-content: space-between;
//     padding: 0 5px;
//   }
// `;
const Name = styled.div`
  font-size: 20px;
  font-weight: 500;
  /* height: ${(props) => (props.display ? "30px" : "40px")}; */
  overflow: hidden;
`;
// const Rate = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: space-between;
//   padding: ${props=>props.display?'0 10px':''};
// `

// const Status = styled.div`
//   text-align: ${props => props.display === 0 ? 'left' : 'right'};
//   color: ${props => props.color ? props.color : '#78A962'};
//   font-size: 13px;
// `
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
  /* margin: 5px; */
  max-height: 300px;
  margin-bottom: 20px;
  border: 1px solid rgba(0, 0, 0, 0.09);
  :hover {
    cursor: pointer;
  }
  .detail {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  /* @media (max-width: 1080px) {
    width: ${(props) => (props.display === 0 ? "32%" : "100%")};
  }
  @media (max-width: 768px) {
    width: ${(props) => (props.display === 0 ? "49%" : "100%")};
  }
  @media (max-width: 480px) {
    width: ${(props) => (props.display === 0 ? "100%" : "100%")};
  } */
`;
export default Product;

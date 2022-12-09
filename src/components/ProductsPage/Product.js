import React from "react";
import styled from "styled-components";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

const Product = (props) => {
  let navigate = useNavigate();
  const targetProduct = (id) => {
    navigate("/detail/" + id);
  };

  const product = props.product;
  return (
    <Container key={props.idx} display={props.display} onClick={() => targetProduct(product.id)}>
      <Box display={props.display}>
        <div>
          <Image display={props.display}>
            <img src={product.coverImageUrl} style={{ maxHeight: "100%" }} alt="coverimage" />
          </Image>
        </div>
        <div className="detail">
          <Name display={props.display}>{product.name}</Name>
          {props.display === 1 && <Desc>{product.description}</Desc>}
          <Box display={props.display}>
            <Text style={{ fontSize: "18px", fontWeight: "600" }}>{product.currentPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "đ"}</Text>
          </Box>
          {props.display === 1 && (
            <ComboBtn>
              <Button text="Add to cart" type="primary sm" />
            </ComboBtn>
          )}
        </div>
      </Box>
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
const Box = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.display === 1 ? "row" : "column")};
  .detail {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 5px;
  }
`;
const Name = styled.div`
  font-size: 14px;
  font-weight: 400;
  /* height: ${(props) => (props.display ? "30px" : "40px")}; */
  overflow: hidden;
`;
const Image = styled.div`
  width: ${(props) => (props.display === 1 ? "200px" : "auto")};
  height: ${(props) => (props.display === 1 ? "250px" : "220px")};
  display: flex;
  flex-direction: column;
  img {
    border-radius: 10px;
  }
  align-items: center;
  overflow: hidden;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.display === 0 ? "24%" : "100%")};
  max-height: 300px;
  margin-bottom: 5px;
  transition: all ease-in 0.3s, width ease-in-out 1s;
  :hover {
    cursor: pointer;
    transform: scale(1.05);
  }
  @media (max-width: 1080px) {
    width: ${(props) => (props.display === 0 ? "32%" : "100%")};
  }
  @media (max-width: 768px) {
    width: ${(props) => (props.display === 0 ? "49%" : "100%")};
  }
  @media (max-width: 480px) {
    width: ${(props) => (props.display === 0 ? "100%" : "100%")};
  }
`;
export default Product;

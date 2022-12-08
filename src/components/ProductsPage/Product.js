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
  flex-direction: ${(props) => (props.display === 0 ? "column" : "row")};
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
  width: ${(props) => (props.display === 0 ? "auto" : "200px")};
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid transparent;
  /* padding: 10px; */
  width: ${(props) => (props.display === 0 ? "24%" : "100%")};
  max-height: 300px;
  margin-bottom: 5px;
  box-shadow: ${(props) => (props.display === 1 ? "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" : "rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;")};
  :hover {
    cursor: pointer;
    border: 1px solid gray;
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

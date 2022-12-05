import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../Header";
import Footer from "../Footer";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { BiStore } from "react-icons/bi";
import { SlUserFollow } from "react-icons/sl";
import { BsChatRightDots } from "react-icons/bs";
import { MdOutlineCancelPresentation } from "react-icons/md";
import { AiOutlineUsergroupAdd, AiOutlineStar } from "react-icons/ai";
import { GrAdd } from "react-icons/gr";
import { HiOutlineChatAlt2 } from "react-icons/hi";

let data = [];
const UploadDesign = (props) => {
  let navigate = useNavigate();
  const idProduct = useParams();
  const [num, setNum] = useState(20);
  const [currPage, setcurrPage] = useState(1);
  const [store, setStore] = useState({});
  const [detail, setdetail] = useState({
    id: 1,
    name: "Rick & Morty T-shirt",
    name_detail: "See our top-picks for jean jackets that are oversized, distressed, and downright cool.",
    img_cover: "https://cf.shopee.vn/file/520da097555edc0f286bb11b08eff168",
  });
  const [countPage, setcountPage] = useState(0);
  const [filteredProducts, setfilteredProducts] = useState([]);
  const [isFirst, setIsFirst] = useState(true);
  const getProductPerPage = (products) => {
    const indexLast = currPage * num;
    const indexFirst = indexLast - num;
    setdetail(products.slice(indexFirst, indexLast));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      if (isFirst) {
        const res = await axios.post(
          `${process.env.REACT_APP_URL_SERVER}/api/stores/${idProduct.id}/products`,
          {
            pageNumber: 1,
            numOfItemsPerPage: 10,
            filter: null,
            order: {
              order: "asc",
              criterion: "NONE",
            },
            fromDate: "11/17/2022",
          },
          { withCredentials: true }
        );
        setStore(res.data);
      }
    };
    fetchProducts();
    setIsFirst(false);
  }, [currPage, num, filteredProducts, isFirst, idProduct]);

  return (
    <>
      <Header setfilteredProducts={setfilteredProducts} getProductPerPage={getProductPerPage} setcountPage={setcountPage} num={num} data={data} setcurrPage={setcurrPage} />
      <Container>
      <Description>
            <Overview>
              <Background id={idProduct.id}></Background>
              <Mask></Mask>
              <LogoContainer>
                <Portrait>
                  <LogoImg>
                    <img src={store?.brandUrl} style={{ height: "100%", width: "100%" }} alt="" />
                  </LogoImg>
                  <PortraitInfo>
                    <h1>{store?.name}</h1>
                  </PortraitInfo>
                </Portrait>
                <OverviewButtons>
                  <OverviewBtn>
                    <GrAdd />
                    Theo dõi
                  </OverviewBtn>
                  <OverviewBtn>
                    <HiOutlineChatAlt2 />
                    Chat
                  </OverviewBtn>
                </OverviewButtons>
              </LogoContainer>
            </Overview>
            <StoreDes>
              <StoreItem>
                <BiStore />
                <ItemTitle>Sản phẩm:</ItemTitle>
                <ItemContent>10</ItemContent>
              </StoreItem>
              <StoreItem>
                <SlUserFollow />
                <ItemTitle>Theo dõi:</ItemTitle>
                <ItemContent>112</ItemContent>
              </StoreItem>
              <StoreItem>
                <BsChatRightDots />
                <ItemTitle>Tỉ lệ phản hồi chat:</ItemTitle>
                <ItemContent>99% (Trong vài giờ)</ItemContent>
              </StoreItem>
              <StoreItem>
                <MdOutlineCancelPresentation />
                <ItemTitle>Tỉ lệ shop hủy đơn:</ItemTitle>
                <ItemContent>5%</ItemContent>
              </StoreItem>
              <StoreItem>
                <AiOutlineUsergroupAdd />
                <ItemTitle>Người theo dõi:</ItemTitle>
                <ItemContent>200</ItemContent>
              </StoreItem>
              <StoreItem>
                <AiOutlineStar />
                <ItemTitle>Đánh giá:</ItemTitle>
                <ItemContent>4.9 (388 đánh giá)</ItemContent>
              </StoreItem>
              {/* <StoreName> {detail?.name} </StoreName>
            <StoreNameDetail> {detail.description} </StoreNameDetail> */}
            </StoreDes>
            <SendDesign>
              <BackToShop onClick={() => navigate("/stores/" + idProduct.id)}>BACK TO SHOP</BackToShop>
            </SendDesign>
          </Description>
        <Upload>
          <UploadContainer>
            <UploadIcon className="fa fa-upload"></UploadIcon>
            <UploadImage></UploadImage>
          </UploadContainer>
          <InfoForm>
            <Info type="text" placeholder="Number of product"></Info>
            <Info type="text" placeholder="Fullname"></Info>
            <Info type="text" placeholder="Email"></Info>
            <Info type="text" placeholder="Phone number"></Info>
            <SendButton>SEND</SendButton>
          </InfoForm>
        </Upload>
      </Container>
      <Footer />
    </>
  );
};

const Info = styled.input`
  height: 50px;
  width: 300px;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #979797;
  margin: 10px 0;
  padding: 15px;
  border: 1px solid #e1e1e1;
`;

const InfoForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
`;

const UploadImage = styled.div`
  background-color: #aeaeae;
  height: 100%;
  width: 80%;
`;

const UploadIcon = styled.i`
  position: absolute;
  font-size: 50px;
  color: #000;
`;

const UploadContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 350px;
  width: 60%;
  cursor: pointer;
`;

const Upload = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: auto;
  padding: 10px 20px;
`;



const Container = styled.div`
  width: 80%;
  margin: 35px auto;
  @media (max-width: 1024px) {
    width: 100%;
    margin: 0;
  }
`;

const SendButton = styled.button`
  width: 250px;
  padding: 10px 0;
  background-color: #000;
  color: #fff;
  margin-top: 20px;
`;

const BackToShop = styled.button`
  height: 70px;
  width: 250px;
  background-color: #fff;
  color: #000;
  border: 1px solid #000;
`;

const SendDesign = styled.div`
  display: flex;
  align-items: center;
`;


const OverviewBtn = styled.button`
  background: none;
  flex: 1;
  margin-right: 0.625rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.5625rem;
  color: #fff;
  border: 1px solid #ffffff;
  border-radius: 2px;
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.3125rem 0;
  box-sizing: border-box;
  svg {
    stroke: white;
    margin-right: 0.625rem;
    path {
      stroke: white;
    }
  }
`;

const OverviewButtons = styled.div`
  display: flex;
  margin-top: 0.625rem;
`;

const ItemTitle = styled.span`
  text-transform: capitalize;
  margin-left: 10px;
`;

const ItemContent = styled.span`
  color: #d0011b;
  margin-left: 5px;
`;

const StoreItem = styled.div`
  display: flex;
  align-items: center;
  padding-right: 20px;
  padding-top: 0.625rem;
  padding-bottom: 0.625rem;
  flex: none;
`;

const StoreDes = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column wrap;
  padding-left: 1.875rem;
  background-color: #fff;
  align-items: flex-start;
`;

const PortraitInfo = styled.div`
  margin-top: 0.625rem;
  margin-left: 0.625rem;
  h1 {
    font-size: 1.25rem;
    line-height: 1.5rem;
    max-height: 3rem;
    font-weight: 500;
    margin-bottom: 0.3125rem;
    margin-top: 0;
    word-wrap: break-word;
    overflow: hidden;
    color: #ffffff;
    text-overflow: ellipsis;
  }
`;

const ActiveTime = styled.div`
  font-size: 0.75rem;
  color: #c2c2ab;
  margin: 0.3125rem 0 0.375rem;
`;

const LogoImg = styled.div`
  cursor: pointer;
  height: 5rem;
  width: 5rem;
  border: 4px solid #7f7f7f;
  position: relative;
  border-radius: 50%;

  img {
    border-radius: 50%;
  }
`;

const Portrait = styled.div`
  display: flex;
`;

const LogoContainer = styled.div`
  position: absolute;
  top: 0.625rem;
  left: 1.25rem;
  right: 0.875rem;
  bottom: 0.625rem;
`;

const Overview = styled.div`
  position: relative;
  height: 134px;
  width: 30%;
  border-radius: 4px;
  overflow: hidden;
`;

const Background = styled.div((props) => ({
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundImage: `url(https://cdn.wallpapersafari.com/44/76/uFGm4K.jpg)`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  margin: "-4px",
}));

const Mask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
`;

const Description = styled.div`
  display: flex;
  flex-direction: row;
  height: 160px;
  width: 100%;
  margin: 10px;
  border-bottom: 1px solid #000;
`;


export default UploadDesign;

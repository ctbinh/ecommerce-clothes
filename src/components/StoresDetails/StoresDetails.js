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

const dataStores = [
  {
    id: 0,
    name: "Adidas Official Store",
    status: "Hoạt động 25 phút trước",
    img_avatar: "https://cf.shopee.vn/file/c918d19742ff2a678ea12bd3ab0aff8c_tn",
    img_bg: "https://cf.shopee.vn/file/85ddd9f53cae25d021b75aef97debaf2_tn",
    number_products: "12,5K",
    following: "7",
    follower: "827,5K",
    answer_rate: "99%",
    cancel_order_rate: "1%",
    quality_rate: "4.8 (56,6K đánh giá)",
  },
  {
    id: 1,
    name: "Elipsport Official Store",
    status: "Hoạt động 2 giờ trước",
    img_avatar: "https://cf.shopee.vn/file/c04c459bb131213f92c1275277f76e15_tn",
    img_bg: "https://cf.shopee.vn/file/7379e93f5f39561a170d717bbc2ff727_tn",
    number_products: "33",
    following: "1",
    follower: "3,4K",
    answer_rate: "44%",
    cancel_order_rate: "1%",
    quality_rate: "4.8 (75 đánh giá)",
  },
  {
    id: 2,
    name: "KAMITO OFFICIAL STORE",
    status: "Hoạt động 19 phút trước",
    img_avatar: "https://cf.shopee.vn/file/6305f04847280f728ae3c6420d8e77b3_tn",
    img_bg: "	https://cf.shopee.vn/file/bdefe6f029e453c6aa95b09191633071_tn",
    number_products: "132",
    following: "94",
    follower: "95,3K",
    answer_rate: "88%",
    cancel_order_rate: "1%",
    quality_rate: "4.9 (3,8k đánh giá)",
  },
  {
    id: 3,
    name: "kingdomfishing.vn",
    status: "Hoạt động 10 phút trước",
    img_avatar: "https://cf.shopee.vn/file/39459c3cc79a5c79e6e0a18d41293c01_tn",
    img_bg: "	https://cf.shopee.vn/file/13cdaa071d5046fd6585d42359bb7859_tn",
    number_products: "207",
    following: "1",
    follower: "3,4K",
    answer_rate: "93%",
    cancel_order_rate: "1%",
    quality_rate: "4.9 (4k đánh giá)",
  },
  {
    id: 4,
    name: "Lining Official Store",
    status: "Hoạt động 2 giờ trước",
    img_avatar: "	https://cf.shopee.vn/file/ed9b77504c69cf03d26db0adf9b8d8c0_tn",
    img_bg: "https://cf.shopee.vn/file/8c3e3a475837917c297373300ab543ed_tn",
    number_products: "2,5k",
    following: "17",
    follower: "42,9K",
    answer_rate: "62%",
    cancel_order_rate: "1%",
    quality_rate: "4.8 (3,1k đánh giá)",
  },
  {
    id: 5,
    name: "Macat",
    status: "Hoạt động 8 giờ trước",
    img_avatar: "	https://cf.shopee.vn/file/75df9c7916bb447903365825b49c5624_tn",
    img_bg: "	https://cf.shopee.vn/file/3f2b08d73bb5fa9fd4298a90b28ca154_tn",
    number_products: "81",
    following: "4",
    follower: "1,2K",
    answer_rate: "59%",
    cancel_order_rate: "1%",
    quality_rate: "4.9 (541 đánh giá)",
  },
  {
    id: 6,
    name: "PRAZA - Official Store",
    status: "Hoạt động 2 giờ trước",
    img_avatar: "https://cf.shopee.vn/file/7a73e5d47426070dc6b7b27f4df982c2_tn",
    img_bg: "	https://cf.shopee.vn/file/82d8af9ff91a28efcc8c3504c66fc28a_tn",
    number_products: "440",
    following: "12",
    follower: "190k",
    answer_rate: "82%",
    cancel_order_rate: "1%",
    quality_rate: "4.8 (87,9k đánh giá)",
  },
  {
    id: 7,
    name: "Sport1.vn",
    status: "Hoạt động 8 phút trước",
    img_avatar: "https://cf.shopee.vn/file/ad38d6cbd0c4027f0bd7375c90ca2e9f_tn",
    img_bg: "	https://cf.shopee.vn/file/1f3d9ed658c673910cd80f4646391e13_tn",
    number_products: "167",
    following: "6",
    follower: "5,7k",
    answer_rate: "76%",
    cancel_order_rate: "1%",
    quality_rate: "4.9 (388 đánh giá)",
  },
  {
    id: 8,
    name: "Heybro",
    status: "Hoạt động 2 giờ trước",
    img_avatar: "https://cf.shopee.vn/file/3516cab804d01f98cd79837a4a2ec698_tn",
    img_bg: "https://cf.shopee.vn/file/3516cab804d01f98cd79837a4a2ec698_tn",
    number_products: "163",
    following: "2,1k",
    follower: "53,8K",
    answer_rate: "99%",
    cancel_order_rate: "1%",
    quality_rate: "4.9 (24,8k đánh giá)",
  },
  {
    id: 9,
    name: "ImaGodBreaker iGB- Local Brand",
    status: "Hoạt động 2 giờ trước",
    img_avatar: "	https://cf.shopee.vn/file/6c121ca5a930ccc451645358ef41ce89_tn",
    img_bg: "	https://cf.shopee.vn/file/2b20786e92d125a1bc61a042cea3e24c_tn",
    number_products: "98",
    following: "0",
    follower: "39,7K",
    answer_rate: "90%",
    cancel_order_rate: "1%",
    quality_rate: "4.9 (1,8k đánh giá)",
  },
];

const StoresDetails = (props) => {
  let navigate = useNavigate();
  const idProduct = useParams();

  const [num, setNum] = useState(20);
  const [currPage, setcurrPage] = useState(1);
  const [detail, setdetail] = useState(dataStores[idProduct.id]);
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
        const res = await axios.get(
          "http://localhost/ecommerce/backend/api/product/read.php"
        );
        data = res.data.data.filter((p) => p.isDisabled === 0);
        setcountPage(Math.ceil(data.length / num));
        setfilteredProducts(data);
      }
      const indexLast = currPage * num;
      const indexFirst = indexLast - num;
      const pds = filteredProducts.slice(indexFirst, indexLast);
      // setproducts(pds);
    };
    fetchProducts();
    setIsFirst(false);
  }, [currPage, num, filteredProducts, isFirst]);

  return (
    <>
      <Header
        setfilteredProducts={setfilteredProducts}
        getProductPerPage={getProductPerPage}
        setcountPage={setcountPage}
        num={num}
        data={data}
        setcurrPage={setcurrPage}
      />
      <div className="container">
        <Container>
          <Description>
            <Overview>
              <Background id={idProduct.id}></Background>
              <Mask></Mask>
              <LogoContainer>
                <Portrait>
                  <LogoImg>
                    <img
                      src={detail.img_avatar}
                      style={{ height: "100%", width: "100%" }}
                      alt=""
                    />
                  </LogoImg>
                  <PortraitInfo>
                    <h1>{detail.name}</h1>
                    <ActiveTime>{detail.status}</ActiveTime>
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
              {/* <img
              src={detail.img_cover}
              style={{ height: "100%", width: "100%" }}
              alt=""
            /> */}
            </Overview>
            <StoreDes>
              <StoreItem>
                <BiStore />
                <ItemTitle>Sản phẩm:</ItemTitle>
                <ItemContent>{detail.number_products}</ItemContent>
              </StoreItem>
              <StoreItem>
                <SlUserFollow />
                <ItemTitle>Theo dõi:</ItemTitle>
                <ItemContent>{detail.following}</ItemContent>
              </StoreItem>
              <StoreItem>
                <BsChatRightDots />
                <ItemTitle>Tỉ lệ phản hồi chat:</ItemTitle>
                <ItemContent>{detail.answer_rate} (Trong vài giờ)</ItemContent>
              </StoreItem>
              <StoreItem>
                <MdOutlineCancelPresentation />
                <ItemTitle>Tỉ lệ shop hủy đơn:</ItemTitle>
                <ItemContent>{detail.cancel_order_rate}</ItemContent>
              </StoreItem>
              <StoreItem>
                <AiOutlineUsergroupAdd />
                <ItemTitle>Người theo dõi:</ItemTitle>
                <ItemContent>{detail.follower}</ItemContent>
              </StoreItem>
              <StoreItem>
                <AiOutlineStar />
                <ItemTitle>Đánh giá:</ItemTitle>
                <ItemContent>{detail.quality_rate}</ItemContent>
              </StoreItem>
              {/* <StoreName> {detail.name} </StoreName>
            <StoreNameDetail> {detail.name_detail} </StoreNameDetail> */}
            </StoreDes>
            <SendDesign>
              <SendButton
                onClick={() => navigate("/stores/" + detail.id + "/design")}
              >
                SEND DESIGN
              </SendButton>
            </SendDesign>
          </Description>
        </Container>
      </div>
      <Footer />
    </>
  );
};

const SendButton = styled.button`
  height: 70px;
  width: 250px;
  background-color: #000;
  color: #fff;
`;

const SendDesign = styled.div`
  display: flex;
  align-items: center;
`;

const StoreNameDetail = styled.p`
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: #b6b6b6;
`;

const StoreName = styled.p`
  font-weight: 700;
  font-size: 24px;
  line-height: 22px;
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
  backgroundImage: `url(${dataStores[props.id].img_bg})`,
  backgroundPosition: "50%",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  filter: "blur(2px)",
  margin: "-4px",
}));

const Mask = styled.div`
position: absolute;
top: 0;
left: 0;
bottom: 0;
right: 0;
background-color: rgba(0,0,0,.6);
}
`;

const Description = styled.div`
  display: flex;
  flex-direction: row;
  height: 160px;
  width: 100%;
  margin: 10px;
  border-bottom: 1px solid #000;
`;

const Container = styled.div`
  margin: 35px auto;
  @media (max-width: 1024px) {
    width: 100%;
    margin: 0;
  }
`;

export default StoresDetails;

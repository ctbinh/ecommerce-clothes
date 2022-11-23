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
import { useCallback } from "react";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import Product from "../ProductsPage/Product";
import Filter from "../ProductsPage/Filter";
import ReorderIcon from "@mui/icons-material/Reorder";
import { FormControl, InputLabel, MenuItem, Pagination, Select } from "@mui/material";
import AppsIcon from "@mui/icons-material/Apps";

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
  const [show, setShow] = useState(false);
  const [num, setNum] = useState(20);
  const [store, setstore] = useState({});
  const colors = [
    {
      id: 0,
      code: "#ff0000",
    },
    {
      id: 1,
      code: "#fff700",
    },
    {
      id: 2,
      code: "#ffcb94",
    },
    {
      id: 3,
      code: "#cf811b",
    },
    {
      id: 4,
      code: "#058fff",
    },
    {
      id: 5,
      code: "#03d603",
    },
    {
      id: 6,
      code: "#4c6b17",
    },
    {
      id: 7,
      code: "#000000",
    },
    {
      id: 8,
      code: "#ffffff",
    },
    {
      id: 9,
      code: "#cfcbcf",
    },
    {
      id: 10,
      code: "#d10bd1",
    },
  ];
  const [numPerPage, setNumPerPage] = useState(10);
  const [display, setDisplay] = useState(0);
  const [currPage, setcurrPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [countPage, setcountPage] = useState(5);
  const [filteredProducts, setfilteredProducts] = useState([]);
  const [isFirst, setIsFirst] = useState(true);
  const [value, setValue] = useState([0, 500]);
  const [sizeFilter, setSizeFilter] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [colorTarget, setColorTarget] = useState("");
  const changePage = (event, value) => {
    setcurrPage(value);
    fetchProducts("", { payload: null, page: value, numPerPage: numPerPage });
  };
  const changeDisplay = (value) => {
    setDisplay(value);
  };
  const changeNumPerPage = (event) => {
    setcurrPage(1);
    setNumPerPage(event.target.value);
    fetchProducts("", { numPerPage: event.target.value, page: 1 });
  };
  const getProductPerPage = (products) => {
    const indexLast = currPage * numPerPage;
    const indexFirst = indexLast - numPerPage;
    setProducts(products.slice(indexFirst, indexLast));
  };
  const applyFilter = () => {
    fetchProducts("", { payload: null });
  };
  const clearFilter = () => {
    fetchProducts("clear", {});
  };
  const targetProduct = (id) => {
    navigate("/detail/" + id);
  };
  const fetchProducts = async (action, params) => {
    const res = await axios.post(`http://localhost:8082/api/stores/${idProduct.id}/products`, getBodyFilter(action, params), { withCredentials: true });
    data = res.data.products;
    setfilteredProducts(data);
    setProducts(data);
    setstore(res.data);
  };
  const getBodyFilter = useCallback(
    (action, params) => {
      const color = params.color;
      const _page = params.page ?? currPage;
      const _numPerPage = params.numPerPage ?? numPerPage;
      data = {
        pageNumber: _page,
        numOfItemsPerPage: _numPerPage,
        filter: {
          priceRange: {
            from: value[0],
            to: value[1],
          },
        },
        order: {
          order: "asc",
          criterion: "NONE",
        },
        fromDate: "11/17/2022",
      };
      if (action === "clear") {
        setValue([0, 500]);
        setCategoryFilter([]);
        setSizeFilter([]);
        setColorTarget("");
        data.filter = null;
      } else if (action === "filter_color") {
        if (color !== "") {
          data.filter.color = color;
        }
      } else {
        if (sizeFilter.length > 0) {
          data.filter.size = sizeFilter;
        }
        if (categoryFilter.length > 0) {
          data.filter.genders = categoryFilter;
        }
        if (colorTarget !== "") {
          data.filter.color = colorTarget;
        }
      }
      return data;
    },
    [categoryFilter, colorTarget, sizeFilter, value, currPage, numPerPage]
  );
  useEffect(() => {
    const fetchProducts = async () => {
      if (isFirst) {
        const res = await axios.post(`http://localhost:8082/api/stores/${idProduct.id}/products`, getBodyFilter("", { page: 1, numPerPage }), { withCredentials: true });
        data = res.data.products;
        setfilteredProducts(res.data.products);
        setstore(res.data);
        setProducts(data);
      }
    };
    fetchProducts();
    setIsFirst(false);
  }, [currPage, num, filteredProducts, isFirst, idProduct, getBodyFilter, numPerPage]);

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
            <SendButton onClick={() => navigate("/stores/" + idProduct.id + "/design")}>SEND DESIGN</SendButton>
          </SendDesign>
        </Description>
        <Content>
          <BoxFilter show={show}>
            <Filter
              colors={colors}
              value={value}
              setValue={setValue}
              sizeFilter={sizeFilter}
              setSizeFilter={setSizeFilter}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              colorTarget={colorTarget}
              setColorTarget={setColorTarget}
              setShow={setShow}
              applyFilter={applyFilter}
              fetchProducts={fetchProducts}
              clearFilter={clearFilter}
              show={show}
            />
          </BoxFilter>
          <Products>
            <Row>
              <div></div>
              <DisplayOption>
                <div className="option">
                  <FormControl sx={{ m: 1 }} size="small">
                    <InputLabel id="show">Show</InputLabel>
                    <Select labelId="show" id="show" value={numPerPage} label="Show" style={{ borderRadius: "0" }} onChange={changeNumPerPage}>
                      <MenuItem value={10}>10 per page</MenuItem>
                      <MenuItem value={20}>20 per page</MenuItem>
                      <MenuItem value={30}>30 per page</MenuItem>
                      <MenuItem value={40}>40 per page</MenuItem>
                      <MenuItem value={50}>50 per page</MenuItem>
                    </Select>
                  </FormControl>
                  <Icon onClick={() => changeDisplay(0)}>
                    <AppsIcon />
                  </Icon>
                  <Icon onClick={() => changeDisplay(1)}>
                    <ReorderIcon />
                  </Icon>
                </div>
                <div className="filter" onClick={() => setShow(1)}>
                  <Icon>
                    <FilterAltOutlinedIcon />
                  </Icon>
                  <span>Filter</span>
                </div>
              </DisplayOption>
            </Row>
            <Pd>
              {products.map((product, idx) => {
                return <Product key={idx} idx={idx} display={display} product={product} onClick={targetProduct} />;
              })}
            </Pd>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                margin: "20px 0",
              }}
            >
              <Pagination count={countPage} color="primary" onChange={changePage} page={currPage} />
            </div>
          </Products>
        </Content>
      </Container>

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

const Container = styled.div`
  margin: 35px auto;
  width: 80%;
  @media (max-width: 1024px) {
    width: 70%;
    margin: 0;
  }
`;

const Pd = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1%;
`;
const BoxFilter = styled.div`
  width: 20%;
  margin-top: 56px;
  @media (max-width: 768px) {
    left: ${(props) => (props.show ? "0" : "-100%")};
    top: 0;
    width: 80%;
    height: 100vh;
    background-color: white;
    position: fixed;
    transition: all 0.5s ease;
    z-index: 999;
    margin-top: 0;
    box-shadow: ${(props) => (props.show ? "rgba(0, 0, 0, 0.4) 0px 30px 90px" : "")};
  }
`;
const Icon = styled.div`
  :hover {
    cursor: pointer;
  }
  margin: 0 5px;
`;
const DisplayOption = styled.div`
  & .option {
    display: flex;
    flex-direction: row;
    align-items: center;
    @media (max-width: 768px) {
      display: none;
    }
  }
  & .filter {
    display: none;
    @media (max-width: 768px) {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-right: 10px;
      margin-bottom: 10px;
    }
  }
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
`;
const Products = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  margin-left: 5px;
  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;
  }
`;

export default StoresDetails;

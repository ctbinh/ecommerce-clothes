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
  const [countPage, setcountPage] = useState(1);
  const [filteredProducts, setfilteredProducts] = useState([]);
  const [isFirst, setIsFirst] = useState(true);
  const [value, setValue] = useState([0, 3000000]);
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
    const res = await axios.post(`${process.env.REACT_APP_URL_SERVER}/api/stores/${idProduct.id}/products`, getBodyFilter(action, params), { withCredentials: true });
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
        setValue([0, 3000000]);
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
        const res = await axios.post(`${process.env.REACT_APP_URL_SERVER}/api/stores/${idProduct.id}/products`, getBodyFilter("", { page: 1, numPerPage }), { withCredentials: true });
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

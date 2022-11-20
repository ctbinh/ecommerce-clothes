import { FormControl, InputLabel, MenuItem, Pagination, Select } from "@mui/material";
import AppsIcon from "@mui/icons-material/Apps";
import ReorderIcon from "@mui/icons-material/Reorder";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../Header";
import Footer from "../Footer";
import Filter from "./Filter";
import Product from "./Product";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import { useCallback } from "react";

let data = [];
const ProductsPage = (props) => {
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
  let navigate = useNavigate();
  const [show, setShow] = useState(0);
  const [numPerPage, setNumPerPage] = useState(10);
  const [display, setDisplay] = useState(0);
  const [currPage, setcurrPage] = useState(1);
  const [products, setproducts] = useState([]);
  const [countPage, setcountPage] = useState(5);
  const [filteredProducts, setfilteredProducts] = useState([]);
  const [isFirst, setIsFirst] = useState(true);
  const [value, setValue] = useState([0, 500]);
  const [sizeFilter, setSizeFilter] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [colorTarget, setColorTarget] = useState("");
  const changePage = (event, value) => {
    setcurrPage(value);
    fetchProducts("", {payload: null, page: value, numPerPage: numPerPage});
  };
  const changeDisplay = (value) => {
    setDisplay(value);
  };
  const changeNumPerPage = (event) => {
    setcurrPage(1);
    setNumPerPage(event.target.value);
    fetchProducts("", {numPerPage: event.target.value, page: 1});
    // setcountPage(Math.ceil(filteredProducts.length / event.target.value));
  };
  const getProductPerPage = (products) => {
    const indexLast = currPage * numPerPage;
    const indexFirst = indexLast - numPerPage;
    setproducts(products.slice(indexFirst, indexLast));
  };
  const applyFilter = () => {
    fetchProducts("", {payload: null});
  };
  const clearFilter = () => {
    fetchProducts("clear", {});
  };
  const targetProduct = (id) => {
    navigate("/detail/" + id);
  };
  const fetchProducts = async (action, params) => {
    const res = await axios.post("http://localhost:8082/api/products", getBodyFilter(action, params), { withCredentials: true });
    data = res.data;
    // setcountPage(Math.ceil(data.length / num));
    setfilteredProducts(data);
    setproducts(data);
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
          criterion: "asc",
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
        const res = await axios.post("http://localhost:8082/api/products", getBodyFilter("", {page: 1, numPerPage}), { withCredentials: true });
        data = res.data;
        setfilteredProducts(data);
      }
      setproducts(filteredProducts);
    };
    fetchProducts();
    setIsFirst(false);
  }, [filteredProducts, isFirst, getBodyFilter, numPerPage]);

  return (
    <>
      <Header setfilteredProducts={setfilteredProducts} getProductPerPage={getProductPerPage} setcountPage={setcountPage} num={numPerPage} data={data} setcurrPage={setcurrPage} />
      <Container>
        <Carousel>
          <Carousel.Item style={{ width: "100%", height: "100%" }}>
            <Poster src="https://www.uniformhouse.com/images/Custom/banner1.jpg" alt="poster" />
          </Carousel.Item>
          <Carousel.Item style={{ width: "100%", height: "100%" }}>
            <Poster src="http://www.e-khadigarments.com/images/banner6.png" alt="poster" />
          </Carousel.Item>
          <Carousel.Item style={{ width: "100%", height: "100%" }}>
            <Poster src="https://az777500.vo.msecnd.net/images/2134/banner-store-quality-products-uniforms.jpg" alt="poster" />
          </Carousel.Item>
        </Carousel>
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

// const Brand = styled.img`
//   background-color: white;
//   width: 120px;
//   height: 60px;
//   padding: 0px 10px;
//   margin: 10px 5px 0px 5px;
//   box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
//     rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
//   :hover {
//     cursor: pointer;
//     box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
//   }
//   @media (max-width: 1024px) {
//     width: 100px;
//     padding: 0px 5px;
//   }
//   @media (max-width: 768px) {
//     width: 95px;
//   }
// `;

// const Brands = styled.div`
//   margin: 10px 0;
//   padding-bottom: 10px;
//   display: flex;
//   flex-direction: row;
//   border: 1px solid #e5e5e5;
//   border-width: 2px 0 2px 0;
//   display: flex;
//   /* justify-content: space-between; */
//   flex-wrap: wrap;
// `;

const Poster = styled.img`
  height: 350px;
  @media (max-width: 1024px) {
    height: 200px;
  }
  @media (max-width: 768px) {
    height: 100px;
  }
`;

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  @media (max-width: 1024px) {
    width: 100%;
    margin: 0;
  }
`;

export default ProductsPage;

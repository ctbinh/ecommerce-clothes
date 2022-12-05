import React from "react";
import Footer from "../Footer";
import Header from "../Header";
// import uniform from "../images/unifo";
import images from "../images";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Product from "../ProductsPage/Product";
import styled from "styled-components";

const Home = () => {
  const [isFirst, setIsFirst] = useState(true);
  let navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const onChange = (newValue) => {
    fetchProducts(newValue);
    setTargetTab(newValue);
  };
  const [targetTab, setTargetTab] = useState("NEW_ARRIVAL");

  const navigation = useNavigate();
  const fetchProducts = async (tab) => {
    const res = await axios.post(
      `${process.env.REACT_APP_URL_SERVER}/api/products`,
      {
        pageNumber: 1,
        numOfItemsPerPage: 10,
        filter: null,
        order: {
          order: "asc",
          criterion: tab,
        },
        fromDate: "11/17/2022",
      },
      { withCredentials: true }
    );
    setProducts(res.data.slice(0, 3));
  };
  useEffect(() => {
    const fetchProducts = async () => {
      if (isFirst) {
        const res = await axios.post(
          `${process.env.REACT_APP_URL_SERVER}/api/products`,
          {
            pageNumber: 1,
            numOfItemsPerPage: 10,
            filter: null,
            order: {
              order: "asc",
              criterion: targetTab,
            },
            fromDate: "11/17/2022",
          },
          { withCredentials: true }
        );
        setProducts(res.data);
      }
    };
    fetchProducts();
    setIsFirst(false);
  }, [isFirst, products]);

  const targetProduct = (id) => {
    navigate("/detail/" + id);
  };

  return (
    <div>
      <Header />
      {/* Change background image in line 19 */}
      <div className="bg-landing-background bg-cover h-[600px] ">
        <div className="flex backdrop-brightness-75 flex-col h-[600px] justify-center items-center text-white">
          <h1 className="text-[15px]">NEW COLLECTION</h1>
          <h1 className="text-[40px]">FIND YOUR</h1>
          <h1 className="text-[70px]">PERFECT</h1>
          <p className="mt-3">Uncompromising in style, quality and perfomance</p>
          <button
            onClick={() => {
              navigation("/products?category=FOOTBALL");
            }}
            className="mt-3 px-[10px] py-[15px] bg-white text-black"
          >
            SHOP THE COLLECTION
          </button>
        </div>
      </div>
      <div className="bg-black grid  grid-cols-3 px-[200px] gap-[30px]">
        <div className="translate-y-[-30%] flex flex-col justify-center items-center text-white">
          <img src={images.football} className="relative" alt="football"></img>
          <button
            onClick={() => {
              navigation("/products?category=FOOTBALL");
            }}
            className="px-[7px] py-[10px] bg-white text-black absolute top-[0%] translate-y-[480%]"
          >
            SHOP THE COLLECTION
          </button>
          <h1 className="text-[20px] font-bold mt-[10px]">FOOTBALL</h1>
          <p className="mt-[15px] text-center">See our top-picks for jean jackets that are oversized,distressed and downright cool.</p>
        </div>

        <div className="translate-y-[-30%] flex flex-col justify-center items-center text-white">
          <img src={images.uniform} className="relative" alt="uniform"></img>
          <button
            onClick={() => {
              navigation("/products?category=UNIFORM");
            }}
            className="px-[7px] py-[10px] bg-white text-black absolute top-[0%] translate-y-[480%]"
          >
            SHOP THE COLLECTION
          </button>
          <h1 className="text-[20px] font-bold mt-[10px]">UNIFORM</h1>
          <p className="mt-[15px] text-center">See our top-picks for jean jackets that are oversized,distressed and downright cool.</p>
        </div>

        <div className="translate-y-[-30%] flex flex-col justify-center items-center text-white">
          <img src={images.image2} className="relative"></img>
          <button
            onClick={() => {
              navigation("/products?category=OTHER");
            }}
            className="px-[7px] py-[10px] bg-white text-black absolute top-[0%] translate-y-[480%]"
          >
            SHOP THE COLLECTION
          </button>
          <h1 className="text-[20px] font-bold mt-[10px]">OTHER</h1>
          <p className="mt-[15px] text-center">See our top-picks for jean jackets that are oversized,distressed and downright cool.</p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center w-full">
        <h1 className="text-[20px] mt-[8px] font-semibold">GOT HAVE IT</h1>
        <Tabs defaultActiveKey="home" className="mt-[10px]" activeKey={targetTab} onSelect={(k) => onChange(k)}>
          <Tab eventKey="NEW_ARRIVAL" title="New Arrivals">
            <Pd>
              {products.map((product, idx) => {
                return <Product key={idx} idx={idx} display={0} product={product} />;
              })}
            </Pd>
          </Tab>
          <Tab eventKey="NONE" title="Best Seller">
            <Pd>
              {products.map((product, idx) => {
                return <Product key={idx} idx={idx} display={0} product={product} />;
              })}
            </Pd>
          </Tab>
          <Tab eventKey="ON_SALE" title="On Sale">
            <Pd>
              {products.map((product, idx) => {
                return <Product key={idx} idx={idx} display={0} product={product} />;
              })}
            </Pd>
          </Tab>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};
const Pd = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1%;
`;
export default Home;

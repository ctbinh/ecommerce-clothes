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
import Coupon from "./Coupon";

const Home = () => {
  const [isFirst, setIsFirst] = useState(true);
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
    setProducts(res.data.slice(0, 5));
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
        setProducts(res.data.slice(0, 5));
      }
    };
    fetchProducts();
    setIsFirst(false);
  }, [isFirst, products, targetTab]);

  return (
    <div>
      <Header />
      {/* Change background image in line 19 */}
      <div className="h-[600px] bg-landing-background bg-cover ">
        <div className="flex h-[600px] flex-col items-center justify-center text-white backdrop-brightness-75">
          <h1 className="text-[15px]">NEW COLLECTION</h1>
          <h1 className="text-[40px]">FIND YOUR</h1>
          <h1 className="text-[70px]">PERFECT</h1>
          <p className="mt-3">Uncompromising in style, quality and perfomance</p>
          <button
            onClick={() => {
              navigation("/products?category=FOOTBALL");
            }}
            className="mt-3 rounded-lg bg-white px-[10px] py-[15px] text-black"
          >
            SHOP THE COLLECTION
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3  gap-[30px] bg-black px-[200px]">
        <div className="flex translate-y-[-30%] flex-col items-center justify-center text-white transition duration-700 ease-in-out hover:scale-105">
          <img src={images.football} className="relative rounded-2xl" alt="football"></img>
          <button
            onClick={() => {
              navigation("/products?category=FOOTBALL");
            }}
            className="absolute top-[0%] translate-y-[480%] rounded-lg bg-white px-[15px] py-[10px] text-black"
          >
            SHOP THE COLLECTION
          </button>
          <h1 className="mt-[10px] text-[20px] font-bold">FOOTBALL</h1>
          <p className="mt-[15px] text-center">See our top-picks for jean jackets that are oversized,distressed and downright cool.</p>
        </div>

        <div className="flex translate-y-[-30%] flex-col items-center justify-center text-white transition duration-700 ease-in-out hover:scale-105">
          <img src={images.uniform} className="relative rounded-2xl" alt="uniform"></img>
          <button
            onClick={() => {
              navigation("/products?category=UNIFORM");
            }}
            className="absolute top-[0%] translate-y-[480%] rounded-lg bg-white px-[15px] py-[10px] text-black"
          >
            SHOP THE COLLECTION
          </button>
          <h1 className="mt-[10px] text-[20px] font-bold">UNIFORM</h1>
          <p className="mt-[15px] text-center">See our top-picks for jean jackets that are oversized,distressed and downright cool.</p>
        </div>

        <div className="flex translate-y-[-30%] flex-col items-center justify-center text-white transition duration-700 ease-in-out hover:scale-105">
          <img src={images.image2} className="relative rounded-2xl" alt="img"></img>
          <button
            onClick={() => {
              navigation("/products?category=OTHER");
            }}
            className="absolute top-[0%] translate-y-[480%] rounded-lg bg-white px-[15px] py-[10px] text-black"
          >
            SHOP THE COLLECTION
          </button>
          <h1 className="mt-[10px] text-[20px] font-bold">OTHER</h1>
          <p className="mt-[15px] text-center">See our top-picks for jean jackets that are oversized,distressed and downright cool.</p>
        </div>
      </div>
      <div class="flex flex-col items-center justify-center gap-4 divide-y">
        <div className="flex w-full flex-col items-center justify-center">
          <Tabs defaultActiveKey="home" className="my-[10px]" activeKey={targetTab} onSelect={(k) => onChange(k)}>
            <Tab eventKey="NEW_ARRIVAL" title="New Arrivals">
              <div className="flex w-full flex-row gap-4">
                {products.map((product, idx) => {
                  return <Product key={idx} idx={idx} display={3} product={product} />;
                })}
              </div>
            </Tab>
            <Tab eventKey="NONE" title="Best Seller">
              <div className="flex w-full flex-row gap-4">
                {products.map((product, idx) => {
                  return <Product key={idx} idx={idx} display={3} product={product} />;
                })}
              </div>
            </Tab>
            <Tab eventKey="ON_SALE" title="On Sale">
              <div className="flex w-full flex-row gap-4">
                {products.map((product, idx) => {
                  return <Product key={idx} idx={idx} display={3} product={product} />;
                })}
              </div>
            </Tab>
          </Tabs>
        </div>
        <div className="grid w-9/12 grid-cols-3 gap-1 pt-4">
          <Coupon />
          <Coupon />
          <Coupon />
          <Coupon />
          <Coupon />
        </div>
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

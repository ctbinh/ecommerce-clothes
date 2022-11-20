import React from "react";
import Footer from "../Footer";
import Header from "../Header";
import image2 from "../images/image2.png";
import image3 from "../images/image3.png";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const navigation = useNavigate();

  return (
    <div>
      <Header />
      {/* Change background image in line 19 */}
      <div className="bg-landing-background bg-cover h-[600px] ">
        <div  className="flex backdrop-brightness-75 flex-col h-[600px] justify-center items-center text-white">
          <h1 className="text-[15px]">NEW COLLECTION</h1>
          <h1 className="text-[40px]">FIND YOUR</h1>
          <h1 className="text-[70px]">PERFECT</h1>
          <p className="mt-3">Uncompromising in style, quality and perfomance</p>
          <button
            onClick={() => {
              navigation("/products");
            }}
            className="mt-3 px-[10px] py-[15px] bg-white text-black"
          >
            SHOP THE COLLECTION
          </button>
        </div>
      </div>
      <div className="bg-black grid  grid-cols-3 px-[200px] gap-[30px]">
        <div className="translate-y-[-30%] flex flex-col justify-center items-center text-white">
          <img src={image2} className="relative"></img>
          <button
            onClick={() => {
              navigation("/products");
            }}
            className="px-[7px] py-[10px] bg-white text-black absolute top-[0%] translate-y-[480%]"
          >
            SHOP THE COLLECTION
          </button>
          <h1 className="text-[20px] font-bold mt-[10px]">UNIFORM</h1>
          <p className="mt-[15px]">See our top-picks for jean jackets that are oversized,distressed and downright cool.</p>
        </div>

        <div className="translate-y-[-30%] flex flex-col justify-center items-center text-white">
          <img src={image2} className="relative"></img>
          <button
            onClick={() => {
              navigation("/products");
            }}
            className="px-[7px] py-[10px] bg-white text-black absolute top-[0%] translate-y-[480%]"
          >
            SHOP THE COLLECTION
          </button>
          <h1 className="text-[20px] font-bold mt-[10px]">UNIFORM</h1>
          <p className="mt-[15px]">See our top-picks for jean jackets that are oversized,distressed and downright cool.</p>
        </div>

        <div className="translate-y-[-30%] flex flex-col justify-center items-center text-white">
          <img src={image2} className="relative"></img>
          <button
            onClick={() => {
              navigation("/products");
            }}
            className="px-[7px] py-[10px] bg-white text-black absolute top-[0%] translate-y-[480%]"
          >
            SHOP THE COLLECTION
          </button>
          <h1 className="text-[20px] font-bold mt-[10px]">UNIFORM</h1>
          <p className="mt-[15px]">See our top-picks for jean jackets that are oversized,distressed and downright cool.</p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <h1 className="text-[20px] mt-[8px] font-semibold">GOT HAVE IT</h1>
        <Tabs defaultActiveKey="home" className="mt-[10px]">
          <Tab eventKey="home" title="New Arrivals">
            <div className="grid grid-cols-4 px-[180px] gap-[5px] mt-[10px]">
              <div>
                <img src={image3}></img>
                <p>Rick & Morty T-shirt</p>
                <p>$10</p>
              </div>

              <div>
                <img src={image3}></img>
                <p>Rick & Morty T-shirt</p>
                <p>$10</p>
              </div>

              <div>
                <img src={image3}></img>
                <p>Rick & Morty T-shirt</p>
                <p>$10</p>
              </div>

              <div>
                <img src={image3}></img>
                <p>Rick & Morty T-shirt</p>
                <p>$10</p>
              </div>
            </div>
          </Tab>
          <Tab eventKey="profile" title="Best Seller">
            <div className="grid grid-cols-4 px-[180px] gap-[5px] mt-[10px]">
              <div>
                <img src={image3}></img>
                <p>Rick & Morty T-shirt</p>
                <p>$9</p>
              </div>

              <div>
                <img src={image3}></img>
                <p>Rick & Morty T-shirt</p>
                <p>$9</p>
              </div>

              <div>
                <img src={image3}></img>
                <p>Rick & Morty T-shirt</p>
                <p>$9</p>
              </div>

              <div>
                <img src={image3}></img>
                <p>Rick & Morty T-shirt</p>
                <p>$9</p>
              </div>
            </div>
          </Tab>
          <Tab eventKey="contact" title="On Sale">
            <div className="grid grid-cols-4 px-[180px] gap-[5px] mt-[10px]">
              <div>
                <img src={image3}></img>
                <p>Rick & Morty T-shirt</p>
                <p>$8</p>
              </div>

              <div>
                <img src={image3}></img>
                <p>Rick & Morty T-shirt</p>
                <p>$8</p>
              </div>

              <div>
                <img src={image3}></img>
                <p>Rick & Morty T-shirt</p>
                <p>$8</p>
              </div>

              <div>
                <img src={image3}></img>
                <p>Rick & Morty T-shirt</p>
                <p>$8</p>
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default Home;

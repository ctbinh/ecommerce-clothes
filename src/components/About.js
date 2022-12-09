import styled from "styled-components";
import React from 'react';
import Header from "./Header";
import Footer from "./Footer";
import images from "./images";
import { Link } from "react-router-dom";

const backgroundImageStyle = {
  backgroundImage: `url("${images.mountain}")`,
  backgroundSize: "cover",
};

const About = () => {
  return (
    <>
      <Header></Header>
      <AboutPage>
        <div className=" text-white " style={backgroundImageStyle}>
          <div className="bg-gradient-to-r from-black px-8 py-16">
            <div className=" max-w-5xl grid grid-cols-1 gap-8">
              <div className="w-12">
                <img src={images.logo1} className="fill-white" alt="" />
              </div>
              <h2 className="text-xl uppercase font-bold">
                Become a consumer{" "}
              </h2>
              <h1 className="text-6xl font-bold">
                Smart shopping, Saving shopping
              </h1>
              <p className="text-lg">
                Junifo is the leading e-commerce platform about clothes in
                Southeast Asia. Come make history with us.
              </p>
              <Link to="/" className="hover:text-white">
                <button className="bg-black py-3 px-6 text-lg rounded-md w-48 hover:scale-105 transition-all ease-in-out duration-500">
                  Start the journey
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="px-8 py-16">
          <div className="w-full mb-16 text-center">
            <h2 className="text-5xl">
              Your next chapter, made possible with Junifo
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-20 text-slate-600">
            <div className="shadow-md p-6 text-center">
              <h3 className="text-2xl font-bold mb-2">Our target</h3>
              <p className="text-lg">
                We believe in the evolving power of technology and wish to
                contribute to making the world a better place by connecting the
                community of buyers and sellers through providing an e-commerce
                platform.
              </p>
            </div>

            <div className="shadow-md p-6 text-center">
              <h3 className="text-2xl font-bold mb-2">Our Positioning</h3>
              <p className="text-lg">
                For users across the region, Junifo offers an integrated online
                shopping experience with a wide range of products, a dynamic
                user community, and a seamless service chain.
              </p>
            </div>

            <div className="col-span-2 justify-self-center text-center shadow-md p-6">
              <h3 className="text-2xl font-bold mb-2 justify-center">
                Characteristics of our people
              </h3>
              <p className="text-lg">
                To define who we are - through words or behavior in many
                different cases - we are, in essence, Close, Happy, and Agreed.
                These are the main and outstanding features in each step of
                Junifo's development.
              </p>
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <div className="my-4 h-80">
                    <img
                      src="https://img.freepik.com/free-vector/young-people-giving-high-five-illustrations-set_23-2148373642.jpg?w=2000"
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Friendly</h3>
                  <p className=" mb-2">
                    We believe in closeness and integrity, a solid foundation
                    for an honest, affordable and true life.
                  </p>
                </div>
                <div>
                  <div className="my-4 h-80">
                    <img
                      src="https://deo.shopeemobile.com/shopee/shopee-careers-live-vn/assets/img/Illustration_2_1.4599c77f.png"
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Happy</h3>
                  <p className=" mb-2">
                    We are approachable, lovable and energetic, always bringing
                    joy to those around us.
                  </p>
                </div>
                <div>
                  <div className="my-4 h-80">
                    <img
                      src="https://deo.shopeemobile.com/shopee/shopee-careers-live-vn/assets/img/Illustration_3_1.277cccfb.png"
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Consensus</h3>
                  <p className=" mb-2">
                    We love spending time together just like enjoying online
                    shopping with family and friends - doing the things we love
                    together as one big family.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-2 justify-self-center text-center w-2/3">
              <h3 className="text-2xl font-bold mb-2 justify-center">
                Our offices
              </h3>
              <div className="grid grid-cols-6 gap-12 mt-4">
                <div>
                  <div className="w-full h-28 mb-2 flex items-end">
                    <img
                      src="https://img.sp.mms.shopee.sg/file/61c552238b11124437f7287fd2b88e5b"
                      className="w-full object-cover"
                      alt=""
                    />
                  </div>
                  <p className="mb-2 font-semibold">Brazil</p>
                </div>
                <div>
                  <div className="w-full h-28 mb-2 flex items-end">
                    <img
                      src="https://img.sp.mms.shopee.sg/file/156fba87b148a8f3614299c7e2534f48"
                      className="w-full object-cover"
                      alt=""
                    />
                  </div>
                  <p className="mb-2 font-semibold">China</p>
                </div>{" "}
                <div>
                  <div className="w-full h-28 mb-2 flex items-end">
                    <img
                      src="https://img.sp.mms.shopee.sg/file/4a1bd49588d0b40d9a720a20bcf129cb"
                      className="w-full  object-cover"
                      alt=""
                    />
                  </div>
                  <p className="mb-2 font-semibold">Indonesia</p>
                </div>{" "}
                <div>
                  <div className="w-full h-28 mb-2 flex items-end">
                    <img
                      src="https://img.sp.mms.shopee.sg/file/831516803b75b60e0efd07088b870139"
                      className="w-full object-cover"
                      alt=""
                    />
                  </div>
                  <p className="mb-2 font-semibold">Việt Nam</p>
                </div>{" "}
                <div>
                  <div className="w-full h-28 mb-2 flex items-end">
                    <img
                      src="https://img.sp.mms.shopee.sg/file/89a15b5f0e8cf1a85291f7aed08e3a9d"
                      className="w-full object-cover"
                      alt=""
                    />
                  </div>
                  <p className="mb-2 font-semibold">Korea</p>
                </div>{" "}
                <div>
                  <div className="w-full h-28 mb-2 flex items-end">
                    <img
                      src="https://img.sp.mms.shopee.sg/file/50b2b6655ce944c5d1b865d1d09c3202"
                      className="w-full object-cover"
                      alt=""
                    />
                  </div>
                  <p className="mb-2 font-semibold">Thailand</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AboutPage>
      <Footer></Footer>
    </>
  );
};

const AboutPage = styled.div`
  width: 100%;
  margin: 0 auto 40px auto;
`;

export default About;

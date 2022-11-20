import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import Review from "./Review";

const DetailProduct = () => {
  let { product_id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const addToCart = async (e, productId) => {
    e.preventDefault()
    const data = { productId, quantity: quantity, color: selectedColor, size: selectedSize };
    const res = await axios.post("http://localhost:8082/api/cart", data, { withCredentials: true });
    console.log(res);
  };
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get(`http://localhost:8082/api/products/${product_id}`, { withCredentials: true });
      console.log(res.data);
      setProduct(res.data);
    };
    fetchProduct();
  }, [product_id]);

  return (
    <div>
      <Header />
      <div class="bg-white">
        <div class="pt-6">
          <div class="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <div class="aspect-w-3 aspect-h-4 hidden overflow-hidden rounded-lg lg:block">
              <img
                src={product?.imageUrls[0] ?? "https://cdn2.macpaw.com/images/products/cleanmymac-x/intro-x-main.svg?id=8eeeece88a09dc6ef9b4279c38683889"}
                alt="Two each of gray, white, and black shirts laying flat."
                class="h-full w-full object-cover object-center"
              />
            </div>
            <div class="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
              <div class="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
                <img
                  src={product?.imageUrls[1] ?? "https://cdn2.macpaw.com/images/products/cleanmymac-x/intro-x-main.svg?id=8eeeece88a09dc6ef9b4279c38683889"}
                  alt="Model wearing plain black basic tee."
                  class="h-full w-full object-cover object-center"
                />
              </div>
              <div class="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
                <img
                  src={product?.imageUrls[2] ?? "https://cdn2.macpaw.com/images/products/cleanmymac-x/intro-x-main.svg?id=8eeeece88a09dc6ef9b4279c38683889"}
                  alt="Model wearing plain gray basic tee."
                  class="h-full w-full object-cover object-center"
                />
              </div>
            </div>
            <div class="aspect-w-4 aspect-h-5 sm:overflow-hidden sm:rounded-lg lg:aspect-w-3 lg:aspect-h-4">
              <img
                src={product?.imageUrls[3] ?? "https://cdn2.macpaw.com/images/products/cleanmymac-x/intro-x-main.svg?id=8eeeece88a09dc6ef9b4279c38683889"}
                alt="Model wearing plain white basic tee."
                class="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          <div class="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
            <div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product?.name}</h1>
            </div>

            <div class="mt-4 lg:row-span-3 lg:mt-0">
              <h2 class="sr-only">Product information</h2>
              <p class="text-3xl tracking-tight text-gray-900">${product?.currentPrice}</p>

              <div class="mt-6">
                <h3 class="sr-only">Reviews</h3>
                <div class="flex items-center">
                  <div class="flex items-center">
                    <svg class="text-gray-900 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path
                        fill-rule="evenodd"
                        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                        clip-rule="evenodd"
                      />
                    </svg>

                    <svg class="text-gray-900 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path
                        fill-rule="evenodd"
                        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                        clip-rule="evenodd"
                      />
                    </svg>

                    <svg class="text-gray-900 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path
                        fill-rule="evenodd"
                        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                        clip-rule="evenodd"
                      />
                    </svg>

                    <svg class="text-gray-900 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path
                        fill-rule="evenodd"
                        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                        clip-rule="evenodd"
                      />
                    </svg>

                    <svg class="text-gray-200 h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path
                        fill-rule="evenodd"
                        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <p class="sr-only">4 out of 5 stars</p>
                  <a href="#" class="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    {product?.ratings.length} reviews
                  </a>
                </div>
              </div>

              <form class="mt-10">
                <div>
                  <h3 class="text-sm font-medium text-gray-900">Color</h3>

                  <fieldset class="mt-4">
                    <legend class="sr-only">Choose a color</legend>
                    <div class="flex items-center space-x-3">
                      {product?.colors.map((color) => {
                        return (
                          <label
                            class={`-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none ring-gray-400 ${
                              selectedColor === color ? "border-2 border-sky-500" : ""
                            }`}
                            onClick={() => setSelectedColor(color)}
                          >
                            <input type="radio" name="color-choice" value="White" class="sr-only" aria-labelledby="color-choice-0-label" />
                            <span id="color-choice-0-label" class="sr-only">
                              {" "}
                              {color}{" "}
                            </span>
                            <span aria-hidden="true" style={{ backgroundColor: color }} class="h-8 w-8 border border-black border-opacity-10 rounded-full"></span>
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>
                </div>

                <div class="mt-10">
                  <div class="flex items-center justify-between">
                    <h3 class="text-sm font-medium text-gray-900">Size</h3>
                    <a href="#" class="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                      Size guide
                    </a>
                  </div>

                  <fieldset class="mt-4">
                    <legend class="sr-only">Choose a size</legend>
                    <div class="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                      {product?.sizes.map((size) => {
                        return (
                          <label
                            class={`group relative rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 bg-white shadow-sm text-gray-900 cursor-pointer ${
                              selectedSize === size ? "border-2 border-sky-500" : ""
                            }`}
                            onClick={() => setSelectedSize(size)}
                          >
                            <input type="radio" name="size-choice" value="2XL" class="sr-only" aria-labelledby="size-choice-6-label" />
                            <span id="size-choice-6-label">{size}</span>
                            <span class="pointer-events-none absolute -inset-px rounded-md" aria-hidden="true"></span>
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>
                </div>

                <div class="mt-10">
                  <div class="flex items-center justify-between">
                    <h3 class="text-sm font-medium text-gray-900">Quantity</h3>
                  </div>

                  <fieldset class="mt-4">
                    <legend class="sr-only">Input quantity</legend>
                    <div>
                      <input
                        type="number"
                        id="default-input"
                        class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-32 p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value > 0 ? e.target.value : 0)}
                      />
                    </div>
                  </fieldset>
                </div>

                <div class="grid gap-6 mb-6 md:grid-cols-2 mt-10">
                  <div>
                    <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900">
                      Name
                    </label>
                    <input
                      type="text"
                      id="first_name"
                      class=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Shirt name"
                    />
                  </div>
                  <div>
                    <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900">
                      Number
                    </label>
                    <input
                      type="text"
                      id="last_name"
                      class=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Shirt number"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  class="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={(e) => addToCart(e, product.id)}
                >
                  Add to cart
                </button>
              </form>
            </div>

            <div class="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
              <div dangerouslySetInnerHTML={{ __html: product?.description }} />
            </div>
          </div>
        </div>
      </div>
      {product?.ratings.map((rating) => {
        return (<Review rating={rating} key={rating.id}/>)
      })}
      <Footer />
    </div>
  );
};

export default DetailProduct;

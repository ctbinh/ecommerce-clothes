import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "./Admin";
import React from 'react';
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Home from "./components/Home/Home";
import HomeAdmin from "./Admin/components/Home";
import AdminLogin from "./Admin/components/Login";
import User from "./components/User/User";
import Product from "./Admin/components/products/index";
import AdminDetail from "./Admin/components/products/Detail";
import AdminEdit from "./Admin/components/products/Edit";
import Customer from "./Admin/components/customers/Customer";
import Detail from "./components/Detail";
import AddProduct from "./Admin/components/products/AddProduct";
import Orders from "./Admin/components/orders/Orders";
import Invoice from "./Admin/components/orders/Invoice";
import Login from "./components/Login/Login";
import { useEffect, useState } from "react";
import About from "./components/About";
import News from "./components/News";
import NewsDetail from "./components/NewsDetail";
import { Provider } from "react-redux";
import store from "./store";
import ProductsPage from "./components/ProductsPage/ProductsPage";
import StoresPage from "./components/StoresPage/StoresPage";
import StoresDetails from "./components/StoresDetails/StoresDetails";
import UploadDesign from "./components/UploadDesign/UploadDesign";
import DetailProduct from "./components/DetailProduct/DetailProduct";
import { NotificationContainer } from "react-notifications";
import Contact from "./components/Contact/Contact";
function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const data = sessionStorage.getItem("user_id");
    if (data) {
      setUser(data);
    }
  }, []);

  return (
    <div className="App">
      <NotificationContainer />
      <BrowserRouter>
        <Routes>
          <Route path="admin/login" element={<AdminLogin />} />
          <Route path="admin" element={<Admin />}>
            <Route path="product" element={<Product />} />
            <Route path="customer" element={<Customer />} />
            <Route path="addproduct" element={<AddProduct />} />
            <Route path="invoice" element={<Invoice />} />
            <Route path="orders" element={<Orders />} />
            <Route path="product/detail" element={<AdminDetail />} />
            <Route path="product/edit" element={<AdminEdit />} />
            <Route path="" element={<HomeAdmin />} />
          </Route>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/products" element={<ProductsPage user={user} />} />
          <Route path="login" element={<Login user={user} />} />
          <Route path="cart" element={<Cart user={user} />} />
          <Route path="checkout" element={<Checkout user={user} />} />
          <Route path="about" element={<About />} />
          <Route path="news" element={<News />} />
          <Route path="news/:id" element={<NewsDetail />} />
          <Route path="user" element={<User />} />
          <Route path="stores" element={<StoresPage />} />
          <Route path="stores/:id" element={<StoresDetails />} />
          <Route path="stores/:id/design" element={<UploadDesign />} />
          <Route
            path="detail/:product_id"
            element={<DetailProduct user={user} />}
          />
          <Route path="contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

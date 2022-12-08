import { Form, Input, Select } from "antd";
import axios from "axios";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import CartContext from "./CartContext";
const { Option } = Select;

const token = "9891ae72-415a-11ed-8636-7617f3863de9";
const shopId = "3307734";
const InputAddress = ({ address, setAddress, setCouponCode }) => {
  const cart = useContext(CartContext);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [services, setServices] = useState([]);
  const [payments, setPayments] = useState(["Payment on delivery", "Payment with VNPay"])
  const [targetPayment, setTargetPayment] = useState('')
  const {fee, setFee} = cart

  const getServices = async () => {
    const data = await axios({
      method: "POST",
      url: "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services",
      headers: {
        Token: token,
      },
      data: {
        shop_id: parseInt(shopId),
        from_district: 1702,
        to_district: cart.targetDistrict.DistrictID,
      },
    });
    setServices(data.data.data);
  };
  const calFee = async (service) => {
    cart.setTargetService(service);
    const data = await axios({
      method: "POST",
      url: "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee",
      data: {
        from_district_id: 1702,
        service_id: service.service_id,
        service_type_id: service.service_type_id,
        to_district_id: cart.targetDistrict.DistrictID,
        to_ward_code: `${cart.targetWard.WardCode}`,
        height: 1,
        length: 1,
        weight: 1,
        width: 1,
        insurance_value: 0,
        coupon: null,
      },
      headers: {
        Token: token,
        ShopId: shopId,
      },
    });
    setFee(data.data.data.total);
  };
  const getProvinces = async () => {
    const data = await axios({
      method: "GET",
      url: "https://online-gateway.ghn.vn/shiip/public-api/master-data/province",
      headers: {
        Token: token,
      },
    });
    setProvinces(data.data.data);
  };
  const getDistricts = async () => {
    const data = await axios({
      method: "POST",
      url: "https://online-gateway.ghn.vn/shiip/public-api/master-data/district",
      data: {
        province_id: cart.targetProvince.ProvinceID,
      },
      headers: {
        Token: token,
      },
    });
    setDistricts(data.data.data);
  };
  const getWards = async () => {
    const data = await axios({
      method: "GET",
      url: `https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${cart.targetDistrict.DistrictID}`,
      headers: {
        Token: token,
      },
    });
    setWards(data.data.data);
  };
  const changeProvince = (value) => {
    setAddress({ ...address, province: value });
  };
  const changeDistrict = (value) => {
    setAddress({ ...address, district: value });
  };
  const changeWard = (value) => {
    setAddress({ ...address, ward: value });
  };
  const changeStreet = (e) => {
    setAddress({ ...address, street: e.target.value });
  };
  return (
    <>
      <NameInput label="Address">
        <Input.Group compact>
          <Select
            showSearch
            placeholder="Select a province"
            optionFilterProp="children"
            onClick={getProvinces}
            onChange={(e) => changeProvince(e)}
            filterOption={(input, option) => option.children.props.children.toLowerCase().includes(input.toLowerCase())}
          >
            {provinces?.map((item) => {
              return (
                <Option key={item.ProvinceID} value={item.ProvinceName}>
                  <div onClick={() => cart.setTargetProvince(item)}>{item.ProvinceName}</div>
                </Option>
              );
            })}
          </Select>
          <Select
            showSearch
            placeholder="Select a district"
            optionFilterProp="children"
            onClick={getDistricts}
            onChange={(e) => changeDistrict(e)}
            filterOption={(input, option) => option.children.props.children.toLowerCase().includes(input.toLowerCase())}
          >
            {districts?.map((item) => {
              return (
                <Option key={item.DistrictID} value={item.DistrictName}>
                  <div onClick={() => cart.setTargetDistrict(item)}>{item.DistrictName}</div>
                </Option>
              );
            })}
          </Select>
          <Select
            showSearch
            placeholder="Select a ward"
            optionFilterProp="children"
            onClick={getWards}
            onChange={(e) => changeWard(e)}
            filterOption={(input, option) => option.children.props.children.toLowerCase().includes(input.toLowerCase())}
          >
            {wards?.map((item) => {
              return (
                <Option key={item.WardCode} value={item.WardName}>
                  <div onClick={() => cart.setTargetWard(item)}>{item.WardName}</div>
                </Option>
              );
            })}
          </Select>
        </Input.Group>
        <Input style={{ marginTop: "10px", borderRadius: "5px", fontWeight: "normal" }} placeholder="Street..." onChange={(e) => changeStreet(e)}/>
      </NameInput>
      <NameInput label="Coupone code">
        <Input style={{ borderRadius: "5px" }} onChange={(e) => setCouponCode(e.target.value)} placeholder="Enter your coupon code..." />
      </NameInput>
      <NameInput label="Service">
        <Input.Group>
          <Select
            placeholder="Select a service"
            onClick={getServices}
          >
            {services?.map((item) => {
              return (
                <Option key={item.short_name} value={item.short_name}>
                  <div onClick={() => calFee(item)}>{item.short_name}</div>
                </Option>
              );
            })}
          </Select>
        </Input.Group>
      </NameInput>
      <NameInput label="Payment method">
        <Input.Group>
          <Select
            placeholder="Select payment method"
            onSelect={(value)=>setTargetPayment(value)}
          >
            {payments?.map((item) => {
              return (
                <Option key={item} value={item}>
                  <div>{item}</div>
                </Option>
              );
            })}
          </Select>
        </Input.Group>
      </NameInput>
      <Line />
      <NameInput label="Shipping">{`${fee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}đ`}</NameInput>
    </>
  );
};

const Line = styled.hr`
  /* margin-top: 10px; */
  margin-bottom: 10px;
  width: 100%;
  height: 1px;
  background-color: #cacdd8;
  border-radius: 10%;
`;
const NameInput = styled(Form.Item)`
  font-weight: 600;
  margin-bottom: 10px;

`;

export default InputAddress;

import { Slider } from "@mui/material";
import React from "react";
import styled from "styled-components";
import Button from "../Button";
import CloseIcon from "@mui/icons-material/Close";

const Filter = (props) => {
  const minDistance = 1;
  function valuetext(value) {
    return `${value}°C`;
  }

  const targetSize = (size) => {
    if (!props.sizeFilter?.includes(size)) {
      props.setSizeFilter([...props.sizeFilter, size]);
    } else {
      props.setSizeFilter(props.sizeFilter.filter((r) => r !== size));
    }
  };
  const targetCategory = (category) => {
    if (!props.categoryFilter?.includes(category)) {
      props.setCategoryFilter([...props.categoryFilter, category]);
    } else {
      props.setCategoryFilter(props.categoryFilter.filter((r) => r !== category));
    }
  };
  const applyFilter = () => {
    props.setShow(0);
    props.applyFilter();
  };
  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      props.setValue([Math.min(newValue[0], props.value[1] - minDistance), props.value[1]]);
    } else {
      props.setValue([props.value[0], Math.max(newValue[1], props.value[0] + minDistance)]);
    }
  };
  const changeMin = (e) => {
    props.setValue([e.target.value, props.value[1]]);
  };
  const changeMax = (e) => {
    props.setValue([props.value[0], e.target.value]);
  };
  const targetColor = (code) => {
    if (props.colorTarget === code) {
      props.setColorTarget("");
      props.fetchProducts("filter_color", {color: ""});
    } else {
      props.setColorTarget(code);
      props.fetchProducts("filter_color", {color: code});
    }
  };

  return (
    <Container>
      <Row>
        <Title>
          <i class="fa fa-sliders" aria-hidden="true"></i> Filters
        </Title>
        {props.show === 1 && <CloseIcon onClick={() => props.setShow(0)} />}
      </Row>
      <Button type="transparent" text="Clear Filter" onClick={() => props.clearFilter()} />
      <TypeFilter>
        <i class="fa fa-align-left" aria-hidden="true"></i> Categories
      </TypeFilter>
      <Ram>
        <input type="checkbox" name="MALE" id="MALE" value="MALE" checked={props.categoryFilter?.includes("MALE")} onChange={() => targetCategory("MALE")} />
        <label>
          <span>Male</span>
          <span></span>
        </label>
      </Ram>
      <Ram>
        <input type="checkbox" name="FEMALE" id="FEMALE" value="FEMALE" checked={props.categoryFilter?.includes("FEMALE")} onChange={() => targetCategory("FEMALE")} />
        <label>
          <span>Female</span>
          <span></span>
        </label>
      </Ram>
      <Ram>
        <input type="checkbox" name="UNIFORM" id="UNIFORM" value="UNIFORM" checked={props.categoryFilter?.includes("UNIFORM")} onChange={() => targetCategory("UNIFORM")} />
        <label>
          <span>Uniform</span>
          <span></span>
        </label>
      </Ram>
      <Ram>
        <input type="checkbox" name="FOOTBALL" id="FOOTBALL" value="FOOTBALL" checked={props.categoryFilter?.includes("FOOTBALL")} onChange={() => targetCategory("FOOTBALL")} />
        <label>
          <span>Football</span>
          <span></span>
        </label>
      </Ram>
      <Ram>
        <input type="checkbox" name="OTHER" id="OTHER" value="OTHER" checked={props.categoryFilter?.includes("OTHER")} onChange={() => targetCategory("OTHER")} />
        <label>
          <span>Others</span>
          <span></span>
        </label>
      </Ram>
      <TypeFilter>
        <i class="fa fa-align-left" aria-hidden="true"></i> Price
      </TypeFilter>
      <Slider
        style={{ width: "90%", margin: "0 5%" }}
        sx={{
          color: "black",
          "& .MuiSlider-thumb": {
            backgroundColor: "white",
            border: "1px solid #e1e1e1",
          },
        }}
        getAriaLabel={() => "Minimum distance"}
        value={props.value}
        max={3000000}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        disableSwap
      />
      <Row>
        <p style={{ fontSize: "20px", color: "gray" }}>$</p>
        <Input type="text" value={props.value[0]} onChange={(e) => changeMin(e)}></Input>
        <p style={{ fontSize: "24px", color: "gray" }}>-</p>
        <Input type="text" value={props.value[1]} onChange={(e) => changeMax(e)}></Input>
      </Row>
      <TypeFilter>
        <i class="fa fa-align-left" aria-hidden="true"></i> Colors
      </TypeFilter>
      <Colors>
        {props.colors.map((color, idx) => {
          return <ColorItem key={idx} color={color.code} className={props.colorTarget === color.code ? "active" : ""} onClick={() => targetColor(color.code)} />;
        })}
      </Colors>
      <TypeFilter>
        <i class="fa fa-align-left" aria-hidden="true"></i> Size
      </TypeFilter>
      <Ram>
        <input type="checkbox" name="S" id="S" value="S" checked={props.sizeFilter?.includes("S")} onChange={() => targetSize("S")} />
        <label>
          <span>S</span>
          <span></span>
        </label>
      </Ram>
      <Ram>
        <input type="checkbox" name="M" id="M" value="M" checked={props.sizeFilter?.includes("M")} onChange={() => targetSize("M")} />
        <label>
          <span>M</span>
          <span></span>
        </label>
      </Ram>
      <Ram>
        <input type="checkbox" name="L" id="L" value="L" checked={props.sizeFilter?.includes("L")} onChange={() => targetSize("L")} />
        <label>
          <span>L</span>
          <span></span>
        </label>
      </Ram>
      <Ram>
        <input type="checkbox" name="XL" id="XL" value="XL" checked={props.sizeFilter?.includes("XL")} onChange={() => targetSize("XL")} />
        <label>
          <span>XL</span>
          <span></span>
        </label>
      </Ram>
      <Ram>
        <input type="checkbox" name="XXL" id="XXL" value="XXL" checked={props.sizeFilter?.includes("XXL")} onChange={() => targetSize("XXL")} />
        <label>
          <span>XXL</span>
          <span></span>
        </label>
      </Ram>
      <br />
      <Button text="Apply Filter" onClick={applyFilter} />
    </Container>
  );
};

const ColorItem = styled.div`
  min-width: 20px;
  min-height: 20px;
  border: 1px solid gray;
  background-color: ${($props) => ($props.color ? $props.color : "black")};
  border-radius: 100%;
  cursor: pointer;
  &.active {
    border: 3px solid #0156ff;
  }
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Input = styled.input`
  width: 70px;
  border: 1px solid #e0e0e0;
  border-radius: 2px;
  height: 25px;
  padding: 5px;
`;
const Ram = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 0;
  & input {
    flex: 1;
    transform: scale(1.4);
  }
  & label {
    width: 85%;
    display: flex;
    justify-content: space-between;
  }
`;
const Colors = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const TypeFilter = styled.p`
  /* font-weight: bold; */
  margin: 10px 0;
  border-top: 1px solid #e5e5e5;
  padding-top: 10px;
  text-transform: uppercase;
`;

const Title = styled.p`
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 10px;
`;
const Container = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  /* background-color: #F5F7FF; */
  border-radius: 5px;
  background-color: white;
  border: 1px solid #e1e1e1;
  height: fit-content;
  @media (max-width: 768px) {
    background-color: white;
  }
`;

export default Filter;

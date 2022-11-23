import React from "react";
import styled from "styled-components";
import { ShoppingCart, Person } from "@mui/icons-material";
import { Navbar, Container, Nav, NavDropdown, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import images from "./images";
import { useContext } from "react";
import CartContext from "./CartContext";
import axios from "axios";

const Header = (props) => {
  // const numCart = useSelector(numCartSelector);
  const cart = useContext(CartContext);
  let navigate = useNavigate();
  const signout = () => {
    sessionStorage.clear();
  };
  const [user, setUser] = useState(null);
  const [searchVal, setSearchVal] = useState("");
  const searchProduct = (e) => {
    if (e.code === "Enter") {
      const filteredProduct = props.data.filter((p) =>
        p.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      props.setcurrPage(1);
      props.setfilteredProducts(filteredProduct);
      props.getProductPerPage(filteredProduct);
      props.setcountPage(Math.ceil(filteredProduct.length / props.num));
    }
  };
  useEffect(() => {
    const data = sessionStorage.getItem("user_id");
    if (data) {
      setUser(data);
    }
    // const fetchCart = async () => {
    //   const res = await axios.get("http://localhost:8082/api/cart", { withCredentials: true });
    //   cart.setItems(res.data);
    // };
    // fetchCart();
  }, [props.data]);
  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        style={{ backgroundColor: "black" }}
      >
        <Container style={{}}>
          <Navbar.Brand
            as={Link}
            to="/"
            className="d-flex flex-row align-items-center"
          >
            <img
              src={images.hcmut}
              alt="Logo HCMUT"
              width="55"
              height="55"
              className="d-inline-block align-top"
            />
            <Title>BK SHOP</Title>
          </Navbar.Brand>

          <Navbar.Collapse id="responsive-navbar-nav">
            <SearchBar className="searchbar">
              <SearchInput
                type="text"
                autoComplete="off"
                name="search_product"
                id="search_product"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder="Search by name..."
                onKeyUp={(e) => searchProduct(e)}
              />
              <SearchButton>
                <i className="fa fa-search"></i>
              </SearchButton>
            </SearchBar>

            <Nav className="me-auto"></Nav>

            <Nav style={{ marginRight: "20px" }}>
              {/* <Nav.Link eventKey={2} href="#memes">
                            Dank memes
                        </Nav.Link> */}
              <Nav.Link onClick={() => navigate("/stores")}>STORES</Nav.Link>
              <Nav.Link onClick={() => navigate("/products")}>
                PRODUCTS
              </Nav.Link>
              <Nav.Link onClick={() => navigate("/about")}>ABOUT</Nav.Link>
              <Nav.Link as={Link} to="/news">
                NEWS
              </Nav.Link>
              <NavDropdown title="COLLECTION" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">
                  Best Seller
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Discount</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  My Wish List
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>

          <NavIcon>
            <div style={{ marginLeft: "auto", minWidth: "60px" }}>
              <Link style={{ textDecoration: "none" }} to="/cart">
                <CartIcon />
                <CartCounter>{cart.items.length}</CartCounter>
              </Link>
            </div>

            {/* <UserIcon>
                    </UserIcon> */}
            <Dropdown>
              <Dropdown.Toggle
                style={{ backgroundColor: "transparent", border: "none" }}
              >
                <UserIcon></UserIcon>
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ zIndex: "9999" }} align="end">
                {user ? (
                  <>
                    <Dropdown.Item as={Link} to="/user">
                      My Account
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={signout} href="/login">
                      Sign out
                    </Dropdown.Item>
                  </>
                ) : (
                  <>
                    <Dropdown.Item as={Link} to="/login">
                      Sign In
                    </Dropdown.Item>

                    <Dropdown.Item as={Link} to="/login">
                      Sign Up
                    </Dropdown.Item>
                  </>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </NavIcon>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        </Container>
      </Navbar>
    </>
  );
};

const Title = styled.p`
  color: white;
  font-size: 2.5vw;
  width: 15vw;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700;
  margin: 0px 0 0 15px;
  @media (max-width: 480px) {
    display: none;
  }
`;
const SearchBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: none;
  /* border-radius: 15px; */
  margin-right: 2vw;
  padding: 2px;
  max-width: 250px;
  /* @media (max-width: 768px){
    display: none;
  } */
`;
const SearchInput = styled.input`
  display: inline;
  border: none;
  outline: none;
  /* margin-left: 15px; */
  width: 80%;
`;
const SearchButton = styled.button`
  display: inline;
  border: none;
  background-color: white;
  /* border-radius: 50%; */
  width: 24px;
  /* padding: 5px; */
  i {
    width: 16px;
  }
`;
const NavIcon = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 20px;
  margin-left: auto;
  .dropdown-toggle::after {
    display: none !important;
  }
  @media (max-width: 768px) {
    /* position: relative; */
  }
`;

const CartIcon = styled(ShoppingCart)`
  color: white;
  font-size: 50pt;
  display: inline;
`;
const CartCounter = styled.p`
  color: black;
  background-color: white;
  font-size: 12px;
  font-weight: bold;
  padding: 0px 2px;
  border-radius: 7px;
  border: 1px black solid;
  display: inline;
  position: relative;
  bottom: 10px;
  right: 12px;
  /* font-family: 'Helvetica Neue', Helvetica, Arial; */
  @media (max-width: 768px) {
    /* width: 15vw; */
  }
`;
const UserIcon = styled(Person)`
  color: white;
  width: 10vw;
`;

export default Header;

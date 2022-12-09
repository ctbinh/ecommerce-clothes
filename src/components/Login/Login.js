import React, { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import styled from "styled-components";
import Footer from "../Footer";
import Header from "../Header";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const Login = (props) => {
  let navigate = useNavigate();
  const [targetTab, settargetTab] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [cfPassword, setCfPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(-1);
  const [msg, setMsg] = useState("");
  const login = () => {
    if (username === "" || password === "") {
      setMsg("Invalid username or password!");
      setIsSuccess(0);
      return;
    }
    const data = {
      formFields: [
        {
          id: "email",
          value: username,
        },
        {
          id: "password",
          value: password,
        },
      ],
    };
    axios
      .post(`${process.env.REACT_APP_URL_SERVER}/auth/signin`, data, {withCredentials: true})
      .then(function (response) {
        console.log(response.data);
        if (response.data.status === "OK") {
          sessionStorage.setItem("user_id", response.data.user.id);
          navigate("/");
        } else if (response.data.status === "Blocked") {
          setMsg("Your account has been blocked!");
          setIsSuccess(0);
        } else {
          setMsg("Wrong username or password");
          setIsSuccess(0);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const signup = async () => {
    if (password !== cfPassword) {
      setMsg("Password incorrect!");
      setIsSuccess(0);
      return;
    }
    if (username === "" || password === "" || fName === "" || lName === "") {
      setMsg("Missing data required!");
      setIsSuccess(0);
      return;
    }
    const data = {
      formFields: [
        {
          id: "email",
          value: username,
        },
        {
          id: "password",
          value: password,
        },
        {
          id: "firstname",
          value: fName,
        },
        {
          id: "lastname",
          value: lName,
        },
      ],
    };
    const res = await axios.post(`${process.env.REACT_APP_URL_SERVER}/auth/signup`, data, {withCredentials:true});
    console.log(res.data);
    if (res.data.status === "OK") {
      setMsg("Create account success!");
      setIsSuccess(1);
    } else {
      setMsg(res.data.formFields[0].error);
      setIsSuccess(0);
    }
  };
  const changeTab = (tab) => {
    setIsSuccess(-1);
    settargetTab(tab);
  };
  const enterLogin = (e) => {
    if (e.code === "Enter") {
      if (targetTab === "login") {
        login();
      } else {
        signup();
      }
    }
  };

  return (
    <>
      {props.user && <Navigate to="/" replace={true} />}
      <Header />
      <Container>
        <Head>
          <Button className="phone" variant="primary" style={{ borderRadius: "20px" }} onClick={targetTab === "login" ? () => changeTab(1) : () => changeTab("login")}>
            {targetTab === "login" ? "Sign up" : "Sign in"}
          </Button>
        </Head>
        <Content>
          {targetTab === "login" ? (
            <>
              <Box>
                <Form>
                  <Title>Registered Customer</Title>
                  <Form.Label>If you have an account, sign in.</Form.Label>
                  {isSuccess === 0 && (
                    <Alert variant="danger" onClose={() => setIsSuccess(-1)} dismissible>
                      <Alert.Heading>Failed to login!</Alert.Heading>
                      <p>{msg}</p>
                    </Alert>
                  )}
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Label>
                      Username <span style={{ color: "red" }}>*</span>
                    </Label>
                    <Form.Control type="text" placeholder="Your username" value={username} onChange={(e) => setUsername(e.target.value)} onKeyUp={(e) => enterLogin(e)} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Label>
                      Password <span style={{ color: "red" }}>*</span>
                    </Label>
                    <Form.Control type="password" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyUp={(e) => enterLogin(e)} />
                  </Form.Group>
                </Form>
                <TextLink>Forgot your password?</TextLink>
                <Button
                  variant="primary"
                  style={{
                    width: "200px",
                    borderRadius: "20px",
                    margin: "0px auto",
                    backgroundColor: "black"
                  }}
                  onClick={login}
                >
                  Sign in
                </Button>
              </Box>
              <Box className="intro">
                <Title>New Customer?</Title>
                <Form.Label>Creating an account has many benefits:</Form.Label>
                <ul>
                  <li>Check out faster</li>
                  <li>Keep more than one address</li>
                  <li>Track orders and more</li>
                </ul>
                <Button variant="primary" style={{ width: "200px", borderRadius: "20px",backgroundColor: "black"  }} onClick={() => changeTab(1)}>
                  Create an account
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Box>
                <Form>
                  <Title>New Customer</Title>
                  <Form.Label>Just create an account, you can buy everything.</Form.Label>
                  {isSuccess === 0 && (
                    <Alert variant="danger" onClose={() => setIsSuccess(-1)} dismissible>
                      <Alert.Heading>Failed to create account!</Alert.Heading>
                      <p>{msg}</p>
                    </Alert>
                  )}
                  {isSuccess === 1 && (
                    <Alert variant="success" onClose={() => setIsSuccess(-1)} dismissible>
                      <Alert.Heading>Successful!</Alert.Heading>
                      <p>{msg}</p>
                    </Alert>
                  )}
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Label>
                      Username <span style={{ color: "red" }}>*</span>
                    </Label>
                    <Form.Control type="text" placeholder="Your username" value={username} onChange={(e) => setUsername(e.target.value)} onKeyUp={(e) => enterLogin(e)} />
                  </Form.Group>
                  <Row>
                    <Form.Group style={{ marginRight: "5px" }} className="mb-3" controlId="exampleForm.ControlInput1">
                      <Label>
                        First name <span style={{ color: "red" }}>*</span>
                      </Label>
                      <Form.Control type="text" placeholder="Your first name" value={fName} onChange={(e) => setFName(e.target.value)} onKeyUp={(e) => enterLogin(e)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Label>
                        Last name <span style={{ color: "red" }}>*</span>
                      </Label>
                      <Form.Control type="text" placeholder="Your last name" value={lName} onChange={(e) => setLName(e.target.value)} onKeyUp={(e) => enterLogin(e)} />
                    </Form.Group>
                  </Row>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Label>
                      Password <span style={{ color: "red" }}>*</span>
                    </Label>
                    <Form.Control type="password" placeholder="Your password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyUp={(e) => enterLogin(e)} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Label>
                      Confirm password <span style={{ color: "red" }}>*</span>
                    </Label>
                    <Form.Control type="password" placeholder="Your password" value={cfPassword} onChange={(e) => setCfPassword(e.target.value)} onKeyUp={(e) => enterLogin(e)} />
                  </Form.Group>
                </Form>
                <Button
                  variant="primary"
                  style={{
                    width: "200px",
                    borderRadius: "20px",
                    margin: "0px auto",
                    backgroundColor: "black"
                  }}
                  onClick={signup}
                >
                  Create an account
                </Button>
              </Box>
              <Box className="intro">
                <Title>Registered Customer</Title>
                <Form.Label>Creating an account has many benefits:</Form.Label>
                <ul>
                  <li>Check out faster</li>
                  <li>Keep more than one address</li>
                  <li>Track orders and more</li>
                </ul>
                <Button variant="primary" style={{ width: "200px", borderRadius: "20px", backgroundColor: "black" }} onClick={() => changeTab("login")}>
                  Login
                </Button>
              </Box>
            </>
          )}
        </Content>
      </Container>
      <Footer />
    </>
  );
};

const TextLink = styled.span`
  color: #477bff;
  cursor: pointer;
  text-align: right;
  margin-bottom: 10px;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
`;
const Label = styled(Form.Label)`
  font-weight: bold;
`;
const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  & .intro {
    @media (max-width: 768px) {
      display: none;
    }
  }
`;
const Box = styled.div`
  background-color: #f5f7ff;
  display: flex;
  flex-direction: column;
  width: 45%;
  margin: 10px;
  padding: 30px 50px;
  @media (max-width: 768px) {
    width: 100%;
    padding: 10px 20px;
    margin: 0px;
  }
`;
const Head = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 10px;
  & .phone {
    display: none;
    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
  @media (max-width: 1024px) {
    width: 100%;
    padding: 10px;
  }
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export default Login;

import styled from "styled-components";
import { Container, Row, Col } from "react-grid-system";
import axios from "axios";
import { useEffect, useState } from "react";
import swal from "sweetalert";

export default function Password() {
  const [userInfor, setUserInfor] = useState([]);
  const [pwCur, setPwCur] = useState("");
  const [pwNew, setPwNew] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const id = sessionStorage.getItem("user_id");
      const res = await axios.get("http://localhost/ecommerce/backend/api/user/getUser.php?user_id=" + id);
      setUserInfor(res.data.data[0]);
    };
    fetchUser();
  }, []);
  const onChangePassword = () => {
    console.log(pwCur);
    console.log(pwNew);
    console.log(pwConfirm);
    if (!pwCur || !pwNew || !pwConfirm) {
      swal("Please fill full input!!!", "Try again !", "warning");
      return;
    }
    if (pwNew !== pwConfirm) {
      swal("Confirm password incorrect!", "Try again !", "error");
      return;
    }
    const data = {
      username: userInfor.username,
      password: pwCur,
      new_password: pwNew,
    };
    console.log("data->>>>>", data);

    axios.post("http://localhost/ecommerce/backend/api/user/update_pass.php", data).then((response) => {
      console.log("test", response);
      if (response.data.status === "Success") swal("Completely!", "Change password success", "success");
      else swal("Password incorrect!", "Try again !", "error");
    });
  };
  return (
    <div>
      <Title>Change Password</Title>
      <Line />
      <Container>
        <Row>
          <ColStyled lg={4}>
            <ContainerImg>
              <ImgProduct src={userInfor.avatarUrl ?? "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png"} alt="UserImage" />
            </ContainerImg>
          </ColStyled>
          <Col>
            <ContainerInput>
              <Row>
                <Col lg={3}>
                  <NameInput>Password</NameInput>
                </Col>
                <Col lg={9}>
                  <Input required type="password" placeholder="Your current password" onChange={(e) => setPwCur(e.target.value)} />
                </Col>
              </Row>
            </ContainerInput>
            <ContainerInput>
              <Row>
                <Col lg={3}>
                  <NameInput>New PW</NameInput>
                </Col>
                <Col lg={9}>
                  <Input required type="password" placeholder="Your new password" onChange={(e) => setPwNew(e.target.value)} />
                </Col>
              </Row>
            </ContainerInput>
            <ContainerInput>
              <Row>
                <Col lg={3}>
                  <NameInput>Confirm PW</NameInput>
                </Col>
                <Col lg={9}>
                  <Input required type="password" placeholder="Confirm yours new password" onChange={(e) => setPwConfirm(e.target.value)} />
                </Col>
              </Row>
            </ContainerInput>
            <ButtonSave onClick={() => onChangePassword()}>Confirm</ButtonSave>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const Line = styled.hr`
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
  height: 1px;
  background-color: #cacdd8;
  border-radius: 10%;
`;
const ImgProduct = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fit;
  border-radius: 50%;
`;
const ContainerImg = styled.div`
  border: solid 1px;
  height: 15vw;
  width: 15vw;
  border-radius: 50%;
  border: none;
`;

const ContainerInput = styled.div`
  /* background-color: #F5F7FF; */
  margin-bottom: 5px;
  border-top-right-radius: 15px;
  padding-top: 5px;
`;
const NameInput = styled.span`
  font-weight: 600;
  margin-bottom: 5px;
  font-size: 90%;
  height: 40px;
  line-height: 40px;

  /* background-color: red; */
`;
const Input = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 5px;
  border: solid #cccccc 1px;
  padding-left: 2%;
`;
const ColStyled = styled(Col)`
  /* background-color: red; */
`;
const ButtonSave = styled.button`
  width: 90px;
  height: 40px;
  border-radius: 10px;
  border: none;
  float: right;
  margin-top: 20px;
  background-color: #0156ff;
  font-weight: 600;
  color: white;
  transition: all 0.3s;
  :hover {
    background-color: #00369f;
  }
  cursor: pointer;
`;
const Title = styled.div`
  font-weight: 600;
  font-size: 104%;
`;

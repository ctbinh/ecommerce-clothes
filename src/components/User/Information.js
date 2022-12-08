import React from 'react';
import styled from "styled-components";
import { Container, Row, Col } from "react-grid-system";
import { useEffect, useState } from "react";

import ImageUploading from "react-images-uploading";
import { GrEdit } from "react-icons/gr";
import axios from "axios";
import swal from "sweetalert";
import { NotificationContainer, NotificationManager } from "react-notifications";
export default function Information(props) {
  const [images, setImages] = useState([]);
  const [userInfor, setUserInfor] = useState([]);
  // images.data_url = User.url_avt;
  // const maxNumber = 69;
  // const onChange = async (imageList, addUpdateIndex) => {
  //   // data for submit
  //   setImages(imageList);
  //   const formData = new FormData();
  //   formData.append("file", imageList[0].file);
  //   formData.append("api_key", 174989952789425);
  //   formData.append("upload_preset", "iinnk03t");
  //   const res = await axios.post("https://api.cloudinary.com/v1_1/dd8b69mls/image/upload", formData);
  //   const sendUpImage = (url) => {
  //     const data = {
  //       user_id: sessionStorage.getItem("user_id"),
  //       url_avt: url,
  //     };
  //     axios.post("http://localhost/ecommerce/backend/api/user/updateImg.php", data).then((response) => {
  //       console.log(response);
  //     });
  //   };
  //   await sendUpImage(res.data.url);
  // };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`${process.env.REACT_APP_URL_SERVER}/api/users/info`, { withCredentials: true });
      setUserInfor(res.data);
    };
    fetchUser();
  }, []);
  const update = (e) => {
    let newdate = e.target.value;
    console.log("value", e.target.value);
    if (e.target.name === "date") {
      let date = e.target.value;

      let datearray = date.split("-");
      let newdate = datearray[2] + "-" + datearray[1] + "-" + datearray[0];
    }
    setUserInfor({
      ...userInfor,
      [e.target.name]: newdate,
    });
  };
  // const data = {
  //   "firstName": "Vinh",
  //   "lastName": "Nguyen Phuc",
  //   "email": "npvinh0507@gmail.com",
  //   "phone": "0373 395 726",
  //   "gender": "MALE",
  //   "birthday": "2022-11-17 19:00",
  //   "avatarUrl": "https://avatars.githubusercontent.com/u/69946748"
  // }
  const onSave = async () => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(userInfor.email)) {
      NotificationManager.error("Email not true !!!", "Error Email!", 3000);
      return;
    }
    swal("Completely!", "Change information success", "success");
    const data = {
      ...userInfor,
      user_id: sessionStorage.getItem("user_id"),
    };
    console.log("data->>>>>", data);
    if(!data.gender) {
      data.gender = "MALE"
    }
    const res = await axios.put(`${process.env.REACT_APP_URL_SERVER}/api/users/`, data, { withCredentials: true });
    console.log(res);
  };
  return (
    <div>
      <Title>Account Information</Title>
      <Line />
      <Container>
        <Row>
          <ColStyled lg={4}>
            <ImageUploading
              // multiple
              value={images}
              // onChange={onChange}
              // maxNumber={maxNumber}
              dataURLKey="data_url"
            >
              {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
                <ContainerEdit className="upload__image-wrapper">
                  {imageList.length === 0 && (
                    <ContainerImg>
                      <ImgProduct src={userInfor.avatarUrl ?? "https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png"} alt="UserImage" />
                    </ContainerImg>
                  )}
                  {/* <ButtonEdit style={isDragging ? { color: "red" } : null} onClick={onImageUpload} {...dragProps}>
                    <IconEdit size={"3vw"} />
                  </ButtonEdit> */}
                </ContainerEdit>
              )}
            </ImageUploading>
          </ColStyled>
          <Col>
            <ContainerInput>
              <Row>
                <Col lg={2.5}>
                  <NameInput>Avatar url</NameInput>
                </Col>
                <Col lg={9.5}>
                  <Input type="text" name="avatarUrl" placeholder={userInfor.avatarUrl} onChange={update} />
                </Col>
              </Row>
            </ContainerInput>
            <ContainerInput>
              <Row>
                <Col lg={2.5}>
                  <NameInput>First Name</NameInput>
                </Col>
                <Col lg={9.5}>
                  <Input type="text" name="firstName" placeholder={userInfor.firstName} onChange={update} />
                </Col>
              </Row>
            </ContainerInput>
            <ContainerInput>
              <Row>
                <Col lg={2.5}>
                  <NameInput>Last Name</NameInput>
                </Col>
                <Col lg={9.5}>
                  <Input type="text" name="lastName" placeholder={userInfor.lastName} onChange={update} />
                </Col>
              </Row>
            </ContainerInput>
            <ContainerInput>
              <Row>
                <Col lg={2.5}>
                  <NameInput>Gender</NameInput>
                </Col>
                <Col lg={9.5}>
                  <select name="gender" value={userInfor.gender} onChange={update} id="gender">
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                </Col>
              </Row>
            </ContainerInput>
            <ContainerInput>
              <Row>
                <Col lg={2.5}>
                  <NameInput type="email">Email</NameInput>
                </Col>
                <Col lg={9.5}>
                  <Input type="email" name="email" placeholder={userInfor.email} onChange={update} />
                </Col>
              </Row>
            </ContainerInput>
            <ContainerInput>
              <Row>
                <Col lg={2.5}>
                  <NameInput>Phone</NameInput>
                </Col>
                <Col lg={9.5}>
                  <Input type="number" name="phone" placeholder={userInfor.phone} onChange={update} />
                </Col>
              </Row>
            </ContainerInput>
            <Row>
              <Col lg={2.5}>
                <NameInput>Birthday</NameInput>
              </Col>
              <Col lg={9.5}>
                <Input type="date" id="start" name="birthday" value={userInfor.birthday?.slice(0, 10)} min="1990-01-01" max="2022-12-31" onChange={update} />
              </Col>
            </Row>
            <NotificationContainer />
            <ButtonSave onClick={() => onSave()}>Save</ButtonSave>
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
  height: 30px;
  line-height: 30px;

  /* background-color: red; */
`;
const Input = styled.input`
  width: 100%;
  height: 30px;
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
const IconEdit = styled(GrEdit)`
  background-color: #cccccc;
  border-radius: 50%;
  padding: 6px 6px;
  transition: all 0.5s;
  :hover {
    background-color: #a98f8f;
  }
  border: none;
`;
const ButtonEdit = styled.div`
  position: absolute;
  z-index: 2;
  cursor: pointer;
  border-radius: 50%;
  border: solid 2.5px white;
  left: 2vw;
`;
const ContainerEdit = styled.div`
  display: flex;
  align-items: flex-end;
`;

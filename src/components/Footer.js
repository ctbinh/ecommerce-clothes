import React from 'react'
import styled from 'styled-components'
import { Facebook, Instagram, GitHub, YouTube } from '@mui/icons-material'
import { Home, Email, LocalPhone, AccessTime } from '@mui/icons-material'

const Footer = () => {
  return (
    <div>
      <Row>
        <Logo src="https://www.hcmut.edu.vn/images/hcmut/logoBK.png" alt="Logo HCMUT" />
        <Infor>
          <InforTitle>Team members</InforTitle>
          <InforItem>Nguyen Dinh An</InforItem>
          <InforItem>Cao Thanh Binh</InforItem>
          <InforItem>Nguyen Tran Hoang</InforItem>
          <InforItem>Nguyen Thanh Long</InforItem>
        </Infor>
        <Infor>
          <InforTitle>Address</InforTitle>
          <InforIcon>
            <Home />
            <InforItem>1234 Street Adress City Address, US</InforItem></InforIcon>
          <InforIcon>
            <LocalPhone />
            <InforItem>(00) 1234 5678</InforItem>
          </InforIcon>
          <InforIcon>
            <AccessTime />
            <InforItem>Monday-Thursday: 9:00 AM - 5:30 PM</InforItem>
          </InforIcon>
          <InforIcon><Email />
            <InforItem>shop@email.com</InforItem>
          </InforIcon>

        </Infor >
        <Infor>
          <InforTitle>Social</InforTitle>
          <Facebook style={{ margin: '10px' }} />
          <YouTube style={{ margin: '10px' }} />
          <GitHub style={{ margin: '10px' }} />
          <Instagram style={{ margin: '10px' }} />
        </Infor>
      </Row >
      <SubRow>
        <Copyright>Copyright © 2022 BKU TEAM</Copyright>
        <i className="fa fa-cc-paypal"></i>
        <i className="fa fa-cc-visa"></i>
        <i className="fa fa-cc-mastercard"></i>
        <i className="fa fa-credit-card-alt"></i>
        <i className="fa fa-cc-jcb"></i>
        {/* <PaymentIcon src=""></PaymentIcon> */}

      </SubRow>
    </div>
  )
}

const Row = styled.div`
  background-color: black;
  width: 100%;
  min-height: 320px;
  display: flex;
  flex-direction: row;
  /* align-items: center; */
  justify-content: space-evenly;
  padding-top: 50px;
  margin-top: 50px;
  @media (max-width: 480px){
    /* display: block; */
    /* margin: auto; */
    flex-direction: column;
  }
`
const Logo = styled.img`
  height: 20vw;
  @media (max-width: 480px){
    height: 80vw;
    margin: auto;
  }
  `
const Infor = styled.div`
  width: 300px;
  color: white;
  @media (max-width: 480px){
    width: 80vw;
    margin: auto;
    margin-top: 20px;
    justify-content: center;
  }
`
const InforTitle = styled.div`
  color: white;
  font-weight: 700;
  font-size: 18px;
  line-height: 23px;
  margin-bottom: 20px;
  @media (max-width: 480px){
    text-align: center;
    margin-bottom: 10px;
  }
`
const InforItem = styled.p`
  color: white;
  font-weight: 400;
  font-size: 14px;
  line-height: 30px;
  margin: 5px 0 5px 10px;
  @media (max-width: 480px){
    text-align: center;
  }
`
const InforIcon = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
const SubRow = styled.div`
  background-color: gray;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 60px;
  border: none;
  border-top: white solid 1px;

  i {
    font-size: 40px;
    margin: auto 4px;
  }
`
const Copyright = styled.div`
  position: absolute;
  right: 12%;
  margin: auto 0px;
  line-height: 60px;
  @media (max-width: 768px){
    display: none;
  }
`
export default Footer
import React, { useState } from 'react'
import Footer from '../Footer'
import Header from '../Header'
import styled from 'styled-components'
import { Breadcrumbs, Link, Typography } from '@mui/material'
import Orders from './Orders'
import Wishlist from './Wishlist'

import Information from './Information'
import Password from './Password'

const User = () => {
  const wishlist = [
    {
      id: 0,
      rating: 4,
      instock: true,
      name: 'EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...',
      oldPrice: '599.00',
      newPrice: '499.00',
      desc: 'MSI CREATOR 17 A10SFS-240AU 17 UHD 4K HDR Thin Bezel Intel 10th Gen i7 10875H - RTX 2070 SUPER MAX Q - 16GB RAM - 1TB SSD NVME - Windows 10 PRO Laptop',
      cpu: 'N/A',
      featured: 'N/A',
      ports: 'N/A'
    },
    {
      id: 1,
      rating: 4,
      instock: true,
      name: 'EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...',
      oldPrice: '599.00',
      newPrice: '499.00',
      desc: 'MSI CREATOR 17 A10SFS-240AU 17 UHD 4K HDR Thin Bezel Intel 10th Gen i7 10875H - RTX 2070 SUPER MAX Q - 16GB RAM - 1TB SSD NVME - Windows 10 PRO Laptop',
      cpu: 'N/A',
      featured: 'N/A',
      ports: 'N/A'
    },
    {
      id: 2,
      rating: 4,
      instock: true,
      name: 'EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...',
      oldPrice: '599.00',
      newPrice: '499.00',
      desc: 'MSI CREATOR 17 A10SFS-240AU 17 UHD 4K HDR Thin Bezel Intel 10th Gen i7 10875H - RTX 2070 SUPER MAX Q - 16GB RAM - 1TB SSD NVME - Windows 10 PRO Laptop',
      cpu: 'N/A',
      featured: 'N/A',
      ports: 'N/A'
    },
    {
      id: 3,
      rating: 4,
      instock: true,
      name: 'EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...',
      oldPrice: '599.00',
      newPrice: '499.00',
      desc: 'MSI CREATOR 17 A10SFS-240AU 17 UHD 4K HDR Thin Bezel Intel 10th Gen i7 10875H - RTX 2070 SUPER MAX Q - 16GB RAM - 1TB SSD NVME - Windows 10 PRO Laptop',
      cpu: 'N/A',
      featured: 'N/A',
      ports: 'N/A'
    },
    {
      id: 1,
      rating: 4,
      instock: true,
      name: 'EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...',
      oldPrice: '599.00',
      newPrice: '499.00',
      desc: 'MSI CREATOR 17 A10SFS-240AU 17 UHD 4K HDR Thin Bezel Intel 10th Gen i7 10875H - RTX 2070 SUPER MAX Q - 16GB RAM - 1TB SSD NVME - Windows 10 PRO Laptop',
      cpu: 'N/A',
      featured: 'N/A',
      ports: 'N/A'
    }
  ]
  const [targetNavItem, setTargetNavItem] = useState('my-account')
  const [targetNavChildItem, setTargetNavChildItem] = useState('infor')
  const [targetTypeOrders, setTargetTypeOrders] = useState('all')
  const changeNavItem = (item) => {
    if(item !== 'my-account') {
      setTargetNavChildItem('')
    }
    else {
      setTargetNavChildItem('infor')
    }
    setTargetNavItem(item)
  }
  const changeNavChildItem = (item) => {
    setTargetNavChildItem(item)
    setTargetNavItem('my-account')
  }
  const changeTypeOrders = (type) => {
    setTargetTypeOrders(type)
  }
  return (
    <>
    <Header/>
    <Container>
      <Head>
        <Breadcrumbs separator="›" maxItems={2} aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Typography color="text.primary">My Account</Typography>
        </Breadcrumbs>
        <h2 style={{marginTop: '10px'}}>My Account</h2>
      </Head>
      <Row>
        <NavBox>
          <NavItem className={targetNavItem==='my-account'?'active':''} onClick={() => changeNavItem('my-account')}>My Account</NavItem>
          <NavChildItem className={targetNavChildItem==='infor'?'active':''} onClick={() => changeNavChildItem('infor')}>Account information</NavChildItem>
          <NavChildItem className={targetNavChildItem==='change-pass'?'active':''} onClick={() => changeNavChildItem('change-pass')}>Change password</NavChildItem>
          <NavItem className={targetNavItem==='my-orders'?'active':''} onClick={() => changeNavItem('my-orders')}>My Orders</NavItem>
          <Hr/>
          <NavItem className={targetNavItem==='my-wishlist'?'active':''} onClick={() => changeNavItem('my-wishlist')}>My Wish List</NavItem>
        </NavBox>
        <Content>
          {targetNavItem==='my-orders' && <Orders target={targetTypeOrders} changeTypeOrders={changeTypeOrders}/>}
          {targetNavItem==='my-wishlist' && <Wishlist wishlist={wishlist}/>}
          {targetNavChildItem==='infor' && <Information/>}
          {targetNavChildItem==='change-pass' && <Password/>}
        </Content>
      </Row>
    </Container>
    <Footer/>
    </>
  )
}


const Content = styled.div`
  width: 75%;
  margin-left: 5%;
  display: flex;
  flex-direction: column;
  min-height: 400px;
`
const Hr = styled.hr`
  margin-left: 15px;
  border: 0;
  height: 0.2px;
  background-image: -webkit-linear-gradient(#d6d6d6, #d6d6d6, #d6d6d6);
`
const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`
const NavChildItem = styled.div`
  padding: 10px 0;
  margin-left: 30px;
  cursor: pointer;
  &.active {
    color: #0156FF;
  }
`
const NavItem = styled.div`
  padding: 10px 0;
  padding-left: 15px;
  cursor: pointer;
  &.active {
    border-left: 3px solid #0156FF;
  }
`
const NavBox = styled.div`
  color: gray;
  background-color: #F5F7FF;
  width: 20%;
  padding: 5px 15px 5px 0;
  height: fit-content;
`
const Head = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 0 auto;
`

export default User
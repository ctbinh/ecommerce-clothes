import React from 'react'
import styled from 'styled-components'

const Button = (props) => {
  return (
    <Btn className={props.type} onClick={props.onClick}>{props.text}</Btn>
  )
}

const Btn = styled.button`
  width: 100%;
  padding: 5px;
  background-color: #282828;
  color: #FFFFFF;
  text-transform: uppercase;
  font-weight: 100;
  border-radius: 10px;
  cursor: pointer;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 16px;
  line-height: 24px;
  opacity: 1;
  outline: 0 solid transparent;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  word-break: break-word;
  border: 0;
  &.sm{
    width: 160px;
    padding: 2px;
  }
  &.primary{
    background-color: black;
    border: 1px solid #BDBDBD;
    color: #0156FF;
    text-transform: uppercase;
  }
  &.transparent {
    background: transparent;
    border: 1px solid #BDBDBD;
    color: gray;
    text-transform: uppercase;
  }
  :hover {
    /* box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px; */
  }
`
export default Button
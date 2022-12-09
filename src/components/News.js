import React from "react";
import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

const News = () => {
  let navigate = useNavigate();
  return (
    <>
      <Header />
      <Container>
        <Posts>
          <Post onClick={() => navigate("/news/1")} >
            <Img src="https://images.businessnewsdaily.com/app/uploads/2022/04/04074553/1554244010.jpeg" />
            <Content>
              <Title>How to fix my laptop?</Title>
              <Date>2022-06-11</Date>
              <Description>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam
                itaque dolor voluptates ullam, facere odio delectus modi sunt
                sapiente quibusdam dicta eos neque quaerat iure non obcaecati
                sit veniam maxime.
              </Description>
              <TagsPost>
                <TagItem>#How to fix</TagItem>
              </TagsPost>
            </Content>
          </Post>
          <Post onClick={() => navigate("/news/2")}>
            <Img src="http://winplasplas.com/wp-content/uploads/2021/06/mchin_180905_4061_0006.0.jpg" />
            <Content>
              <Title>How to choose the fastest laptop?</Title>
              <Date>2022-06-09</Date>
              <Description>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam
                itaque dolor voluptates ullam, facere odio delectus modi sunt
                sapiente quibusdam dicta eos neque quaerat iure non obcaecati
                sit veniam maxime.
              </Description>
              <TagsPost>
                <TagItem>#The fastest laptop</TagItem>
                <TagItem>#How to choose</TagItem>
              </TagsPost>
            </Content>
          </Post>
          <Post onClick={() => navigate("/news/3")}>
            <Img src="https://cdn1.hoanghamobile.com/tin-tuc/wp-content/uploads/2020/01/1-18.jpg" />
            <Content>
              <Title>How to choose laptop for programming?</Title>
              <Date>2022-06-08</Date>
              <Description>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam
                itaque dolor voluptates ullam, facere odio delectus modi sunt
                sapiente quibusdam dicta eos neque quaerat iure non obcaecati
                sit veniam maxime.
              </Description>
              <TagsPost>
                <TagItem>#Programming</TagItem>
                <TagItem>#How to choose</TagItem>
              </TagsPost>
            </Content>
          </Post>
        </Posts>
        <Tags>
          <TagItem>#How to fix</TagItem>
          <TagItem>#Programming</TagItem>
          <TagItem>#The fastest laptop</TagItem>
          <TagItem>#How to choose</TagItem>
        </Tags>
      </Container>
      <Footer />
    </>
  );
};

const Container = styled.div`
  width: 80%;
  margin: 40px auto;
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const Post = styled.div`
  border: 1px solid #f1f1f1;
  width: 98%;
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
  cursor: pointer;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;
const Posts = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const Tags = styled.div`
  width: 25%;
  background-color: #f5f7ff;
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  padding-top: 0px;
  height: fit-content;
  @media (max-width: 768px) {
    display: none;
  }
`;

const TagItem = styled.div`
  border: 1px solid gray;
  border-radius: 5px;
  width: fit-content;
  padding: 0 5px;
  margin: 5px;
  margin-left: 0;
  margin-bottom: 0;
  :hover {
    background-color: white;
    color: black;
    cursor: pointer;
  }
`;

const Title = styled.div`
  color: grey;
  font-weight: bold;
  font-size: 24px;
  :hover {
    color: #427ef5;
  }
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;
const Description = styled.div`
  color: gray;
  @media (max-width: 768px) {
    height: 50px;
    overflow: hidden;
  }
`;
const Img = styled.img`
  width: 30%;
`;

const TagsPost = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-top: 0px;
  height: fit-content;
  width: 100%;
  color: gray;
`;
const Date = styled.div`
  color: gray;
  margin-bottom: 5px;
`;
export default News;

import React from "react";
import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";

const News = () => {
  return (
    <>
      <Header />
      <Container>
        <Posts>
          <Post>
            <Img src="https://www.colourup.com.au/pub/media/wysiwyg/114aa63790aa455f53ed9c9d2c2915e3.png" />
            <Content>
              <Title>How to choose uniform?</Title>
              <Date>2022-06-11</Date>
              <Description>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam
                itaque dolor voluptates ullam, facere odio delectus modi sunt
                sapiente quibusdam dicta eos neque quaerat iure non obcaecati
                sit veniam maxime.
              </Description>
              <TagsPost>
                <TagItem>#How to choose</TagItem>
              </TagsPost>
            </Content>
          </Post>
          <Post>
            <Img src="https://www.chorltonhigh.manchester.sch.uk/images/news/239_HJR2943_ChorltonHigh_RoscoeRutter_Apr22.jpg" />
            <Content>
              <Title>Uniform?</Title>
              <Date>2022-06-09</Date>
              <Description>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam
                itaque dolor voluptates ullam, facere odio delectus modi sunt
                sapiente quibusdam dicta eos neque quaerat iure non obcaecati
                sit veniam maxime.
              </Description>
              <TagsPost>
                <TagItem>#Uniform</TagItem>
              </TagsPost>
            </Content>
          </Post>
          <Post>
            <Img src="https://i.pinimg.com/736x/83/fe/60/83fe60aaa9885e8675f44deda105d4bb.jpg" />
            <Content>
              <Title>Teamate?</Title>
              <Date>2022-06-08</Date>
              <Description>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam
                itaque dolor voluptates ullam, facere odio delectus modi sunt
                sapiente quibusdam dicta eos neque quaerat iure non obcaecati
                sit veniam maxime.
              </Description>
              <TagsPost>
                <TagItem>#Teamate</TagItem>
              </TagsPost>
            </Content>
          </Post>
        </Posts>
        <Tags>
          <TagItem>#Teamate</TagItem>
          <TagItem>#Uniform</TagItem>
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
  color: #427ef5;
  font-weight: bold;
  font-size: 24px;
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

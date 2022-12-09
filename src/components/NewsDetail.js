import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Footer from "./Footer";
import Header from "./Header";

const NewsDetail = () => {
  let navigate = useNavigate();
    return (
        <>
            <Header />
            <Container>
                <Title>How to fix my laptop?</Title>
                <Date>2022-06-11</Date>
                <Content>
                    <Img src="https://images.businessnewsdaily.com/app/uploads/2022/04/04074553/1554244010.jpeg" />
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
                <RelatedPost>
                    <Post onClick={()=>navigate('../news/2')}>
                        <RelatedTitle>How to choose the fastest laptop?</RelatedTitle>
                        <Date>2022-06-09</Date>
                    </Post>
                    <Post onClick={()=>navigate('../news/3')}>
                        <RelatedTitle>How to choose laptop for programming?</RelatedTitle>
                        <Date>2022-06-08</Date>
                    </Post>
                </RelatedPost>
            </Container>
            <Footer />
        </>
    );
};

const Container = styled.div`
  width: 80%;
  margin: 40px auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  padding: 10px;
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
  width: 100%;
  color: #427ef5;
  font-weight: bold;
  font-size: 1.5rem;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;
const RelatedTitle = styled.div`
  color: grey;
  font-weight: bold;
  font-size: 1.25rem;
  :hover {
        color: #427ef5;
  }
  @media (max-width: 768px) {
    font-size: 0.75rem;
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
  width: 100%;
`;
const Post = styled.div`
  padding: 0.2rem 0.3rem;
  width: 98%;
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
  cursor: pointer;
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
  width: 100%;
  color: gray;
  margin-bottom: 5px;
`;
const RelatedPost = styled.div`
  width: 30%;
`
export default NewsDetail;

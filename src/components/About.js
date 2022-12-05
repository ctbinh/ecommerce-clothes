import styled from "styled-components";

import Header from "./Header";
import Footer from "./Footer";

const About = () => {
    return (
        <>
            <Header></Header>
            <AboutPage>
                {/* <Row xs={1} md={2} className="g-4">
                    {info.map((member, idx) => (
                        <Col key={idx} >
                            <Card>
                                <Card.Img variant="top" src={member.img} />
                                <Card.Body>
                                    <Card.Title>{member.name}</Card.Title>
                                    <p>Member</p>
                                    <Card.Text>{member.description}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row> */}
            </AboutPage>
            <Footer></Footer>
        </>
    );
};

const AboutPage = styled.div`
  width: 70%;
  margin: 40px auto;
`;

export default About;

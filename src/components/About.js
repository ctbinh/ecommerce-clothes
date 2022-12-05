import styled from "styled-components";
import { Container, Row, Col } from "react-grid-system";
import Card from 'react-bootstrap/Card'
import { useNavigate } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

const About = () => {
    const info = [
        {
            "name": "Nguyễn Đình An",
            "img": "https://scontent.fsgn5-6.fna.fbcdn.net/v/t39.30808-6/178053479_1229183927541938_7523684796660373209_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=NJqPcCCP0aUAX_WEeW5&_nc_ht=scontent.fsgn5-6.fna&oh=00_AT9q-mtyqm1UF3TO6fYOuOPw2BXOCTJV6YXi8brGRQEsYA&oe=62A8E1AF",
            "title": "Member",
            "description": "Người chỉ rảnh sau 22h tối."
        },
        {
            "name": "Nguyễn Trần Hoàng",
            "img": "https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.6435-9/148352211_1315852945481787_1410223456476714730_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=Ud9SNO46P-gAX_WcUIM&tn=87UJuUIT5l0IIrcP&_nc_ht=scontent.fsgn5-6.fna&oh=00_AT-rKQidgpFk6hbmI_-c7UVi5MHd08E0hPuudTTVD9J_TA&oe=62CBA1A1",
            "title": "Member",
            "description": "Thanh niên duy nhất code front-end không cần mockup."
        },
        {
            "name": "Cao Thanh Bình",
            "img": "https://avatars.githubusercontent.com/u/62212632?v=4",
            "title": "Member",
            "description": "Git Proplayer"
        },
        {
            "name": "Nguyễn Thành Long",
            "img": "http://res.cloudinary.com/dd8b69mls/image/upload/v1654936303/hir4i0pt2gdtugsb9fgc.jpg",
            "title": "Member",
            "description": "Gánh ba cục tạ còn lại."
        }
    ]
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

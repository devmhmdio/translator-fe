import React, { useEffect, useState } from "react";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";
import {
  Block,
  BlockHead,
  BlockBetween,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Button,
  Row,
  ProjectCard,
  UserAvatar,
  Col,
  PreviewCard,
} from "../../../components/Component";
import { findUpper } from "../../../utils/Utils";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import socketIOClient from "socket.io-client";
import { Card, CardBody, CardHeader, CardText, CardTitle } from "reactstrap";

const WriterScreenPage = () => {
  const [sm, updateSm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [padContent, setPadContent] = useState("");
  const [fontSize, setFontSize] = useState(14);
  const [events, setEvents] = useState([]);
  const socket = socketIOClient("https://backend-23e46.ondigitalocean.app");
  let token;
  let decodedToken;
  const [data, setData] = useState([]);
  token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        decodedToken = jwt_decode(token);
        const currentDate = new Date();
        const expiryDate = new Date(decodedToken.exp * 1000);
        if (expiryDate < currentDate) {
          navigate("/auth-login");
        } else if (decodedToken.userRole !== "writer") {
          navigate("/auth-login");
        }
      } else {
        navigate("/auth-login");
      }

      try {
        const res = await axios.get(`https://backend-23e46.ondigitalocean.app/user/${decodedToken.id}`);

        if (res.data.message === "Invalid token specified") {
          navigate("/auth-login");
        }
        setData([res.data]);
        setIsLoading(false);
      } catch (e) {
        navigate("/auth-login");
      }
    };

    fetchData();
  }, [token, navigate]);

  useEffect(() => {
    if (data[0] && data[0]._id) {
      socket.emit('update_pad', { writer: data[0]._id, content: padContent });
    }
  }, [padContent, data]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const decodedData = jwt_decode(token);
    axios({
      method: "get",
      url: `https://backend-23e46.ondigitalocean.app/event-writer/${decodedData.name}`,
    }).then(res => setEvents(res.data)).catch(() => {console.log('error')})
  }, [])

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const increaseFontSize = () => {
    setFontSize(fontSize + 1); // Increase by 1px
  };

  const decreaseFontSize = () => {
    setFontSize(fontSize - 1); // Decrease by 1px
  };

  return (
    <>
      <Head title="Screens"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page>{data[0].name}'s Screen</BlockTitle>
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <Button
                  className={`btn-icon btn-trigger toggle-expand me-n1 ${sm ? "active" : ""}`}
                  onClick={() => updateSm(!sm)}
                >
                  <Icon name="menu-alt-r"></Icon>
                </Button>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <Block>
          <Row className="g-gs">
            <Col lg="12">
              <ProjectCard>
                <div className="project-head">
                  <a
                    href="#title"
                    onClick={(ev) => {
                      ev.preventDefault();
                    }}
                    className="project-title"
                  >
                    <UserAvatar className="sq" text={findUpper(data[0].name)} />
                    <div className="project-info">
                      <h6 className="title">{data[0].name}</h6>
                      <span className="sub-text">{data[0].its}</span>
                    </div>
                  </a>
                </div>
                <div className="project-details">
                  <div className="form-control-wrap">
                    <textarea
                      className="form-control form-control-sm"
                      id="cf-default-textarea"
                      placeholder="Write your translations..."
                      rows={25}
                      value={padContent}
                      onChange={(e) => setPadContent(e.target.value)}
                      style={{ fontSize: `${fontSize}px`, paddingTop: '20px' }}
                    ></textarea>
                    <div className="font-size-buttons1">
                      <Button color="primary" onClick={increaseFontSize}>A+</Button>
                        &nbsp;
                      <Button color="primary" onClick={decreaseFontSize}>A-</Button>
                    </div>
                    <br />
                    <Button color="primary" size="lg">
                      Save The Above Translation
                    </Button>
                  </div>
                </div>
              </ProjectCard>
            </Col>
          </Row>
        </Block>
        <Block size="lg">
          <BlockHeadContent>
            <BlockTitle>Events</BlockTitle>
            &nbsp;
          </BlockHeadContent>
          <PreviewCard>
            <Row className="g-gs">
            {events.map((data) => (
              <Col sm="6">
                <Card className="card-bordered" color="light">
                  <CardHeader>{data.hijriDate} | {data.englishDate}</CardHeader>
                  <CardBody className="card-inner">
                    <CardTitle tag="h5">{data.waaz}</CardTitle>
                    <CardText>
                      {data.content}
                    </CardText>
                  </CardBody>
                </Card>
              </Col>
            ))}
            </Row>
          </PreviewCard>
        </Block>
      </Content>
    </>
  );
};
export default WriterScreenPage;

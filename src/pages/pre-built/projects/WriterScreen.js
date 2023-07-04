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
} from "../../../components/Component";
import { findUpper } from "../../../utils/Utils";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import socketIOClient from "socket.io-client";

const WriterScreenPage = () => {
  const [sm, updateSm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [padContent, setPadContent] = useState("");
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
      console.log('line 67');
    }
  }, [padContent, data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
                    ></textarea>
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
      </Content>
    </>
  );
};
export default WriterScreenPage;

import React, { useEffect, useState } from "react";
import Content from "../../../layout/content/Content";
import { Block, Row, ProjectCard, Col, BlockHead, BlockBetween, BlockHeadContent, BlockTitle, Button, Icon } from "../../../components/Component";
import socketIOClient from "socket.io-client";
import { useNavigate } from "react-router-dom";

const MainScreenPage = () => {
  const [content, setContent] = useState("No preview available");
  const socket = socketIOClient("https://backend-23e46.ondigitalocean.app");
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("cast_screen", (padContent) => {
      console.log(`Received cast_screen event: ${padContent}`);
      const words = padContent.split(" ");
      if (words.length > 15) {
        padContent = words.slice(-15).join(" ");
      }
      setContent(padContent);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const onLoginClick = () => {
    navigate("/auth-login");
  };

  return (
    <Content id="main-screen-page">
      {/*<BlockHead size="sm">
        <BlockBetween>
          <BlockHeadContent>
            <BlockTitle page>Login Area</BlockTitle>
          </BlockHeadContent>
          <BlockHeadContent>
            <Button color="primary" onClick={onLoginClick}>
            <span>Login</span>
            <Icon name="user" />
            </Button>
          </BlockHeadContent>
        </BlockBetween>
  </BlockHead>*/}
      <Block>
        <Row className="g-gs">
          <Col lg="12">
            <ProjectCard>
              <div className="project-details">
                <div className="form-control-wrap">
                  <textarea
                    className="form-control form-control-sm main-screen"
                    id="cf-default-textarea"
                    value={content || ""}
                    rows={5}
                    disabled={true}
                  ></textarea>
                </div>
              </div>
            </ProjectCard>
          </Col>
        </Row>
      </Block>
    </Content>
  );
};
export default MainScreenPage;

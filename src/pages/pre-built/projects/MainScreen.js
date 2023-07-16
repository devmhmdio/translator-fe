import React, { useEffect, useState } from "react";
import Content from "../../../layout/content/Content";
import {
  Block,
  Row,
  ProjectCard,
  Col,
  Button,
} from "../../../components/Component";
import socketIOClient from "socket.io-client";

const MainScreenPage = () => {
  const [content, setContent] = useState("No preview available");
  const [fontSize, setFontSize] = useState(150);
  const socket = socketIOClient("https://backend-23e46.ondigitalocean.app");

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

  const increaseFontSize = () => {
    setFontSize(fontSize + 1);
  };

  const decreaseFontSize = () => {
    setFontSize(fontSize - 1);
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
                    style={{ fontSize: `${fontSize}px`, color: "#000", backgroundColor: "#fff", border: "none" }}
                  ></textarea>
                  <div className="font-size-buttons">
                    <Button color="primary" onClick={increaseFontSize}>A+</Button>
                    &nbsp;
                    <Button color="primary" onClick={decreaseFontSize}>A-</Button>
                  </div>
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

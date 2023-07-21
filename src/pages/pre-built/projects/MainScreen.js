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
import _ from "lodash";

const MainScreenPage = () => {
  const [content, setContent] = useState("No preview available");
  const [fontSize, setFontSize] = useState(150);
  const socket = socketIOClient("https://backend-23e46.ondigitalocean.app");

  const debouncedSetContent = _.throttle((padContent) => {
    const words = padContent.split(" ");
    const latestWords = words.length > 12 ? words.slice(-12) : words;
    setContent(latestWords.join(" "));
  }, 500);

  useEffect(() => {
    socket.on("cast_screen", debouncedSetContent);

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
      <Block>
        <Row className="g-gs">
          <Col lg="12">
            <ProjectCard>
              <div className="project-details">
                <div className="form-control-wrap">
                  <p
                    className="main-screen"
                    style={{ fontSize: `${fontSize}px`, color: "#000", backgroundColor: "#fff", border: "none", overflow: "auto", whiteSpace: "pre-wrap" }}
                  >
                    {content || ""}
                  </p>
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

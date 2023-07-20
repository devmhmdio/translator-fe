import React, { useEffect, useState, useRef } from "react";
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
  const [displayContent, setDisplayContent] = useState("");
  const socket = socketIOClient("https://backend-23e46.ondigitalocean.app");
  const textareaRef = useRef(null);

  useEffect(() => {
    socket.on("cast_screen", (padContent) => {
      console.log(`Received cast_screen event: ${padContent}`);
      // const words = padContent.split(" ");
      // if (words.length > 15) {
      //   padContent = words.slice(-15).join(" ");
      // }
      setContent(padContent);

      if (textareaRef.current) {
        textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // In your useEffect hook:
  // useEffect(() => {
  //   socket.on("cast_screen", (word) => {
  //     setDisplayContent((prev) => prev + " " + word);
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

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
                  <textarea
                    className="form-control form-control-sm main-screen"
                    id="cf-default-textarea"
                    value={content || ""}
                    rows={5}
                    disabled
                    style={{ fontSize: `${fontSize}px`, color: "#000", backgroundColor: "#fff", border: "none", overflow: "auto" }}
                    ref={textareaRef}
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

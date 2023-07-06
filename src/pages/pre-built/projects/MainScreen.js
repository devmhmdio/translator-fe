import React, { useEffect, useState } from "react";
import Content from "../../../layout/content/Content";
import { Block, Row, ProjectCard, Col } from "../../../components/Component";
import socketIOClient from 'socket.io-client';

const MainScreenPage = () => {
  const [content, setContent] = useState('No preview available');

  useEffect(() => {
    const socket = socketIOClient('https://backend-23e46.ondigitalocean.app');

    socket.on('cast_screen', (padContent) => {
      setContent(padContent);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

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
                    value={content || ''}
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

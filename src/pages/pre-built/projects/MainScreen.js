import React from "react";
import Content from "../../../layout/content/Content";
import {
  Block,
  Row,
  ProjectCard,
  Col,
} from "../../../components/Component";

const MainScreenPage = () => {
  return ( 
    <Content>
      <Block>
        <Row className="g-gs">
                <Col lg="12">
                  <ProjectCard>
                    <div className="project-details">
                    <div className="form-control-wrap">
                    <textarea
                      className="form-control form-control-sm main-screen"
                      id="cf-default-textarea"
                      placeholder="Write your message"
                      rows={4}
                    ></textarea>
                  </div>
                    </div>
                  </ProjectCard>
                </Col>
        </Row>
      </Block>
    </Content>
    )
};
export default MainScreenPage;

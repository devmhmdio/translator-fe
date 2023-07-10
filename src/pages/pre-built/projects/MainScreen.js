import React, { useEffect, useState, useRef, useReducer } from "react";
import Content from "../../../layout/content/Content";
import { Block, Row, ProjectCard, Col } from "../../../components/Component";
import socketIOClient from 'socket.io-client';

const initialState = 'No preview available';

function reducer(state, action) {
  switch (action.type) {
    case 'SET_CONTENT':
      return action.payload;
    default:
      return state;
  }
}

const MainScreenPage = () => {
  // const [content, dispatch] = useReducer(reducer, initialState);
  const [content, setContent] = useState('No preview available');
  // const textAreaRef = useRef(null);  // create ref
  const socket = socketIOClient('https://backend-23e46.ondigitalocean.app');

  useEffect(() => {
    socket.on('cast_screen', (padContent) => {
      console.log(`Received cast_screen event: ${padContent}`);
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
                    // ref={textAreaRef} // add ref to textarea
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

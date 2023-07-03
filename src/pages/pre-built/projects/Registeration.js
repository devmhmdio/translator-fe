import React from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import { Row, Col } from "reactstrap";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  BlockDes,
  BackTo,
  PreviewCard,
  Button,
} from "../../../components/Component";

const RegisterNewUserPage = ({ ...props }) => {
  return (
    <>
      <Head title="Form Layouts" />
      <Content page="component">
      <Block size="lg">
      <BlockHead>
        <BlockHeadContent>
          <BlockTitle tag="h5">Add Writer</BlockTitle>
        </BlockHeadContent>
      </BlockHead>
      <PreviewCard>
        <div className="card-head">
          <h5 className="card-title">Add Writer Details</h5>
        </div>
        <form>
          <Row className="g-4">
            <Col lg="6">
              <div className="form-group">
                <label className="form-label" htmlFor="full-name-1">
                  Full Name
                </label>
                <div className="form-control-wrap">
                  <input type="text" id="full-name-1" className="form-control" placeholder="Enter Fullname of Writer"/>
                </div>
              </div>
            </Col>
            <Col lg="6">
              <div className="form-group">
                <label className="form-label" htmlFor="its-id">
                  ITS ID
                </label>
                <div className="form-control-wrap">
                  <input type="number" id="its-id" className="form-control"  max={8} placeholder="Enter ITS ID"/>
                </div>
              </div>
            </Col>
            <Col lg="6">
              <div className="form-group">
                <label className="form-label" htmlFor="password">
                  Password
                </label>
                <div className="form-control-wrap">
                  <input type="password" id="password" className="form-control" placeholder="Enter Password" />
                </div>
              </div>
            </Col>
            <Col lg="6">
              <div className="form-group">
                <label className="form-label" htmlFor="confirm-password">
                Confirm Password
                </label>
                <div className="form-control-wrap">
                  <input type="password" id="confirm-password" className="form-control" placeholder="Confirm Password" />
                </div>
              </div>
            </Col>
            <Col xl="12">
              <Button color="primary" size="lg">
                Create Writer
              </Button>
            </Col>
          </Row>
        </form>
      </PreviewCard>
    </Block>
      </Content>
    </>
  );
};

export default RegisterNewUserPage;

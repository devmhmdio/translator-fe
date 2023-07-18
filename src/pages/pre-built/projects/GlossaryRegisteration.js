import React, { useEffect, useState } from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import { Row, Col } from "reactstrap";
import { Block, BlockHead, BlockHeadContent, BlockTitle, PreviewCard, Button } from "../../../components/Component";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterNewGlossaryWriterPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const [formData, setFormData] = useState({
    name: "",
    its: "",
    password: "",
    confirmPassword: "",
    userRole: "glossary_writer",
  });

  useEffect(() => {
    console.log("line 21", token);
    if (token) {
      const decodedToken = jwt_decode(token);
      const currentDate = new Date();
      const expiryDate = new Date(decodedToken.exp * 1000);
      if (expiryDate < currentDate) {
        navigate("/auth-login");
      }
    } else {
      navigate("/auth-login");
    }
    const decoded = jwt_decode(token);
    if (decoded.userRole !== "admin") {
      navigate("/auth-login");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://backend-23e46.ondigitalocean.app/user", formData)
      .then((res) => {
        console.log(res.data);
        console.log('Glossary writer created successfully');
        alert('Glossary writer created successfully');
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      })
      .catch((error) => {
        console.error(error);
        alert('Error creating user');
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      });
  };

  return (
    <>
      <Head title="Form Layouts" />
      <Content page="component">
        <Block size="lg">
          <BlockHead>
            <BlockHeadContent>
              <BlockTitle tag="h5">Add Glossary Writer</BlockTitle>
            </BlockHeadContent>
          </BlockHead>
          <PreviewCard>
            <div className="card-head">
              <h5 className="card-title">Add Glossary Writer Details</h5>
            </div>
            <form onSubmit={handleSubmit}>
              <Row className="g-4">
                <Col lg="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="full-name-1">
                      Full Name
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="text"
                        id="full-name-1"
                        className="form-control"
                        placeholder="Enter Fullname of Glossary Writer"
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                  </div>
                </Col>
                <Col lg="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="its-id">
                      ITS ID
                    </label>
                    <div className="form-control-wrap">
                      <input type="number" id="its-id" className="form-control" placeholder="Enter ITS ID" onChange={e => setFormData({ ...formData, its: e.target.value })}/>
                    </div>
                  </div>
                </Col>
                <Col lg="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="password">
                      Password
                    </label>
                    <div className="form-control-wrap">
                      <input type="password" id="password" className="form-control" placeholder="Enter Password" onChange={e => setFormData({ ...formData, password: e.target.value })}/>
                    </div>
                  </div>
                </Col>
                <Col lg="6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="confirm-password">
                      Confirm Password
                    </label>
                    <div className="form-control-wrap">
                      <input
                        type="password"
                        id="confirm-password"
                        className="form-control"
                        placeholder="Confirm Password"
                        onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                      />
                    </div>
                  </div>
                </Col>
                <Col xl="12">
                  <Button color="primary" size="lg" type="submit">
                    Create Glossary Writer
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

export default RegisterNewGlossaryWriterPage;

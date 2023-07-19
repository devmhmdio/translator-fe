import React, { useState, useEffect } from "react";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/ITS_Logo_Golden.png";
import Head from "../../layout/head/Head";
import {
  Block,
  BlockContent,
  BlockDes,
  BlockHead,
  BlockTitle,
  Button,
  Icon,
  PreviewCard,
} from "../../components/Component";
import { Form, Spinner, Alert } from "reactstrap";
import { useForm } from "react-hook-form";
import { Link, Route } from "react-router-dom";
import Footer from "../../layout/footer/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProjectCardPage from "../pre-built/projects/ProjectCard";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [passState, setPassState] = useState(false);
  const [errorVal, setError] = useState("");
  const navigate = useNavigate();

  const onFormSubmit = (formData) => {
    setLoading(true);
    axios({
      method: "get",
      url: `https://backend-23e46.ondigitalocean.app/its-user?its=${formData.its}`
    }).then(res => {
      if (formData.its == res.data.user.its && formData.passcode == res.data.user.password) {
        console.log('token', res.data.token)
        localStorage.setItem("accessToken", res.data.token);
        setTimeout(() => {
          if (res.data.user.userRole === "admin") {
            navigate("/admin");
          } else if (res.data.user.userRole === "glossary_writer") {
            navigate("/glossary-writer-screen");
          } else {
            navigate("/writer-screen");
          }
        }, 1000);
      } else {
        setTimeout(() => {
          setError("Cannot login with credentials");
          setLoading(false);
        }, 1000);
      }
    }).catch(e => console.log(e))
    
  };

  const {  register, handleSubmit, formState: { errors } } = useForm();

  return <>
    <Head title="Login" />
      <Block className="nk-block-middle nk-auth-body  wide-xs">
        <div className="brand-logo pb-4 text-center">
          <Link to={process.env.PUBLIC_URL + "/"} className="logo-link">
            <img className="logo-light logo-img logo-img-lg" src={Logo} alt="logo" />
            <img className="logo-dark logo-img logo-img-lg" src={LogoDark} alt="logo-dark" />
          </Link>
        </div>

        <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
          <BlockHead>
            <BlockContent>
              <BlockTitle tag="h4">Sign-In</BlockTitle>
              <BlockDes>
                <p>Access Transcriptions App using your ITS and password.</p>
              </BlockDes>
            </BlockContent>
          </BlockHead>
          {errorVal && (
            <div className="mb-3">
              <Alert color="danger" className="alert-icon">
                <Icon name="alert-circle" /> Unable to login with credentials{" "}
              </Alert>
            </div>
          )}
          <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
            <div className="form-group">
              <div className="form-label-group">
                <label className="form-label" htmlFor="default-01">
                  ITS Id
                </label>
              </div>
              <div className="form-control-wrap">
                <input
                  type="text"
                  id="default-01"
                  {...register('its', { required: "This field is required" })}
                  placeholder="Enter your ITS"
                  className="form-control-lg form-control" />
                {errors.name && <span className="invalid">{errors.name.message}</span>}
              </div>
            </div>
            <div className="form-group">
              <div className="form-label-group">
                <label className="form-label" htmlFor="password">
                  Password
                </label>
                {/*<Link className="link link-primary link-sm" to={`${process.env.PUBLIC_URL}/auth-reset`}>
                  Forgot Password?
          </Link>*/}
              </div>
              <div className="form-control-wrap">
                <a
                  href="#password"
                  onClick={(ev) => {
                    ev.preventDefault();
                    setPassState(!passState);
                  }}
                  className={`form-icon lg form-icon-right passcode-switch ${passState ? "is-hidden" : "is-shown"}`}
                >
                  <Icon name="eye" className="passcode-icon icon-show"></Icon>

                  <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                </a>
                <input
                  type={passState ? "text" : "password"}
                  id="password"
                  {...register('passcode', { required: "This field is required" })}
                  placeholder="Enter your password"
                  className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`} />
                {errors.passcode && <span className="invalid">{errors.passcode.message}</span>}
              </div>
            </div>
            <div className="form-group">
              <Button size="lg" className="btn-block" type="submit" color="primary">
                {loading ? <Spinner size="sm" color="light" /> : "Sign in"}
              </Button>
            </div>
          </Form>
        </PreviewCard>
      </Block>
      <Footer />
  </>;
};
export default Login;

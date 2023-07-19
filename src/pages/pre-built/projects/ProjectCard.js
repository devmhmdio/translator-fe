import React, { useEffect, useState } from "react";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";
import {
  Block,
  BlockHead,
  BlockBetween,
  BlockHeadContent,
  BlockTitle,
  BlockDes,
  Icon,
  Button,
  Row,
  ProjectCard,
  UserAvatar,
  Col,
  PaginationComponent,
} from "../../../components/Component";
import socketIOClient from "socket.io-client";
import { DropdownMenu, DropdownToggle, UncontrolledDropdown, DropdownItem } from "reactstrap";
import axios from "axios";
import { findUpper } from "../../../utils/Utils";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const ProjectCardPage = () => {
  const [sm, updateSm] = useState(false);
  const [data, setData] = useState([]);
  const [glossaryData, setGlossaryData] = useState([]);
  const [padContent, setPadContent] = useState(null);
  const [casting, setCasting] = useState(false);
  const [castingWriterId, setCastingWriterId] = useState(null);
  const [castingGlossary, setCastingGlossary] = useState(false);
  const [castingGlossaryWriterId, setCastingGlossaryWriterId] = useState(null);
  const token = localStorage.getItem("accessToken");
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
  const navigate = useNavigate();
  if (decoded.userRole !== "admin") {
    navigate("/auth-login");
  }
  useEffect(() => {
    axios({
      method: "get",
      url: "https://backend-23e46.ondigitalocean.app/users",
    })
      .then((res) => {
        setData(res.data.filter((data) => data.userRole === "writer"));
      })
      .catch((e) => console.log(e));

    axios({
      method: "get",
      url: "https://backend-23e46.ondigitalocean.app/users",
    })
      .then((res) => {
        setGlossaryData(res.data.filter((data) => data.userRole === "glossary_writer"));
      })
      .catch((e) => console.log(e));
  }, []);

  const [pads, setPads] = useState({});

  const socket = socketIOClient("https://backend-23e46.ondigitalocean.app");

  useEffect(() => {
    socket.on("update_pad", (updatedPad) => {
      setPads((prevPads) => ({
        ...prevPads,
        [updatedPad.writer]: updatedPad.content,
      }));
    });

    return () => {
      socket.off("update_pad");
    };
  }, []);

  useEffect(() => {
    socket.on("cast_screen", (content) => {
      setPadContent(content);
    });

    return () => {
      socket.off("cast_screen");
    };
  }, []);

  // const handleCastScreen = (writerId) => {
  //   socket.emit("cast_screen_request", { writerId, pads });
  //   setCasting(true);
  //   setCastingWriterId(writerId);
  // };

  const handleCastScreen = (writerId, isGlossaryWriter) => {
    if (isGlossaryWriter) {
      socket.emit("cast_screen_request", { writerId, pads });
      setCastingGlossary(true);
      setCastingGlossaryWriterId(writerId);
    } else if (!castingGlossary) {
      // Only cast regular writer screen if glossary writer isn't already casting
      socket.emit("cast_screen_request", { writerId, pads });
      setCasting(true);
      setCastingWriterId(writerId);
    }
  };

  // const handleStopCast = () => {
  //   socket.emit("stop_cast", castingWriterId);
  //   setCasting(false);
  //   setCastingWriterId(null);
  // };

  const handleStopCast = (isGlossaryWriter) => {
    if (isGlossaryWriter) {
      socket.emit("stop_cast", castingGlossaryWriterId);
      setCastingGlossary(false);
      setCastingGlossaryWriterId(null);
    } else {
      socket.emit("stop_cast", castingWriterId);
      setCasting(false);
      setCastingWriterId(null);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(8);

  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  let allData = [];
  allData.push(...glossaryData);
  allData.push(...data);
  const currentItems = allData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Head title="Screens"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page> Screens</BlockTitle>
              <BlockDes className="text-soft">You have total {data.length} screens</BlockDes>
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <Button
                  className={`btn-icon btn-trigger toggle-expand me-n1 ${sm ? "active" : ""}`}
                  onClick={() => updateSm(!sm)}
                >
                  <Icon name="menu-alt-r"></Icon>
                </Button>
              </div>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>
        <Block>
          <Row className="g-gs">
            {currentItems &&
              currentItems.map((item, idx) => {
                return (
                  <Col lg="6" key={item.id}>
                    <ProjectCard key={item.id}>
                      <div className="project-head">
                        <a
                          href="#title"
                          onClick={(ev) => {
                            ev.preventDefault();
                          }}
                          className="project-title"
                        >
                          <UserAvatar className="sq" theme={item.avatarClass} text={findUpper(item.name)} />
                          <div className="project-info">
                            <h6 className="title">{item.name}</h6>
                            <span className="sub-text">{item.its}</span>
                          </div>
                        </a>
                      </div>
                      <div className="project-details">
                        <div className="form-control-wrap">
                          <textarea
                            className="form-control form-control-sm"
                            id="cf-default-textarea"
                            disabled="true"
                            rows={10}
                            value={pads[item._id] || ""}
                          ></textarea>
                        </div>
                      </div>
                      <Button
                        style={
                          (casting && castingWriterId === item._id) ||
                          (castingGlossary && castingGlossaryWriterId === item._id)
                            ? { backgroundColor: "#164954", color: "#fff" }
                            : { borderColor: "#164954", borderWidth: "1px" }
                        }
                        onClick={
                          (casting && castingWriterId === item._id) ||
                          (castingGlossary && castingGlossaryWriterId === item._id)
                            ? () => handleStopCast(item.userRole === "glossary_writer")
                            : () => handleCastScreen(item._id, item.userRole === "glossary_writer")
                        }
                      >
                        <Icon
                          name={
                            (casting && castingWriterId === item._id) ||
                            (castingGlossary && castingGlossaryWriterId === item._id)
                              ? "stop"
                              : "play"
                          }
                        ></Icon>
                        <span></span>
                        {(casting && castingWriterId === item._id) ||
                        (castingGlossary && castingGlossaryWriterId === item._id)
                          ? "Live"
                          : "Cast Screen"}
                      </Button>
                    </ProjectCard>
                  </Col>
                );
              })}
          </Row>
          <div className="mt-3">
            <PaginationComponent
              itemPerPage={itemPerPage}
              totalItems={data.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>
        </Block>
      </Content>
    </>
  );
};
export default ProjectCardPage;

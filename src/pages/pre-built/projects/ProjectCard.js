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
import { DropdownMenu, DropdownToggle, UncontrolledDropdown, DropdownItem } from "reactstrap";
import axios from "axios";
import { findUpper } from "../../../utils/Utils";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const ProjectCardPage = () => {
  const [sm, updateSm] = useState(false);
  const [data, setData] = useState([]);
  const token = localStorage.getItem("accessToken");
  if (token) {
    const decodedToken = jwt_decode(token);
    const currentDate = new Date();
    const expiryDate = new Date(decodedToken.exp * 1000);
    if (expiryDate < currentDate) {
      navigate('/auth-login');
    }
  } else {
    navigate('/auth-login');
  }
  const decoded = jwt_decode(token);
  const navigate = useNavigate();
  if (decoded.userRole !== 'admin') {
    navigate('/auth-login')
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
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(8);

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
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
                    <ProjectCard>
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
                        <UncontrolledDropdown>
                          <DropdownToggle
                            tag="a"
                            className="dropdown-toggle btn btn-sm btn-icon btn-trigger mt-n1 me-n1"
                          >
                            <Icon name="more-h"></Icon>
                          </DropdownToggle>
                          <DropdownMenu end>
                            <ul className="link-list-opt no-bdr">
                              <li>
                                <DropdownItem tag="a" href="#edit">
                                  <Icon name="edit"></Icon>
                                  <span>Cast Screen</span>
                                </DropdownItem>
                              </li>

                              <li>
                                <DropdownItem
                                  tag="a"
                                  href="#markasdone"
                                  onClick={(ev) => {
                                    ev.preventDefault();
                                  }}
                                >
                                  <Icon name="check-round-cut"></Icon>
                                  <span>Stop Cast</span>
                                </DropdownItem>
                              </li>
                            </ul>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>
                      <div className="project-details">
                        <div className="form-control-wrap">
                          <textarea
                            className="form-control form-control-sm"
                            id="cf-default-textarea"
                            placeholder="Write your message"
                            disabled="true"
                            rows={10}
                          ></textarea>
                        </div>
                      </div>
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

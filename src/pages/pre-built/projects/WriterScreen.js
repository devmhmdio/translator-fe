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
import { projectData } from "./ProjectData";
import { findUpper, setDeadline, setDeadlineDays, calcPercentage } from "../../../utils/Utils";
import {
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  Progress,
  DropdownItem,
  Badge
} from "reactstrap";
import FormModal from "./FormModal";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const WriterScreenPage = () => {
  const [sm, updateSm] = useState(false);
  const [modal, setModal] = useState({
    add: false,
    edit: false,
  });
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
  if (decoded.userRole !== 'writer') {
    navigate('/auth-login')
  }
  useEffect(() => {
    axios({
      method: "get",
      url: `https://backend-23e46.ondigitalocean.app/user/${decoded.id}`,
    })
      .then((res) => {
        setData([res.data]);
      })
      .catch((e) => console.log(e));
  }, []);
  const [editId, setEditedId] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage] = useState(8);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    lead: "",
    tasks: 0,
    team: [],
    totalTask: 0,
    date: new Date(),
  });
  const [editFormData, setEditFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    lead: "",
    tasks: 0,
    team: [],
    totalTask: 0,
    date: new Date(),
  });

  // function to reset the form
  const resetForm = () => {
    setFormData({
      title: "",
      subtitle: "",
      description: "",
      lead: "",
      tasks: 0,
      team: [],
      totalTask: 0,
      date: new Date(),
    });
  };

  const closeModal = () => {
    setModal({ add: false })
    resetForm();
  };

  const closeEditModal = () => {
    setModal({ edit: false })
    resetForm();
  };

  // submit function to add a new item
  const onFormSubmit = (sData) => {
    const { title, subtitle, description, tasks, totalTask } = sData;
    let submittedData = {
      id: data.length + 1,
      avatarClass: "pink",
      title: title,
      subtitle: subtitle,
      desc: description,
      lead: formData.lead,
      team: formData.team,
      tasks: tasks,
      totalTask: totalTask,
      deadline: new Date(`${formData.date}`), // Format ** mm/dd/yyyy
    };
    setData((data) => [submittedData, ...data]);
    resetForm();
    setModal({ add: false });
  };

  // submit function to update a new item
  const onEditSubmit = (sData) => {
    const { title, subtitle, description, tasks, totalTask } = sData;
    let submittedData;
    let newitems = data;
    newitems.forEach((item) => {
      if (item.id === editId) {
        submittedData = {
          id: item.id,
          avatarClass: item.avatarClass,
          title: title,
          subtitle: subtitle,
          desc: description,
          lead: editFormData.lead,
          tasks: tasks,
          totalTask: totalTask,
          deadline: new Date(`${editFormData.date}`), // Format ** mm/dd/yyyy
          team: editFormData.team,
        };
      }
    });
    let index = newitems.findIndex((item) => item.id === editId);
    newitems[index] = submittedData;
    setModal({ edit: false });
    resetForm();
  };

  // function that loads the want to editted data
  const onEditClick = (id) => {
    data.forEach((item) => {
      if (item.id === id) {
        setEditFormData({
          title: item.title,
          subtitle: item.subtitle,
          description: item.desc,
          lead: item.lead,
          team: item.team,
          tasks: item.tasks,
          totalTask: item.totalTask,
          date: item.deadline,
        });
        setModal({ edit: true }, { add: false });
        setEditedId(id);
      }
    });
  };

  // function to change the complete a project property
  const completeProject = (id) => {
    let newData = data;
    let index = newData.findIndex((item) => item.id === id);
    newData[index].deadline = setDeadline(0);
    setData([...newData]);
  };

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return <>
    <Head title="Screens"></Head>
    <Content>
      <BlockHead size="sm">
        <BlockBetween>
          <BlockHeadContent>
            <BlockTitle page>{data[0].name}'s Screen</BlockTitle>
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
                <Col lg="12">
                  <ProjectCard>
                    <div className="project-head">
                      <a
                        href="#title"
                        onClick={(ev) => {
                          ev.preventDefault();
                        }}
                        className="project-title"
                      >
                        <UserAvatar className="sq" text={findUpper(data[0].name)} />
                        <div className="project-info">
                          <h6 className="title">{data[0].name}</h6>
                          <span className="sub-text">{data[0].its}</span>
                        </div>
                      </a>
                    </div>
                    <div className="project-details">
                    <div className="form-control-wrap">
                    <textarea
                      className="form-control form-control-sm"
                      id="cf-default-textarea"
                      placeholder="Write your translations..."
                      rows={25}
                    ></textarea>
                    <br />
                    <Button color="primary" size="lg">
                      Save The Above Translation
                    </Button>
                  </div>
                    </div>
                  </ProjectCard>
                </Col>
        </Row>
      </Block>
      
      <FormModal modal={modal.add} modalType="add" formData={formData} setFormData={setFormData} closeModal={closeModal} onSubmit={onFormSubmit} />
      <FormModal modal={modal.edit} modalType="edit" formData={editFormData} setFormData={setEditFormData} closeModal={closeEditModal} onSubmit={onEditSubmit} />
    </Content>
  </>;
};
export default WriterScreenPage;

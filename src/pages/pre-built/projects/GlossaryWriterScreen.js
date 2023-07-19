import React, { useEffect, useState } from "react";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";
import {
  Block,
  BlockHead,
  BlockBetween,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Button,
  Row,
  ProjectCard,
  UserAvatar,
  Col,
  PreviewCard,
} from "../../../components/Component";
import { findUpper } from "../../../utils/Utils";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import socketIOClient from "socket.io-client";
import { Card, CardBody, CardHeader, CardText, CardTitle, Table } from "reactstrap";

const GlossaryWriterScreenPage = () => {
  const [sm, updateSm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tableRows, setTableRows] = useState([["", ""]]);
  const [padContent, setPadContent] = useState("");
  const [fontSize, setFontSize] = useState(14);
  const [isCasting, setIsCasting] = useState(false);
  const [events, setEvents] = useState([]);
  const socket = socketIOClient("https://backend-23e46.ondigitalocean.app");
  let token;
  let decodedToken;
  const [data, setData] = useState([]);
  token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        decodedToken = jwt_decode(token);
        const currentDate = new Date();
        const expiryDate = new Date(decodedToken.exp * 1000);
        if (expiryDate < currentDate) {
          navigate("/auth-login");
        } else if (decodedToken.userRole !== "glossary_writer") {
          navigate("/auth-login");
        }
      } else {
        navigate("/auth-login");
      }

      try {
        const res = await axios.get(`https://backend-23e46.ondigitalocean.app/user/${decodedToken.id}`);

        if (res.data.message === "Invalid token specified") {
          navigate("/auth-login");
        }
        setData([res.data]);
        setIsLoading(false);
      } catch (e) {
        navigate("/auth-login");
      }
    };

    fetchData();
  }, [token, navigate]);

  useEffect(() => {
    if (data[0] && data[0]._id) {
      socket.emit("update_pad", { writer: data[0]._id, content: padContent });
    }
  }, [padContent, data]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const decodedData = jwt_decode(token);
    axios({
      method: "get",
      url: `https://backend-23e46.ondigitalocean.app/event-writer/${decodedData.name}`,
    })
      .then((res) => setEvents(res.data))
      .catch(() => {
        console.log("error");
      });
  }, []);

  useEffect(() => {
    if (data[0] && data[0]._id) {
      const intervalId = setInterval(async () => {
        try {
          const isLiveRes = await axios.get(`https://backend-23e46.ondigitalocean.app/isLive/${data[0]._id}`);
          setIsCasting(isLiveRes.data.isLive);
        } catch (e) {
          console.error("Failed to fetch isLive status:", e);
        }
      }, 10000); // 10000 milliseconds = 10 seconds

      return () => clearInterval(intervalId);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const increaseFontSize = () => {
    setFontSize(fontSize + 1); // Increase by 1px
  };

  const decreaseFontSize = () => {
    setFontSize(fontSize - 1); // Decrease by 1px
  };

  const addRow = () => {
    setTableRows([...tableRows, ["", ""]]);
  };

  const deleteRow = (index) => {
    const newTableRows = tableRows.filter((row, idx) => idx !== index);
    setTableRows(newTableRows);
  };

  const handleCellChange = (event, rowIndex, colIndex) => {
    const newTableRows = [...tableRows];
    newTableRows[rowIndex][colIndex] = event.target.value;
    setTableRows(newTableRows);
  };

  return (
    <>
      <Head title="Screens"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page>{data[0].name}'s Screen</BlockTitle>
              {isCasting && (
                <Button className="you-are-live-button" size="lg">
                  You are live
                </Button>
              )}
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
              <Table className="my-table">
                <tbody>
                  {tableRows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((col, colIndex) => (
                        <td key={colIndex}>
                          <input
                            type="text"
                            value={col}
                            onChange={(e) => handleCellChange(e, rowIndex, colIndex)}
                            className="cell-input"
                          />
                        </td>
                      ))}
                      <td>
                        <Button className="delete-row-button" color="danger" onClick={() => deleteRow(rowIndex)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Button className="add-row-button" color="primary" size="lg" onClick={addRow}>
                Add Row
              </Button>
            </Col>
          </Row>
        </Block>
        {/*<Block size="lg">
          <BlockHeadContent>
            <BlockTitle>Events</BlockTitle>
            &nbsp;
          </BlockHeadContent>
          <PreviewCard>
            <Row className="g-gs">
              {events.map((data) => (
                <Col sm="6">
                  <Card className="card-bordered" color="light">
                    <CardHeader>
                      {data.hijriDate} | {data.englishDate}
                    </CardHeader>
                    <CardBody className="card-inner">
                      <CardTitle tag="h5">{data.waaz}</CardTitle>
                      <CardText>{data.content}</CardText>
                    </CardBody>
                  </Card>
                </Col>
              ))}
            </Row>
          </PreviewCard>
              </Block>*/}
      </Content>
    </>
  );
};
export default GlossaryWriterScreenPage;

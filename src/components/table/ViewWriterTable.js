import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { viewWriterData } from "./TableData";
import { Button, Icon } from "../Component";
import axios from "axios";

const WriterTable = ({ headColor, striped, border, hover, responsive }) => {
  const tableClass = classNames({
    table: true,
    "table-bordered": border,
    "table-borderless": !border,
    "table-striped": striped,
    "table-hover": hover,
  });
  const [writerData, setWriterData] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: "https://backend-23e46.ondigitalocean.app/writers",
    }).then((res) => {
      console.log('this is res', res)
      setWriterData(res.data);
    }).catch((e) => console.log(e));
  }, [])

  const handleWriterDelete = (id) => {
    axios({
      method: "delete",
      url: `https://backend-23e46.ondigitalocean.app/user/${id}`,
    }).then((res) => {
      console.log('this is res', res)
      setWriterData(res.data);
    }).catch((e) => console.log(e));
  }

  return (
    <div className={responsive ? "table-responsive" : ""}>
      <table className={tableClass}>
        <thead className={`${headColor ? `table-${headColor}` : ""}`}>
          <tr>
            {viewWriterData.header.map((item, idx) => {
              return <th key={idx}>{item}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {writerData.map((item) => {
            return (
              <tr key={item._id}>
                <td>{item.its}</td>
                <td>{item.name}</td>
                <td><Button color="danger" onClick={handleWriterDelete(item._id)}><Icon name="trash"></Icon></Button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default WriterTable;

import React, { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  PreviewCard,
  Button
} from "../../../components/Component";
import { RSelect } from "../../../components/Component";
import { WaazOption, defaultOptions, groupedData } from "../../components/forms/SelectData";
import makeAnimated from "react-select/animated";
import axios from "axios";

const CreateNewEvent = () => {
  const animatedComponents = makeAnimated();
  const [writers, setWriters] = useState([]);
  let writerData = {
    id: "",
    value: "",
    label: "",
  };
  const [selectedWriters, setSelectedWriters] = useState([]);
  const [hijriDate, setHijriDate] = useState(null);
  const [englishDate, setEnglishDate] = useState(null);
  const [waaz, setWaaz] = useState(null);

  useEffect(() => {
    axios({
      method: "get",
      url: `https://backend-23e46.ondigitalocean.app/writers`,
    })
      .then((response) => {
        setWriters(response.data.map(writer => writerData = {id: writer._id, value: writer.name, label: writer.name}))
      })
      .catch((error) => {
        console.log(error);
      });
  }, [])

  const onCreateEvent = () => {
    console.log("Event Created");
    console.log('this is all data', {
      waaz: waaz,
      writers: selectedWriters,
      hijriDate: hijriDate,
      englishDate: englishDate
    })
    axios.post('https://backend-23e46.ondigitalocean.app/event', {
      waaz: waaz,
      writers: selectedWriters,
      hijriDate: hijriDate,
      englishDate: englishDate
    }).then(res => {
      console.log(res.data);
    }).catch(error => {
      console.error(error);
    });
  };

  return (
    <>
      <Head title="Form Elements" />
      <Content page="component">
        <Block size="lg">
          <BlockHead>
            <BlockHeadContent>
              <BlockTitle tag="h5">Create Event </BlockTitle>
            </BlockHeadContent>
          </BlockHead>
          <PreviewCard>
            <Row className="gy-4">
              <Col sm={6}>
                <div className="form-group">
                  <label className="form-label">Select Waaz</label>
                  <RSelect options={WaazOption} onChange={selectedOption => setWaaz(selectedOption.value)} />
                </div>
              </Col>
              <Col sm={6}>
                <div className="form-group">
                  <label className="form-label">Select Writer</label>
                  <RSelect
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    defaultData={[writers[0], writers[1]]}
                    isMulti
                    options={writers}
                    onChange={selectedOption => setSelectedWriters(selectedOption.map(item => item.value))}
                  />
                </div>
              </Col>
              <Col sm={6}>
                <div className="form-group">
                  <label className="form-label">Select Hijri Date</label>
                  <RSelect options={groupedData} onChange={selectedOption => setHijriDate(selectedOption.value)} />
                </div>
              </Col>
              <Col sm={6}>
                <div className="form-group">
                  <label className="form-label">Select English Date</label>
                  <RSelect options={defaultOptions} onChange={selectedOption => setEnglishDate(selectedOption.value)} />
                </div>
              </Col>
              <Col xl="12">
                  <Button color="primary" size="lg" type="submit" onClick={onCreateEvent}>
                    Create Event
                  </Button>
                </Col>
            </Row>
          </PreviewCard>
        </Block>
      </Content>
    </>
  );
};
export default CreateNewEvent;

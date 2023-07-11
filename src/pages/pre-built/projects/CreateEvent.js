import React from "react";
import { Row, Col } from "reactstrap";
import Head from "../../../layout/head/Head";
import Content from "../../../layout/content/Content";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  PreviewCard,
  CodeBlock,
  OutlinedInput,
  Button
} from "../../../components/Component";
import { RSelect } from "../../../components/Component";
import { WaazOption,defaultOptions, colourData, groupedData } from "../../components/forms/SelectData";
import makeAnimated from "react-select/animated";

const CreateNewEvent = () => {
  const animatedComponents = makeAnimated();

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
                  <RSelect options={WaazOption} />
                </div>
              </Col>
              <Col sm={6}>
                <div className="form-group">
                  <label className="form-label">Select Writer</label>
                  <RSelect
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    defaultData={[colourData[0], colourData[1]]}
                    isMulti
                    options={colourData}
                  />
                </div>
              </Col>
              <Col sm={6}>
                <div className="form-group">
                  <label className="form-label">Select Hijri Date</label>
                  <RSelect options={groupedData} />
                </div>
              </Col>
              <Col sm={6}>
                <div className="form-group">
                  <label className="form-label">Select English Date</label>
                  <RSelect options={defaultOptions} />
                </div>
              </Col>
              <Col xl="12">
                  <Button color="primary" size="lg" type="submit">
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

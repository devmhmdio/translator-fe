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
          <PreviewCard>
            <span className="preview-title-lg overline-title">Outlined Preview</span>
            <Row className="gy-4">
              <Col lg="4" sm="6">
                <div className="form-group">
                  <OutlinedInput id="outlined-normal" label="Input text outline" size="xl" />
                </div>
              </Col>
              <Col lg="4" sm="6">
                <div className="form-group">
                  <OutlinedInput id="outlined-icon" label="Input with icon" size="xl" icon="user" />
                </div>
              </Col>
            </Row>
            <hr className="preview-hr"></hr>
            <span className="preview-title-lg overline-title">Outlined Sizes</span>
            <Row className="gy-4">
              <Col sm="6" lg="4">
                <div className="form-group">
                  <OutlinedInput id="outlined-xl" label="Input text xl" size="xl" />
                </div>
              </Col>
              <Col sm="6" lg="4">
                <div className="form-group">
                  <OutlinedInput id="outlined-lg" label="Input text lg" size="lg" />
                </div>
              </Col>
              <Col sm="6" lg="4">
                <div className="form-group">
                  <OutlinedInput label="Input Text" id="outlined-default" />
                </div>
              </Col>
            </Row>
          </PreviewCard>
          <CodeBlock language="jsx">{`import { OutlinedInput } from "../../components/Components" 
    
    <OutlinedInput id="outlined-icon" label="Input with icon" size="xl" icon="user" />`}</CodeBlock>
        </Block>

        <Block size="lg">
          <BlockHead>
            <BlockHeadContent>
              <BlockTitle tag="h5">React Select</BlockTitle>
            </BlockHeadContent>
          </BlockHead>
          <PreviewCard>
            <Row className="gy-4">
              <Col sm={6}>
                <div className="form-group">
                  <label className="form-label">Select Default</label>
                  <RSelect options={defaultOptions} />
                </div>
              </Col>
              <Col sm={6}>
                <div className="form-group">
                  <label className="form-label">Select Multiple</label>
                  <RSelect options={defaultOptions} isMulti />
                </div>
              </Col>
              <Col sm={6}>
                <div className="form-group">
                  <label className="form-label">Select Grouped</label>
                  <RSelect options={groupedData} />
                </div>
              </Col>
              <Col sm={6}>
                <div className="form-group">
                  <label className="form-label">Select Animated</label>
                  <RSelect
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    defaultData={[colourData[0], colourData[1]]}
                    isMulti
                    options={colourData}
                  />
                </div>
              </Col>
            </Row>
          </PreviewCard>

          <CodeBlock>{`const Example () => {
      const options = {
        { value: "chocolate", label: "Chocolate" },
        { value: "strawberry", label: "Strawberry" },
        { value: "vanilla", label: "Vanilla" },
      }
      const animatedComponents = makeAnimated();
    
      return (
        // For default
        <RSelect options={options}/>
    
        // For Mutilple
        <RSelect isMulti options={options}/>
    
        // For Animation
        <RSelect isMulti components={animatedComponents} options={options} 
      )
    }`}</CodeBlock>
        </Block>
        <Block size="lg">
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
            </Row>
          </PreviewCard>
        </Block>
      </Content>
    </>
  );
};
export default CreateNewEvent;

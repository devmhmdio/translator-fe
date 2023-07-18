import React from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  PreviewCard,
} from "../../../components/Component";
import ViewGlossaryTable from "../../../components/table/ViewGlossaryWriterTable";

const ViewGlossary = () => {
  return (
    <>
      <Head title="View Writers" />
      <Content page="component">
        <Block size="lg">
          <BlockHead>
            <BlockHeadContent>
              <BlockTitle tag="h5">View Glossary Writers</BlockTitle>
            </BlockHeadContent>
          </BlockHead>
          <PreviewCard>
            <ViewGlossaryTable responsive></ViewGlossaryTable>
          </PreviewCard>
        </Block>
      </Content>
    </>
  );
};
export default ViewGlossary;

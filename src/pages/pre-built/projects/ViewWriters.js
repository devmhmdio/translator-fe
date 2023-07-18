import React from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  BlockDes,
  BackTo,
  PreviewCard,
  CodeBlock,
} from "../../../components/Component";
import ViewWriterTable from "../../../components/table/ViewWriterTable";

const ViewWriters = () => {
  return (
    <>
      <Head title="View Writers" />
      <Content page="component">
        <Block size="lg">
          <BlockHead>
            <BlockHeadContent>
              <BlockTitle tag="h5">View Writers</BlockTitle>
            </BlockHeadContent>
          </BlockHead>
          <PreviewCard>
            <ViewWriterTable responsive></ViewWriterTable>
          </PreviewCard>
        </Block>
      </Content>
    </>
  );
};
export default ViewWriters;

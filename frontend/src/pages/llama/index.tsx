import React from "react";
import { NextPage } from "next";
import Llama from "../../components/Llama";
import Layout from "../../components/Layout/Layout";

const LlamaPage: NextPage = () => {
  return (
    <Layout>
      <Llama />
    </Layout>
  );
};

export default LlamaPage;

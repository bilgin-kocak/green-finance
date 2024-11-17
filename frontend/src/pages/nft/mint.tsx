import React from "react";
import { NextPage } from "next";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import Layout from "../../components/Layout/Layout";
import MintNFT from "../../components/NFT/MintNFT";

const MintNFTPage: NextPage = () => {
  return (
    <>
      <Layout>
        <MintNFT />
      </Layout>
    </>
  );
};

export default MintNFTPage;

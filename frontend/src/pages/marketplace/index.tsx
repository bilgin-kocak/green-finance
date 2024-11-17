import React from "react";
import { NextPage } from "next";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import Layout from "../../components/Layout/Layout";
import ItemList from "../../components/Marketplace/ItemList";

const MarketplacePage: NextPage = () => {
  return (
    <>
      <Layout>
        <ItemList />
      </Layout>
    </>
  );
};

export default MarketplacePage;

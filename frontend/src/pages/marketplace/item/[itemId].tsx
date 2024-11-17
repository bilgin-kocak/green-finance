import React from "react";
import { NextPage } from "next";
import Header from "../../../components/Layout/Header";
import Footer from "../../../components/Layout/Footer";
import Layout from "../../../components/Layout/Layout";
import ItemDetail from "../../../components/Marketplace/ItemDetail";
import { useParams } from "next/navigation";

const ItemDetailPage: NextPage = () => {
  const params = useParams();
  let itemId: string | string[] = "";
  if (params && params.itemId) {
    itemId = params.itemId;
  }
  return (
    <>
      <Layout>{params && <ItemDetail itemId={itemId} />}</Layout>
    </>
  );
};

export default ItemDetailPage;

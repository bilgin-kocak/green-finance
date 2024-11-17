import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
import React from "react";
import { NextPage } from "next";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import Layout from "../components/Layout/Layout";
import Llama from "@/components/Llama";
import Home from "../components/Home";

const IndexPage: NextPage = () => {
  return (
    <>
      <Layout>
        <Home />
        <Llama />
      </Layout>
    </>
  );
};

export default IndexPage;

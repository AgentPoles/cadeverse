import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import MakeNft from "../components/MakeNft";
import Masonry from "../components/Masonry";
import Finish from "../components/Finish";
import { useState } from "react";
import { create } from "ipfs-http-client";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import storage from "../storage/firebasefile";
import Identities from "../components/Identities";
import Herob from "../components/Herob";
import Footer from "../components/Footer";

// require("dotenv").config();

const Home = () => {
  const [fileUrl, updateFileUrl] = useState("");
  const [nft, setNft] = useState({
    image: "",
    name: "",
    description: "",
    image_name: "",
  });

  const cliente = create("https://ipfs.infura.io:5001/api/v0");

  return (
    <div className="container">
      <Herob></Herob>
    </div>
  );
};

export default Home;

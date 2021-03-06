import React from "react";
import { useState } from "react";
import Home from "./pages/Home";
import MakeNft from "./components/MakeNft";
import Finish from "./components/Finish";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import storage from "./storage/firebasefile";
import { toast } from "react-toastify";
import ToastContent from "./components/ToastContent";
import Collections from "./pages/Collections";
import PublicCollections from "./pages/PublicCollections";

const App = () => {
  // Import the functions you need from the SDKs you need
  let navigate = useNavigate();

  const [nft, setNft] = useState({
    image: "",
    name: "",
    description: "",
    image_name: "",
  });

  let proceed = async (e, nft) => {
    e.preventDefault();

    if (
      nft.image === null ||
      nft.name === null ||
      nft.description === null ||
      nft.description === "" ||
      nft.name === ""
    ) {
      toast(<ToastContent text={"missing field"} />, {
        position: toast.POSITION.BOTTOM_CENTER,
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
      return;
    }
    console.log(nft);
    const id = toast.loading(<ToastContent text={"storing image..."} />, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

    // 'file' comes from the Blob or File API
    try {
      const storageRef = ref(storage, nft.image_name);
      uploadBytes(storageRef, nft.image).then((snapshot) => {
        console.log("Uploaded a blob or file!");
        getDownloadURL(storageRef)
          .then((res) => {
            setNft({ ...nft, image: res });
            toast.update(id, {
              render: <ToastContent text={"stored successfully"} />,
              type: "success",
              isLoading: false,
              autoClose: 2000,
              position: toast.POSITION.BOTTOM_CENTER,
            });
            navigate("/mint");
          })
          .catch((e) =>
            toast.update(id, {
              render: <ToastContent text={`failed to store due to ${e}`} />,
              type: "error",
              isLoading: false,
              autoClose: 5000,
              position: toast.POSITION.BOTTOM_CENTER,
            })
          );
      });
    } catch (error) {
      toast.update(id, {
        render: <ToastContent text={`failed to store due to ${e}`} />,
        type: "error",
        isLoading: false,
        autoClose: 5000,
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header></Header>
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/makenft"
            exact
            element={<MakeNft buttonFunction={proceed} />}
          />
          <Route path="/mint" exact element={<Finish nft={nft} />} />
          <Route path="/collections" exact element={<Collections />} />
          <Route
            path="/publiccollections"
            exact
            element={<PublicCollections />}
          />
          {/* <Redirect from="*" to="/" /> */}
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;

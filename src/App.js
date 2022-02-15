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

    const id = toast.loading(<ToastContent text={"storing image..."} />, {
      position: toast.POSITION.BOTTOM_CENTER,
    });

    const storageRef = ref(storage, nft.image_name);

    // 'file' comes from the Blob or File API
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
            autoClose: 2000,
            position: toast.POSITION.BOTTOM_CENTER,
          })
        );
    });
  };

  return (
    <div>
      <Header></Header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/makenft"
          exact
          element={<MakeNft buttonFunction={proceed} />}
        />
        <Route path="/mint" exact element={<Finish nft={nft} />} />
        <Route path="/collections" exact element={<Collections />} />
        {/* <Redirect from="*" to="/" /> */}
      </Routes>
      <Footer />
    </div>
  );
};

export default App;

import React from "react";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import IdentityCollections from "../components/Identities";
import abi from "../contracts/NFT.json";
import { toast } from "react-toastify";
import ToastContent from "../components/ToastContent";
import { Shimmer } from "react-shimmer";

let idb;

const Collections = () => {
  const contractAddress = "0x30D87625b9991Cf5a28cf89d8AEb897A49987488";
  const contractABI = abi.abi;
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [userAddress, setUserAddress] = useState(null);
  const [collection, setUserCollection] = useState(null);
  const [identities, setIdentities] = useState(null);
  const [retrieved, setRetrieved] = useState(false);

  const showError = (text) => {
    toast.error(<ToastContent text={text} />, {
      position: toast.POSITION.TOP_LEFT,
      autoClose: 5000,
    });
  };

  const showSuccess = (text) => {
    toast.success(<ToastContent text={text} />, {
      position: toast.POSITION.TOP_LEFT,
      autoClose: 2000,
    });
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const account = accounts[0];
        setIsWalletConnected(true);
        setUserAddress(account);
        console.log("Account Connected: ", account);
      } else {
        // showMessageDefault();
        // setError("Please install a MetaMask wallet to use the Dao.");
        showError("no metamask detected");
      }
    } catch (error) {
      showError(`wallet connection failed due to ${error}`);
    }
  };
  const getUserCollection = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const ExistenceContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        let collection = await ExistenceContract.getCollection();

        setUserCollection(collection.toString());
        if (collection.toString() !== null) {
          processCollection(collection.toString());
        }
      }
    } catch (error) {
      console.log(error);
      showError(`this error occured: ${error}`);
    }
  };

  const getTokeUrle = async (tokenId) => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const ExistenceContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        let url = await ExistenceContract.getTokenUrl(tokenId);
        return url;
      }
    } catch (error) {
      console.log(error);
      showError(`this error occured: ${error}`);
    }
  };

  const processCollection = async (collection) => {
    try {
      let array = collection.split(",");
      let identitiese = [];

      const urlArray = await Promise.all(
        array.map((item) => {
          if (item !== "") {
            let id = parseInt(item, 10);
            return getTokeUrle(id);
          } else {
            return "";
          }
        })
      );

      const datas = await Promise.all(
        urlArray.map((item) => {
          if (item !== "") {
            const response = fetch(`https://ipfs.io/ipfs/${item}`)
              .then((res) => res.text())
              .then((data) => data.toString());

            return response;
          } else {
            return "";
          }
        })
      );

      const list = datas.filter((item) => {
        if (item !== "") {
          const itema = JSON.parse(item);
          identitiese.push(JSON.parse(item));
          return itema;
        } else {
        }
      });

      console.log(identitiese);
      setIdentities(identitiese);
      setRetrieved(true);
    } catch (error) {
      showError(`this error occured - ${error}`);
    }
  };
  useEffect(() => {
    checkIfWalletIsConnected();
    getUserCollection();
  }, [isWalletConnected]);

  return (
    <div>
      {!retrieved && <Shimmer width={800} height={600} />}
      {identities !== null && identities.length !== 0 ? (
        <IdentityCollections products={identities} />
      ) : (
        <CollectionsLoader></CollectionsLoader>
      )}
    </div>
  );
};

const CollectionsLoader = () => {
  return (
    <div>
      <section class="text-gray-600 body-font">
        <div class="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
          <div class="text-center lg:w-2/3 w-full">
            <p class="mb-8 text-xl leading-relaxed">It is empty in here 😪</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Collections;

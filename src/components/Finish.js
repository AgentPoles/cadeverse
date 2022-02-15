/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```*/
import { useState, useEffect } from "react";
import { NFTStorage, Blob } from "nft.storage";
import { pack } from "ipfs-car/pack";
import { ethers, utils } from "ethers";
import abi from "../contracts/NFT.json";
import Progress from "./Progress";
import { toast } from "react-toastify";
import ToastContent from "./ToastContent";
import opensea from "../images/opens.png";
import { Link } from "react-router-dom";
import { set } from "lodash";

const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEQwOTM1MmIyMDgzMzAyNjRBNmJlMjg3NzA2RjdiNzVGZkE3MTdlN2IiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0MzE4MTA0Mzg2OSwibmFtZSI6ImNhZGV2ZXJzZSJ9.U3_0CdAwhlQUG17m0jnJlU28n5w_e7zKxumCJdZyHEk";
const client = new NFTStorage({ token: apiKey });

export default function Finish({ nft }) {
  const contractAddress = "0x30D87625b9991Cf5a28cf89d8AEb897A49987488";
  const contractABI = abi.abi;

  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [userAddress, setUserAddress] = useState(null);
  const [currentTokenId, setCurrentTokenId] = useState(null);
  // const [collection, getCollection] = useState(null);
  const [donea, setdonea] = useState("");
  const [doneb, setdoneb] = useState("");
  const [donec, setdonec] = useState("");
  const [minted, setMinted] = useState(false);
  // const [tokenUrl, setTokenUrl] = useState("");
  const [currenttoken, setCurrentToken] = useState(null);
  const generaldone = "text-pink-500  bg-orange-100 border-pink-500";

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
        console.log("No Metamask detected");
      }
    } catch (error) {}
  };

  const getLatestId = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const ExistenceContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        let tokenId = await ExistenceContract.getCurrentTokenId();

        setCurrentTokenId(tokenId.toString());
        console.log(tokenId.toString());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const mint = async (address, token_uri) => {
    const idb = toast.loading(<ToastContent text={"trying to mint..."} />, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
    setdoneb(generaldone);
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const ExistenceContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        const txn = await ExistenceContract.mintTo(address, token_uri);

        await txn.wait();

        console.log("minted");
        toast.update(idb, {
          render: <ToastContent text={`successfully minted`} />,
          type: "success",
          isLoading: false,
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });

        setdonec(generaldone);

        getLatestId();
        setMinted(true);
      }
    } catch (e) {
      toast.update(idb, {
        render: <ToastContent text={`couldn't mint due to ${e}`} />,
        type: "error",
        isLoading: false,
        autoClose: 5000,
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  const onFinishedClicked = async (e, nft) => {
    e.preventDefault();
    const ide = toast.loading(<ToastContent text={"pinning to IPFS..."} />, {
      position: toast.POSITION.BOTTOM_CENTER,
    });
    setdonea(generaldone);
    try {
      if (nft.name !== null && nft.name !== "") {
        const metadata = new Blob([JSON.stringify(nft)], {
          type: "application/json",
        });

        const cid = await client.storeBlob(metadata);
        // alert("created");
        console.log(cid);
        // const status = await client.status(cid);
        // console.log(status);
        let url = cid.toString();
        toast.update(ide, {
          render: <ToastContent text={`successfully pinned`} />,
          type: "success",
          isLoading: false,
          autoClose: 2000,
          position: toast.POSITION.BOTTOM_CENTER,
        });

        mint("0x81911512cF46B1D6D4d9488913662A93B710b635", url);
      } else {
        console.log("no nft");
      }
    } catch (e) {
      setdonea("");
      toast.update(ide, {
        render: <ToastContent text={`couldn't pin due to ${e}`} />,
        type: "error",
        isLoading: false,
        autoClose: 5000,
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  const toOpenSea = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    checkIfWalletIsConnected();
  }, [isWalletConnected]);

  return (
    <div className="pt-10">
      <Progress doneaa={donea} doneab={doneb} doneac={donec} />
      <div className="container flex items-center">
        <div className="flex flex-col items-center text-base text-left w-full md:inline-block md:max-w-2xl md:px-4 md:my-8  md:align-middle lg:max-w-full">
          <div className="bg-white px-4 pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
            <div className="w-full relative flex items-center ">
              <div className="w-full grid grid-cols-1 gap-y-8 gap-x-6 items-start sm:grid-cols-12 lg:gap-x-8">
                <div className="aspect-w-2 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden sm:col-span-4 lg:col-span-5">
                  <img
                    src={nft.image}
                    alt={nft.name}
                    className="object-center object-cover"
                  />
                </div>
                <div className="sm:col-span-8 lg:col-span-7">
                  <h2 className="text-2xl font-extrabold text-gray-900 sm:pr-12">
                    {nft.name}
                  </h2>
                  <div className="px-4 sm:px-0">
                    <p className="mt-1 text-sm text-gray-600">
                      {nft.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="float-right">
              {minted ? (
                <div>
                  <a
                    href={`https://testnets.opensea.io/assets/${contractAddress}/${currentTokenId}`}
                    target={"_blank"}
                    className="inline-block text-center bg-gradient-to-r from-pink-500 to-orange-300 border border-transparent rounded-md py-3 px-2 font-normal shadow-md text-sm  text-white hover:bg-slate-500"
                  >
                    <img
                      src={opensea}
                      alt="opensea logo"
                      className="h-5"
                      style={{ display: "inline" }}
                    />
                    <span style={{ display: "inline" }}> View in OpenSea</span>
                  </a>
                  <Link to="/">
                    <button className=" ml-5 inline-block text-center bg-gradient-to-r from-pink-500 to-orange-300 border border-transparent rounded-md py-3 px-2 font-normal shadow-md text-sm  text-white hover:bg-slate-500">
                      I'm Done
                    </button>
                  </Link>
                </div>
              ) : (
                <button
                  onClick={(e) => {
                    onFinishedClicked(e, nft);
                  }}
                  className="inline-block text-center bg-gradient-to-r from-pink-500 to-orange-300 border border-transparent rounded-md py-3 px-2 font-normal shadow-md text-sm  text-white hover:bg-slate-500"
                >
                  Create Identity
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

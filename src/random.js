/* src/App.js */
import "./App.css";
import { useState } from "react";
import { create } from "ipfs-http-client";

import { NFTStorage, File } from "nft.storage";

// const client = create("https://ipfs.infura.io:5001/api/v0");
const client = new NFTStorage({
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEQwOTM1MmIyMDgzMzAyNjRBNmJlMjg3NzA2RjdiNzVGZkE3MTdlN2IiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY0MzE4MTA0Mzg2OSwibmFtZSI6ImNhZGV2ZXJzZSJ9.U3_0CdAwhlQUG17m0jnJlU28n5w_e7zKxumCJdZyHEk",
});
function App() {
  const [fileUrl, updateFileUrl] = useState(``);
  console.log(fileUrl);
  async function onChange(e) {
    const file = e.target.files[0];
    // const text = "hello";
    // try {
    //   console.log(fileUrl);
    //   const added = await client.add(text);
    //   const url = `https://ipfs.infura.io/ipfs/${added.path}`;
    //   console.log("finished");
    //   updateFileUrl(url);
    //   console.log(url);
    // } catch (error) {
    //   console.log("Error uploading file: ", error);
    // }
    console.log(file);
    main(file);
  }
  async function main(_file) {
    let fs = require("fs");

    const metadata = await client.store({
      name: "Pinpie",
      description: "Pin is not delicious beef!",
      image: new File([await fs.promises.readFile(_file.name)], "pinpie.jpg", {
        type: "image/png",
      }),
    });
    console.log(metadata.url);
    // ipfs://bafyreib4pff766vhpbxbhjbqqnsh5emeznvujayjj4z2iu533cprgbz23m/metadata.json
  }

  return (
    <div className="App">
      <h1>IPFS Example</h1>
      <input type="file" onChange={(e) => onChange(e)} />
      {fileUrl && <img src={fileUrl} width="600px" alt="file" />}
    </div>
  );
}

export default App;

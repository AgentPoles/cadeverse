/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { useState } from "react";
import { FileDrop } from "react-file-drop";

export default function MakeNft({ buttonFunction }) {
  const [identity, setIdentity] = useState();
  const [imagefile, setImageFile] = useState();
  const [imagepath, setImagePath] = useState("");

  const [file, setFile] = useState(null);

  const handleChange = (file) => {
    setImagePath(URL.createObjectURL(file[0]));
    setNft({
      ...nft,
      image: file[0],
      image_name: file[0].name,
    });
  };

  const [nft, setNft] = useState({
    name: "",
    description: "",
    image: "",
    image_name: "",
  });

  const onChange = (e) => {
    setImagePath(URL.createObjectURL(e.target.files[0]));
    console.log(e.target.files[0]);

    setNft({
      ...nft,
      image: e.target.files[0],
      image_name: e.target.files[0].name,
    });
    // console.log(nft);
  };

  const onTextChange = (e) => {
    setNft({ ...nft, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="m-10">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Upload Identity
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                You do great with graphics? Then make an art work depicting a
                person and push to `Existence`. This art work would be someone's
                identity on web3 and in the metaverse and you'll get commissions
                for any financial or socially profitable action this identity
                makes
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div className="self-center w-full items-center">
                    <div className="mt-1 flex self-center  items-center">
                      {imagepath === "" ? (
                        <span className="inline-block h-40 w-40 rounded-sm  overflow-hidden bg-gray-100">
                          <svg
                            className="h-full w-full text-gray-300"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </span>
                      ) : (
                        <img src={imagepath} alt="identity" />
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <FileDrop onDrop={(files, event) => handleChange(files)}>
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                            >
                              <span>Upload a file</span>
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                                onChange={(e) => onChange(e)}
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </FileDrop>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label
                        htmlFor="company-website"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Give Identity a Name
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="text"
                          name="name"
                          id="company-website"
                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 p-4"
                          placeholder="eunice oamen"
                          onChange={(e) => {
                            onTextChange(e);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="about"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Brief Description
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="about"
                        name="description"
                        rows={3}
                        className="shadow-sm focus:ring-gray-600 focus:border-gray-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-4"
                        placeholder="she is a legend from africa"
                        defaultValue={""}
                        onChange={(e) => {
                          onTextChange(e);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    onClick={(e) => buttonFunction(e, nft)}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white  focus:outline-none focus:ring-2 focus:ring-offset-2  bg-gradient-to-r from-rose-400 to-pink-600"
                  >
                    Proceed
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

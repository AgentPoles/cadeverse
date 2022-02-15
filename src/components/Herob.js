import React from "react";
import Main from "./Animate/Main";
import { Link } from "react-router-dom";

const Herob = () => {
  return (
    <section class="text-gray-600 body-font">
      <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <p className="mt-4 text-2xl text-gray-500">
            {" "}
            Everyone one earth should own an identity in the metaverse, hence we
            built
          </p>
          <h1 className="text-4xl font font-extrabold tracking-tight text-gray-900 sm:text-6xl">
            Existence
          </h1>

          <div class="flex flex-row space-x-3 mt-4 ">
            <button className="inline-block text-center bg-gradient-to-r from-pink-600 to-pink-500 border border-transparent rounded-md py-3 px-2 font-normal shadow-md text-sm  text-white hover:bg-slate-500">
              Obtain Identity (soon)
            </button>
            <button className="inline-block text-center bg-gradient-to-r from-pink-500 to-orange-300 border border-transparent rounded-md py-3 px-2 font-normal shadow-md text-sm  text-white hover:bg-slate-500">
              Borrow identity (soon)
            </button>
            <Link to="/makenft">
              {" "}
              <button className="inline-block text-center  bg-gradient-to-r from-rose-400 to-pink-600 border-transparent rounded-md py-3 px-2 font-normal shadow-md text-sm  text-white hover:bg-slate-500">
                Upload identity
              </button>
            </Link>
          </div>
        </div>
        <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <Main></Main>
        </div>
      </div>
    </section>
  );
};

export default Herob;

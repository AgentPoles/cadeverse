/* This example requires Tailwind CSS v2.0+ */
import Masonry from "./Masonry";
import pa from "../images/MaleJapanese.png";
import pb from "../images/ZimbabweFemale.png";
import pc from "../images/CaucasianMale.png";
import pd from "../images/UkraineFemale.png";
import pe from "../images/MuslimMan.png";
import pf from "../images/FemaleJapanese.png";
import pg from "../images/MaleIran.png";

export default function Example() {
  return (
    <div className="relative bg-white overflowx-hidden">
      <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:static">
          <div className="sm:max-w-lg">
            <p className="mt-4 text-xl text-gray-500">
              Everyone one earth should own an identity in the metaverse, hence
              we built
            </p>
            <h1 className="text-4xl font font-extrabold tracking-tight text-gray-900 sm:text-6xl">
              Existence.
            </h1>
          </div>
          <div>
            <div className="mt-10">
              {/* Decorative image grid */}
              <div
                aria-hidden="true"
                className="pointer-events-none lg:absolute lg:max-w-7xl lg:mx-auto lg:w-full"
              >
                <div className="absolute transform sm:left-1/2 sm:top-3 sm:translate-x-8 sm:translate-y-1/3 md:left-1/2 md:top-3 md:translate-x-8 md:translate-y-1/3 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/3 lg:translate-x-6">
                  <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="w-44 h-64 rounded-lg overflow-hidden sm:opacity-0 lg:opacity-100">
                        <img
                          src={pa}
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                      <div className="w-44 h-64 rounded-lg overflow-hidden">
                        <img
                          src={pb}
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="w-44 h-64 rounded-lg overflow-hidden sm:opacity-0 lg:opacity-100">
                        <img
                          src={pc}
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                      <div className="w-44 h-64 rounded-lg overflow-hidden">
                        <img
                          src={pd}
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                      <div className="w-44 h-64 rounded-lg overflow-hidden">
                        <img
                          src={pe}
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="w-44 h-64 rounded-lg overflow-hidden">
                        <img
                          src={pf}
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                      <div className="w-44 h-64 rounded-lg overflow-hidden">
                        <img
                          src={pg}
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex flex-row space-x-3 ">
                <div>
                  {" "}
                  <a
                    href="#"
                    className="inline-block text-center bg-gradient-to-r from-pink-600 to-pink-500 border border-transparent rounded-md py-3 px-2 font-normal shadow-md text-sm  text-white hover:bg-slate-500"
                  >
                    Obtain Identity
                  </a>
                </div>
                <div>
                  {" "}
                  <a
                    href="#"
                    className="inline-block text-center bg-gradient-to-r from-pink-500 to-orange-300 border border-transparent rounded-md py-3 px-2 font-normal shadow-md text-sm  text-white hover:bg-slate-500"
                  >
                    Borrow Identity
                  </a>
                </div>
                <div>
                  {" "}
                  <a
                    href="#"
                    className="inline-block text-center  bg-gradient-to-r from-rose-400 to-pink-600 border-transparent rounded-md py-3 px-2 font-normal shadow-md text-sm  text-white hover:bg-slate-500"
                  >
                    Upload Identity
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

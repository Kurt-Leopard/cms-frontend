"use client";

import Sidebar from "../components/SideBar";
import Header from "../components/Header";
import BlockForm from "../components/BlockForm";
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "../../axios";
import { token, formatDate } from "../helper/utils";

const Page = ({}) => {
  const [showForm, setShowForm] = useState(false);
  const [blockData, setBlockData] = useState(null);
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  useEffect(() => {
    const fetchBlockData = async () => {
      try {
        const response = await axios.get(`/api/block/${token.id}`);
        setBlockData(response.data);
      } catch (err) {
        setError("An error occurred while fetching block data.");
        console.error(err);
      }
    };

    fetchBlockData();
  }, []);
  return (
    <div className="flex h-[100vh]">
      <div className="sticky top-0 h-full w-[300px] bg-gray-800">
        <Sidebar />
      </div>
      <div className="flex-1 overflow-auto">
        <Header />
        <div className="p-4">
          <button
            onClick={toggleForm}
            className="bg-gray-900 text-sm font-medium text-gray-200 px-4 py-2 rounded-md hover:bg-gray-900 transition"
          >
            Create block
          </button>
          {showForm ? (
            <>
              <BlockForm setShow={toggleForm} />
            </>
          ) : (
            <>
              <div className="w-full border bg-gray-50 my-4 rounded-xl ">
                <h1 className="text-2xl font-bold text-gray-800   border-b p-6">
                  Listing Blocks
                </h1>

                <div className="flex flex-wrap gap-[32px] p-4">
                  {blockData?.result.map((item, index) => (
                    <div className="flex flex-col" key={index}>
                      {/* CARD 1 */}
                      <div className="rounded overflow-hidden shadow-lg flex flex-col h-full">
                        <div>
                          <div className="relative flex-1">
                            <span>
                              <Image
                                src={`https://storage.googleapis.com/mcm-chuch.appspot.com/${item.image}`}
                                alt="Sunset in the mountains"
                                width={100}
                                height={100}
                                objectFit="cover"
                                className="w-[400px] h-[260px] object-cover"
                              />
                              <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
                            </span>
                            <span>
                              <div className="text-xs absolute top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
                                QuickPage
                              </div>
                            </span>
                          </div>
                        </div>
                        <div className="px-6 py-4 mb-auto">
                          <span className="font-medium text-lg hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2">
                            {item.name}
                          </span>
                        </div>
                        <div className="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
                          <span className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
                            <svg
                              height="13px"
                              width="13px"
                              version="1.1"
                              id="Layer_1"
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              x="0px"
                              y="0px"
                              viewBox="0 0 512 512"
                              style={{ enableBackground: "new 0 0 512 512" }}
                              xmlSpace="preserve"
                            >
                              <g>
                                <g>
                                  <path d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M277.333,256 c0,11.797-9.536,21.333-21.333,21.333h-85.333c-11.797,0-21.333-9.536-21.333-21.333s9.536-21.333,21.333-21.333h64v-128 c0-11.797,9.536-21.333,21.333-21.333s21.333,9.536,21.333,21.333V256z"></path>
                                </g>
                              </g>
                            </svg>
                            <span className="ml-1">
                              {formatDate(item.created_at)}
                            </span>
                          </span>

                          <span className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center gap-[12px]">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                              />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="size-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;

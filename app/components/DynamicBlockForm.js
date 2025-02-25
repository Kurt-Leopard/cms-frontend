import { useState, useEffect } from "react";
import axios from "../../axios";
import { token, formatDate } from "../helper/utils";
import { useRouter } from "next/navigation";

const DynamicBlockForm = ({ setShow, site, pageid }) => {
  const [blockData, setBlockData] = useState(null);
  const [error, setError] = useState(null);
  const [parsedData, setParsedData] = useState(null);
  const router = useRouter();
  const userId = token.id;
  const page = pageid;

  const handleData = (item) => {
    const existingData = JSON.parse(sessionStorage.getItem("data")) || [];

    const newData = {
      id: item.id,
      blueprint_id: item.blueprint_id,
      page_id: page,
      userid: token.id,
    };

    // No check for duplicates
    existingData.push(newData);

    sessionStorage.setItem("data", JSON.stringify(existingData));

    router.push(`/page/${page}`);

    setShow(false);
  };

  useEffect(() => {
    if (parsedData && userId) {
      const fetchBlockData = async () => {
        try {
          const response = await axios.post(`/api/search-site/${userId}`, {
            site: parsedData,
          });
          setBlockData(response.data);
        } catch (err) {
          setError("An error occurred while fetching block data.");
          console.error(err);
        }
      };

      fetchBlockData();
    }
  }, [parsedData, userId]);

  useEffect(() => {
    if (site && typeof site === "string" && site.length > 0) {
      try {
        setParsedData(JSON.parse(site));
      } catch (error) {
        console.error("Error parsing site data:", error);
        setError("Failed to parse site data.");
      }
    }
  }, [site]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!blockData) {
    return (
      <div className="flex items-center justify-center fixed top-0 left-0 w-full h-full bg-black opacity-[.7] z-10">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-4 h-4 bg-violet-900 rounded-full  animate-bounce dark:bg-violet-600"></div>
          <div className="w-4 h-4 rounded-full bg-violet-900 animate-bounce dark:bg-violet-600"></div>
          <div className="w-4 h-4 rounded-full bg-violet-900 animate-bounce dark:bg-violet-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-[101]">
      <span
        className="w-full h-full bg-black fixed top-0 left-0 opacity-[.3]"
        onClick={() => setShow(false)}
      ></span>
      <div className="w-auto border bg-gray-50 my-4 rounded-xl z-[101]">
        <h1 className="text-2xl font-bold text-gray-800 border-b p-6">
          Listing Blocks
        </h1>

        <div className="flex flex-wrap gap-[32px] p-4">
          {Array.isArray(blockData.result) &&
            blockData.result.map((item, index) => (
              <div
                key={index}
                className="flex flex-col"
                onClick={() => handleData(item)}
              >
                <div className="rounded overflow-hidden shadow-lg flex flex-col h-full">
                  <a href="#">
                    <div className="relative flex-1">
                      <img
                        src={`https://storage.googleapis.com/mcm-chuch.appspot.com/${item.image}`}
                        alt="Sunset in the mountains"
                        className="w-[400px] h-[260px] object-cover"
                      />
                      <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
                    </div>
                  </a>
                  <div className="px-6 py-4 mb-auto">
                    <a
                      href="#"
                      className="font-medium text-lg hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2"
                    >
                      {item.name}
                    </a>
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
                          <path d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M277.333,256 c0,11.797-9.536,21.333-21.333,21.333h-85.333c-11.797,0-21.333-9.536-21.333-21.333s9.536-21.333,21.333-21.333h64v-128 c0-11.797,9.536-21.333,21.333-21.333s21.333,9.536,21.333,21.333V256z"></path>
                        </g>
                      </svg>
                      <span className="ml-1">
                        {formatDate(item.created_at)}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DynamicBlockForm;

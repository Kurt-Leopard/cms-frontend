"use client";
import { useState, useEffect } from "react";
import axios from "../../axios";
import { token } from "../helper/utils";

const PageForm = ({ setShow, datas }) => {
  const [pagename, setPageName] = useState("");
  const [customUrl, setCustomUrl] = useState("");
  const [siteData, setSitePage] = useState(null);
  const [selectedPage, setSelectedPage] = useState([]);
  const [parsedData, setParsedData] = useState(null);

  const handlePageName = (e) => {
    setPageName(e.target.value);
    setCustomUrl("/" + e.target.value);
  };

  const handleCustomUrl = (e) => {
    setCustomUrl(e.target.value);
  };
  const [toggleCheck, setToggleCheck] = useState([]);
  const handlePageSelection = (e, index) => {
    if (!parsedData) {
      setToggleCheck((prev) =>
        checked ? [...prev, index] : prev.filter((i) => i !== index)
      );
    }
    const { value, checked } = e.target;
    setSelectedPage((prevSelectedPage) => {
      if (checked) {
        return [...prevSelectedPage, value];
      } else {
        return prevSelectedPage.filter((site) => site !== value);
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        user_id: token.id,
        name: pagename,
        url: customUrl,
        site_id: JSON.stringify(selectedPage),
      };
      const response = await axios.post("/api/page", payload);
      if (response.status === 200) {
        alert("success");
        setShow(false);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    const fetchSiteData = async () => {
      try {
        const response = await axios.get(`/api/site/${token.id}`);
        setSitePage(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSiteData();
  }, []);

  useEffect(() => {
    if (datas?.result?.length > 0) {
      const siteId = datas?.result[0]?.site_id;
      if (siteId && typeof siteId === "string") {
        try {
          setParsedData(JSON.parse(siteId));
        } catch (error) {
          console.error("Error parsing site_id:", error);
        }
      } else {
        console.log("Invalid site_id:", siteId);
      }
    }
  }, [datas]);

  return (
    <div className="px-4">
      <form
        onSubmit={handleSubmit}
        className="border bg-gray-50 p-6 mt-4 rounded-md shadow-md w-full"
      >
        <div className="mb-4 text-sm ">
          <label className="block text-gray-700 text-xs font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            value={datas ? datas?.result[0].name : pagename}
            onChange={handlePageName}
            placeholder="Enter page name"
            required
            className="w-full px-4 py-2 border text-xs border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>

        <div className="mb-4 text-sm ">
          <label className="block text-gray-700 text-xs font-bold mb-2">
            Custom Url
          </label>
          <input
            type="text"
            value={datas ? datas?.result[0].url : customUrl}
            onChange={handleCustomUrl}
            placeholder="/example.com"
            required
            className="w-full px-4 text-xs py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 lowercase"
          />
        </div>

        <div className="mb-4 text-sm font-medium">
          <label className="block text-gray-700 text-xs font-bold mb-2">
            Select Sites
          </label>

          {parsedData && parsedData.length > 0 ? (
            <></>
          ) : (
            <p>No site data available</p>
          )}

          <div className="space-y-2">
            {siteData?.result?.map((site, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="checkbox"
                  id={index}
                  value={parsedData ? parsedData[index] : site.id}
                  checked={
                    parsedData
                      ? parsedData.includes(site.id)
                      : toggleCheck.includes(index)
                      ? true
                      : false
                  }
                  onChange={(e) => handlePageSelection(e, index)}
                  className="mr-2"
                />
                <label htmlFor={index} className="text-gray-700 text-xs">
                  {site.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="bg-gray-900 text-xs font-medium text-gray-200 px-6 py-3 rounded-md hover:bg-gray-800 transition"
          >
            Save page
          </button>
        </div>
      </form>
    </div>
  );
};

export default PageForm;

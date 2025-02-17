"use client";
import React, { useState } from "react";
import Sidebar from "../components/SideBar";
import Header from "../components/Header";
import axios from "../../axios";

const Page = () => {
  const [sitename, setSiteName] = useState("");
  const [frontendDomain, setFrontendDomain] = useState("");
  const [deployHook, setDeployHook] = useState("");

  const handleSiteName = (e) => {
    setSiteName(e.target.value);
  };

  const handleFrontendDomain = (e) => {
    setFrontendDomain(e.target.value);
  };

  const handleDeployHook = (e) => {
    setDeployHook(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: sitename,
      frontendDomain: frontendDomain,
      deployHook: deployHook,
    };

    console.log("payload", payload);

    try {
      const response = await axios.post("/api/site", payload, {
        headers: {
          "Content-Type": "application/json", // Send JSON data
        },
      });
      console.log("Site created successfully:", response.data);
    } catch (error) {
      console.error("Error creating site:", error);
    }
  };

  return (
    <div className="flex h-[100vh]">
      <div className="sticky top-0 h-full w-[300px] bg-gray-800">
        <Sidebar />
      </div>
      <div className="flex-1 overflow-auto">
        <Header />
        <div className="p-4">
          <button
            // onClick={toggleForm}
            className="bg-gray-900 text-sm font-medium text-gray-200 px-4 py-2 rounded-md hover:bg-gray-900 transition"
          >
            Create Site
          </button>

          <div>
            <form
              onSubmit={handleSubmit}
              className="border bg-gray-50 p-6 mt-4 rounded-md shadow-md w-full"
            >
              <div className="mb-4 text-sm font-medium">
                <label className="block text-gray-700 font-medium mb-2">
                  Site Name
                </label>
                <input
                  type="text"
                  value={sitename}
                  onChange={handleSiteName}
                  placeholder="Enter site name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>

              <div className="mb-4 text-sm font-medium">
                <label className="block text-gray-700 font-medium mb-2">
                  Frontend Domain Name
                </label>
                <input
                  type="text"
                  value={frontendDomain}
                  onChange={handleFrontendDomain}
                  placeholder="Enter frontend domain"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>

              <div className="mb-4 text-sm font-medium">
                <label className="block text-gray-700 font-medium mb-2">
                  Deploy Hook (Optional)
                </label>
                <input
                  type="text"
                  value={deployHook}
                  onChange={handleDeployHook}
                  placeholder="Enter deploy hook URL (optional)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>

              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="bg-gray-900 text-sm font-medium text-gray-200 px-6 py-2 rounded-md hover:bg-gray-800 transition"
                >
                  Save site
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

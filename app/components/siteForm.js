import { useState } from "react";
import axios from "../../axios";
import { token } from "../helper/utils";

const siteForm = ({ setShow }) => {
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
      user_id: token.id,
      name: sitename,
      domain: frontendDomain,
      hook: deployHook,
    };

    console.log("payload", payload);

    try {
      const response = await axios.post("/api/site", payload, {
        headers: {
          "Content-Type": "application/json", // Send JSON data
        },
      });
      alert(response.data.message);
      setShow(false);
    } catch (error) {
      console.error("Error creating site:", error);
    }
  };

  return (
    <div className="px-4">
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
  );
};

export default siteForm;

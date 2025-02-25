import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { token } from "../helper/utils";
import Select from "react-select"; // Import react-select
const BlockForm = () => {
  const [blueprintData, setBlueprintData] = useState(null);
  const [siteData, setSiteData] = useState(null);
  const [error, setError] = useState(null);

  const [name, setName] = useState("");
  const [component, setComponent] = useState("");
  const [blueprint, setBlueprint] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // State for image preview

  const [selectedSites, setSelectedSites] = useState([]); // Track selected sites

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleComponent = (e) => {
    setComponent(e.target.value);
  };

  const handleBlueprint = (selectedOption) => {
    setBlueprint(selectedOption?.value || "");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    // Create an object URL to display the image preview
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSiteSelection = (e) => {
    const { value, checked } = e.target;

    setSelectedSites((prevSelectedSites) => {
      if (checked) {
        return [...prevSelectedSites, value];
      } else {
        return prevSelectedSites.filter((site) => site !== value);
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("user_id", token.id);
      formData.append("name", name);
      formData.append("component", component);
      formData.append("blueprint_id", blueprint);
      formData.append("site_id", JSON.stringify(selectedSites));
      formData.append("image", image);

      const response = await axios.post("/api/block", formData);

      if (response.status === 200) {
        alert("success");
        setShow(false);
      }
    } catch (err) {
      console.log(`Error occurred: ${err}`);
    }
  };

  useEffect(() => {
    const fetchBlueprintData = async () => {
      try {
        const response = await axios.get(`/api/blueprint/${token.id}`);
        setBlueprintData(response.data);
      } catch (err) {
        setError("An error occurred while fetching blueprint data.");
        console.error(err);
      }
    };

    fetchBlueprintData();
  }, []);

  useEffect(() => {
    const fetchSiteData = async () => {
      try {
        const response = await axios.get(`/api/site/${token.id}`);
        setSiteData(response.data);
      } catch (err) {
        setError("An error occurred while fetching site data.");
        console.error(err);
      }
    };

    fetchSiteData();
  }, []);

  const blueprintOptions = blueprintData?.result?.map((item) => ({
    value: item.id,
    label: item.name,
  }));
  return (
    <div className="px-4">
      <form
        onSubmit={handleSubmit}
        className="border bg-gray-50 p-6 mt-4 rounded-md shadow-md w-full"
      >
        <div className="mb-4 text-sm font-medium">
          <label className="block text-gray-700 font-medium mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={handleName}
            placeholder="Enter name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>

        <div className="mb-4 text-sm font-medium">
          <label className="block text-gray-700 font-medium mb-2">
            Component
          </label>
          <input
            type="text"
            value={component}
            onChange={handleComponent}
            placeholder="Enter component"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>

        {/* Searchable Blueprint Select */}
        <div className="mb-4 text-sm font-medium">
          <label className="block text-gray-700 font-medium mb-2">
            Blueprint
          </label>

          {/* React Select component for searchable dropdown */}
          <Select
            options={blueprintOptions} // Pass the blueprint options
            onChange={handleBlueprint} // Handle option selection
            value={blueprintOptions?.find(
              (option) => option.value === blueprint
            )} // Set the selected value
            placeholder="Select a blueprint"
            required
            className="w-full"
          />
        </div>

        <div className="mb-4 text-sm font-medium">
          <label className="block text-gray-700 font-medium mb-2">
            Select Sites
          </label>
          <div className="space-y-2">
            {siteData?.result?.map((site) => (
              <div key={site.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={site.id}
                  value={site.id}
                  onChange={handleSiteSelection}
                  className="mr-2"
                />
                <label htmlFor={site.id} className="text-gray-700">
                  {site.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4 text-sm font-medium">
          <label className="block text-gray-700 font-medium mb-2">
            Upload Image
          </label>
          <input
            type="file"
            onChange={handleImageChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
          {imagePreview && (
            <div className="mt-4 h-[300px] relative  flex items-center justify-center bg-gray-200 w-full rounded-xl">
              <img
                src={imagePreview}
                alt="Image Preview"
                className="w-[300px] absolute object-cover   rounded-md"
              />
            </div>
          )}
        </div>

        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="bg-gray-900 text-xs font-medium text-gray-200 px-6 py-2 rounded-md hover:bg-gray-800 transition"
          >
            Save block
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlockForm;

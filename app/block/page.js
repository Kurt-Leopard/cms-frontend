"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/SideBar";
import Header from "../components/Header";
import axios from "../../axios";
import { token } from "../../app/helper/utils";

const Page = () => {
  const [blueprintData, setBlueprintData] = useState(null);
  const [error, setError] = useState(null);

  const [name, setName] = useState(""); // Updated to "name" for simplicity
  const [component, setComponent] = useState("");
  const [blueprint, setBlueprint] = useState("");
  const [image, setImage] = useState(null);

  // Handle input changes
  const handleName = (e) => {
    setName(e.target.value); // Just a simple name input
  };

  const handleComponent = (e) => {
    setComponent(e.target.value); // Component state
  };

  const handleBlueprint = (e) => {
    setBlueprint(e.target.value); // Blueprint state
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Save the selected image file
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name); // Submit the simple "name"
    formData.append("component", component);
    formData.append("blueprint", blueprint);
    formData.append("image", image);

    // Log the FormData entries to check what's inside
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    // try {
    //   // Send the form data to the backend
    //   const response = await axios.post("/api/blueprint", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   });
    //   console.log("Blueprint created successfully:", response.data);
    // } catch (error) {
    //   console.error("Error creating blueprint:", error);
    // }
  };

  // Fetch blueprint data (if needed)
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
            Create block
          </button>
        </div>
        <div className="px-4">
          <form
            onSubmit={handleSubmit}
            className="border bg-gray-50 p-6 mt-4 rounded-md shadow-md w-full"
          >
            <div className="mb-4 text-sm font-medium">
              <label className="block text-gray-700 font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                value={name} // Using "name" state now
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

            <div className="mb-4 text-sm font-medium">
              <label className="block text-gray-700 font-medium mb-2">
                Blueprint
              </label>
              <input
                type="text"
                value={blueprint}
                onChange={handleBlueprint}
                placeholder="Enter blueprint"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
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
            </div>

            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="bg-gray-900 text-sm font-medium text-gray-200 px-6 py-2 rounded-md hover:bg-gray-800 transition"
              >
                Save block
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;

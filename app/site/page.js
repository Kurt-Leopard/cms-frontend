"use client";
import SiteForm from "../components/siteForm";
import Sidebar from "../components/SideBar";
import Header from "../components/Header";
import { useState, useEffect } from "react";
import axios from "../../axios";
import { token, formatDate } from "../helper/utils";
import Link from "next/link";
const Page = () => {
  const [showForm, setShowForm] = useState(false);
  const [siteData, setSiteData] = useState(null);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

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
            Create Site
          </button>
        </div>
        {showForm ? (
          <>
            <SiteForm setShow={toggleForm} />
          </>
        ) : (
          <>
            <div className="px-4">
              <div className="overflow-x-auto border rounded-lg">
                <table className="w-full divide-y divide-gray-200 ">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Domain
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        created_at
                      </th>

                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {siteData?.result.length === 0 ? (
                      <tr>
                        <td
                          colSpan="6"
                          className="px-6 py-4 text-center text-sm text-gray-500"
                        >
                          No users found
                        </td>
                      </tr>
                    ) : (
                      siteData?.result.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {item.name}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Link
                              href={item.domain}
                              className="text-sm text-blue-500"
                            >
                              {item.domain}
                            </Link>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {formatDate(item.created_at)}
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <a
                              href="#"
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Edit
                            </a>
                            <a
                              href="#"
                              className="ml-2 text-red-600 hover:text-red-900"
                            >
                              Delete
                            </a>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Page;

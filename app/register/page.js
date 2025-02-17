"use client";

import Link from "next/link";
import { useState } from "react";
import axios from "../../axios";
import Image from "next/image";
export default function Page() {
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      const response = await axios.post("/api/register", formData);

      if (response.status === 200) {
        sessionStorage.setItem("token", response.data.token);
        setLoading(false);
        window.location.href = "/";
      }
    } catch (error) {
      if (error.response) setError(error?.response?.data?.message);
      setLoading(false);
      console.log(error.response);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-lg">
        <form
          className="bg-white shadow w-full rounded-lg divide-y divide-gray-200"
          onSubmit={handleSubmit}
        >
          <div className="px-5 py-7">
            <div className="flex items-center justify-center">
              <Image
                src="/mj.png"
                width={100}
                height={100}
                alt="logo"
                className="rounded-full"
              />
            </div>
            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              E-mail
            </label>
            <input
              type="email"
              className={`border rounded-lg px-3 py-4 mt-1 text-sm w-full ${
                error ? "" : "mb-5"
              }`}
              placeholder="example@gmail.com"
              name="email"
              onChange={handleChange}
            />
            {error && <small className="text-red-500">{error}</small>}
            <label className="font-semibold text-sm text-gray-600 pb-1 block">
              Password
            </label>
            <input
              type="password"
              className="border rounded-lg px-3 py-4 mt-1 mb-5 text-sm w-full"
              placeholder="*******"
              name="password"
              onChange={handleChange}
            />
            <button
              type="submit"
              className="transition duration-200 bg-primary hover:bg-blue-600 focus:bg-blue-600 focus:shadow-sm focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50 text-white w-full py-4 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
            >
              <span className="inline-block mr-2">
                {loading ? <>Sending...</> : <> Register</>}
              </span>
            </button>
          </div>

          <div className="py-5">
            <div className="grid grid-cols-2 gap-1">
              <div className="text-center sm:text-left whitespace-nowrap">
                <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4 inline-block align-text-top"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="inline-block ml-1">Forgot Password</span>
                </button>
              </div>
              <div className="text-center sm:text-right whitespace-nowrap">
                <Link
                  href="/"
                  className="inline-block transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-4 h-4 inline-block align-text-bottom"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  <span className="inline-block ml-1">Sign In</span>
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

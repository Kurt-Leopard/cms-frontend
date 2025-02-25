"use client";
import React, { useEffect, useState } from "react";
import Header from "@/app/components/Header";
import SideBar from "@/app/components/SideBar";
import PageForm from "@/app/components/PageForm";
import DynamicBlockForm from "@/app/components/DynamicBlockForm";
import DynamicForm from "../../form/Fields";
import axios from "../../../axios";
import { token } from "../../helper/utils";

const Page = ({ params }) => {
  const [pageData, setPageData] = useState(null);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(null);
  const [pageid, setPageId] = useState(null);
  const [blueprintDatas, setBlueprintData] = useState(null);
  const [parsedData, setParsedData] = useState(null);
  const [allFormData, setAllFormData] = useState({});
  const data = JSON.parse(sessionStorage.getItem("data"));

  const addBlock = () => {
    setShow(true);
  };
  const toggleHide = () => {
    setShow(false);
  };

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const unwrappedParams = await params;
        if (unwrappedParams) {
          setPageId(unwrappedParams.id);
          const response = await axios.get(
            `/api/find-by-page/${unwrappedParams.id}`
          );
          setPageData(response.data);
        }
      } catch (err) {
        setError("An error occurred while fetching site data.");
        console.error(err);
      }
    };
    fetchPageData();
  }, [params]);

  useEffect(() => {
    if (data) {
      const blueprintData = data.map((data) => ({
        blueprint_id: data.blueprint_id,
      }));

      if (blueprintData) {
        const fetchBlueprintData = async () => {
          try {
            const response = await axios.post(`/api/blueprint/${token.id}`, {
              blueprintData: blueprintData,
            });
            setBlueprintData(response.data);
          } catch (err) {
            setError("An error occurred while fetching block data.");
            console.error(err);
          }
        };

        fetchBlueprintData();
      }
    }
  }, []);

  useEffect(() => {
    if (blueprintDatas?.result?.length > 0) {
      const parsedDataArray = [];
      blueprintDatas.result.forEach((item) => {
        const data = item.data;
        if (data && typeof data === "string") {
          try {
            const parsedItem = JSON.parse(data);
            parsedDataArray.push(parsedItem);
          } catch (error) {
            console.error("Error parsing data for blueprint:", item.id, error);
          }
        } else {
          console.log("Invalid data for blueprint:", item.id, data);
        }
      });
      setParsedData(parsedDataArray);
    }
  }, [blueprintDatas]);

  const updateFormData = (formId, data) => {
    setAllFormData((prev) => ({
      ...prev,
      [formId]: data,
    }));
  };

  // Handle form submission
  const handleSubmitAllForms = () => {
    console.log("All form data:", allFormData);

    alert("All forms submitted successfully!");
  };

  return (
    <div className="flex h-[100vh]">
      <div className="sticky top-0 h-full w-[300px] bg-gray-800">
        <SideBar />
      </div>
      <div className="flex-1 overflow-auto">
        <Header />
        {show && (
          <>
            <DynamicBlockForm
              setShow={toggleHide}
              site={pageData?.result[0]?.site_id}
              pageid={pageid}
            />
          </>
        )}

        <PageForm datas={pageData} />
        {/* {parsedData && parsedData.length > 0 && (
          <>
            {parsedData.map((data, index) => (
              {
                data &&(
  <DynamicForm
                key={index}
                datas={data}
                formId={`form_${index}`}
                updateFormData={updateFormData}
              />
                )
              }
            
            ))}
          </>
        )} */}
        {parsedData && parsedData.length > 0 && (
          <>
            {parsedData.map(
              (data, index) =>
                data && (
                  <DynamicForm
                    key={index}
                    datas={data}
                    formId={`block[${index}]`}
                    updateFormData={updateFormData}
                    indexData={1 + index}
                  />
                )
            )}
          </>
        )}

        <div className="flex flex-col items-center justify-center gap-[24px] my-[32px]">
          <button
            onClick={addBlock}
            className="border border-gray-900 text-xs font-medium text-gray-900 px-4 py-3 rounded-md hover:bg-gray-900 hover:text-gray-200 "
          >
            Add block
          </button>
          <button
            onClick={handleSubmitAllForms}
            className=" bg-gray-900 text-white text-xs px-14 py-3 rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;

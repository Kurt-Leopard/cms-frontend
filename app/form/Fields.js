import Image from "next/image";
import { useState, useEffect } from "react";

export default function DynamicForm({
  datas,
  formId,
  updateFormData,
  indexData,
}) {
  const [formConfig, setFormConfig] = useState(null);
  const [formData, setFormData] = useState({});
  const [imagePreview, setImagePreview] = useState({});
  const [collapse, setCollapse] = useState({});

  useEffect(() => {
    if (!datas || !datas.parentFields) return;

    setFormConfig(datas);
  }, [datas, indexData]);

  useEffect(() => {
    if (formConfig) {
      updateFormData(formId, formData);
    }
  }, [formData, formConfig, formId, updateFormData]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (name, files) => {
    setFormData((prev) => ({
      ...prev,
      [name]: files,
    }));

    const previewImages = [];
    Array.from(files).forEach((file) => {
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => {
          previewImages.push(reader.result);
          setImagePreview((prev) => ({
            ...prev,
            [name]: previewImages,
          }));
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleRepeaterChange = (name, value, index) => {
    setFormData((prev) => {
      const updatedData = [...(prev[name] || [])];
      updatedData[index] = { ...updatedData[index], ...value };
      return {
        ...prev,
        [name]: updatedData,
      };
    });
  };

  const handleAddRepeater = (name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: [...(prev[name] || []), { id: Date.now() }],
    }));
  };

  const handleRemoveRepeater = (name, index) => {
    setFormData((prev) => {
      const updatedData = [...(prev[name] || [])];
      updatedData.splice(index, 1);
      const updatedFormData = { ...prev, [name]: updatedData };
      delete updatedFormData[`${name}_image_${index}`];
      return updatedFormData;
    });

    setImagePreview((prev) => {
      const updatedPreview = { ...prev };
      delete updatedPreview[`${name}_image_f${index}`];
      return updatedPreview;
    });
  };

  const handleCollapse = (repeaterName, index) => {
    setCollapse((prev) => ({
      ...prev,
      [`${repeaterName}_${index}`]: !prev[`${repeaterName}_${index}`],
    }));
  };

  const renderFields = (fields, repeaterName) => {
    return fields.map((field, index) => {
      const uniqueStateName = `${field.stateName}_${indexData}`;

      if (field.type === "repeater") {
        return (
          <div key={index} className="mb-6 border p-4 rounded-lg bg-gray-50">
            <h4 className="text-xs font-semibold mb-4">Fields</h4>
            {formData[uniqueStateName]?.map((nestedData, nestedIndex) => (
              <div
                key={nestedData.id}
                className="mb-4 border p-4 rounded-lg bg-white"
              >
                <div className="flex justify-between items-center mb-2 pb-3 border-b">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex gap-[12px] items-center">
                      <small className="border w-[32px] h-[32px] rounded-lg flex items-center justify-center ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
                          />
                        </svg>
                      </small>
                      <small
                        className="cursor-pointer"
                        onClick={() =>
                          handleCollapse(uniqueStateName, nestedIndex)
                        }
                      >
                        {collapse[`${uniqueStateName}_${nestedIndex}`]
                          ? "Expand"
                          : "Collapse"}
                      </small>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 text-red-600"
                      onClick={() =>
                        handleRemoveRepeater(uniqueStateName, nestedIndex)
                      }
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </div>
                </div>
                {field.nestedRepeaters.map((nested, nestedFieldIndex) => {
                  const nestedUniqueStateName = `${nested.stateName}_${indexData}`;
                  const isCollapsed =
                    collapse[`${uniqueStateName}_${nestedIndex}`];

                  return (
                    <div
                      key={nestedFieldIndex}
                      className={`mb-4 border rounded-lg p-4 bg-gray-50  ${
                        isCollapsed ? "hidden" : ""
                      }`}
                    >
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        {nested.title}:
                      </label>
                      {nested.type === "file" ? (
                        <>
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            className="w-[0px] opacity-0"
                            onChange={(e) =>
                              handleFileChange(
                                `${nestedUniqueStateName}_image_${nestedIndex}`,
                                e.target.files
                              )
                            }
                            id={`file-repeater-${indexData}-${nestedFieldIndex}-${nestedIndex}`}
                          />
                          <div className="items-center justify-center mx-auto">
                            <label
                              htmlFor={`file-repeater-${indexData}-${nestedFieldIndex}-${nestedIndex}`}
                              className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none z-10"
                            >
                              <span className="flex items-center space-x-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-6 h-6 text-gray-600"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                  ></path>
                                </svg>
                                <span className="font-medium text-gray-600">
                                  Drop Image to Attach, or
                                  <span className="text-blue-600 underline ml-[4px]">
                                    browse{Object.keys(imagePreview).length}
                                  </span>
                                </span>
                              </span>
                            </label>
                          </div>
                          {Object.keys(imagePreview).length > 0 && (
                            <>
                              <div className="flex flex-wrap items-center justify-center gap-[12px] p-6 bg-gray-200 rounded-lg my-5">
                                {imagePreview[
                                  `${nestedUniqueStateName}_image_${nestedIndex}`
                                ] &&
                                  imagePreview[
                                    `${nestedUniqueStateName}_image_${nestedIndex}`
                                  ].map((src, idx) => (
                                    <Image
                                      key={idx}
                                      src={src}
                                      width={300}
                                      height={300}
                                      alt={`Preview ${idx + 1}`}
                                      className="mt-2 w-[300px] h-[300px]  object-cover rounded-md"
                                    />
                                  ))}
                              </div>
                            </>
                          )}
                        </>
                      ) : nested.type === "select" ? (
                        <select
                          className="w-full border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-900 focus:border-blue-900"
                          value={nestedData[nested.stateName] || ""}
                          onChange={(e) =>
                            handleRepeaterChange(
                              uniqueStateName,
                              { [nested.stateName]: e.target.value },
                              nestedIndex
                            )
                          }
                        >
                          {nested.options &&
                            nested.options.map((option, idx) => (
                              <option key={idx} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                        </select>
                      ) : nested.type === "textarea" ? (
                        <textarea
                          className="w-full border-gray-300 rounded-md border shadow-sm p-3 focus:ring-blue-900 focus:border-blue-900"
                          value={nestedData[nested.stateName] || ""}
                          onChange={(e) =>
                            handleRepeaterChange(
                              uniqueStateName,
                              { [nested.stateName]: e.target.value },
                              nestedIndex
                            )
                          }
                        />
                      ) : nested.type === "checkbox" ? (
                        <input
                          type="checkbox"
                          className="w-full border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-900 focus:border-blue-900"
                          checked={nestedData[nested.stateName] || false}
                          onChange={(e) =>
                            handleRepeaterChange(
                              uniqueStateName,
                              { [nested.stateName]: e.target.checked },
                              nestedIndex
                            )
                          }
                        />
                      ) : (
                        <input
                          type={nested.type}
                          className="w-full border-gray-300 rounded-md border shadow-sm p-3 focus:ring-blue-900 focus:border-blue-900"
                          value={nestedData[nested.stateName] || ""}
                          onChange={(e) =>
                            handleRepeaterChange(
                              uniqueStateName,
                              { [nested.stateName]: e.target.value },
                              nestedIndex
                            )
                          }
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
            <div className="flex items-center justify-center">
              <button
                type="button"
                className="hover:bg-gray-900 border border-gray-900 text-gray-900 hover:text-white  p-3 rounded-md mt-4 text-xs"
                onClick={() => handleAddRepeater(uniqueStateName)}
              >
                Add to {field.title}
              </button>
            </div>
          </div>
        );
      } else if (field.type === "dropdown") {
        return (
          <div key={index} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.title}:
            </label>
            <select
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-900 focus:border-blue-900"
              onChange={(e) => handleChange(uniqueStateName, e.target.value)}
            >
              <option value="">Select an option</option>
              {field.options.map((option, idx) => (
                <option key={idx} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        );
      } else {
        return (
          <div key={index} className="mb-4 border p-4 rounded-lg bg-gray-50">
            <label className="block text-xs font-bold text-gray-700 mb-1">
              {field.title}:
            </label>
            {field.type === "textarea" ? (
              <textarea
                placeholder={field.placeholder || ""}
                className="w-full border-gray-300 p-3 rounded-md border shadow-sm focus:ring-blue-900 focus:border-blue-900"
                rows={4}
                value={formData[uniqueStateName] || ""}
                onChange={(e) => handleChange(uniqueStateName, e.target.value)}
              ></textarea>
            ) : (
              <div>
                <div className="flex-1 items-center mx-auto mb-3 space-y-4 sm:flex sm:space-y-0 ">
                  <div className="relative w-full">
                    {field.type === "file" ? (
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="w-[0px] h-[0px] opacity-0"
                        onChange={(e) =>
                          handleFileChange(uniqueStateName, e.target.files)
                        }
                        id={`file-input-${uniqueStateName}`}
                      />
                    ) : (
                      <input
                        type={field.type}
                        className="w-full border-gray-300 rounded-md p-3 border shadow-sm focus:ring-blue-900 focus:border-blue-900"
                        value={formData[uniqueStateName] || ""}
                        onChange={(e) =>
                          handleChange(uniqueStateName, e.target.value)
                        }
                      />
                    )}
                    {field.type === "file" && (
                      <div className="items-center justify-center mx-auto">
                        <label
                          htmlFor={`file-input-${uniqueStateName}`}
                          className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none z-10"
                        >
                          <span className="flex items-center space-x-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-6 h-6 text-gray-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              ></path>
                            </svg>
                            <span className="font-medium text-gray-600">
                              Drop Image to Attach, or
                              <span className="text-blue-600 underline ml-[4px]">
                                browse
                              </span>
                            </span>
                          </span>
                        </label>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-center py-6 bg-gray-200 rounded-lg">
                  {imagePreview[uniqueStateName] &&
                    imagePreview[uniqueStateName].map((src, idx) => (
                      <Image
                        key={idx}
                        src={src}
                        alt={`Preview ${idx + 1}`}
                        className="mt-2 w-32 h-32 mx-2 object-cover rounded-md"
                      />
                    ))}
                </div>
              </div>
            )}
          </div>
        );
      }
    });
  };
  if (!formConfig) {
    return <p className="text-center text-gray-500">Loading form...</p>;
  }

  return (
    <div className="px-4">
      <div className="w-full mx-auto  border my-6 rounded-lg shadow-md">
        <h1 className="text-sm bg-gray-50 font-bold py-3 px-6 text-gray-800 border-b">
          {formConfig.blueprintName}
        </h1>
        <form className="bg-white rounded-lg py-6 px-6">
          {formConfig.parentFields.map((parent, index) => (
            <div key={index} className="text-sm">
              <h2 className="text-sm font-semibold text-gray-700 mb-4">
                {parent.title}
              </h2>
              {renderFields(parent.nestedFields, parent.stateName)}
            </div>
          ))}
        </form>
      </div>
    </div>
  );
}

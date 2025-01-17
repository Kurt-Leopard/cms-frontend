import { useState, useEffect } from "react";

export default function DynamicForm() {
  const [formConfig, setFormConfig] = useState(null);
  const [formData, setFormData] = useState({});
  const [imagePreview, setImagePreview] = useState({});

  useEffect(() => {
    const fetchFormConfig = async () => {
      const data = JSON.parse(localStorage.getItem("blueprint"));
      setFormConfig(data);
    };
    fetchFormConfig();
  }, []);

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
      [name]: [...(prev[name] || []), {}],
    }));
  };

  const handleRemoveRepeater = (name, index) => {
    setFormData((prev) => {
      const updatedData = [...(prev[name] || [])];
      updatedData.splice(index, 1);
      return {
        ...prev,
        [name]: updatedData,
      };
    });
  };

  // Render nested fields recursively
  const renderFields = (fields, repeaterName) => {
    return fields.map((field, index) => {
      if (field.type === "repeater") {
        return (
          <div key={index} className="mb-6 border p-4 rounded-lg bg-gray-50">
            <h4 className="text-lg font-semibold mb-4">{field.title}</h4>
            {formData[repeaterName]?.map((nestedData, nestedIndex) => (
              <div key={nestedIndex} className="mb-4">
                <div className="flex justify-between items-center">
                  <h5 className="text-md font-medium">
                    {field.title} #{nestedIndex + 1}
                  </h5>
                  <button
                    type="button"
                    className="text-red-600"
                    onClick={() =>
                      handleRemoveRepeater(repeaterName, nestedIndex)
                    }
                  >
                    Remove
                  </button>
                </div>
                {field.nestedRepeaters.map((nested, nestedIndex) => (
                  <div key={nestedIndex} className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {nested.title}:
                    </label>
                    {nested.type === "file" ? (
                      <>
                        <input
                          type="file"
                          multiple
                          className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                          onChange={(e) =>
                            handleFileChange(
                              `${repeaterName}_${nested.stateName}_${nestedIndex}`,
                              e.target.files
                            )
                          }
                        />
                        {imagePreview[
                          `${repeaterName}_${nested.stateName}_${nestedIndex}`
                        ] &&
                          imagePreview[
                            `${repeaterName}_${nested.stateName}_${nestedIndex}`
                          ].map((src, idx) => (
                            <img
                              key={idx}
                              src={src}
                              alt={`Preview ${idx + 1}`}
                              className="mt-2 w-32 h-32 object-cover rounded-md"
                            />
                          ))}
                      </>
                    ) : (
                      <input
                        type="text"
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                        value={nestedData[nested.stateName] || ""}
                        onChange={(e) =>
                          handleRepeaterChange(
                            repeaterName,
                            { [nested.stateName]: e.target.value },
                            nestedIndex
                          )
                        }
                      />
                    )}
                  </div>
                ))}
              </div>
            ))}
            <button
              type="button"
              className="bg-primary text-white py-1 px-3 rounded-md mt-4"
              onClick={() => handleAddRepeater(repeaterName)}
            >
              Add New {field.title}
            </button>
          </div>
        );
      } else if (field.type === "dropdown") {
        return (
          <div key={index} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.title}:
            </label>
            <select
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              onChange={(e) => handleChange(field.stateName, e.target.value)}
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
          <div key={index} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.title}:
            </label>

            {field.type === "textarea" ? (
              <textarea
                placeholder={field.placeholder || ""}
                className="w-full border-gray-300 p-3 rounded-md border shadow-sm focus:ring-primary focus:border-primary"
                rows={4}
                onChange={(e) => handleChange(field.stateName, e.target.value)}
              ></textarea>
            ) : (
              <div>
                <div className="flex-1 items-center mx-auto mb-3 space-y-4 sm:flex sm:space-y-0">
                  <div className="relative w-full">
                    {field.type === "file" ? (
                      <input
                        type="file"
                        multiple
                        className="w-full absolute opacity-0 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                        onChange={(e) =>
                          handleFileChange(field.stateName, e.target.files)
                        }
                        id="input"
                      />
                    ) : (
                      <input
                        type={field.type}
                        className="w-full border-gray-300 rounded-md p-3 border shadow-sm focus:ring-primary focus:border-primary"
                        value={formData[field.stateName] || ""}
                        onChange={(e) =>
                          handleChange(field.stateName, e.target.value)
                        }
                      />
                    )}

                    {field.type === "file" && (
                      <div className="items-center justify-center mx-auto">
                        <label
                          htmlFor="input"
                          className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
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
                <div className="flex flex-wrap">
                  {imagePreview[field.stateName] &&
                    imagePreview[field.stateName].map((src, idx) => (
                      <img
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

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Save successfully!");
    window.location.href = "http://localhost:3000/dashboard";
  };

  if (!formConfig) {
    return <p className="text-center text-gray-500">Loading form...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 border my-6 rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {formConfig.blueprintName}
      </h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg py-6">
        {formConfig.parentFields.map((parent, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              {parent.title}
            </h2>
            {renderFields(parent.nestedFields, parent.stateName)}
          </div>
        ))}
        <button
          type="submit"
          className="bg-primary mx-auto text-white py-2 px-4 rounded-md shadow hover:bg-primary focus:ring-2 focus:ring-primary focus:outline-none"
        >
          Save
        </button>
      </form>
    </div>
  );
}

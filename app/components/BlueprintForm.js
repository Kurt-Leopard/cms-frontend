"use client";
import React, { useState } from "react";
import axios from "../../axios";
import { token } from "../helper/utils";

const BlueprintForm = ({ setShow }) => {
  const [blueprintName, setBlueprintName] = useState("");
  const [parentFields, setParentFields] = useState([
    {
      stateName: "",
      title: "",
      nestedFields: [
        { title: "", stateName: "", type: "text", nestedRepeaters: [] },
      ],
    },
  ]);

  const inputTypes = [
    "text",
    "email",
    "password",
    "number",
    "date",
    "time",
    "url",
    "tel",
    "checkbox",
    "radio",
    "file",
    "color",
    "hidden",
    "range",
    "search",
    "select",
    "textarea",
    "repeater",
    "related resource",
  ];

  const handleBlueprintNameChange = (e) => {
    setBlueprintName(e.target.value);
  };

  const handleParentFieldChange = (index, e) => {
    const { name, value } = e.target;
    const updatedFields = [...parentFields];
    updatedFields[index][name] = value;
    setParentFields(updatedFields);
  };

  const handleNestedFieldChange = (parentIndex, fieldIndex, e) => {
    const { name, value } = e.target;
    const updatedFields = [...parentFields];
    updatedFields[parentIndex].nestedFields[fieldIndex][name] = value;

    if (name === "type" && value === "repeater") {
      // Initialize nestedRepeaters for a repeater field
      updatedFields[parentIndex].nestedFields[fieldIndex].nestedRepeaters = [
        { title: "", stateName: "", type: "text", nestedRepeaters: [] },
      ];
    }

    setParentFields(updatedFields);
  };

  const handleRepeaterNestedFieldChange = (
    parentIndex,
    fieldIndex,
    repeaterFieldIndex,
    e
  ) => {
    const { name, value } = e.target;
    const updatedFields = [...parentFields];
    updatedFields[parentIndex].nestedFields[fieldIndex].nestedRepeaters[
      repeaterFieldIndex
    ][name] = value;

    if (name === "type" && value === "repeater") {
      updatedFields[parentIndex].nestedFields[fieldIndex].nestedRepeaters[
        repeaterFieldIndex
      ].nestedRepeaters = [
        { title: "", stateName: "", type: "text", nestedRepeaters: [] },
      ];
    }

    setParentFields(updatedFields);
  };

  const addNestedField = (parentIndex) => {
    const updatedFields = [...parentFields];
    updatedFields[parentIndex].nestedFields.push({
      title: "",
      stateName: "",
      type: "text",
      nestedRepeaters: [],
    });
    setParentFields(updatedFields);
  };

  // New function to add fields within a repeater
  const addRepeaterField = (parentIndex, fieldIndex) => {
    const updatedFields = [...parentFields];
    updatedFields[parentIndex].nestedFields[fieldIndex].nestedRepeaters.push({
      title: "",
      stateName: "",
      type: "text",
      nestedRepeaters: [],
    });
    setParentFields(updatedFields);
  };

  const addParentField = () => {
    setParentFields([
      ...parentFields,
      {
        stateName: "",
        title: "",
        nestedFields: [
          { title: "", stateName: "", type: "text", nestedRepeaters: [] },
        ],
      },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        blueprintName,
        parentFields,
      };
      console.log("first", data);
      const response = await axios.post("/api/blueprint", {
        user_id: token.id,
        name: blueprintName,
        data: data,
      });

      if (response.status === 200) {
        alert("success");
        setShow(false);
      }
    } catch (err) {
      console.log(`Error occurred: ${err}`);
    }
  };

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
            value={blueprintName}
            onChange={handleBlueprintNameChange}
            placeholder="Enter blueprint name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>
        <div className="bg-white border p-4 rounded-lg text-sm font-medium">
          {parentFields.map((parent, parentIndex) => (
            <div
              key={parentIndex}
              className="border bg-gray-50 p-4 rounded-lg my-2"
            >
              <h3 className="font-semibold text-gray-800 mb-4">Sections</h3>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2 text-sm">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={parent.title}
                  onChange={(e) => handleParentFieldChange(parentIndex, e)}
                  placeholder="Enter title"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2 text-sm">
                  State name
                </label>
                <input
                  type="text"
                  name="stateName"
                  value={parent.stateName}
                  onChange={(e) => handleParentFieldChange(parentIndex, e)}
                  placeholder="Enter state name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>
              <div className="mb-6 p-4 bg-white border rounded-md shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-4 text-sm">
                  Fields
                </h3>
                {parent.nestedFields.map((field, fieldIndex) => (
                  <div
                    key={fieldIndex}
                    className="mb-6 p-4 border rounded-md shadow-sm bg-gray-50"
                  >
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2">Title</label>
                      <input
                        type="text"
                        name="title"
                        value={field.title}
                        onChange={(e) =>
                          handleNestedFieldChange(parentIndex, fieldIndex, e)
                        }
                        placeholder="Enter title"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2">
                        State Name
                      </label>
                      <input
                        type="text"
                        name="stateName"
                        value={field.stateName}
                        onChange={(e) =>
                          handleNestedFieldChange(parentIndex, fieldIndex, e)
                        }
                        placeholder="Enter state name"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2">
                        Input Type
                      </label>
                      <select
                        name="type"
                        value={field.type}
                        onChange={(e) =>
                          handleNestedFieldChange(parentIndex, fieldIndex, e)
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                      >
                        {inputTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Render repeater nested fields only if type is "repeater" */}
                    {field.type === "repeater" && (
                      <div className="mt-4 p-4 bg-gray-100 border rounded-md">
                        {field.nestedRepeaters.map(
                          (nestedField, repeaterFieldIndex) => (
                            <div key={repeaterFieldIndex} className="mb-4">
                              <div className="mb-4">
                                <label className="block text-gray-700 mb-2">
                                  Title
                                </label>
                                <input
                                  type="text"
                                  name="title"
                                  value={nestedField.title}
                                  onChange={(e) =>
                                    handleRepeaterNestedFieldChange(
                                      parentIndex,
                                      fieldIndex,
                                      repeaterFieldIndex,
                                      e
                                    )
                                  }
                                  placeholder="Enter title"
                                  required
                                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                                />
                              </div>
                              <div className="mb-4">
                                <label className="block text-gray-700 mb-2">
                                  State Name
                                </label>
                                <input
                                  type="text"
                                  name="stateName"
                                  value={nestedField.stateName}
                                  onChange={(e) =>
                                    handleRepeaterNestedFieldChange(
                                      parentIndex,
                                      fieldIndex,
                                      repeaterFieldIndex,
                                      e
                                    )
                                  }
                                  placeholder="Enter state name"
                                  required
                                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                                />
                              </div>
                              <div className="mb-4">
                                <label className="block text-gray-700 mb-2">
                                  Input Type
                                </label>
                                <select
                                  name="type"
                                  value={nestedField.type}
                                  onChange={(e) =>
                                    handleRepeaterNestedFieldChange(
                                      parentIndex,
                                      fieldIndex,
                                      repeaterFieldIndex,
                                      e
                                    )
                                  }
                                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                                >
                                  {inputTypes.map((type) => (
                                    <option key={type} value={type}>
                                      {type}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          )
                        )}
                        <div className="flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() =>
                              addRepeaterField(parentIndex, fieldIndex)
                            }
                            className="border text-sm font-medium border-gray-900 text-gray-900 hover:text-white px-4 py-2 rounded-md hover:bg-gray-900 transition"
                          >
                            Add repeater field
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                <div className="flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => addNestedField(parentIndex)}
                    className="border text-sm font-medium border-gray-900 hover:text-white text-gray-900 px-4 py-2 rounded-md hover:bg-gray-900 transition"
                  >
                    Add fields
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={addParentField}
              className="border text-sm font-medium border-gray-900 text-gray-900 hover:text-white px-4 py-2 rounded-md hover:bg-gray-900 transition"
            >
              Add sections
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="mt-6 bg-gray-900 text-sm font-medium text-gray-200 px-6 py-2 rounded-md hover:bg-gray-900 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlueprintForm;

export const handleFileChange = (
  name,
  files,
  repeaterName,
  index,
  setFormData,
  setImagePreview
) => {
  const imageKey = repeaterName ? `${repeaterName}_image_${index}` : name;

  setFormData((prev) => ({
    ...prev,
    [imageKey]: files,
  }));

  const previewImages = [];
  Array.from(files).forEach((file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        previewImages.push(reader.result);
        setImagePreview((prev) => ({
          ...prev,
          [imageKey]: previewImages,
        }));
      };
      reader.readAsDataURL(file);
    }
  });
};

export const handleRepeaterChange = (name, value, index, setFormData) => {
  setFormData((prev) => {
    const updatedData = [...(prev[name] || [])];
    updatedData[index] = { ...updatedData[index], ...value };
    return {
      ...prev,
      [name]: updatedData,
    };
  });
};

export const handleAddRepeater = (name, setFormData) => {
  setFormData((prev) => {
    const newData = [...(prev[name] || []), { id: Date.now() }];
    return {
      ...prev,
      [name]: newData,
    };
  });
};

export const handleRemoveRepeater = (
  name,
  index,
  setFormData,
  formData,
  imagePreview,
  setImagePreview
) => {
  setFormData((prev) => {
    const updatedData = [...(prev[name] || [])];
    updatedData.splice(index, 1);

    // Update image keys
    const updatedImagePreview = { ...imagePreview };
    const updatedFormData = { ...prev };
    Object.keys(imagePreview).forEach((key) => {
      if (key.startsWith(`${name}_image_`)) {
        const keyIndex = parseInt(key.split("_").pop(), 10);
        if (keyIndex === index) {
          delete updatedImagePreview[key];
          delete updatedFormData[key];
        } else if (keyIndex > index) {
          const newKey = `${name}_image_${keyIndex - 1}`;
          updatedImagePreview[newKey] = updatedImagePreview[key];
          updatedFormData[newKey] = updatedFormData[key];
          delete updatedImagePreview[key];
          delete updatedFormData[key];
        }
      }
    });
    setImagePreview(updatedImagePreview);

    return {
      ...updatedFormData,
      [name]: updatedData,
    };
  });
};

export const toggleCollapseAll = (
  repeaterName,
  formData,
  collapse,
  setCollapse
) => {
  const items = formData[repeaterName] || [];
  const totalItems = items.length;
  const collapsedCount = Object.values(collapse).filter(Boolean).length;

  // Determine if all are collapsed or expanded
  const shouldCollapse = collapsedCount !== totalItems; // True if some/all are expanded

  setCollapse((prev) => {
    const newCollapseState = { ...prev };
    items.forEach((_, index) => {
      newCollapseState[`${repeaterName}_${index}`] = shouldCollapse;
    });
    return newCollapseState;
  });
};

export const handleCollapse = (repeaterName, index, setCollapse) => {
  setCollapse((prev) => ({
    ...prev,
    [`${repeaterName}_${index}`]: !prev[`${repeaterName}_${index}`],
  }));
};

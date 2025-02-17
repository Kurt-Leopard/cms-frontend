// jwtDecoder.js

function decodeJWT(token) {
  try {
    if (!token) return null;

    const base64Url = token.split(".")[1];

    if (!base64Url) return null;

    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

    const decodedData = JSON.parse(atob(base64));

    return decodedData;
  } catch (error) {
    return null;
  }
}

export const token = decodeJWT(sessionStorage.getItem("token"));

// utils/dateUtils.js
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const modifyPathname = (pathname) => {
  if (pathname.startsWith("/")) {
    pathname = pathname.slice(1);
  }

  const modifiedPathname = pathname.charAt(0).toUpperCase() + pathname.slice(1);

  return modifiedPathname;
};

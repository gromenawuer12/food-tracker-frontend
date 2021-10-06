const apiBaseUrl = "http://localhost:5000/";

const token = localStorage.getItem("token");

const METHOD = async (url, body, method) => {
  const response = await fetch(apiBaseUrl + url, {
    method: method,
    headers: {
      Authorization: "access_token " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return response;
};

export const GET = async (url) => {
  const response = await fetch(apiBaseUrl + url, {
    headers: { Authorization: "access_token " + token },
  });

  console.log("GET /" + url);

  return response;
};

export const POST = async (url, body) => {
  return await METHOD(url, body, "POST");
};

export const DELETE = async (url, body) => {
  return await METHOD(url, body, "DELETE");
};

const apiBaseUrl = process.env.REACT_APP_URL_SERVER
  ? process.env.REACT_APP_URL_SERVER
  : "https://xuzn6mlcb3.execute-api.eu-west-3.amazonaws.com/DEV/";

const METHOD = (url, body, method, token) => {
  return fetch(apiBaseUrl + url, {
    method: method,
    headers: {
      Authorization: "access_token " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

export const GET = async (url, token) => {
  console.log("GET", url);
  const response = await fetch(apiBaseUrl + url, {
    headers: { Authorization: "access_token " + token },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not fetch quotes.");
  }
  return data;
};

export const POST = (url, body, token) => {
  return METHOD(url, body, "POST", token);
};

export const DELETE = (url, body, token) => {
  return METHOD(url, body, "DELETE", token);
};

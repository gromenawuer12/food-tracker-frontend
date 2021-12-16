const apiBaseUrl = process.env.REACT_APP_URL_SERVER
  ? process.env.REACT_APP_URL_SERVER
  : "https://xuzn6mlcb3.execute-api.eu-west-3.amazonaws.com/DEV/";

const token = localStorage.getItem("token");

const METHOD = (url, body, method) => {
  return fetch(apiBaseUrl + url, {
    method: method,
    headers: {
      Authorization: "access_token " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

export const GET = (url) => {
  return fetch(apiBaseUrl + url, {
    headers: { Authorization: "access_token " + token },
  });
};

export const POST = (url, body) => {
  return METHOD(url, body, "POST");
};

export const DELETE = (url, body) => {
  return METHOD(url, body, "DELETE");
};

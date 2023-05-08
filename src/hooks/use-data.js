import { useState, useEffect, useContext } from "react";
import { GET, POST, DELETE } from "../fetch/fetch";
import AuthContext from "../store/auth-context";

const error = () => {
  console.log("Something went wrong!");
};

const useData = (URL) => {
  const [isUpdated, setIsUpdated] = useState(false);
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const getAllData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const data = await GET(URL, authCtx.token);
        setData(JSON.parse(data));
      } catch (error) {
        setIsError(error);
      }
      setIsLoading(false);

      setIsUpdated(true);
    };
    if (!isUpdated) getAllData();
  }, [isUpdated, URL, authCtx.token]);

  const deleteData = async (body) => {
    const response = await DELETE(URL, body, authCtx.token).catch(error);
    setIsUpdated(false);
    return response;
  };

  const addData = async (body) => {
    const response = await POST(URL, body, authCtx.token).catch(error);
    setIsUpdated(false);
    return response;
  };

  return { data, isError, isLoading, deleteData, addData };
};

export { useData };

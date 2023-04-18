import React, { useState, useEffect } from "react";
import Axios from "axios";

export const useFetch = (url) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    Axios.get(url)
      .then((res) => {
        if (res) {
          setData(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return { data };
};

import axios from "axios";

export const getData = (segment) => {
  const apiUrl = "http://127.0.0.1:8000/yourburger/api/v1";
  return axios.get(`${apiUrl}/${segment}/`);
};

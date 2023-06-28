import axios from "axios";

const contentApi = axios.create({
  baseURL: "http://127.0.0.1:8000/yourburger/api/v1/content/",
});

export const getContent = (userId) => contentApi.get(`/${userId}/`);

export const getContents = () => contentApi.get("/");

export const createContent = (user) => contentApi.post("/", user);

export const deleteContent = (userId) => contentApi.delete(`/${userId}/`);

export const editContent = (userId, updatedContent) =>
  contentApi.patch(`/${userId}/`, updatedContent);

export const updateContentStatus = (userId, status) => {
  return contentApi.patch(`/${userId}/`, { status });
};

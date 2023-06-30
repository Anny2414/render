import axios from "axios";

const contentOApi = axios.create({
    baseURL: "http://127.0.0.1:8000/yourburger/api/v1/contentorder/",
});

export const getContentOs = () => contentOApi.get("/");

export const getContentO = (contentOId) => contentOApi.get(`/${contentOId}/`);

export const createContentO = (contentO) => contentOApi.post("/", contentO);

export const deleteContentO = (ContentOId) => contentOApi.delete(`/${ContentOId}/`);

export const editContentO = (ContentOId, updatedContentO) =>
    contentOApi.patch(`/${ContentOId}/`, updatedContentO);


export const updateContentOStatus = (contentOId, status) => {
    return contentOApi.patch(`/${contentOId}/`, { status });
};
import axios from "axios";

const detailApi = axios.create({
    baseURL: "http://127.0.0.1:8000/yourburger/api/v1/detail/",
});

export const getDetails = () => detailApi.get("/");

export const getDetail = (detailId) => detailApi.get(`/${detailId}/`);

export const createDetail = (detail) => detailApi.post("/", detail);

export const deleteDetail = (DetailId) => detailApi.delete(`/${DetailId}/`);

export const editDetail = (DetailId, updatedDetail) =>
    detailApi.patch(`/${DetailId}/`, updatedDetail);


export const updateDetailStatus = (detailId, status) => {
    return detailApi.patch(`/${detailId}/`, { status });
};
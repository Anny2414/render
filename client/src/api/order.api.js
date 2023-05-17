import axios from "axios";

const orderApi = axios.create({
  baseURL: "http://127.0.0.1:8000/yourburger/api/v1/order/",
});

export const getOrder = () => orderApi.get("/");

export const createOrder = (order) => orderApi.post("/", order);

export const updateOrderStatus = (orderId, status) => {
  return orderApi.patch(`/${orderId}/`, { status });
};

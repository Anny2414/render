import axios from "axios";

const orderApi = axios.create({
    baseURL: "http://127.0.0.1:8000/yourburger/api/v1/order/",
});

export const getOrders = () => orderApi.get("/");

export const getOrder = (order) => orderApi.get("/" + order);

export const createOrder = (order) => orderApi.post("/", order);

export const deleteOrder = (OrderId) => orderApi.delete(`/${OrderId}/`);

export const editOrder = (OrderId, updatedOrder) =>
    orderApi.patch(`/${OrderId}/`, updatedOrder);


export const updateOrderStatus = (orderId, status) => {
    return orderApi.patch(`/${orderId}/`, { status });
};
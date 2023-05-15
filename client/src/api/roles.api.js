import axios from "axios";

const rolesApi = axios.create({
  baseURL: "http://127.0.0.1:8000/yourburger/api/v1/roles/",
});

export const getRoles = () => rolesApi.get("/");

export const createRole = (role) => rolesApi.post("/", role);

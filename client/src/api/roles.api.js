import axios from "axios";

const rolesApi = axios.create({
  baseURL: "http://127.0.0.1:8000/yourburger/api/v1/roles/",
});

export const getRole = (roleId) => rolesApi.get(`/${roleId}/`);

export const getRoles = () => rolesApi.get("/");

export const createRole = (role) => rolesApi.post("/", role);

export const deleteRole = (roleId) => rolesApi.delete(`/${roleId}/`);

export const editRole = (roleId, updatedRole) =>
  rolesApi.patch(`/${roleId}/`, updatedRole);

export const updateRoleStatus = (roleId, status) => {
  return rolesApi.patch(`/${roleId}/`, { status });
};

import axios from "axios";

const permissionApi = axios.create({
  baseURL: "http://127.0.0.1:8000/yourburger/api/v1/detallepermiso/",
});

export const savePermissions = (role, permission) =>
  permissionApi.post("/", {
    role,
    permission,
  });

export const getPermissions = (roleId) =>
  permissionApi.get().then((response) => {
    const permissions = response.data.filter((item) => item.role === roleId);
    return permissions.map((item) => item.permission);
  });

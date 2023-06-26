import axios from "axios";

const permissionApi = axios.create({
  baseURL: "http://127.0.0.1:8000/yourburger/api/v1/detallepermiso/",
});

export const savePermissions = (roleId, permission) =>
  permissionApi.post("/", {
    roleId,
    permission,
  });

export const getPermissions = (roleId) =>
  permissionApi.get().then((response) => {
    const permissions = response.data.filter((item) => item.roleId === roleId);
    return permissions.map((item) => item.permission);
  });

export const checkPermission = async (roleId, module) => {
  const permissions = await getPermissions(roleId);
  const modules = permissions.map((permission) => permission.split(":")[0]);
  return modules.includes(module);
};

export const deletePermissionsByRole = async (roleId) => {
  try {
    await permissionApi.delete(`?roleId=${roleId}`);
    console.log("Permisos eliminados exitosamente.");
  } catch (error) {
    console.error("Error al eliminar los permisos:", error);
  }
};

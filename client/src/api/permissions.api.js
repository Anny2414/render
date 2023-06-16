import axios from "axios";

const permissionApi = axios.create({
    baseURL: "http://127.0.0.1:8000/yourburger/api/v1/detallepermiso/",
});

export const savePermissions = (role, permission) => permissionApi.post("/", {
    role,
    permission
});

export const getPermissions = (role) => permissionApi.get(`?role=${role}`)
    .then(response => response.data.map(item => item.permission));
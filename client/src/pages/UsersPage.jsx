import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar.jsx";
import { Table } from "../components/Table/Table.jsx";

import { createModal } from "../components/CreateModal.jsx";

import { Button } from "../components/Form/Button.jsx";
import { Input } from "../components/Form/Input.jsx";

// CONEXION CON LA API DE USERS Y ROLES
import { getUsers, createUser, deleteUser } from "../api/users.api";
import { getRoles } from "../api/roles.api";

export function UsersPage() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);

  // Objeto para los campos de la ventana modal
  const fieldsNew = [
    {
      title: "Usuario",
      type: "text",
      name: "username",
      icon: "user",
      col: "half",
      required: "true",
    },
    {
      title: "Email",
      type: "text",
      name: "email",
      icon: "envelope",
      col: "half",
      required: "true",
    },
    {
      title: "Contraseña",
      type: "password",
      name: "password",
      icon: "key",
      col: "half",
      value: "yourburger123",
      readonly: "true",
    },
    { title: "Rol", type: "select", name: "role", col: "half" },
  ];

  // Conexion a API y obtiene datos de Users y Roles
  useEffect(() => {
    async function fetchData() {
      const res = await getUsers();
      const resRoles = await getRoles();
      setUsers(res.data);
      setRoles(resRoles.data);
    }

    fetchData();
  }, []);

  const handleEditClick = (userId) => {
    // Realizar la acción deseada, como abrir una modal con los datos del usuario correspondiente
    console.log("Editar usuario con ID:", userId);
  };

  const handleDeleteClick = (userId) => {
    deleteUser(userId);
    window.location.reload();
  };

  return (
    <div>
      <Navbar />
      <div className="container is-fluid mt-5">
        <div className="columns is-centered">
          <div className="column is-fullwidth">
            {createModal(fieldsNew, roles, "Nuevo usuario")}
            {/* <Button
              text="Crear usuario +"
              color="success"
              col="fullwidth"
              action={() => toggleModal(!statusModal)}
            /> */}
          </div>
          <div className="column is-9">
            <Input holder="Buscar usuario" icon="magnifying-glass" />
          </div>
          <div className="column is-fullwidth">
            <Button text="Generar PDF" color="primary" col="fullwidth" />
          </div>
        </div>
        <Table
          headers={["id", "role", "username", "email", "date"]}
          columns={["ID", "Rol", "Usuario", "Correo", "Creado en"]}
          data={users}
          status
          edit
          delete
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
        />
      </div>
    </div>
  );
}
